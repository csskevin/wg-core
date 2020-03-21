"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var adm_zip_1 = __importDefault(require("adm-zip"));
var apps_1 = __importDefault(require("./apps"));
var axios_1 = __importDefault(require("axios"));
var crypto_1 = __importDefault(require("crypto"));
var fs_1 = __importDefault(require("fs"));
var workfolder_1 = __importDefault(require("./workfolder"));
// Telling axios to use the internal HTTP module.
axios_1.default.defaults.adapter = require("axios/lib/adapters/http");
/**
 * Handles installations of a new application.
 */
var AppsInstall = /** @class */ (function () {
    function AppsInstall() {
        this.user_config = "wg-app.json";
    }
    /**
     * Returns the file content of a specific local path.
     * @param pathname The pathname, where the content should be read.
     */
    AppsInstall.prototype.getFileContent = function (pathname) {
        var content = fs_1.default.readFileSync(pathname);
        return content;
    };
    /**
     * Returns the file content of a URI.
     * @param pathname The pathname, where the content should be read.
     */
    AppsInstall.prototype.getURIContent = function (pathname) {
        return new Promise(function (resolve, reject) {
            axios_1.default.get(pathname, {
                responseType: "arraybuffer"
            }).then(function (response) {
                var content = Buffer.from(response.data);
                resolve(content);
            }).catch(function (error) { return reject(error); });
        });
    };
    /**
     * Installs an app into the configuration file and extracts the content to the workfolder.
     * @param pathname The full path or a valid URL to the zip archived app.
     */
    AppsInstall.prototype.installApp = function (pathname) {
        return new Promise(function (resolve, reject) {
            var _this = this;
            if (fs_1.default.existsSync(pathname)) {
                try {
                    var content = this.getFileContent(pathname);
                    var id = this.installAppByBuffer(content);
                    resolve(id);
                }
                catch (e) {
                    reject(e);
                }
            }
            else if (this.isValidURL(pathname)) {
                this.getURIContent(pathname).then(function (content) {
                    var id = _this.installAppByBuffer(content);
                    resolve(id);
                }).catch(function (error) { return reject(error); });
            }
            else {
                reject("Invalid Install path!");
            }
        }.bind(this));
    };
    /**
     * Checks if a given string is a valid URL.
     * @param url The URL to check.
     */
    AppsInstall.prototype.isValidURL = function (url) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(url);
    };
    /**
     * Installs an application. The app_content must be a buffer of an ZIP archive.
     * @param app_content The app content as buffer.
     */
    AppsInstall.prototype.installAppByBuffer = function (app_content) {
        var _this = this;
        try {
            var zip = new adm_zip_1.default(app_content);
            var entries = zip.getEntries();
            var configuration_file = entries.filter(function (entry) { return entry.entryName === _this.user_config; });
            if (configuration_file.length === 0) {
                throw new Error("No wg-app.json configuration found!");
            }
            var generated_app_config = this.generateAppConfiguration(configuration_file[0]);
            if (generated_app_config.id === false) {
                throw new Error("Invalid ID generated!");
            }
            var is_app_installed = this.installAppConfiguration(generated_app_config);
            if (is_app_installed) {
                var extraction = this.extractAppContentWithoutConfigurationFile(zip, generated_app_config);
                if (extraction) {
                    return generated_app_config.id;
                }
                else {
                    apps_1.default.removeAppFromList(generated_app_config.id);
                    throw new Error("Could not extract app contents. Process aborted.");
                }
            }
            else {
                throw new Error("Could not install App Configuration");
            }
        }
        catch (e) {
            return e;
        }
    };
    /**
     * Generates an configuration file based on the config located in the ZIP archive.
     * @param config_file The configuration file of the ZIP archive.
     */
    AppsInstall.prototype.generateAppConfiguration = function (config_file) {
        try {
            var raw_config_content = config_file.getData().toString();
            var file_config = JSON.parse(raw_config_content);
            var app_config = {};
            app_config.id = this.getUniqueId();
            app_config.permissions = [];
            app_config.special = [];
            app_config.package_name = file_config.package_name || false;
            app_config.title = file_config.title;
            app_config.description = file_config.description;
            app_config.entry = file_config.entry || '.';
            return app_config;
        }
        catch (e) {
            return e;
        }
    };
    /**
     * Generates an unique id for the new installed application.
     */
    AppsInstall.prototype.getUniqueId = function () {
        var app_ids = apps_1.default.getApps().map(function (app) { return app.id; });
        var unique_id = "";
        do {
            unique_id = crypto_1.default.randomBytes(20).toString('hex');
        } while (app_ids.includes(unique_id));
        return unique_id;
    };
    /**
     * Installs the configuration file of the app into the workfolder.
     * @param app_config A valid app configuration.
     */
    AppsInstall.prototype.installAppConfiguration = function (app_config) {
        if (apps_1.default.getAppByProperty("package_name", app_config.package_name).id == false &&
            app_config.id !== false &&
            /^[a-z-\.]+$/.test(app_config.package_name)) {
            return apps_1.default.addAppToList(app_config);
        }
        return false;
    };
    /**
     * Extracts the application of the ZIP archive to a directory. The configuration won't be exported.
     * @param zip The application in form of a ZIP archive.
     * @param app_config The application config.
     */
    AppsInstall.prototype.extractAppContentWithoutConfigurationFile = function (zip, app_config) {
        zip.deleteFile(this.user_config);
        try {
            zip.extractAllTo(workfolder_1.default.app_path + "/" + app_config.package_name);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    return AppsInstall;
}());
exports.default = new AppsInstall();
