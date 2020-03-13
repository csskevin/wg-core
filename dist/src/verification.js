"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apps_1 = __importDefault(require("./apps"));
var permission_1 = __importDefault(require("./permission"));
var Verification = /** @class */ (function () {
    function Verification() {
    }
    Verification.prototype.getAppBySubdomain = function (request) {
        var subdomains = request.subdomains;
        if (subdomains.length === 1) {
            var subdomain = subdomains[0];
            return apps_1.default.getAppByProperty("id", subdomain);
        }
        if (subdomains.length === 0) {
            return permission_1.default.getAppWithSpecialPermission("default");
        }
        return { id: false };
    };
    return Verification;
}());
exports.default = new Verification();
