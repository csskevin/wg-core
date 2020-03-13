"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var workfolder_1 = __importDefault(require("./workfolder"));
var Files = /** @class */ (function () {
    function Files() {
    }
    Files.prototype.writeFile = function (app_name, filepath, content) {
        var legit_path = this.getLegitFilePath(app_name, filepath);
        if (legit_path) {
            return this.__handleError(function (legit_path, content) {
                fs.writeFileSync(legit_path, content);
            }.bind(this, legit_path, content));
        }
        return false;
    };
    Files.prototype.readFile = function (app_name, filepath) {
        var legit_path = this.getLegitFilePath(app_name, filepath);
        if (legit_path) {
            try {
                return legit_path;
            }
            catch (e) {
                return null;
            }
        }
        return false;
    };
    Files.prototype.unlinkFile = function (app_name, filepath) {
        var legit_path = this.getLegitFilePath(app_name, filepath);
        if (legit_path && fs.existsSync(legit_path)) {
            return this.__handleError(function (legit_path) {
                fs.unlinkSync(legit_path);
            }.bind(this, legit_path));
        }
        return false;
    };
    Files.prototype.mkdir = function (app_name, filepath) {
        var legit_path = this.getLegitFilePath(app_name, filepath);
        if (legit_path) {
            return this.__handleError(function (legit_path) {
                fs.mkdirSync(legit_path);
            }.bind(this, legit_path));
        }
        return false;
    };
    Files.prototype.rmdir = function (app_name, filepath) {
        var legit_path = this.getLegitFilePath(app_name, filepath);
        if (legit_path) {
            return this.__handleError(function (legit_path) {
                fs.rmdirSync(legit_path);
            }.bind(this, legit_path));
        }
        return false;
    };
    Files.prototype.getLegitFilePath = function (app_name, relative_filepath) {
        var filepath = workfolder_1.default.app_path + "/" + app_name + "/" + relative_filepath;
        var filepath_parts = filepath.split("/");
        var last_filepath_element = filepath_parts.pop();
        var filepath_without_last_element = filepath_parts.join('/');
        var app_path = workfolder_1.default.app_path + "/" + app_name;
        if (fs.existsSync(app_path) && fs.existsSync(filepath_without_last_element)) {
            var real_app_path = fs.realpathSync(app_path);
            var real_filepath_without_last_element = fs.realpathSync(filepath_without_last_element);
            if (real_filepath_without_last_element.includes(real_app_path)) {
                var full_path = real_filepath_without_last_element + "/" + last_filepath_element;
                if (fs.existsSync(full_path)) {
                    var real_full_path = fs.realpathSync(full_path);
                    // User should not be able to delete his root app folder itself
                    if (real_full_path === real_app_path) {
                        return false;
                    }
                }
                return full_path;
            }
        }
        return false;
    };
    Files.prototype.__handleError = function (cb) {
        try {
            cb();
            return true;
        }
        catch (e) {
            return e.message;
        }
    };
    return Files;
}());
exports.default = new Files();
