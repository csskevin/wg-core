import Service from "./interfaces/service";
import Services from "./services";

test("Testing dependencies filter", function () {
    expect(Services.isValidServiceName("wg-service-some-service")).toBe(true);
    expect(Services.isValidServiceName("is-even")).toBe(false);
    expect(Services.isValidServiceName("wg-service-another")).toBe(true);
    expect(Services.isValidServiceName("wg-service")).toBe(false);
    expect(Services.isValidServiceName("wg-service-")).toBe(false);
    expect(Services.isValidServiceName("wg-services-invalid")).toBe(false);
});

test("Testing instanceof service", function () {
    expect(Services.isInstanceOfService({
        method: "get",
        path: "/",
        parser: () => void (0),
        handler: () => void (0),
    })).toBe(true);

    expect(Services.isInstanceOfService({
        method: "get",
        path: "/",
        parser: () => void (0)
    })).toBe(false);
});

test("Services list", function () {
    const original_getfiltered_dependencies = Services.getFilteredDependencies;
    const original_getRequiredDependency = Services.getRequiredDependency;

    Services.getFilteredDependencies = function (): Array<string> {
        return [
            "wg-service-default",
            "wg-service-secondary"
        ]
    };

    const dummy_fn = () => void(0);

    Services.getRequiredDependency = function(): Array<Service> {
        return [{
            method: "get",
            path: "/",
            parser: dummy_fn,
            handler: dummy_fn
        }];
    }

    const services = Services.getServices();
    const expected_services = [
        {
            method: "get",
            path: "/",
            parser: dummy_fn,
            handler: dummy_fn
        },
        {
            method: "get",
            path: "/",
            parser: dummy_fn,
            handler: dummy_fn
        }
    ];

    expect(services).toEqual(expected_services);

    Services.getFilteredDependencies = original_getfiltered_dependencies;
    Services.getRequiredDependency = original_getRequiredDependency;
});