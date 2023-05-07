import ICategoryRepository from "Category/Infrastructure/Repositories/ICategoryRepository";
import { REPOSITORIES } from "Config/Injects";
import CategoryPayload from "Shared/Presentation/Requests/CategoryPayload";
import { getRequestContext } from "Shared/Presentation/Shared/RequestContext";
import { ICategoryDomain } from "../Entities/ICategoryDomain";

class GetCategoriesUserCase {
    private repository: ICategoryRepository
    constructor () {
        const { container } = getRequestContext();
        this.repository = container.resolve<ICategoryRepository>(REPOSITORIES.ICategoryRepository);
    }

    async handle(payload: CategoryPayload): Promise<ICategoryDomain>
    {
        if(payload.enable !== false)
        return await this.repository.getOne(payload.title);
    }
}

export default GetCategoriesUserCase