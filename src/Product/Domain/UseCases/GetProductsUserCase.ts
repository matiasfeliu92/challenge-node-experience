import { REPOSITORIES } from "Config/Injects";
import IProductRepository from "Product/Infrastructure/Repositories/IProductRepository";
import { getRequestContext } from "Shared/Presentation/Shared/RequestContext";
import { IProductDomain } from "../Entities/IProductDomain";
import ProductPayload from "Shared/Presentation/Requests/ProductPayload";
import IdPayload from "Shared/Presentation/Requests/IdPayload";

class GetProductsUserCase {
    private repository: IProductRepository
    constructor () {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }

    async handle(payload: IdPayload): Promise<IProductDomain>
    {
        return await this.repository.getOne(payload.id);
    }
}

export default GetProductsUserCase