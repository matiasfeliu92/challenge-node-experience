import KoaResponder from 'Shared/Application/Http/KoaResponder';
import { DefaultContext } from 'koa';
import Router from 'koa-router';
import CategoryController from '../Controllers/CategoryController';
import MainConfig from 'Config/MainConfig';
import AuthorizeKoaMiddleware from 'Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import CriteriaPayload from 'Shared/Presentation/Validations/CriteriaPayload';
import IPaginator from 'Shared/Infrastructure/Orm/IPaginator';
import CategoryTransformer from '../Transformers/CategoryTransformer';
import CategoryRepPayload from 'Category/Domain/Payloads/CategoryRepPayload';
import { AuthUser } from 'Auth/Presentation/Helpers/AuthUser';
import DefaultMessageTransformer from 'Shared/Presentation/Transformers/DefaultMessageTransformer';
import CategoryUpdatePayload from 'Category/Domain/Payloads/CategoryUpdatePayload';
import Permissions from 'Config/Permissions';
import ResponseMessageEnum from 'Shared/Domain/Enum/ResponseMessageEnum';
import IdPayload from 'Shared/Presentation/Requests/IdPayload';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/categories'
};

const CategoryKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller: CategoryController = new CategoryController();
const config = MainConfig.getInstance().getConfig().statusCode;


CategoryKoaHandler.get('/category', AuthorizeKoaMiddleware(Permissions.CATEGORY_LIST), async(ctx: DefaultContext) =>
{
    const data: CriteriaPayload = {
        url: ctx.request.url,
        query: ctx.request.query
    };

    const paginator: IPaginator = await controller.list(data);

    await responder.paginate(paginator, ctx, config['HTTP_OK'], new CategoryTransformer());
});

CategoryKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.CATEGORY_SHOW), async(ctx: DefaultContext) =>
{
    const category = await controller.getOne(ctx.params);

    void await responder.send(category, ctx, config['HTTP_OK'], new CategoryTransformer());
});

CategoryKoaHandler.post('/category', AuthorizeKoaMiddleware(Permissions.CATEGORY_SAVE), async(ctx: DefaultContext) =>
{
    const data: CategoryRepPayload = {
        authUser: AuthUser(ctx),
        ...ctx.request.body
    };

    const product = await controller.save(data);

    void await responder.send(product, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

CategoryKoaHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.PRODUCTS_UPDATE), async(ctx: DefaultContext) =>
{
    const data: CategoryUpdatePayload = {
        id: ctx.params.id,
        authUser: AuthUser(ctx),
        ...ctx.request.body
    };

    const category = await controller.update(data);

    void await responder.send(category, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

CategoryKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.CATEGORY_DELETE), async(ctx: DefaultContext) =>
{
    const category = await controller.remove(ctx.params as IdPayload);

    void await responder.send(category, ctx, config['HTTP_CREATED'], new CategoryTransformer());
});

export default CategoryKoaHandler