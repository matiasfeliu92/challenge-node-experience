import IdSchemaValidation from "Shared/Presentation/Validations/IdSchemaValidation";
import ProductSchemaSaveValidation from "./ProductSchemaSaveValidation";

const ItemSchemaUpdateValidation = ProductSchemaSaveValidation.merge(IdSchemaValidation);

export default ItemSchemaUpdateValidation;