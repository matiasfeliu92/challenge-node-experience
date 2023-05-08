import IPaginator from "Shared/Infrastructure/Orm/IPaginator";
import ICriteria from "Shared/Presentation/Requests/ICriteria";
import RequestCriteria from "Shared/Presentation/Requests/RequestCriteria";
import ValidatorSchema from "Shared/Presentation/Shared/ValidatorSchema";
import CriteriaPayload from "Shared/Presentation/Validations/CriteriaPayload";
import CriteriaSchemaValidation from "Shared/Presentation/Validations/CriteriaSchemaValidation";
import CategoryFilter from "../Criterias/CategoryFilter";
import CategorySort from "../Criterias/CategorySort";
import Pagination from "Shared/Presentation/Shared/Pagination";
import ListCategoriesUseCase from "Category/Domain/UseCases/ListCategoriesUseCase";
import CategoryPayload from "Shared/Presentation/Requests/CategoryPayload";
import { ICategoryDomain } from "Category/Domain/Entities/ICategoryDomain";
import IdSchemaValidation from "Shared/Presentation/Validations/IdSchemaValidation";
import GetCategoriesUserCase from "Category/Domain/UseCases/GetCategoriesUseCase";
import CategoryRepPayload from "Category/Domain/Payloads/CategoryRepPayload";
import CategorySchemaSaveValidation from "../Validations/CategorySchemaSaveValidation";
import CategorySchemaUpdateValidation from "../Validations/CategorySchemaUpdateValidation";
import SaveCategoriesUseCase from "Category/Domain/UseCases/SaveCategoriesUseCase";
import UpdateCategoriesUseCase from "Category/Domain/UseCases/UpdateCategoriesUseCase";
import CategoryUpdatePayload from "Category/Domain/Payloads/CategoryUpdatePayload";
import IdPayload from "Shared/Presentation/Requests/IdPayload";
import RemoveCategoriesUseCase from "Category/Domain/UseCases/RemoveCategoryUseCase";

class CategoryController {
    public async list(payload: CriteriaPayload): Promise<IPaginator> {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);
        const requestCriteria: ICriteria = new RequestCriteria(
            {
                filter: new CategoryFilter(payload.query),
                sort: new CategorySort(payload.query),
                pagination: new Pagination(payload.query, payload.url)
            });

        const useCase = new ListCategoriesUseCase();
        return await useCase.handle(requestCriteria);
    }

    public async getOne(payload: CategoryPayload): Promise<ICategoryDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new GetCategoriesUserCase();
        return await useCase.handle(payload);
    }

    public async save(payload: CategoryRepPayload): Promise<ICategoryDomain>
    {
        await ValidatorSchema.handle(CategorySchemaSaveValidation, payload);

        const useCase = new SaveCategoriesUseCase();
        return await useCase.handle(payload);
    }

    public async update(payload: CategoryUpdatePayload): Promise<ICategoryDomain>
    {
        await ValidatorSchema.handle(CategorySchemaUpdateValidation, payload);

        const useCase = new UpdateCategoriesUseCase();
        return await useCase.handle(payload);
    }

    public async remove(payload: IdPayload): Promise<ICategoryDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new RemoveCategoriesUseCase();
        return await useCase.handle(payload);
    }
}

export default CategoryController