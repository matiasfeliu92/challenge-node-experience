import IUserDomain from "Auth/Domain/Entities/IUserDomain";
import ItemRepPayload from "Item/Domain/Payloads/ItemRepPayload";
import IBaseDomain from "Shared/Domain/Entities/IBaseDomain";

export interface ICategoryDomain extends IBaseDomain {
    title: string;
    enable: boolean;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
}