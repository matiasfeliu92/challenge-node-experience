import Base from "Shared/Domain/Entities/Base";
import {ICategoryDomain} from "./ICategoryDomain";
import IUserDomain from "Auth/Domain/Entities/IUserDomain";

class Category extends Base implements ICategoryDomain {
    title: string;
    enable: boolean;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
    
    constructor()
    {
        super();
    }
}

export default Category