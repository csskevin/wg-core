"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var npm = require("npm");
var Services = /** @class */ (function () {
    function Services() {
    }
    Services.prototype.getDependencies = function () {
        var package_json = require("../package.json");
        if (typeof package_json === 'object') {
            if (Object.keys(package_json).includes("dependencies")) {
                var dependencies = Object.keys(package_json.dependencies);
                return dependencies;
            }
        }
        return [];
    };
    Services.prototype.isInstanceOfService = function (object) {
        return 'method' in object && 'path' in object && 'parser' in object && 'handler' in object;
    };
    Services.prototype.getRequiredDependency = function (dependency) {
        var service = require(dependency);
        if (this.isInstanceOfService(service)) {
            return service;
        }
        return false;
    };
    Services.prototype.isValidServiceName = function (service_name) {
        return /^wg-service-(.+)$/.test(service_name);
    };
    Services.prototype.getFilteredDependencies = function () {
        var dependencies = this.getDependencies();
        var filtered_dependencies = dependencies.filter(this.isValidServiceName);
        return filtered_dependencies;
    };
    Services.prototype.getServices = function () {
        var _this = this;
        var services = [];
        var filtered_dependencies = this.getFilteredDependencies();
        filtered_dependencies.forEach(function (wg_package) {
            var service = _this.getRequiredDependency(wg_package);
            if (service !== false) {
                services.push(service);
            }
        });
        return services;
    };
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
