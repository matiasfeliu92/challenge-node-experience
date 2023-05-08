import KoaResponder from 'Shared/Application/Http/KoaResponder';
import { DefaultContext } from 'koa';
import Router from 'koa-router';
import ProductController from '../Controllers/ProductController';
import MainConfig from 'Config/MainConfig';
import AuthorizeKoaMiddleware from 'Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import CriteriaPayload from 'Shared/Presentation/Validations/CriteriaPayload';
import IPaginator from 'Shared/Infrastructure/Orm/IPaginator';
import ProductTransformer from '../Transformers/ProductTransformer';
import ProductRepPayload from 'Product/Domain/Payloads/ProductRepPayload';
import { AuthUser } from 'Auth/Presentation/Helpers/AuthUser';
import DefaultMessageTransformer from 'Shared/Presentation/Transformers/DefaultMessageTransformer';
import ResponseMessageEnum from 'Shared/Domain/Enum/ResponseMessageEnum';
import IdPayload from 'Shared/Presentation/Requests/IdPayload';
import ProductUpdatePayload from 'Product/Domain/Payloads/ProductUpdatePayload';
import Permissions from 'Config/Permissions';
import CategoryPayload from 'Shared/Presentation/Requests/CategoryPayload';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/products'
};

const ProductKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller: ProductController = new ProductController();
const config = MainConfig.getInstance().getConfig().statusCode;

ProductKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.PRODUCTS_LIST), async(ctx: DefaultContext) =>
{
    const data: CriteriaPayload = {
        url: ctx.request.url,
        query: ctx.request.query
    };

    const paginator: IPaginator = await controller.list(data);

    await responder.paginate(paginator, ctx, config['HTTP_OK'], new ProductTransformer());
});

ProductKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.PRODUCTS_SHOW), async(ctx: DefaultContext) =>
{
    const product = await controller.getOne(ctx.params as IdPayload);

    void await responder.send(product, ctx, config['HTTP_OK'], new ProductTransformer());
});

ProductKoaHandler.get('/:category', AuthorizeKoaMiddleware(Permissions.PRODUCTS_SHOW), async(ctx: DefaultContext) =>
{
    const product = await controller.getByCategory(ctx.params as CategoryPayload);

    void await responder.send(product, ctx, config['HTTP_OK'], new ProductTransformer());
});

ProductKoaHandler.post('/', AuthorizeKoaMiddleware(Permissions.PRODUCTS_SAVE), async(ctx: DefaultContext) =>
{
    const data: ProductRepPayload = {
        authUser: AuthUser(ctx),
        ...ctx.request.body
    };

    const product = await controller.save(data);

    void await responder.send(product, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

ProductKoaHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.PRODUCTS_UPDATE), async(ctx: DefaultContext) =>
{
    const data: ProductUpdatePayload = {
        id: ctx.params.id,
        authUser: AuthUser(ctx),
        ...ctx.request.body
    };

    const product = await controller.update(data);

    void await responder.send(product, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

ProductKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.PRODUCTS_DELETE), async(ctx: DefaultContext) =>
{
    const product = await controller.remove(ctx.params as IdPayload);

    void await responder.send(product, ctx, config['HTTP_CREATED'], new ProductTransformer());
});

export default ProductKoaHandler