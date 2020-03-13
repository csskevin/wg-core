declare class Files {
    writeFile(app_name: string, filepath: string, content: string): any;
    readFile(app_name: string, filepath: string): string | false | null;
    unlinkFile(app_name: string, filepath: string): any;
    mkdir(app_name: string, filepath: string): any;
    rmdir(app_name: string, filepath: string): any;
    getLegitFilePath(app_name: string, relative_filepath: string): string | false;
    __handleError(cb: Function): any;
}
declare const _default: Files;
export default _default;
