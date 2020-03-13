import Service from "./interfaces/service";
/**
 * Handles all methods for the services.
 */
declare class Services {
    /**
     * Returns all dependencies of the current project.
     */
    getDependencies(): Array<string>;
    /**
     * Checks if an object matches the service interface.
     * @param object The object, which should be checked against the interface.
     */
    isInstanceOfService(object: any): object is Service;
    /**
     * Requires the dependency and returns it.
     * @param dependency The dependency, which should be required.
     */
    getRequiredDependency(dependency: string): Array<Service>;
    /**
     * Checks, if an service name is valid.
     * @param service_name The service name, which should be checked.
     */
    isValidServiceName(service_name: string): boolean;
    /**
     * Filteres the dependencies with valid service names.
     */
    getFilteredDependencies(): Array<string>;
    /**
     * Returns the list of all imported services.
     */
    getServices(): Array<Service>;
    /**
     * Installs a new WebGlasses service into the current project. The service must be available in the NPM registry.
     * @param service_name The service name, which should be installed.
     */
    installService(service_name: string): Promise<any>;
    /**
     * Uninstalls a service from the current project.
     * @param service_name The service, which should be uninstalled.
     */
    uninstallService(service_name: string): Promise<any>;
}
declare const _default: Services;
export default _default;
