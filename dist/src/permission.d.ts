import App from "./interfaces/app";
/**
 * Permission system for the applications.
 */
declare class Permission {
    /**
     * Reads all permissions of an application given by the ID.
     * @param app_id The ID of the application.
     */
    getPermissions(app_id: string): Array<string>;
    /**
     * Checks if an application has a specific permission.
     * @param app_id The ID of the application.
     * @param permission The specific permission.
     */
    hasSpecificPermission(app_id: string, permission: string): boolean;
    /**
     * Grants an application a permission.
     * @param app_id The ID of the application.
     * @param permission The permission, which should be granted.
     */
    grantPermission(app_id: string, permission: string): boolean;
    /**
     * Revokes an application a permission.
     * @param app_id The ID of the application.
     * @param permission The permission, which should be revoked.
     */
    revokePermission(app_id: string, permission: string): boolean;
    /**
     * Grants a special permission to an application. ONLY one application can have a special permission at once.
     * @param app_id The ID of the application.
     * @param permission The special permission, which should be granted.
     */
    grantSpecialPermission(app_id: string | false, permission: string): boolean;
    /**
     * Returns the application, which has an special permission.
     * @param special_permission The special permission, which should be filtered.
     */
    getAppWithSpecialPermission(special_permission: string): App;
    /**
     * Checks if an application has a specific special permission.
     * @param app_id The ID of the application.
     * @param special_permission The special permission, which should be checked against.
     */
    isSpecialApp(app_id: string, special_permission: string): boolean;
}
declare const _default: Permission;
export default _default;
