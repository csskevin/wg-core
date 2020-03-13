import App from "./interfaces/app";
declare class Permission {
    getPermissions(app_id: string): Array<string>;
    hasSpecificPermission(app_id: string, permission: string): boolean;
    grantPermission(app_id: string, permission: string): boolean;
    revokePermission(app_id: string, permission: string): boolean;
    grantSpecialPermission(app_id: string | false, permission: string): boolean;
    getAppWithSpecialPermission(special_permission: string): App;
    isSpecialApp(app_id: string, special_permission: string): boolean;
}
declare const _default: Permission;
export default _default;
