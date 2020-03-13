import Files from "./files";
import WorkFolder from "./workfolder";
WorkFolder.setHomeDirectory("./tests/workfolders/files/");

// Disabling writing
WorkFolder.writeAppConfig = function(): boolean { return false; };

test("Testing legit path", function() {
        expect(Files.getLegitFilePath("test_app", "./filename")).not.toBe(false);
        expect(Files.getLegitFilePath("test_app", "./sub1/filename")).not.toBe(false);
        expect(Files.getLegitFilePath("test_app", "./sub2/somefile")).not.toBe(false);
    
        expect(Files.getLegitFilePath("test_app", "./invalid_folder/filename")).toBe(false);
        expect(Files.getLegitFilePath("test_app", "./../escaping")).toBe(false);
        expect(Files.getLegitFilePath("test_app", "./")).toBe(false);
});