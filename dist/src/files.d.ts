/**
 * File management for the applications.
 */
declare class Files {
    /**
     * Synchronously writes data to a file, replacing the file if it already exists.
     * @param app_name The name of the app, where the file should be written to.
     * @param filepath The relative file path.
     * @param content The new content of the file.
     */
    writeFile(app_name: string, filepath: string, content: string): any;
    /**
     * Synchronously reads the entire contents of a file.
     * @param app_name The name of the app, where the file should be read of.
     * @param filepath The relative file path.
     */
    readFile(app_name: string, filepath: string): any;
    /**
     * Synchronous unlink - delete a name and possibly the file it refers to.
     * @param app_name The name of the app, where the file should be unlinked of.
     * @param filepath The relative file path.
     */
    unlinkFile(app_name: string, filepath: string): any;
    /**
     * Synchronous mkdir - create a directory.
     * @param app_name The name of the app, where the directory should be created.
     * @param filepath The relative file path.
     */
    mkdir(app_name: string, filepath: string): any;
    /**
     * Synchronous rmdir - delete a directory.
     * @param app_name The name of the app, where the directory should be deleted.
     * @param filepath The relative file path.
     */
    rmdir(app_name: string, filepath: string): any;
    /**
     * Checks if the filepath is valid and if the filepath stays within the application's folder.
     * @param app_name The name of the app.
     * @param relative_filepath The relative filepath, which should be modified.
     */
    getLegitFilePath(app_name: string, relative_filepath: string): string | false;
    /**
     * Executes an callback function and catches an error, if thrown.
     * @param cb The callback function, which will be executed.
     */
    __handleError(cb: Function): any;
}
declare const _default: Files;
export default _default;
