import { ICategoryDomain } from "Category/Domain/Entities/ICategoryDomain";
import CategoryRepPayload from "Category/Domain/Payloads/CategoryRepPayload";

class CategoryBuilder {
    private _category: ICategoryDomain
    private _payload: CategoryRepPayload

    constructor(payload?: CategoryRepPayload) {
        this._payload = payload;
    }
}

export default CategoryBuilder