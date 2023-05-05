import Router from 'koa-router';

export const router = new Router();
import {getAllProducts, newProduct} from '../controllers/product.controller.js';
import {getAllCategories, newCategory} from '../controllers/category.controller.js';

router.get('/', (ctx)=>{
    ctx.body = "HOLA MUNDO"
})

router.get('/products', getAllProducts);
router.post('/products', newProduct);

router.get('/categories', getAllCategories);
router.post('/categories', newCategory);