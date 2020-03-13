import Service from "./interfaces/service";
const npm = require("npm");

/**
 * Handles all methods for the services.
 */
class Services {
    /**
     * Returns all dependencies of the current project.
     */
    getDependencies(): Array<string> {
        const package_json = require("../package.json");
        if (typeof package_json === 'object') {
            if (Object.keys(package_json).includes("dependencies")) {
                const dependencies = Object.keys(package_json.dependencies);
                return dependencies;
            }
        }
        return [];
    }

    /**
     * Checks if an object matches the service interface.
     * @param object The object, which should be checked against the interface.
     */
    isInstanceOfService(object: any): object is Service {
        return 'method' in object && 'path' in object && 'handler' in object;
    }

    /**
     * Requires the dependency and returns it.
     * @param dependency The dependency, which should be required.
     */
    getRequiredDependency(dependency: string): Array<Service> {
        const services = require(dependency);
        if(Array.isArray(services))
        {
            return services.filter(this.isInstanceOfService);
        }
        return [];
    }

    /**
     * Checks, if an service name is valid.
     * @param service_name The service name, which should be checked.
     */
    isValidServiceName(service_name: string): boolean {
        return /^wg-service-(.+)$/.test(service_name)
    }

    /**
     * Filteres the dependencies with valid service names.
     */
    getFilteredDependencies(): Array<string> {
        const dependencies = this.getDependencies();
        const filtered_dependencies = dependencies.filter(this.isValidServiceName);
        return filtered_dependencies;
    }

    /**
     * Returns the list of all imported services.
     */
    getServices(): Array<Service> {
        const services: Array<Service> = [];
        const filtered_dependencies = this.getFilteredDependencies();
        filtered_dependencies.forEach(wg_package => {
            const dependencies = this.getRequiredDependency(wg_package);
            dependencies.forEach(dependency => services.push(dependency));
        });
        return services;
    }

    /**
     * Installs a new WebGlasses service into the current project. The service must be available in the NPM registry. 
     * @param service_name The service name, which should be installed.
     */
    installService(service_name: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            if (this.isValidServiceName(service_name)) {
                npm.load({}, function () {
                    npm.commands.install([service_name], function (err: any) {
                        err ? reject("Could not fetch package.") : resolve();
                    })
                });
            } else {
                reject("Invalid service name.");
            }
        })
    }

    /**
     * Uninstalls a service from the current project.
     * @param service_name The service, which should be uninstalled.
     */
    uninstallService(service_name: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            if (this.isValidServiceName(service_name)) {
                npm.load({}, function () {
                    npm.commands.uninstall([service_name], function (err: any) {
                        err ? reject("Could not fetch package.") : resolve();
                    })
                });
            } else {
                reject("Invalid service name.");
            }
        })
    }
}

export default new Services();