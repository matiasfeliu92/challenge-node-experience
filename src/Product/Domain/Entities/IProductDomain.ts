import IUserDomain from "Auth/Domain/Entities/IUserDomain";
import Category from "Category/Domain/Entities/Category";
import IBaseDomain from "Shared/Domain/Entities/IBaseDomain";

export interface IProductDomain extends IBaseDomain {
    title: string, 
    price: number,
    enable: boolean,
    category: Category
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
}