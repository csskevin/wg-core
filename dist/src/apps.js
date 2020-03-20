"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apps_install_1 = __importDefault(require("./apps.install"));
var fs_1 = __importDefault(require("fs"));
var workfolder_1 = __importDefault(require("./workfolder"));
/**
 * Handles all imported methods for the installed applications.
 */
var Apps = /** @class */ (function () {
    function Apps() {
        /**
         * Holds the functions of the event listeners
         */
        this.listeners = [];
    }
    /**
     * Returns a list of all installed apps.
     */
    Apps.prototype.getApps = function () {
        return workfolder_1.default.readAppConfig();
    };
    /**
     * Filteres an app where the given value matches the value of an installed app.
     * @param property_name The property_name, where the values should be matched against.
     * @param property_value The property_value, which should be matches.
     */
    Apps.prototype.getAppByProperty = function (property_name, property_value) {
        var apps = this.getApps();
        var filtered_app = apps.filter(function (app) { return app[property_name] === property_value; });
        return filtered_app.length === 1 ? filtered_app[0] : { id: false };
    };
    /**
     * Updates an specific app with a new configuration.
     * @param app_id The ID of the application.
     * @param updated_app The new configuration.
     */
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
    /**
     * Updates all application with the given configuration.
     * @param apps The new configuration of all apps.
     */
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
    /**
     * Adds an new application configuration to the application config.
     * @param app The app configuration, which should be added.
     */
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
    /**
     * Removes an specific app filtered by the ID.
     * @param app_id The ID of the app, which should be removed.
     */
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
    /**
     * Installs an app into the configuration file and extracts the content to the workfolder.
     * @param pathname The full path or a valid URL to the zip archived app.
     */
    Apps.prototype.installApp = function (pathname) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            apps_install_1.default.installApp(pathname).then(function (data) {
                _this.fire("install");
                resolve(data);
            }).catch(function (error) { return reject(error); });
        });
    };
    /**
     * Removes an app and deletes it from the configuration file and the workfolder.
     * @param app_name The app_name which should be removed.
     */
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
            this.fire("uninstall");
            return true;
        }
        return false;
    };
    Apps.prototype.on = function (event, callback) {
        this.listeners.push({ event: event, callback: callback });
    };
    Apps.prototype.off = function (event, callback) {
        this.listeners = this.listeners.filter(function (item) { return item.event !== event && item.callback !== callback; });
    };
    Apps.prototype.fire = function (event) {
        this.listeners.filter(function (listener) { return listener.event === event; }).forEach(function (listener) { return listener.callback(); });
    };
    return Apps;
}());
exports.default = new Apps();
