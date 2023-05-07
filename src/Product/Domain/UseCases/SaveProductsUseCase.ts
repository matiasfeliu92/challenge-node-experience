import { REPOSITORIES } from "Config/Injects";
import IProductRepository from "Product/Infrastructure/Repositories/IProductRepository";
import { getRequestContext } from "Shared/Presentation/Shared/RequestContext";
import ProductRepPayload from "../Payloads/ProductRepPayload";
import { IProductDomain } from "../Entities/IProductDomain";
import ProductBuilder from "../Factories/ProductBuilder";

class SaveProductsUseCase {
    private repository: IProductRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }

    async handle(payload: ProductRepPayload): Promise<IProductDomain>
    {
        const item: IProductDomain = new ProductBuilder(payload)
            .setProduct()
            .build()
            .create();

        return await this.repository.save(item);
    }
}

export default SaveProductsUseCase