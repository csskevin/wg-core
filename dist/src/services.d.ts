import Service from "./interfaces/service";
declare class Services {
    getDependencies(): Array<string>;
    isInstanceOfService(object: any): object is Service;
    getRequiredDependency(dependency: string): Service | false;
    isValidServiceName(service_name: string): boolean;
    getFilteredDependencies(): Array<string>;
    getServices(): Array<Service>;
    installService(service_name: string): Promise<any>;
    uninstallService(service_name: string): Promise<any>;
}
declare const _default: Services;
export default _default;
