/*global define, $, brackets */

/* {gcode-syntax-highlighter} Simple Mode for G-Code Syntax Highlighting */


define(function (require, exports, module) {
    'use strict';

    // For integration with Brackets' LanguageManager
    var LanguageManager = brackets.getModule("language/LanguageManager");
    var CodeMirror = brackets.getModule("thirdparty/CodeMirror2/lib/codemirror");
    
    
    CodeMirror.defineMode("gcode", function () {
        
        // Load Modules
        var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
        ExtensionUtils.loadStyleSheet(module, "styles/styles.css");
    
        return {
        
            startState: function () {
                return {
                    inComment: false
                };
            },
            token: function (stream, state) {
                // Check for State Changes
                
            
                // Block Delete
                if (stream.match(/([\/].*)/,false)) {
                    stream.skipToEnd();
                    return 'block_delete';
                }
            
                // Program Start
                if (stream.match(/([\%])/,false)) {
                    stream.skipToEnd();
                    return 'program_start';
                }
                
                // Program Number
                if (stream.match(/([o][0-9]{1,4})/i)) {
                    return 'program_number';
                }
                
                // Block Numbers
                if (stream.match(/([n][0-9]+)/i)) {
                    return 'block_number';
                }
            
                // Comments
                if (stream.match(/(\(.+\))/)) {
                    return 'comment';
                }
            
                // G-Codes
                if (stream.match(/([g][0-9]{1,3})/i)) {
                    return 'g_code';
                }
                
                // M-Codes
                if (stream.match(/([m][0-9]{1,3})/i)) {
                    return 'm_code';
                }
                
                // Speeds
                if (stream.match(/([s][0-9]+)/i)) {
                    return 'speeds';
                }
                
                // Feeds
                if (stream.match(/([f][0-9]+\.[0-9]*)/i)) {
                    return 'feeds';
                }
                
                // Tools
                if (stream.match(/([dth][0-9]+)/i)) {
                    return 'tools';
                }
            
                return null;
            }
        };   
    });

    
    CodeMirror.defineMIME('text/x-gcode', 'gcode');
    
    // Register with Brackets
    LanguageManager.defineLanguage("gcode", {
        name: "gcode",
        mode: "gcode",
        fileExtensions: ["nc","tap","mpf","eia"],
        blockComment: ["(",")"],
        lineComment: [";"]
    });
            
    console.log("Nginx syntax highlighting extension loaded");
    
});
            
            