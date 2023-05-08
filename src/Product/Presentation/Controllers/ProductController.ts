import IPaginator from "Shared/Infrastructure/Orm/IPaginator";
import ICriteria from "Shared/Presentation/Requests/ICriteria";
import RequestCriteria from "Shared/Presentation/Requests/RequestCriteria";
import ValidatorSchema from "Shared/Presentation/Shared/ValidatorSchema";
import CriteriaPayload from "Shared/Presentation/Validations/CriteriaPayload";
import CriteriaSchemaValidation from "Shared/Presentation/Validations/CriteriaSchemaValidation";
import ProductFilter from "../Criterias/ProductFilter";
import Pagination from "Shared/Presentation/Shared/Pagination";
import ListProductsUseCase from "Product/Domain/UseCases/ListProductsUseCase";
import ProductSort from "../Criterias/ProductSort";
import { IProductDomain } from "Product/Domain/Entities/IProductDomain";
import IdSchemaValidation from "Shared/Presentation/Validations/IdSchemaValidation";
import GetProductsUserCase from "Product/Domain/UseCases/GetProductsUserCase";
import ProductRepPayload from "Product/Domain/Payloads/ProductRepPayload";
import SaveProductsUseCase from "Product/Domain/UseCases/SaveProductsUseCase";
import ProductSchemaSaveValidation from "../Validations/ProductSchemaSaveValidation";
import ProductUpdatePayload from "Product/Domain/Payloads/ProductUpdatePayload";
import ProductSchemaUpdateValidation from "../Validations/ProductSchemaUpdateValidation";
import UpdateProductUseCase from "Product/Domain/UseCases/UpdateProductUseCase";
import ProductPayload from "Shared/Presentation/Requests/ProductPayload";
import IdPayload from "Shared/Presentation/Requests/IdPayload";
import RemoveProductsUseCase from "Product/Domain/UseCases/RemoveProductUseCase";

class ProductController {
    public async list(payload: CriteriaPayload): Promise<IPaginator> {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);
        const requestCriteria: ICriteria = new RequestCriteria(
            {
                filter: new ProductFilter(payload.query),
                sort: new ProductSort(payload.query),
                pagination: new Pagination(payload.query, payload.url)
            });

        const useCase = new ListProductsUseCase();
        return await useCase.handle(requestCriteria);
    }

    public async getOne(payload: ProductPayload): Promise<IProductDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new GetProductsUserCase();
        return await useCase.handle(payload);
    }

    public async save(payload: ProductRepPayload): Promise<IProductDomain>
    {
        await ValidatorSchema.handle(ProductSchemaSaveValidation, payload);

        const useCase = new SaveProductsUseCase();
        return await useCase.handle(payload);
    }

    public async update(payload: ProductUpdatePayload): Promise<IProductDomain>
    {
        await ValidatorSchema.handle(ProductSchemaUpdateValidation, payload);

        const useCase = new UpdateProductUseCase();
        return await useCase.handle(payload);
    }

    public async remove(payload: IdPayload): Promise<IProductDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new RemoveProductsUseCase();
        return await useCase.handle(payload);
    }
}

export default ProductController