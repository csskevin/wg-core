const fs = require("fs");

/**
 * Handles the Work Folder.
 */
class WorkFolder {
    public homedir: string;
    public app_path: string;
    public app_config_file: string;
    public client_config: string;
    public on_first_install: boolean;

    constructor() {
        this.homedir = '';
        this.app_path = '';
        this.app_config_file = '';
        this.client_config = '';
        this.on_first_install = false;
        const default_homedir = require('os').homedir() + '/.web-glasses';
        this.setHomeDirectory(default_homedir);
    }

    /**
     * Sets the new home directory of the project.
     * @param homedir The new home directory of the project.
     */
    setHomeDirectory(homedir: string)
    {
        this.homedir = homedir;
        this.app_path = this.homedir + '/apps';
        this.app_config_file = this.homedir + '/apps.json';
        this.client_config = this.homedir + '/client.json';
        this.on_first_install = false;

        if (!fs.existsSync(this.homedir)) {
            fs.mkdirSync(this.homedir);
            this.on_first_install = true;
        }
        if (!fs.existsSync(this.app_path)) { fs.mkdirSync(this.app_path); }
        if (!fs.existsSync(this.app_config_file)) { fs.writeFileSync(this.app_config_file, JSON.stringify([])); }
        if (!fs.existsSync(this.client_config)) { fs.writeFileSync(this.client_config, JSON.stringify({})); }
    }

    /**
     * Reading the application configuration.
     */
    readAppConfig(): Array<any> {
        if (fs.existsSync(this.app_config_file)) {
            const content: string = fs.readFileSync(this.app_config_file).toString();
            try {
                const config = JSON.parse(content);
                return config;
            } catch (e) { }
        }
        return [];
    }

    /**
     * Writes the new configuration file into the application configuration.
     * @param config The new configuration.
     */
    writeAppConfig(config: string): boolean {
        try {
            fs.writeFileSync(this.app_config_file, config);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}

export default new WorkFolder();