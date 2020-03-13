"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Allowing registering and exporting services.
 */
var Driver = /** @class */ (function () {
    function Driver() {
        this.services = [];
    }
    /**
     * Registers a new service, which should be used by the WebGlasses instance.
     * @param service The service, which should be registered.
     */
    Driver.prototype.register = function (service) {
        this.services.push(service);
    };
    /**
     * Exports the registered services, so that i can be used the WebGlasses instance.
     *
     * ```
     * // Usually used for exporting.
     * module.exports = Driver.export();
     * // If you work with Modules
     * export default Driver.export();
     * ```
     */
    Driver.prototype.export = function () {
        return this.services;
    };
    return Driver;
}());
exports.default = new Driver();
