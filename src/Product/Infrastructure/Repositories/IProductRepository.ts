import { IProductDomain } from "Product/Domain/Entities/IProductDomain";
import IPaginator from "Shared/Infrastructure/Orm/IPaginator";
import IBaseRepository from "Shared/Infrastructure/Repositories/IBaseRepository";
import ICriteria from "Shared/Presentation/Requests/ICriteria";

interface IProductRepository extends IBaseRepository<IProductDomain> {
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IProductRepository