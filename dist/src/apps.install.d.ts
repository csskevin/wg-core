/// <reference types="node" />
import adm_zip, { IZipEntry } from "adm-zip";
import App from "./interfaces/app";
declare class AppsInstall {
    private user_config;
    installApp(pathname: string): Promise<Function>;
    isValidURL(url: string): boolean;
    installAppByBuffer(app_content: Buffer): string | Error;
    generateAppConfiguration(config_file: IZipEntry): App;
    getUniqueId(): string;
    installAppConfiguration(app_config: App): boolean;
    extractAppContentWithoutConfigurationFile(zip: adm_zip, app_config: App): boolean;
}
declare const _default: AppsInstall;
export default _default;
