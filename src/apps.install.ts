import adm_zip, { IZipEntry } from "adm-zip";
import App from "./interfaces/app";
import Apps from "./apps";
import Axios, { AxiosResponse } from "axios";
import crypto from "crypto";
import fs from "fs";
import WorkFolder from "./workfolder";

// Telling axios to use the internal HTTP module.
Axios.defaults.adapter = require("axios/lib/adapters/http");

/**
 * Handles installations of a new application.
 */
class AppsInstall {
    private user_config = "wg-app.json";

    /**
     * Returns the file content of a specific local path.
     * @param pathname The pathname, where the content should be read.
     */
    getFileContent(pathname: string): Buffer {
        const content = fs.readFileSync(pathname);
        return content;
    }

    /**
     * Returns the file content of a URI.
     * @param pathname The pathname, where the content should be read.
     */
    getURIContent(pathname: string): Promise<Function> {
        return new Promise((resolve: Function, reject: Function) => {
            Axios.get(
                pathname,
                {
                    responseType: "arraybuffer"
                }
            ).then((response: AxiosResponse) => {
                const content = Buffer.from(response.data);
                resolve(content);
            }).catch(error => reject(error));
        });
    }

    /**
     * Installs an app into the configuration file and extracts the content to the workfolder.
     * @param pathname The full path or a valid URL to the zip archived app.
     */
    installApp(pathname: string): Promise<Function> {
        return new Promise(function (this: AppsInstall, resolve: Function, reject: Function) {
            if (fs.existsSync(pathname)) {
                try {
                    const content = this.getFileContent(pathname);
                    const id = this.installAppByBuffer(content);
                    resolve(id);
                }
                catch (e) {
                    reject(e);
                }
            }
            else if (this.isValidURL(pathname)) {
                this.getURIContent(pathname).then((content: any) => {
                    const id = this.installAppByBuffer(content);
                    resolve(id);
                }).catch(error => reject(error));
            }
            else {
                reject("Invalid Install path!");
            }
        }.bind(this));
    }

    /**
     * Checks if a given string is a valid URL.
     * @param url The URL to check.
     */
    isValidURL(url: string): boolean {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(url);
    }

    /**
     * Installs an application. The app_content must be a buffer of an ZIP archive.
     * @param app_content The app content as buffer.
     */
    installAppByBuffer(app_content: Buffer): string | Error {
        try {
            const zip = new adm_zip(app_content);
            const entries = zip.getEntries();
            const configuration_file = entries.filter(entry => entry.entryName === this.user_config);
            if (configuration_file.length === 0) { throw new Error("No wg-app.json configuration found!"); }
            const generated_app_config = this.generateAppConfiguration(configuration_file[0]);
            if (generated_app_config.id === false) { throw new Error("Invalid ID generated!"); }
            const is_app_installed = this.installAppConfiguration(generated_app_config);
            if (is_app_installed) {
                const extraction = this.extractAppContentWithoutConfigurationFile(zip, generated_app_config);
                if (extraction) {
                    return generated_app_config.id;
                }
                else {
                    Apps.removeAppFromList(generated_app_config.id);
                    throw new Error("Could not extract app contents. Process aborted.");
                }
            }
            else {
                throw new Error("Could not install App Configuration");
            }

        }
        catch (e) {
            return e;
        }
    }

    /**
     * Generates an configuration file based on the config located in the ZIP archive.
     * @param config_file The configuration file of the ZIP archive.
     */
    generateAppConfiguration(config_file: IZipEntry): App {
        try {
            const raw_config_content = config_file.getData().toString();
            const file_config: any = JSON.parse(raw_config_content);

            let app_config = <App>{};
            app_config.id = this.getUniqueId();
            app_config.permissions = [];
            app_config.special = [];
            app_config.package_name = file_config.package_name || false;
            app_config.title = file_config.title;
            app_config.description = file_config.description;
            app_config.entry = file_config.entry || '.';

            return app_config;
        }
        catch (e) {
            return e;
        }
    }

    /**
     * Generates an unique id for the new installed application.
     */
    getUniqueId(): string {
        const app_ids = Apps.getApps().map(app => app.id);
        let unique_id = "";
        do {
            unique_id = crypto.randomBytes(20).toString('hex');
        } while (app_ids.includes(unique_id))
        return unique_id;
    }

    /**
     * Installs the configuration file of the app into the workfolder.
     * @param app_config A valid app configuration.
     */
    installAppConfiguration(app_config: App): boolean {
        if (
            Apps.getAppByProperty("package_name", app_config.package_name).id == false &&
            app_config.id !== false &&
            /^[a-z-\.]+$/.test(app_config.package_name)
        ) {
            return Apps.addAppToList(app_config);
        }
        return false;
    }

    /**
     * Extracts the application of the ZIP archive to a directory. The configuration won't be exported.
     * @param zip The application in form of a ZIP archive.
     * @param app_config The application config.
     */
    extractAppContentWithoutConfigurationFile(zip: adm_zip, app_config: App): boolean {
        zip.deleteFile(this.user_config);
        try {
            zip.extractAllTo(WorkFolder.app_path + "/" + app_config.package_name);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}

export default new AppsInstall();