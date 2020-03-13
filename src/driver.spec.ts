import Service from "./interfaces/service";
import Driver from "./driver";

test("Testing driver function", function () {
    const services: Array<Service> = [
        {
            method: "get",
            path: '/sample',
            parser: () => void(0),
            handler: () => void(0)
        },
        {
            method: "get",
            path: '/sample2',
            parser: () => void(0),
            handler: () => void(0)
        }
    ];
    services.forEach(service => Driver.register(service));

    expect(Driver.export()).toEqual(services);
})