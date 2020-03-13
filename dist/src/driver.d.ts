import Service from "./interfaces/service";
/**
 * Allowing registering and exporting services.
 */
declare class Driver {
    private services;
    constructor();
    /**
     * Registers a new service, which should be used by the WebGlasses instance.
     * @param service The service, which should be registered.
     */
    register(service: Service): void;
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
    export(): Service[];
}
declare const _default: Driver;
export default _default;
