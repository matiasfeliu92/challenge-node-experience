import Base from "Shared/Domain/Entities/Base";
import {ICategoryDomain} from "./ICategoryDomain";
import IUserDomain from "Auth/Domain/Entities/IUserDomain";
import ItemRepPayload from "Item/Domain/Payloads/ItemRepPayload";

class Category extends Base implements ICategoryDomain {
    title: string;
    enable: boolean;
    
    constructor()
    {
        super();
    }
}

export default Category