import IGroupPermission from './IGroupPermission';

class Permissions
{
    // AUTH
    static readonly AUTH_SYNC_PERMISSIONS: string = 'authSyncPermissions';
    static readonly GET_PERMISSIONS: string = 'getPermissions';

    // ITEMS
    static readonly ITEMS_SAVE: string = 'itemsSave';
    static readonly ITEMS_UPDATE: string = 'itemsUpdate';
    static readonly ITEMS_SHOW: string = 'itemsShow';
    static readonly ITEMS_LIST: string = 'itemsList';
    static readonly ITEMS_DELETE: string = 'itemsDelete';

    // PRODUCTS
    static readonly PRODUCTS_SAVE: string = 'productsSave';
    static readonly PRODUCTS_UPDATE: string = 'productsUpdate';
    static readonly PRODUCTS_SHOW: string = 'productsShow';
    static readonly PRODUCTS_LIST: string = 'productsList';
    static readonly PRODUCTS_DELETE: string = 'productsDelete';

    // CATEGORY
    static readonly CATEGORY_SAVE: string = 'categorySave';
    static readonly CATEGORY_UPDATE: string = 'categoryUpdate';
    static readonly CATEGORY_SHOW: string = 'categoryShow';
    static readonly CATEGORY_LIST: string = 'categoryList';
    static readonly CATEGORY_DELETE: string = 'categoryDelete';

    // USERS
    static readonly USERS_SAVE: string = 'usersSave';
    static readonly USERS_UPDATE: string = 'usersUpdate';
    static readonly USERS_SHOW: string = 'usersShow';
    static readonly USERS_LIST: string = 'usersList';
    static readonly USERS_DELETE: string = 'usersDelete';
    static readonly USERS_ASSIGN_ROLE: string = 'usersAssignRole';
    static readonly USERS_CHANGE_MY_PASSWORD: string = 'usersChangeMyPassword';
    static readonly USERS_CHANGE_USER_PASSWORD: string = 'usersChangeUserPassword';

    // FILES
    static readonly FILES_UPLOAD: string = 'filesUpload';
    static readonly FILES_UPDATE: string = 'filesUpdate';
    static readonly FILES_DOWNLOAD: string = 'filesDownload';
    static readonly FILES_DELETE: string = 'filesDelete';
    static readonly FILES_LIST: string = 'filesList';
    static readonly FILES_SHOW_METADATA: string = 'filesShowMetadata';

    // ROLES
    static readonly ROLES_SAVE: string = 'rolesSave';
    static readonly ROLES_UPDATE: string = 'rolesUpdate';
    static readonly ROLES_SHOW: string = 'rolesShow';
    static readonly ROLES_LIST: string = 'rolesList';
    static readonly ROLES_DELETE: string = 'rolesDelete';

    static groupPermissions(): IGroupPermission[]
    {
        return [
            {
                group: 'AUTH',
                permissions: [
                    Permissions.AUTH_SYNC_PERMISSIONS,
                    Permissions.GET_PERMISSIONS
                ]
            },
            {
                group: 'ITEMS',
                permissions: [
                    Permissions.ITEMS_SAVE,
                    Permissions.ITEMS_UPDATE,
                    Permissions.ITEMS_SHOW,
                    Permissions.ITEMS_LIST,
                    Permissions.ITEMS_DELETE
                ]
            },
            {
                group: 'PRODUCTS',
                permissions: [
                    Permissions.PRODUCTS_SAVE,
                    Permissions.PRODUCTS_UPDATE,
                    Permissions.PRODUCTS_SHOW,
                    Permissions.PRODUCTS_LIST,
                    Permissions.PRODUCTS_DELETE
                ]
            },
            {
                group: 'CATEGORY',
                permissions: [
                    Permissions.CATEGORY_SAVE,
                    Permissions.CATEGORY_UPDATE,
                    Permissions.CATEGORY_SHOW,
                    Permissions.CATEGORY_LIST,
                    Permissions.CATEGORY_DELETE
                ]
            },
            {
                group: 'USERS',
                permissions: [
                    Permissions.USERS_SAVE,
                    Permissions.USERS_UPDATE,
                    Permissions.USERS_SHOW,
                    Permissions.USERS_LIST,
                    Permissions.USERS_DELETE,
                    Permissions.USERS_ASSIGN_ROLE,
                    Permissions.USERS_CHANGE_MY_PASSWORD,
                    Permissions.USERS_CHANGE_USER_PASSWORD
                ]
            },
            {
                group: 'FILES',
                permissions: [
                    Permissions.FILES_UPLOAD,
                    Permissions.FILES_UPDATE,
                    Permissions.FILES_DELETE,
                    Permissions.FILES_DOWNLOAD,
                    Permissions.FILES_LIST,
                    Permissions.FILES_SHOW_METADATA
                ]
            },
            {
                group: 'ROLES',
                permissions: [
                    Permissions.ROLES_SAVE,
                    Permissions.ROLES_UPDATE,
                    Permissions.ROLES_SHOW,
                    Permissions.ROLES_LIST,
                    Permissions.ROLES_DELETE
                ]
            }
        ];
    }

    static permissions(): string[]
    {
        return Permissions.groupPermissions().reduce((accum, group) => accum.concat(group.permissions), []);
    }
}

export default Permissions;
