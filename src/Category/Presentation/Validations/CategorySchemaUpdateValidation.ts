import ProductSchemaSaveValidation from "Product/Presentation/Validations/ProductSchemaSaveValidation";
import IdSchemaValidation from "Shared/Presentation/Validations/IdSchemaValidation";

const ProductSchemaUpdateValidation = ProductSchemaSaveValidation.merge(IdSchemaValidation);

export default ProductSchemaUpdateValidation;