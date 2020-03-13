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
var AppsInstall = /** @class */ (function () {
    function AppsInstall() {
        this.user_config = "wg-app.json";
    }
    AppsInstall.prototype.installApp = function (pathname) {
        return new Promise(function (resolve, reject) {
            if (fs_1.default.existsSync(pathname)) {
                try {
                    var content = fs_1.default.readFileSync(pathname);
                    var id = this.installAppByBuffer(content);
                    resolve(id);
                }
                catch (e) {
                    reject(e);
                }
            }
            else if (this.isValidURL(pathname)) {
                axios_1.default.get(pathname).then(function (response) {
                    var id = this.installAppByBuffer(Buffer.from(response.data));
                    resolve(id);
                }.bind(this));
            }
            else {
                reject("Invalid Install path!");
            }
        }.bind(this));
    };
    AppsInstall.prototype.isValidURL = function (url) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(url);
    };
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
    AppsInstall.prototype.getUniqueId = function () {
        var app_ids = apps_1.default.getApps().map(function (app) { return app.id; });
        var unique_id = "";
        do {
            unique_id = crypto_1.default.randomBytes(20).toString('hex');
        } while (app_ids.includes(unique_id));
        return unique_id;
    };
    AppsInstall.prototype.installAppConfiguration = function (app_config) {
        if (apps_1.default.getAppByProperty("package_name", app_config.package_name).id == false &&
            app_config.id !== false &&
            /^[a-z-\.]+$/.test(app_config.package_name)) {
            return apps_1.default.addAppToList(app_config);
        }
        return false;
    };
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
