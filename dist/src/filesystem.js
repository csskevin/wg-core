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
/**
 * File management for the applications.
 */
var FileSystem = /** @class */ (function () {
    function FileSystem() {
    }
    /**
     * Synchronously tests a user's permissions for the file specified by path.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    FileSystem.prototype.access = function (app_name, path, mode) {
        var legit_path = this.getLegitFilePath(app_name, path);
        if (!!legit_path) {
            try {
                fs.accessSync(legit_path, mode);
                return;
            }
            catch (e) {
                if (e instanceof Error) {
                    return e;
                }
                if (typeof e === 'string') {
                    return new Error(e);
                }
            }
        }
        return new Error("Undefined error");
    };
    ;
    /**
     * Synchronously append data to a file, creating the file if it does not exist.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param file A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
     * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
     * If `encoding` is not supplied, the default of `'utf8'` is used.
     * If `mode` is not supplied, the default of `0o666` is used.
     * If `mode` is a string, it is parsed as an octal integer.
     * If `flag` is not supplied, the default of `'a'` is used.
     */
    FileSystem.prototype.appendFile = function (app_name, file, data, options) {
        var legit_path = this.getLegitFilePath(app_name, file);
        if (!!legit_path) {
            try {
                fs.appendFileSync(legit_path, data, options);
                return;
            }
            catch (e) {
                if (e instanceof Error) {
                    return e;
                }
                if (typeof e === 'string') {
                    return new Error(e);
                }
            }
        }
        return new Error("Undefined error");
    };
    /**
     * Synchronously copies src to dest. By default, dest is overwritten if it already exists.
     * Node.js makes no guarantees about the atomicity of the copy operation.
     * If an error occurs after the destination file has been opened for writing, Node.js will attempt
     * to remove the destination.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param src A path to the source file.
     * @param dest A path to the destination file.
     * @param flags An optional integer that specifies the behavior of the copy operation.
     * The only supported flag is fs.constants.COPYFILE_EXCL, which causes the copy operation to fail if dest already exists.
     */
    FileSystem.prototype.copyFile = function (app_name, src, dest, flags) {
        var src_legit_path = this.getLegitFilePath(app_name, src);
        var dest_legit_path = this.getLegitFilePath(app_name, dest);
        if (!!src_legit_path && !!dest_legit_path) {
            try {
                fs.copyFileSync(src_legit_path, dest_legit_path, flags);
                return;
            }
            catch (e) {
                if (e instanceof Error) {
                    return e;
                }
                if (typeof e === 'string') {
                    return new Error(e);
                }
            }
        }
        return new Error("Undefined error");
    };
    ;
    /**
     * Synchronously tests whether or not the given path exists by checking with the file system.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    FileSystem.prototype.exists = function (app_name, path) {
        var legit_path = this.getLegitFilePath(app_name, path);
        if (!!legit_path) {
            try {
                return fs.existsSync(legit_path);
            }
            catch (e) {
                if (e instanceof Error) {
                    return e;
                }
                if (typeof e === 'string') {
                    return new Error(e);
                }
            }
        }
        return new Error("Undefined error");
    };
    /**
     * Synchronous lstat(2) - Get file status. Does not dereference symbolic links.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    FileSystem.prototype.lstat = function (app_name, path) {
        var legit_path = this.getLegitFilePath(app_name, path);
        if (!!legit_path) {
            try {
                return fs.lstatSync(legit_path);
            }
            catch (e) {
                if (e instanceof Error) {
                    return e;
                }
                if (typeof e === 'string') {
                    return new Error(e);
                }
            }
        }
        return new Error("Undefined error");
    };
    ;
    /**
     * Synchronous mkdir(2) - create a directory.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
     * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
     */
    FileSystem.prototype.mkdir = function (app_name, path, options) {
        var legit_path = this.getLegitFilePath(app_name, path);
        if (!!legit_path) {
            try {
                fs.mkdirSync(legit_path, options);
                return;
            }
            catch (e) {
                if (e instanceof Error) {
                    return e;
                }
                if (typeof e === 'string') {
                    return new Error(e);
                }
            }
        }
        return new Error("Undefined error");
    };
    /**
     * Synchronously reads the entire contents of a file.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
     * If a flag is not provided, it defaults to `'r'`.
     */
    FileSystem.prototype.readFile = function (app_name, path, options) {
        var legit_path = this.getLegitFilePath(app_name, path);
        if (!!legit_path) {
            try {
                return fs.readFileSync(legit_path, options);
            }
            catch (e) {
                if (e instanceof Error) {
                    return e;
                }
                if (typeof e === 'string') {
                    return new Error(e);
                }
            }
        }
        return new Error("Undefined error");
    };
    /**
     * Synchronous readdir(3) - read a directory.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    FileSystem.prototype.readdir = function (app_name, path, options) {
        var legit_path = this.getLegitFilePath(app_name, path);
        if (!!legit_path) {
            try {
                return fs.readdirSync(legit_path, options);
            }
            catch (e) {
                if (e instanceof Error) {
                    return e;
                }
                if (typeof e === 'string') {
                    return new Error(e);
                }
            }
        }
        return new Error("Undefined error");
    };
    ;
    /**
      * Synchronous rename(2) - Change the name or location of a file or directory.
      * @param app_name The name of the app. The app_name will be merged with the path.
      * @param oldPath A path to a file. If a URL is provided, it must use the `file:` protocol.
      * URL support is _experimental_.
      * @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
      * URL support is _experimental_.
      */
    FileSystem.prototype.rename = function (app_name, oldPath, newPath) {
        var legit_old_path = this.getLegitFilePath(app_name, oldPath);
        var legit_new_path = this.getLegitFilePath(app_name, newPath);
        if (!!legit_old_path && !!legit_new_path) {
            try {
                fs.renameSync(legit_old_path, legit_new_path);
                return;
            }
            catch (e) {
                if (e instanceof Error) {
                    return e;
                }
                if (typeof e === 'string') {
                    return new Error(e);
                }
            }
        }
        return new Error("Undefined error");
    };
    /**
     * Synchronous rmdir(2) - delete a directory.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    FileSystem.prototype.rmdir = function (app_name, path, options) {
        var legit_path = this.getLegitFilePath(app_name, path);
        if (!!legit_path) {
            try {
                fs.rmdirSync(legit_path, options);
                return;
            }
            catch (e) {
                if (e instanceof Error) {
                    return e;
                }
                if (typeof e === 'string') {
                    return new Error(e);
                }
            }
        }
        return new Error("Undefined error");
    };
    /**
    *
    * Synchronous stat(2) - Get file status.
    * @param app_name The name of the app. The app_name will be merged with the path.
    * @param path — A path to a file. If a URL is provided, it must use the file: protocol.
    */
    FileSystem.prototype.stat = function (app_name, path, options) {
        var legit_path = this.getLegitFilePath(app_name, path);
        if (!!legit_path) {
            try {
                if (options === undefined) {
                    return fs.statSync(legit_path);
                }
                else {
                    return fs.statSync(legit_path, options);
                }
            }
            catch (e) {
                if (e instanceof Error) {
                    return e;
                }
                if (typeof e === 'string') {
                    return new Error(e);
                }
            }
        }
        return new Error("Undefined error");
    };
    /**
     * Synchronous truncate(2) - Truncate a file to a specified length.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param len If not specified, defaults to `0`.
     */
    FileSystem.prototype.truncate = function (app_name, path, len) {
        var legit_path = this.getLegitFilePath(app_name, path);
        if (!!legit_path) {
            try {
                fs.truncateSync(legit_path, len);
                return;
            }
            catch (e) {
                if (e instanceof Error) {
                    return e;
                }
                if (typeof e === 'string') {
                    return new Error(e);
                }
            }
        }
        return new Error("Undefined error");
    };
    /**
     * Synchronous unlink(2) - delete a name and possibly the file it refers to.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    FileSystem.prototype.unlink = function (app_name, path) {
        var legit_path = this.getLegitFilePath(app_name, path);
        if (!!legit_path) {
            try {
                fs.unlinkSync(legit_path);
                return;
            }
            catch (e) {
                if (e instanceof Error) {
                    return e;
                }
                if (typeof e === 'string') {
                    return new Error(e);
                }
            }
        }
        return new Error("Undefined error");
    };
    /**
     * Synchronously change file timestamps of the file referenced by the supplied path.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param atime The last access time. If a string is provided, it will be coerced to number.
     * @param mtime The last modified time. If a string is provided, it will be coerced to number.
     */
    FileSystem.prototype.utimes = function (app_name, path, atime, mtime) {
        var legit_path = this.getLegitFilePath(app_name, path);
        if (!!legit_path) {
            try {
                fs.utimesSync(legit_path, atime, mtime);
                return;
            }
            catch (e) {
                if (e instanceof Error) {
                    return e;
                }
                if (typeof e === 'string') {
                    return new Error(e);
                }
            }
        }
        return new Error("Undefined error");
    };
    /**
     * Synchronously writes data to a file, replacing the file if it already exists.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
     * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
     * If `encoding` is not supplied, the default of `'utf8'` is used.
     * If `mode` is not supplied, the default of `0o666` is used.
     * If `mode` is a string, it is parsed as an octal integer.
     * If `flag` is not supplied, the default of `'w'` is used.
     */
    FileSystem.prototype.writeFile = function (app_name, path, data, options) {
        var legit_path = this.getLegitFilePath(app_name, path);
        if (!!legit_path) {
            try {
                fs.writeFileSync(legit_path, data, options);
                return;
            }
            catch (e) {
                if (e instanceof Error) {
                    return e;
                }
                if (typeof e === 'string') {
                    return new Error(e);
                }
            }
        }
        return new Error("Undefined error");
    };
    /**
     * Checks if the filepath is valid and if the filepath stays within the application's folder.
     * @param app_name The name of the app.
     * @param relative_filepath The relative filepath, which should be modified.
     */
    FileSystem.prototype.getLegitFilePath = function (app_name, relative_filepath) {
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
    return FileSystem;
}());
exports.default = new FileSystem();
