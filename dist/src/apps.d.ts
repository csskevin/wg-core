import App from "./interfaces/app";
/**
 * Handles all imported methods for the installed applications.
 */
declare class Apps {
    /**
     * Holds the functions of the event listeners
     */
    private listeners;
    /**
     * Returns a list of all installed apps.
     */
    getApps(): Array<App>;
    /**
     * Filteres an app where the given value matches the value of an installed app.
     * @param property_name The property_name, where the values should be matched against.
     * @param property_value The property_value, which should be matches.
     */
    getAppByProperty(property_name: keyof App, property_value: string): App;
    /**
     * Updates an specific app with a new configuration.
     * @param app_id The ID of the application.
     * @param updated_app The new configuration.
     */
    updateApp(app_id: string, updated_app: App): boolean;
    /**
     * Updates all application with the given configuration.
     * @param apps The new configuration of all apps.
     */
    updateAll(apps: Array<App>): boolean;
    /**
     * Adds an new application configuration to the application config.
     * @param app The app configuration, which should be added.
     */
    addAppToList(app: App): boolean;
    /**
     * Removes an specific app filtered by the ID.
     * @param app_id The ID of the app, which should be removed.
     */
    removeAppFromList(app_id: string): boolean;
    /**
     * Installs an app into the configuration file and extracts the content to the workfolder.
     * @param pathname The full path or a valid URL to the zip archived app.
     */
    installApp(pathname: string): Promise<Function>;
    /**
     * Removes an app and deletes it from the configuration file and the workfolder.
     * @param app_name The app_name which should be removed.
     */
    uninstallApp(app_name: string): boolean;
    on(event: "install" | "uninstall", callback: Function): void;
    off(event: "install" | "uninstall", callback: Function): void;
    private fire;
}
declare const _default: Apps;
export default _default;
