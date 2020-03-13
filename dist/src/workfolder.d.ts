/**
 * Handles the Work Folder.
 */
declare class WorkFolder {
    homedir: string;
    app_path: string;
    app_config_file: string;
    client_config: string;
    on_first_install: boolean;
    constructor();
    /**
     * Sets the new home directory of the project.
     * @param homedir The new home directory of the project.
     */
    setHomeDirectory(homedir: string): void;
    /**
     * Reading the application configuration.
     */
    readAppConfig(): Array<any>;
    /**
     * Writes the new configuration file into the application configuration.
     * @param config The new configuration.
     */
    writeAppConfig(config: string): boolean;
}
declare const _default: WorkFolder;
export default _default;
