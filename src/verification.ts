import App from "./interfaces/app";
import Apps from "./apps";
import Permission from "./permission";
import { Request } from "express";

/**
 * Verifies incoming express requests.
 */
class Verification {
    /**
     * Returns an app based on the subdomain.
     * @param request Express Request object.
     */
    getAppBySubdomain(request: Request): App {
        const subdomains = request.subdomains;
        if (subdomains.length === 1) {
            const subdomain = subdomains[0];
            return Apps.getAppByProperty("id", subdomain);
        }
        if (subdomains.length === 0) {
            return Permission.getAppWithSpecialPermission("default");
        }
        return <App>{id: false};
    }
}

export default new Verification();