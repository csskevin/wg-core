import Service from "./interfaces/service";

/**
 * Allowing registering and exporting services.
 */
class Driver {
    private services: Array<Service>;
    constructor()
    {
        this.services = [];
    }

    /**
     * Registers a new service, which should be used by the WebGlasses instance.
     * @param service The service, which should be registered.
     */
    register(service: Service)
    {
        this.services.push(service);
    }

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
    export()
    {
        return this.services;
    }
}

export default new Driver();