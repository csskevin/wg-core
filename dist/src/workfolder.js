"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var WorkFolder = /** @class */ (function () {
    function WorkFolder() {
        this.homedir = '';
        this.app_path = '';
        this.app_config_file = '';
        this.client_config = '';
        this.on_first_install = false;
        var default_homedir = require('os').homedir() + '/.web-glasses';
        this.setHomeDirectory(default_homedir);
    }
    WorkFolder.prototype.setHomeDirectory = function (homedir) {
        this.homedir = homedir;
        this.app_path = this.homedir + '/apps';
        this.app_config_file = this.homedir + '/apps.json';
        this.client_config = this.homedir + '/client.json';
        this.on_first_install = false;
        if (!fs.existsSync(this.homedir)) {
            fs.mkdirSync(this.homedir);
            this.on_first_install = true;
        }
        if (!fs.existsSync(this.app_path)) {
            fs.mkdirSync(this.app_path);
        }
        if (!fs.existsSync(this.app_config_file)) {
            fs.writeFileSync(this.app_config_file, JSON.stringify([]));
        }
        if (!fs.existsSync(this.client_config)) {
            fs.writeFileSync(this.client_config, JSON.stringify({}));
        }
    };
    WorkFolder.prototype.readAppConfig = function () {
        if (fs.existsSync(this.app_config_file)) {
            var content = fs.readFileSync(this.app_config_file).toString();
            try {
                var config = JSON.parse(content);
                return config;
            }
            catch (e) { }
        }
        return [];
    };
    WorkFolder.prototype.writeAppConfig = function (config) {
        try {
            fs.writeFileSync(this.app_config_file, config);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    return WorkFolder;
}());
exports.default = new WorkFolder();
