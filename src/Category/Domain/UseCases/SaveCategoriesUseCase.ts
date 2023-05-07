import ICategoryRepository from "Category/Infrastructure/Repositories/ICategoryRepository";
import { REPOSITORIES } from "Config/Injects";
import { getRequestContext } from "Shared/Presentation/Shared/RequestContext";
import CategoryRepPayload from "../Payloads/CategoryRepPayload";
import { ICategoryDomain } from "../Entities/ICategoryDomain";
import CategoryBuilder from "../Factories/CategoryBuilder";

class SaveCategoriesUseCase {
    private repository: ICategoryRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<ICategoryRepository>(REPOSITORIES.ICategoryRepository);
    }

    async handle(payload: CategoryRepPayload): Promise<ICategoryDomain>
    {
        const item: ICategoryDomain = new CategoryBuilder(payload)
            .setCategory()
            .build()
            .create();

        return await this.repository.save(item);
    }
}

export default SaveCategoriesUseCase