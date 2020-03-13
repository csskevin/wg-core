import App from "./interfaces/app";
declare class Apps {
    getApps(): Array<App>;
    getAppByProperty(property_name: keyof App, property_value: string): App;
    updateApp(app_id: string, updated_app: App): boolean;
    updateAll(apps: Array<App>): boolean;
    addAppToList(app: App): boolean;
    removeAppFromList(app_id: string): boolean;
    installApp(pathname: string): Promise<Function>;
    uninstallApp(app_name: string): boolean;
}
declare const _default: Apps;
export default _default;
