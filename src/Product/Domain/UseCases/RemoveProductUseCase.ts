import { REPOSITORIES } from "Config/Injects";
import IProductRepository from "Product/Infrastructure/Repositories/IProductRepository";
import IdPayload from "Shared/Presentation/Requests/IdPayload";
import { getRequestContext } from "Shared/Presentation/Shared/RequestContext";
import { IProductDomain } from "../Entities/IProductDomain";

class RemoveProductsUseCase
{
    private repository: IProductRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }

    async handle(payload: IdPayload): Promise<IProductDomain>
    {
        const { id } = payload;
        return await this.repository.delete(id);
    }
}

export default RemoveProductsUseCase;
