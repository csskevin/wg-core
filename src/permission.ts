import Apps from "./Apps";
import App from "./interfaces/app";

/**
 * Permission system for the applications.
 */
class Permission {
    /**
     * Reads all permissions of an application given by the ID.
     * @param app_id The ID of the application.
     */
    getPermissions(app_id: string): Array<string> {
        const app: App = Apps.getAppByProperty("id", app_id);
        if (app.id !== false) {
            if (Object.keys(app).includes("permissions")) {
                return app.permissions;
            }
        }
        return [];
    }

    /**
     * Checks if an application has a specific permission.
     * @param app_id The ID of the application.
     * @param permission The specific permission.
     */
    hasSpecificPermission(app_id: string, permission: string): boolean {
        const permissions = this.getPermissions(app_id);
        return permissions.includes(permission);
    }

    /**
     * Grants an application a permission.
     * @param app_id The ID of the application.
     * @param permission The permission, which should be granted.
     */
    grantPermission(app_id: string, permission: string): boolean {
        const app = Apps.getAppByProperty("id", app_id);
        if (app) {
            if (!Object.keys(app).includes("permissions")) { app.permissions = []; }
            if (!app.permissions.includes(permission)) {
                app.permissions.push(permission);
                Apps.updateApp(app_id, app);
            }
            return true;
        }
        return false;
    }

    /**
     * Revokes an application a permission.
     * @param app_id The ID of the application.
     * @param permission The permission, which should be revoked.
     */
    revokePermission(app_id: string, permission: string): boolean {
        const app = Apps.getAppByProperty("id", app_id);
        if (app) {
            if (!Object.keys(app).includes("permissions")) { app.permissions = []; }
            if (app.permissions.includes(permission)) {
                app.permissions.splice(app.permissions.indexOf(permission), 1);
                Apps.updateApp(app_id, app);
            }
            return true;
        }
        return false;
    }

    /**
     * Grants a special permission to an application. ONLY one application can have a special permission at once.
     * @param app_id The ID of the application.
     * @param permission The special permission, which should be granted.
     */
    grantSpecialPermission(app_id: string | false, permission: string): boolean {
        const apps = Apps.getApps();
        apps.map(function (app) {
            let index = app.special.indexOf(permission);
            if (index !== -1) {
                app.special.splice(index, 1);
            }
            if (app.id === app_id) {
                app.special.push(permission);
            }
        });
        Apps.updateAll(apps);
        return true;
    }

    /**
     * Returns the application, which has an special permission.
     * @param special_permission The special permission, which should be filtered.
     */
    getAppWithSpecialPermission(special_permission: string): App {
        const apps = Apps.getApps();
        const found_apps = apps.filter(app => app.special.includes(special_permission));
        if (found_apps.length === 1) {
            return found_apps[0];
        }
        return <App>{id: false};
    }

    /**
     * Checks if an application has a specific special permission.
     * @param app_id The ID of the application.
     * @param special_permission The special permission, which should be checked against.
     */
    isSpecialApp(app_id: string, special_permission: string): boolean {
        const app = this.getAppWithSpecialPermission(special_permission);
        return app.id === app_id;
    }
}

export default new Permission();