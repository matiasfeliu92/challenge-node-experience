import { REPOSITORIES } from "Config/Injects";
import IProductRepository from "Product/Infrastructure/Repositories/IProductRepository";
import IdPayload from "Shared/Presentation/Requests/IdPayload";
import { getRequestContext } from "Shared/Presentation/Shared/RequestContext";
import { IProductDomain } from "../Entities/IProductDomain";
import TitlePayload from "Shared/Presentation/Requests/TitlePayload";
import CategoryPayload from "Shared/Presentation/Requests/CategoryPayload";

class GetProductsUserCase {
    private repository: IProductRepository
    constructor () {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }

    async handle(payload: CategoryPayload): Promise<IProductDomain>
    {
        if(payload.enable !== false)
        return await this.repository.getOne(payload.title);
    }
}

export default GetProductsUserCase