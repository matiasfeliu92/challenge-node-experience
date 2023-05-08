import KoaResponder from 'Shared/Application/Http/KoaResponder';
import { DefaultContext } from 'koa';
import Router from 'koa-router';
import ProductController from '../Controllers/ProductController';
import MainConfig from 'Config/MainConfig';
import AuthorizeKoaMiddleware from 'Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import CriteriaPayload from 'Shared/Presentation/Validations/CriteriaPayload';
import IPaginator from 'Shared/Infrastructure/Orm/IPaginator';
import ProductTransformer from '../Transformers/ProductTransformer';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/products'
};

const ItemKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller: ProductController = new ProductController();
const config = MainConfig.getInstance().getConfig().statusCode;

ItemKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.PRDDUCTS_LIST), async(ctx: DefaultContext) =>
{
    const data: CriteriaPayload = {
        url: ctx.request.url,
        query: ctx.request.query
    };

    const paginator: IPaginator = await controller.list(data);

    await responder.paginate(paginator, ctx, config['HTTP_OK'], new ProductTransformer());
});