/// <reference types="node" />
import * as fs from "fs";
/**
 * File management for the applications.
 */
declare class FileSystem {
    /**
     * Synchronously tests a user's permissions for the file specified by path.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    access(app_name: string, path: string, mode?: number): void | Error;
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
    appendFile(app_name: string, file: string, data: any, options?: fs.WriteFileOptions): void | Error;
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
    copyFile(app_name: string, src: string, dest: string, flags?: number): void | Error;
    /**
     * Synchronously tests whether or not the given path exists by checking with the file system.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    exists(app_name: string, path: string): boolean | Error;
    /**
     * Synchronous lstat(2) - Get file status. Does not dereference symbolic links.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    lstat(app_name: string, path: string): fs.Stats | Error;
    /**
     * Synchronous mkdir(2) - create a directory.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
     * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
     */
    mkdir(app_name: string, path: string, options?: number | string | fs.MakeDirectoryOptions | null): void | Error;
    /**
     * Synchronously reads the entire contents of a file.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
     * If a flag is not provided, it defaults to `'r'`.
     */
    readFile(app_name: string, path: string, options?: {
        encoding?: string | null;
        flag?: string;
    } | string | null): string | Buffer | Error;
    /**
     * Synchronous readdir(3) - read a directory.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    readdir(app_name: string, path: string, options?: {
        encoding?: BufferEncoding | string | null;
        withFileTypes?: false;
    } | string | null | BufferEncoding): string[] | Buffer[] | Error;
    /**
      * Synchronous rename(2) - Change the name or location of a file or directory.
      * @param app_name The name of the app. The app_name will be merged with the path.
      * @param oldPath A path to a file. If a URL is provided, it must use the `file:` protocol.
      * URL support is _experimental_.
      * @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
      * URL support is _experimental_.
      */
    rename(app_name: string, oldPath: string, newPath: string): void | Error;
    /**
     * Synchronous rmdir(2) - delete a directory.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    rmdir(app_name: string, path: string, options?: fs.RmDirOptions): void | Error;
    /**
    *
    * Synchronous stat(2) - Get file status.
    * @param app_name The name of the app. The app_name will be merged with the path.
    * @param path — A path to a file. If a URL is provided, it must use the file: protocol.
    */
    stat(app_name: string, path: string, options?: fs.BigIntOptions | fs.StatOptions): fs.Stats | fs.BigIntStats | Error;
    /**
     * Synchronous truncate(2) - Truncate a file to a specified length.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param len If not specified, defaults to `0`.
     */
    truncate(app_name: string, path: string, len?: number | null): void | Error;
    /**
     * Synchronous unlink(2) - delete a name and possibly the file it refers to.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    unlink(app_name: string, path: string): void | Error;
    /**
     * Synchronously change file timestamps of the file referenced by the supplied path.
     * @param app_name The name of the app. The app_name will be merged with the path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param atime The last access time. If a string is provided, it will be coerced to number.
     * @param mtime The last modified time. If a string is provided, it will be coerced to number.
     */
    utimes(app_name: string, path: string, atime: string | number | Date, mtime: string | number | Date): void | Error;
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
    writeFile(app_name: string, path: string, data: any, options?: fs.WriteFileOptions): void | Error;
    /**
     * Checks if the filepath is valid and if the filepath stays within the application's folder.
     * @param app_name The name of the app.
     * @param relative_filepath The relative filepath, which should be modified.
     */
    getLegitFilePath(app_name: string, relative_filepath: string): string | false;
}
declare const _default: FileSystem;
export default _default;
