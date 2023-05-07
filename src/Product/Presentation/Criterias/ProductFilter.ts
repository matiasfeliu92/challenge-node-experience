import Category from "Category/Domain/Entities/Category";
import Filter from "Shared/Presentation/Requests/Filter";

class ProductFilter extends Filter {
    static readonly TITLE: string = 'title';
    static readonly PRICE: string = 'price';
    static readonly ENABLE: string = 'enable';
    static readonly CATEGORY: string = 'category';

    getFields(): any
    {
        return [
            ProductFilter.TITLE,
            ProductFilter.PRICE,
            ProductFilter.ENABLE,
            ProductFilter.CATEGORY
        ];
    }

    getDefaultFilters(): any
    {
        return [];
    }
}

export default ProductFilter