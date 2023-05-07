import Sort from "Shared/Presentation/Requests/Sort";

class ProductSort extends Sort {
    static readonly TITLE: string = 'title';
    static readonly PRICE: string = 'price';
    static readonly ENABLE: string = 'enable';
    static readonly CATEGORY: string = 'category';

    getFields(): string[]
    {
        return [
            ProductSort.TITLE,
            ProductSort.PRICE,
            ProductSort.ENABLE,
            ProductSort.CATEGORY
        ];
    }

    getDefaultSorts(): Record<string, 'asc' | 'desc'>[]
    {
        return [
            { [ProductSort.TITLE]: 'asc' }
        ];
    }
}

export default ProductSort