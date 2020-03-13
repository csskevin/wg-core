declare class WorkFolder {
    homedir: string;
    app_path: string;
    app_config_file: string;
    client_config: string;
    on_first_install: boolean;
    constructor();
    setHomeDirectory(homedir: string): void;
    readAppConfig(): Array<any>;
    writeAppConfig(config: string): boolean;
}
declare const _default: WorkFolder;
export default _default;
