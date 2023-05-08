import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import UserMinimalDataTransformer from "Auth/Presentation/Transformers/UserMinimalDataTransformer";
import { IProductDomain } from "Product/Domain/Entities/IProductDomain";
import Transformer from "Shared/Presentation/Shared/Transformer";
import IProductTransformer from "./IProductTransformer";

class ProductTransformer extends Transformer {
    private userTransformer: UserMinimalDataTransformer;

    constructor()
    {
        super();
        this.userTransformer = new UserMinimalDataTransformer();
    }

    public async transform(product: IProductDomain): Promise<IProductTransformer>
    {
        const createdBy = product.createdBy;
        const lastModifiedBy = product.lastModifiedBy;
        dayjs.extend(utc);

        if (product.category.enable !== false) {
            return {
                id: product.getId(),
                title: product.title,
                price: product.price,
                enable: product.enable,
                category: product.category,
                createdBy: createdBy ? await this.userTransformer.handle(createdBy) : null,
                lastModifiedBy: lastModifiedBy ? await this.userTransformer.handle(lastModifiedBy) : null,
                createdAt: dayjs(product.createdAt).utc().unix(),
                updatedAt: dayjs(product.updatedAt).utc().unix()
            };
        }
    }
}

export default ProductTransformer