import { IProductDomain } from "../Entities/IProductDomain";
import ProductRepPayload from "../Payloads/ProductRepPayload";

class ProductBuilder {
    private _product: IProductDomain
    private _payload: ProductRepPayload

    constructor(payload?: ProductRepPayload) {
        this._payload = payload
    }
}

export default ProductBuilder