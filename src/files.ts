import * as fs from "fs";
import WorkFolder from "./workfolder";

/**
 * File management for the applications.
 */
class Files {
    /**
     * Synchronously writes data to a file, replacing the file if it already exists.
     * @param app_name The name of the app, where the file should be written to.
     * @param filepath The relative file path.
     * @param content The new content of the file.
     */
    writeFile(app_name: string, filepath: string, content: string) {
        var legit_path = this.getLegitFilePath(app_name, filepath);
        if (legit_path) {
            return this.__handleError(function (legit_path: string, content: string) {
                fs.writeFileSync(legit_path, content);
            }.bind(this, legit_path, content))
        }
        return false;
    }

    /**
     * Synchronously reads the entire contents of a file.
     * @param app_name The name of the app, where the file should be read of.
     * @param filepath The relative file path.
     */
    readFile(app_name: string, filepath: string) {
        var legit_path = this.getLegitFilePath(app_name, filepath);
        if (legit_path && fs.existsSync(legit_path)) {
            return this.__handleError(function (legit_path: string) {
                fs.readFileSync(legit_path);
            }.bind(this, legit_path))
        }
        return false;
    }

    /**
     * Synchronous unlink - delete a name and possibly the file it refers to.
     * @param app_name The name of the app, where the file should be unlinked of.
     * @param filepath The relative file path.
     */
    unlinkFile(app_name: string, filepath: string) {
        var legit_path = this.getLegitFilePath(app_name, filepath);
        if (legit_path && fs.existsSync(legit_path)) {
            return this.__handleError(function (legit_path: string) {
                fs.unlinkSync(legit_path);
            }.bind(this, legit_path))
        }
        return false;
    }

    /**
     * Synchronous mkdir - create a directory.
     * @param app_name The name of the app, where the directory should be created.
     * @param filepath The relative file path.
     */
    mkdir(app_name: string, filepath: string) {
        var legit_path = this.getLegitFilePath(app_name, filepath);
        if (legit_path) {
            return this.__handleError(function (legit_path: string) {
                fs.mkdirSync(legit_path);
            }.bind(this, legit_path));
        }
        return false;
    }

    /**
     * Synchronous rmdir - delete a directory.
     * @param app_name The name of the app, where the directory should be deleted.
     * @param filepath The relative file path.
     */
    rmdir(app_name: string, filepath: string) {
        var legit_path = this.getLegitFilePath(app_name, filepath);
        if (legit_path) {
            return this.__handleError(function (legit_path: string) {
                fs.rmdirSync(legit_path);
            }.bind(this, legit_path));
        }
        return false;
    }

    /**
     * Checks if the filepath is valid and if the filepath stays within the application's folder.
     * @param app_name The name of the app.
     * @param relative_filepath The relative filepath, which should be modified.
     */
    getLegitFilePath(app_name: string, relative_filepath: string): string | false {
        var filepath = WorkFolder.app_path + "/" + app_name + "/" + relative_filepath;
        var filepath_parts = filepath.split("/");
        var last_filepath_element = filepath_parts.pop();
        var filepath_without_last_element = filepath_parts.join('/');
        var app_path = WorkFolder.app_path + "/" + app_name
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
    }

    /**
     * Executes an callback function and catches an error, if thrown.
     * @param cb The callback function, which will be executed.
     */
    __handleError(cb: Function) {
        try {
            cb();
            return true;
        } catch (e) {
            return e.message;
        }
    }
}

export default new Files();