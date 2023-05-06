import Category from "Category/Domain/Entities/Category";

interface ProductRepPayload {
    title: string,
    price: number,
    enable: boolean,
    category: Category,
}

export default ProductRepPayload