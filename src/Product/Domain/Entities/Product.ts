import Base from "Shared/Domain/Entities/Base";
import { IProductDomain } from "./IProductDomain";
import Category from "Category/Domain/Entities/Category";
import IUserDomain from "Auth/Domain/Entities/IUserDomain";

class Product extends Base implements IProductDomain {
    title: string;
    price: number;
    enable: boolean;
    category: Category;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
    
    constructor() {
        super()
    }
}

export default Product