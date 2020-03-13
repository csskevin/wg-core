import App from "./interfaces/app";
import AppInstall from "./apps.install";
import fs from "fs";
import WorkFolder from "./workfolder";

/**
 * Handles all imported methods for the installed applications.
 */
class Apps {
    /**
     * Returns a list of all installed apps.
     */
    getApps(): Array<App> {
        return WorkFolder.readAppConfig();
    }

    /**
     * Filteres an app where the given value matches the value of an installed app.
     * @param property_name The property_name, where the values should be matched against.
     * @param property_value The property_value, which should be matches.
     */
    getAppByProperty(property_name: keyof App, property_value: string): App {
        const apps: Array<App> = this.getApps();
        const filtered_app: Array<App> = apps.filter(app => app[property_name] === property_value);
        return filtered_app.length === 1 ? filtered_app[0] : <App>{id: false};
    }

    /**
     * Updates an specific app with a new configuration.
     * @param app_id The ID of the application.
     * @param updated_app The new configuration.
     */
    updateApp(app_id: string, updated_app: App): boolean {
        if (fs.existsSync(WorkFolder.app_config_file)) {
            try {
                const apps: Array<App> = this.getApps();
                const updated_apps: Array<App> = apps.map(app => app.id === app_id ? updated_app : app);
                const raw_app_list: string = JSON.stringify(updated_apps, null, 3);
                WorkFolder.writeAppConfig(raw_app_list);
                return true;
            }
            catch (e) {
                return false;
            }
        }
        return false;
    }

    /**
     * Updates all application with the given configuration.
     * @param apps The new configuration of all apps.
     */
    updateAll(apps: Array<App>): boolean {
        if (fs.existsSync(WorkFolder.app_config_file)) {
            try {
                const raw_app_list: string = JSON.stringify(apps, null, 3);
                WorkFolder.writeAppConfig(raw_app_list);
                return true;
            }
            catch (e) {
                return false;
            }
        }
        return false;
    }

    /**
     * Adds an new application configuration to the application config.
     * @param app The app configuration, which should be added.
     */
    addAppToList(app: App): boolean {
        if (fs.existsSync(WorkFolder.app_config_file)) {
            try {
                const apps: Array<App> = this.getApps();
                apps.push(app);
                const raw_app_list: string = JSON.stringify(apps, null, 3);
                WorkFolder.writeAppConfig(raw_app_list);
                return true;
            }
            catch (e) {
                return false;
            }
        }
        return false;
    }

    /**
     * Removes an specific app filtered by the ID.
     * @param app_id The ID of the app, which should be removed.
     */
    removeAppFromList(app_id: string): boolean {
        if (fs.existsSync(WorkFolder.app_config_file)) {
            try {
                const apps: Array<App> = this.getApps();
                const updated_apps = apps.filter(app => app.id !== app_id);
                const raw_app_list: string = JSON.stringify(updated_apps, null, 3);
                WorkFolder.writeAppConfig(raw_app_list);
                return true;
            }
            catch (e) {
                return false;
            }
        }
        return false;
    }

    /**
     * Installs an app into the configuration file and extracts the content to the workfolder.
     * @param pathname The full path or a valid URL to the zip archived app.
     */
    installApp(pathname: string): Promise<Function> {
        return AppInstall.installApp(pathname);
    }

    /**
     * Removes an app and deletes it from the configuration file and the workfolder.
     * @param app_name The app_name which should be removed.
     */
    uninstallApp(app_name: string) {
        const app_path = WorkFolder.app_path + '/' + app_name;
        if (fs.existsSync(app_path)) {
            // Unlink app content
            const full_app_path = fs.realpathSync(app_path);
            const lignator = require("lignator");
            lignator.remove(full_app_path);
            // Remove app from configuration list
            const apps = this.getApps();
            const new_apps = apps.filter(app => app.package_name !== app_name);
            const raw_new_apps = JSON.stringify(new_apps, null, 3);
            WorkFolder.writeAppConfig(raw_new_apps);
            return true;
        }
        return false;
    }
}

export default new Apps();