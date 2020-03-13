import Apps from "./apps";
import AppsInstall from "./apps.install";

import WorkFolder from "./workfolder";

test("Testing App Read", function () {
    WorkFolder.readAppConfig = function (): Array<any> {
        return [
            { id: "100", permissions: [], package_name: "default", title: "Title", description: "Description", entry: "./", "special": [] },
            { id: "200", permissions: [], package_name: "default2", title: "Title2", description: "Description2", entry: "./", "special": [] }
        ];
    }
    const apps = Apps.getApps();
    expect(apps.length).toBe(2);

    const filtered_app = Apps.getAppByProperty("id", "200");
    expect(filtered_app.id).toBe("200");
    expect(filtered_app.package_name).toBe("default2");
});

test("Remove App", function () {
    const test_home_dir = "./tests/workfolders/apps_uninstall/";
    WorkFolder.setHomeDirectory(test_home_dir);
    const test_app_local = "./tests/app/net.web-glasses.testing.zip";
    AppsInstall.installApp(test_app_local).then(function () {
        expect(Apps.uninstallApp("net.web-glasses.testing")).toBe(true);

        const lignator = require("lignator");
        lignator.remove(test_home_dir);
    }).catch(function (error) {
        console.log(error);
        fail();
    });
});