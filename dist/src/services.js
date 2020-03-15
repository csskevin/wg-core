"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var npm = require("npm");
/**
 * Handles all methods for the services.
 */
var Services = /** @class */ (function () {
    function Services() {
    }
    /**
     * Returns all dependencies of the current project.
     */
    Services.prototype.getDependencies = function () {
        var package_json = require(process.cwd() + "/package.json");
        if (typeof package_json === 'object') {
            if (Object.keys(package_json).includes("dependencies")) {
                var dependencies = Object.keys(package_json.dependencies);
                return dependencies;
            }
        }
        return [];
    };
    /**
     * Checks if an object matches the service interface.
     * @param object The object, which should be checked against the interface.
     */
    Services.prototype.isInstanceOfService = function (object) {
        return 'method' in object && 'path' in object && 'handler' in object;
    };
    /**
     * Requires the dependency and returns it.
     * @param dependency The dependency, which should be required.
     */
    Services.prototype.getRequiredDependency = function (dependency) {
        var required_service = require(dependency);
        var services = required_service.default || required_service;
        if (Array.isArray(services)) {
            return services.filter(this.isInstanceOfService);
        }
        return [];
    };
    /**
     * Checks, if an service name is valid.
     * @param service_name The service name, which should be checked.
     */
    Services.prototype.isValidServiceName = function (service_name) {
        return /^wg-service-(.+)$/.test(service_name);
    };
    /**
     * Filteres the dependencies with valid service names.
     */
    Services.prototype.getFilteredDependencies = function () {
        var dependencies = this.getDependencies();
        var filtered_dependencies = dependencies.filter(this.isValidServiceName);
        return filtered_dependencies;
    };
    /**
     * Returns the list of all imported services.
     */
    Services.prototype.getServices = function () {
        var _this = this;
        var services = [];
        var filtered_dependencies = this.getFilteredDependencies();
        filtered_dependencies.forEach(function (wg_package) {
            var dependencies = _this.getRequiredDependency(wg_package);
            dependencies.forEach(function (dependency) { return services.push(dependency); });
        });
        return services;
    };
    /**
     * Installs a new WebGlasses service into the current project. The service must be available in the NPM registry.
     * @param service_name The service name, which should be installed.
     */
    Services.prototype.installService = function (service_name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.isValidServiceName(service_name)) {
                npm.load({}, function () {
                    npm.commands.install([service_name], function (err) {
                        err ? reject("Could not fetch package.") : resolve();
                    });
                });
            }
            else {
                reject("Invalid service name.");
            }
        });
    };
    /**
     * Uninstalls a service from the current project.
     * @param service_name The service, which should be uninstalled.
     */
    Services.prototype.uninstallService = function (service_name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.isValidServiceName(service_name)) {
                npm.load({}, function () {
                    npm.commands.uninstall([service_name], function (err) {
                        err ? reject("Could not fetch package.") : resolve();
                    });
                });
            }
            else {
                reject("Invalid service name.");
            }
        });
    };
    return Services;
}());
exports.default = new Services();
