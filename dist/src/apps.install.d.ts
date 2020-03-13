/// <reference types="node" />
import adm_zip, { IZipEntry } from "adm-zip";
import App from "./interfaces/app";
/**
 * Handles installations of a new application.
 */
declare class AppsInstall {
    private user_config;
    /**
     * Installs an app into the configuration file and extracts the content to the workfolder.
     * @param pathname The full path or a valid URL to the zip archived app.
     */
    installApp(pathname: string): Promise<Function>;
    /**
     * Checks if a given string is a valid URL.
     * @param url The URL to check.
     */
    isValidURL(url: string): boolean;
    /**
     * Installs an application. The app_content must be a buffer of an ZIP archive.
     * @param app_content The app content as buffer.
     */
    installAppByBuffer(app_content: Buffer): string | Error;
    /**
     * Generates an configuration file based on the config located in the ZIP archive.
     * @param config_file The configuration file of the ZIP archive.
     */
    generateAppConfiguration(config_file: IZipEntry): App;
    /**
     * Generates an unique id for the new installed application.
     */
    getUniqueId(): string;
    /**
     * Installs the configuration file of the app into the workfolder.
     * @param app_config A valid app configuration.
     */
    installAppConfiguration(app_config: App): boolean;
    /**
     * Extracts the application of the ZIP archive to a directory. The configuration won't be exported.
     * @param zip The application in form of a ZIP archive.
     * @param app_config The application config.
     */
    extractAppContentWithoutConfigurationFile(zip: adm_zip, app_config: App): boolean;
}
declare const _default: AppsInstall;
export default _default;
