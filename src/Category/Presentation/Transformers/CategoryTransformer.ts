import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import UserMinimalDataTransformer from "Auth/Presentation/Transformers/UserMinimalDataTransformer";
import { ICategoryDomain } from "Category/Domain/Entities/ICategoryDomain";
import Transformer from "Shared/Presentation/Shared/Transformer";
import ICategoryTransformer from "./ICategoryTransformer";

class CategoryTransformer extends Transformer {
    private userTransformer: UserMinimalDataTransformer;

    constructor()
    {
        super();
        this.userTransformer = new UserMinimalDataTransformer();
    }

    public async transform(product: ICategoryDomain): Promise<ICategoryTransformer>
    {
        const createdBy = product.createdBy;
        const lastModifiedBy = product.lastModifiedBy;
        dayjs.extend(utc);
        return {
            id: product.getId(),
            title: product.title,
            enable: product.enable,
            createdBy: createdBy ? await this.userTransformer.handle(createdBy) : null,
            lastModifiedBy: lastModifiedBy ? await this.userTransformer.handle(lastModifiedBy) : null,
            createdAt: dayjs(product.createdAt).utc().unix(),
            updatedAt: dayjs(product.updatedAt).utc().unix()
        };
    }
}

export default CategoryTransformer