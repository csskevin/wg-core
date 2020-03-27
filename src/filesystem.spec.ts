import FileSystem from "./filesystem";
import WorkFolder from "./workfolder";
WorkFolder.setHomeDirectory("./tests/workfolders/files/");

// Disabling writing
WorkFolder.writeAppConfig = function(): boolean { return false; };

test("Testing legit path", function() {
        expect(FileSystem.getLegitFilePath("test_app", "./filename")).not.toBe(false);
        expect(FileSystem.getLegitFilePath("test_app", "./sub1/filename")).not.toBe(false);
        expect(FileSystem.getLegitFilePath("test_app", "./sub2/somefile")).not.toBe(false);
    
        expect(FileSystem.getLegitFilePath("test_app", "./invalid_folder/filename")).toBe(false);
        expect(FileSystem.getLegitFilePath("test_app", "./../escaping")).toBe(false);
        expect(FileSystem.getLegitFilePath("test_app", "./")).toBe(false);
});

test("Test filesystem file functions", function() {
        expect(FileSystem.access("test_app", "./filename")).toBeInstanceOf(Error);
        expect(FileSystem.writeFile("test_app", "./filename", "Hello ")).not.toBeInstanceOf(Error);
        expect(FileSystem.appendFile("test_app", "./filename", "World")).not.toBeInstanceOf(Error);
        expect(FileSystem.lstat("test_app", "./filename")).not.toBeInstanceOf(Error);
        expect(FileSystem.stat("test_app", "./filename")).not.toBeInstanceOf(Error);
        expect(FileSystem.copyFile("test_app", "./filename", "./filename2")).not.toBeInstanceOf(Error);
        expect(FileSystem.rename("test_app", "./filename2", "./filename3")).not.toBeInstanceOf(Error);
        expect(FileSystem.exists("test_app", "./filename3")).toBe(true);
        expect(FileSystem.readFile("test_app", "./filename3", "utf8")).toBe("Hello World");
        expect(FileSystem.truncate("test_app", "./filename3", 1)).not.toBeInstanceOf(Error);
        expect(FileSystem.readFile("test_app", "./filename3", "utf8")).toBe("H");
        expect(FileSystem.unlink("test_app", "./filename")).not.toBeInstanceOf(Error);
        expect(FileSystem.unlink("test_app", "./filename3")).not.toBeInstanceOf(Error);
});

test("Test filesystem folder functions", function() {
        expect(FileSystem.mkdir("test_app", "./folder")).not.toBeInstanceOf(Error);
        expect(FileSystem.readdir("test_app", "./folder")).not.toBeInstanceOf(Error);
        expect(FileSystem.rmdir("test_app", "./folder")).not.toBeInstanceOf(Error);
});