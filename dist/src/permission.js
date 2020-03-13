"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Apps_1 = __importDefault(require("./Apps"));
var Permission = /** @class */ (function () {
    function Permission() {
    }
    Permission.prototype.getPermissions = function (app_id) {
        var app = Apps_1.default.getAppByProperty("id", app_id);
        if (app.id !== false) {
            if (Object.keys(app).includes("permissions")) {
                return app.permissions;
            }
        }
        return [];
    };
    Permission.prototype.hasSpecificPermission = function (app_id, permission) {
        var permissions = this.getPermissions(app_id);
        return permissions.includes(permission);
    };
    Permission.prototype.grantPermission = function (app_id, permission) {
        var app = Apps_1.default.getAppByProperty("id", app_id);
        if (app) {
            if (!Object.keys(app).includes("permissions")) {
                app.permissions = [];
            }
            if (!app.permissions.includes(permission)) {
                app.permissions.push(permission);
                Apps_1.default.updateApp(app_id, app);
            }
            return true;
        }
        return false;
    };
    Permission.prototype.revokePermission = function (app_id, permission) {
        var app = Apps_1.default.getAppByProperty("id", app_id);
        if (app) {
            if (!Object.keys(app).includes("permissions")) {
                app.permissions = [];
            }
            if (app.permissions.includes(permission)) {
                app.permissions.splice(app.permissions.indexOf(permission), 1);
                Apps_1.default.updateApp(app_id, app);
            }
            return true;
        }
        return false;
    };
    Permission.prototype.grantSpecialPermission = function (app_id, permission) {
        var apps = Apps_1.default.getApps();
        apps.map(function (app) {
            var index = app.special.indexOf(permission);
            if (index !== -1) {
                app.special.splice(index, 1);
            }
            if (app.id === app_id) {
                app.special.push(permission);
            }
        });
        Apps_1.default.updateAll(apps);
        return true;
    };
    Permission.prototype.getAppWithSpecialPermission = function (special_permission) {
        var apps = Apps_1.default.getApps();
        var found_apps = apps.filter(function (app) { return app.special.includes(special_permission); });
        if (found_apps.length === 1) {
            return found_apps[0];
        }
        return { id: false };
    };
    Permission.prototype.isSpecialApp = function (app_id, special_permission) {
        var app = this.getAppWithSpecialPermission(special_permission);
        return app.id === app_id;
    };
    return Permission;
}());
exports.default = new Permission();
