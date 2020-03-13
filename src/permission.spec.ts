import Apps from "./apps";
import Permission from "./permission";

import WorkFolder from "./workfolder";

test("Testing default permission functions", function () {
    const test_home_dir = "./tests/workfolders/permission/";
    WorkFolder.setHomeDirectory(test_home_dir);
    
    const app_100 = Apps.getAppByProperty("id", "100");
    const permissions = Permission.getPermissions("100");
    expect(app_100.permissions).toEqual(permissions);

    expect(Permission.hasSpecificPermission("100", "permission_one")).toBe(true);
    expect(Permission.hasSpecificPermission("100", "temporary_permission")).toBe(false);

    Permission.grantPermission("100", "temporary_permission");
    expect(Permission.hasSpecificPermission("100", "temporary_permission")).toBe(true);
    Permission.revokePermission("100", "temporary_permission");
    expect(Permission.hasSpecificPermission("100", "temporary_permission")).toBe(false);
});

test("Testing special permission functions", function () {
    const test_home_dir = "./tests/workfolders/permission/";
    WorkFolder.setHomeDirectory(test_home_dir);

    Permission.grantSpecialPermission("100", "special_one");
    Permission.grantSpecialPermission("200", "special_one");
    expect(Apps.getAppByProperty("id", "100").special.includes("special_one")).toBe(false);
    expect(Apps.getAppByProperty("id", "200").special.includes("special_one")).toBe(true);

    const app = Permission.getAppWithSpecialPermission("special_one");
    expect(app.id).toBe("200");

    Permission.grantSpecialPermission(false, "special_one");
    const no_special_app = Permission.getAppWithSpecialPermission("special_one");
    expect(no_special_app.id).toBe(false);

    Permission.grantSpecialPermission("100", "special_one");
    const special_one_app = Permission.getAppWithSpecialPermission("special_one");
    expect(special_one_app.id).toBe("100");

    expect(Permission.isSpecialApp("100", "special_one")).toBe(true);
    expect(Permission.isSpecialApp("200", "special_one")).toBe(false);
});