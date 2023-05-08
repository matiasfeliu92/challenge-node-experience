import IUserMinimalDataTransformer from "Auth/Presentation/Transformers/IUserMinimalDataTransformer";
import Category from "Category/Domain/Entities/Category";

interface IProductTransformer
{
    id: string;
    title: string;
    price: number;
    enable: boolean;
    category: Category
    createdBy: IUserMinimalDataTransformer;
    lastModifiedBy: IUserMinimalDataTransformer;
    createdAt: number;
    updatedAt: number;
}

export default IProductTransformer;