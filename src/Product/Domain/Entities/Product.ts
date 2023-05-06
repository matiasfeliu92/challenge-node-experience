import Base from "Shared/Domain/Entities/Base";
import { IProductDomain } from "./IProductDomain";
import Category from "Category/Domain/Entities/Category";

class Product extends Base implements IProductDomain {
    title: string;
    price: number;
    enable: boolean;
    category: Category;
    
    constructor() {
        super()
    }
}