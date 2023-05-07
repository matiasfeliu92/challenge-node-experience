import { Query } from 'mongoose';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import IProductRepository from './IProductRepository';
import ProductFilter from '../../Presentation/Criterias/ProductFilter';
import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';

import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import Product from '../../Domain/Entities/Product';
import { ProductMongooseDocument } from '../Schemas/ProductMongoose';
import { IProductDomain } from 'Product/Domain/Entities/IProductDomain';

class ProductMongooseRepository extends BaseMongooseRepository<IProductDomain, ProductMongooseDocument> implements IProductRepository
{
    constructor()
    {
        super(Product.name, ['createdBy', 'lastModifiedBy']);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<ProductMongooseDocument[], ProductMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(ProductFilter.TITLE))
        {
            const name: string = filter.get(ProductFilter.TITLE) as string;
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(ProductFilter.TITLE).regex(rSearch);
        }

        if (filter.has(ProductFilter.PRICE))
        {
            const price: string = filter.get(ProductFilter.PRICE) as string;
            const operator: number = filter.get(ProductFilter.PRICE) as number;

            void queryBuilder.where(ProductFilter.PRICE)[operator](price);
        }

        if (filter.has(ProductFilter.ENABLE))
        {
            const enable: string = filter.get(ProductFilter.ENABLE) as string;
            const operator: number = filter.get(ProductFilter.ENABLE) as number;

            void queryBuilder.where(ProductFilter.ENABLE)[operator](enable);
        }

        if (filter.has(ProductFilter.CATEGORY))
        {
            const category: string = filter.get(ProductFilter.CATEGORY) as string;
            const operator: number = filter.get(ProductFilter.ENABLE) as number;

            void queryBuilder.where(ProductFilter.CATEGORY)[operator](category);
        }

        void queryBuilder.populate(this.populate);

        return new MongoosePaginator(queryBuilder, criteria);
    }

    async create(product: IProductDomain): Promise<IProductDomain>
    {
        const productDocument = new this.repository(product);
        const createdProduct = await productDocument.save();
        return createdProduct.toObject();
    }

    // async update(product: IProductDomain): Promise<IProductDomain>
    // {
    //     const { id, ...rest } = product;
    //     const updatedProduct = await this.repository.findOneAndUpdate({ _id: id }, rest, { new: true });
    //     return updatedProduct.toObject();
    // }

    // async delete(id: string): Promise<boolean>
    // {
    //     const result = await this.repository.deleteOne({ _id: id });
    //     return result.deletedCount === 1;
    // }
}

export default ProductMongooseRepository;
