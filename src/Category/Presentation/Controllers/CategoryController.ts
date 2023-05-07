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
}

export default CategoryController