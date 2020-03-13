import App from "./interfaces/app";
import { Request } from "express";
/**
 * Verifies incoming express requests.
 */
declare class Verification {
    /**
     * Returns an app based on the subdomain.
     * @param request Express Request object.
     */
    getAppBySubdomain(request: Request): App;
}
declare const _default: Verification;
export default _default;
