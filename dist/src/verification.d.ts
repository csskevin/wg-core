import App from "./interfaces/app";
import { Request } from "express";
declare class Verification {
    getAppBySubdomain(request: Request): App;
}
declare const _default: Verification;
export default _default;
