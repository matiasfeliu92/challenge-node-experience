import IUserDomain from "Auth/Domain/Entities/IUserDomain";
import IBaseDomain from "Shared/Domain/Entities/IBaseDomain";
import CategoryRepPayload from "../Payloads/CategoryRepPayload";

export interface ICategoryDomain extends IBaseDomain, CategoryRepPayload {
    title: string;
    enable: boolean;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
}