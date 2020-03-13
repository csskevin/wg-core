"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apps_install_1 = __importDefault(require("./apps.install"));
var fs_1 = __importDefault(require("fs"));
var workfolder_1 = __importDefault(require("./workfolder"));
var Apps = /** @class */ (function () {
    function Apps() {
    }
    Apps.prototype.getApps = function () {
        return workfolder_1.default.readAppConfig();
    };
    Apps.prototype.getAppByProperty = function (property_name, property_value) {
        var apps = this.getApps();
        var filtered_app = apps.filter(function (app) { return app[property_name] === property_value; });
        return filtered_app.length === 1 ? filtered_app[0] : { id: false };
    };
    Apps.prototype.updateApp = function (app_id, updated_app) {
        if (fs_1.default.existsSync(workfolder_1.default.app_config_file)) {
            try {
                var apps = this.getApps();
                var updated_apps = apps.map(function (app) { return app.id === app_id ? updated_app : app; });
                var raw_app_list = JSON.stringify(updated_apps, null, 3);
                workfolder_1.default.writeAppConfig(raw_app_list);
                return true;
            }
            catch (e) {
                return false;
            }
        }
        return false;
    };
    Apps.prototype.updateAll = function (apps) {
        if (fs_1.default.existsSync(workfolder_1.default.app_config_file)) {
            try {
                var raw_app_list = JSON.stringify(apps, null, 3);
                workfolder_1.default.writeAppConfig(raw_app_list);
                return true;
            }
            catch (e) {
                return false;
            }
        }
        return false;
    };
    Apps.prototype.addAppToList = function (app) {
        if (fs_1.default.existsSync(workfolder_1.default.app_config_file)) {
            try {
                var apps = this.getApps();
                apps.push(app);
                var raw_app_list = JSON.stringify(apps, null, 3);
                workfolder_1.default.writeAppConfig(raw_app_list);
                return true;
            }
            catch (e) {
                return false;
            }
        }
        return false;
    };
    Apps.prototype.removeAppFromList = function (app_id) {
        if (fs_1.default.existsSync(workfolder_1.default.app_config_file)) {
            try {
                var apps = this.getApps();
                var updated_apps = apps.filter(function (app) { return app.id !== app_id; });
                var raw_app_list = JSON.stringify(updated_apps, null, 3);
                workfolder_1.default.writeAppConfig(raw_app_list);
                return true;
            }
            catch (e) {
                return false;
            }
        }
        return false;
    };
    Apps.prototype.installApp = function (pathname) {
        return apps_install_1.default.installApp(pathname);
    };
    Apps.prototype.uninstallApp = function (app_name) {
        var app_path = workfolder_1.default.app_path + '/' + app_name;
        if (fs_1.default.existsSync(app_path)) {
            // Unlink app content
            var full_app_path = fs_1.default.realpathSync(app_path);
            var lignator = require("lignator");
            lignator.remove(full_app_path);
            // Remove app from configuration list
            var apps = this.getApps();
            var new_apps = apps.filter(function (app) { return app.package_name !== app_name; });
            var raw_new_apps = JSON.stringify(new_apps, null, 3);
            workfolder_1.default.writeAppConfig(raw_new_apps);
            return true;
        }
        return false;
    };
    return Apps;
}());
exports.default = new Apps();
