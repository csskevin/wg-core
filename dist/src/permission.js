"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apps_1 = __importDefault(require("./apps"));
/**
 * Permission system for the applications.
 */
var Permission = /** @class */ (function () {
    function Permission() {
    }
    /**
     * Reads all permissions of an application given by the ID.
     * @param app_id The ID of the application.
     */
    Permission.prototype.getPermissions = function (app_id) {
        var app = apps_1.default.getAppByProperty("id", app_id);
        if (app.id !== false) {
            if (Object.keys(app).includes("permissions")) {
                return app.permissions;
            }
        }
        return [];
    };
    /**
     * Checks if an application has a specific permission.
     * @param app_id The ID of the application.
     * @param permission The specific permission.
     */
    Permission.prototype.hasSpecificPermission = function (app_id, permission) {
        var permissions = this.getPermissions(app_id);
        return permissions.includes(permission);
    };
    /**
     * Grants an application a permission.
     * @param app_id The ID of the application.
     * @param permission The permission, which should be granted.
     */
    Permission.prototype.grantPermission = function (app_id, permission) {
        var app = apps_1.default.getAppByProperty("id", app_id);
        if (app) {
            if (!Object.keys(app).includes("permissions")) {
                app.permissions = [];
            }
            if (!app.permissions.includes(permission)) {
                app.permissions.push(permission);
                apps_1.default.updateApp(app_id, app);
            }
            return true;
        }
        return false;
    };
    /**
     * Revokes an application a permission.
     * @param app_id The ID of the application.
     * @param permission The permission, which should be revoked.
     */
    Permission.prototype.revokePermission = function (app_id, permission) {
        var app = apps_1.default.getAppByProperty("id", app_id);
        if (app) {
            if (!Object.keys(app).includes("permissions")) {
                app.permissions = [];
            }
            if (app.permissions.includes(permission)) {
                app.permissions.splice(app.permissions.indexOf(permission), 1);
                apps_1.default.updateApp(app_id, app);
            }
            return true;
        }
        return false;
    };
    /**
     * Grants a special permission to an application. ONLY one application can have a special permission at once.
     * @param app_id The ID of the application.
     * @param permission The special permission, which should be granted.
     */
    Permission.prototype.grantSpecialPermission = function (app_id, permission) {
        var apps = apps_1.default.getApps();
        apps.map(function (app) {
            var index = app.special.indexOf(permission);
            if (index !== -1) {
                app.special.splice(index, 1);
            }
            if (app.id === app_id) {
                app.special.push(permission);
            }
        });
        apps_1.default.updateAll(apps);
        return true;
    };
    /**
     * Returns the application, which has an special permission.
     * @param special_permission The special permission, which should be filtered.
     */
    Permission.prototype.getAppWithSpecialPermission = function (special_permission) {
        var apps = apps_1.default.getApps();
        var found_apps = apps.filter(function (app) { return app.special.includes(special_permission); });
        if (found_apps.length === 1) {
            return found_apps[0];
        }
        return { id: false };
    };
    /**
     * Checks if an application has a specific special permission.
     * @param app_id The ID of the application.
     * @param special_permission The special permission, which should be checked against.
     */
    Permission.prototype.isSpecialApp = function (app_id, special_permission) {
        var app = this.getAppWithSpecialPermission(special_permission);
        return app.id === app_id;
    };
    return Permission;
}());
exports.default = new Permission();
