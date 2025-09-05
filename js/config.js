// ============================================================================
// CONFIGURATION & METADATA
// ============================================================================

const SCRIPT = {
    name: "Config Module",
    description: "Configuration management and metadata for VRCX custom modules",
    author: "Bluscream",
    version: "1.0.0",
    dependencies: []
};

// Configuration class that uses the user config from main custom.js
class ConfigManager {
    constructor() {
        this.config = null;
        this.init();
    }

    init() {
        // Wait for user config to be available
        const checkConfig = () => {
            if (window.customjs && window.customjs.config) {
                this.config = window.customjs.config;
                this.registerModule();
            } else {
                setTimeout(checkConfig, 100);
            }
        };
        checkConfig();
    }

    registerModule() {
        // Register this module in the global namespace
        window.customjs = window.customjs || {};
        window.customjs.config = this;
        window.customjs.script = window.customjs.script || {};
        window.customjs.script.config = SCRIPT;
        
        // Also make CONFIG available globally for backward compatibility
        window.CONFIG = this.config;
        
        console.log(`✓ Loaded ${SCRIPT.name} v${SCRIPT.version} by ${SCRIPT.author}`);
    }

}

// Auto-initialize the module
new ConfigManager();
