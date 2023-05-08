import { ICategoryDomain } from "Category/Domain/Entities/ICategoryDomain";
import BaseMongooseRepository from "Shared/Infrastructure/Repositories/BaseMongooseRepository";
import ICategoryRepository from "./ICategoryRepository";
import Category from "Category/Domain/Entities/Category";
import ICriteria from "Shared/Presentation/Requests/ICriteria";
import IPaginator from "Shared/Infrastructure/Orm/IPaginator";
import { CategoryMongooseDocument } from "../Schemas/CategoryMongoose";
import { Query } from "mongoose";
import CategoryFilter from "Category/Presentation/Criterias/CategoryFilter";
import MongoosePaginator from "Shared/Infrastructure/Orm/MongoosePaginator";

class CategoryMongooseRepository extends BaseMongooseRepository<ICategoryDomain, CategoryMongooseDocument> implements ICategoryRepository
{
    constructor()
    {
        super(Category.name, ['createdBy', 'lastModifiedBy']);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<CategoryMongooseDocument[], CategoryMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(CategoryFilter.TITLE))
        {
            const name: string = filter.get(CategoryFilter.TITLE) as string;
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(CategoryFilter.TITLE).regex(rSearch);
        }

        if (filter.has(CategoryFilter.ENABLE))
        {
            const enable: string = filter.get(CategoryFilter.ENABLE) as string;
            const operator: number = filter.get(CategoryFilter.ENABLE) as number;

            void queryBuilder.where(CategoryFilter.ENABLE)[operator](enable);
        }

        void queryBuilder.populate(this.populate);

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default CategoryMongooseRepository;