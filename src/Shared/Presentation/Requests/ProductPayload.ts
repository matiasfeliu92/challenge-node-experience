import Category from "Category/Domain/Entities/Category";

interface ProductPayload
{
    title: string;
    price: number;
    enable: boolean;
    category: Category
}

export default ProductPayload;