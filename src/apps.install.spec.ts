import App from "./interfaces/app";
import AdmZip from "adm-zip";
import Apps from "./apps";
import AppsInstall from "./apps.install";
import WorkFolder from "./workfolder";
import * as fs from "fs";

const test_home_dir = "./tests/workfolders/apps_install/";
WorkFolder.setHomeDirectory(test_home_dir);

const test_app_https = "https://github.com/csskevin/wg-core/raw/master/tests/app/net.web-glasses.testing.zip";
const test_app_local = "./tests/app/net.web-glasses.testing.zip";

test("Testing helper functions", function() {
    const original_writeAppConfig = WorkFolder.writeAppConfig;
    // Disable writing
    WorkFolder.writeAppConfig = function(): boolean { return false; }
    expect(AppsInstall.isValidURL(test_app_https)).toBe(true);
    expect(AppsInstall.isValidURL(test_app_local)).toBe(false);

    const app_config: App = {
        id: "0x001",
        package_name: "net.web-glasses.package_name",
        title: "Some Title",
        description: "Some description",
        entry: "./",
        permissions: [],
        special: []
    };

    const original_fn = WorkFolder.writeAppConfig;
    WorkFolder.writeAppConfig = function(config: string): boolean {
        expect(true).toBeTruthy();
        return true;
    }
    AppsInstall.installAppConfiguration(app_config);
    WorkFolder.writeAppConfig = original_fn;

    app_config.package_name = "illegal_characters%$";
    expect(AppsInstall.installAppConfiguration(app_config)).toBe(false);
    app_config.id = false;
    app_config.package_name = "net.web-glasses.testing";
    expect(AppsInstall.installAppConfiguration(app_config)).toBe(false);

    // Reset default settings
    WorkFolder.writeAppConfig = original_writeAppConfig;
});


test("Testing installing local zip file", function() {
    const app_length_before_installation = Apps.getApps().length;
    AppsInstall.installApp(test_app_local).then(function() {
        const app_length_after_installation = Apps.getApps().length;
        expect(app_length_after_installation).toBe(app_length_before_installation + 1);

        const installed_app = Apps.getAppByProperty("package_name", "net.web-glasses.testing");
        expect(installed_app.id).not.toBe(false);

        const app_path = WorkFolder.app_path + "/" + installed_app.package_name;
        const installed_app_existent = fs.existsSync(app_path);
        expect(installed_app_existent).toBe(true);

        const config_file_not_existent = fs.existsSync(app_path + "/wg-app.json");
        expect(config_file_not_existent).toBe(false);

        const lignator = require("lignator");
        lignator.remove(test_home_dir);
    }).catch(function(error) {
        console.log(error);
        fail()
    });
});

test("Test local file read", function() {
    const content = AppsInstall.getFileContent(test_app_local);
    expect(() => { 
        const zip = new AdmZip(content) 
        zip.getEntries();
    }).not.toThrow();
});

test("Test remote read", function() {
    return AppsInstall.getURIContent(test_app_https).then(function(content: any) {
        expect(() => { 
            const zip = new AdmZip(content) 
            zip.getEntries();
        }).not.toThrow();
    }).catch(function(error) {
        console.log(error);
        fail();
    });
});