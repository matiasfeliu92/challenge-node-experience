import IUserDomain from "Auth/Domain/Entities/IUserDomain";
import IBaseDomain from "Shared/Domain/Entities/IBaseDomain";
import ProductRepPayload from "../Payloads/ProductRepPayload";

export interface IProductDomain extends IBaseDomain, ProductRepPayload {
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
}