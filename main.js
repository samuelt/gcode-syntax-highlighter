/*jslint regexp: true, vars: true*/
/*global define, $, brackets, console */

/* {gcode-syntax-highlighter} Simple Mode for G-Code Syntax Highlighting
        v0.1.0 Written by Mike Centola (Applied Engineering & Design)      */


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
            token: function (stream, state) {
                // Check for State Changes
                
            
                // Block Delete
                if (stream.match(/([\/].*)/, false)) {
                    stream.skipToEnd();
                    return 'block_delete';
                }
            
                // Program Start
                if (stream.match(/([\%])/)) {
                    stream.skipToEnd();
                    return 'program_start';
                }
                
                // Program Number
                if (stream.match(/([o][0-9]{1,4})/i)) {
                    stream.skipToEnd();
                    return 'program_number';
                }
                
                // Block Numbers
                if (stream.match(/([n][0-9]+)/i)) {
                    return 'block_number';
                }
            
                // Comments
                if (stream.match(/(\(.+\))/)) {
                    stream.skipToEnd();
                    return 'comment';
                }
            
                // G-Codes
                if (stream.match(/([g][0-9]{1,3})/i)) {
                    return 'g_code';
                }
                
                // M-Codes
                if (stream.match(/([m][0-9]{1,3})/i)) {
                    stream.skipToEnd();
                    return 'm_code';
                }
                
                // Speeds
                if (stream.match(/([s][0-9]+)/i)) {
                    return 'speeds';
                }
                
                // Feeds
                if (stream.match(/([f][0-9]+\.?[0-9]*)/i)) {
                    return 'feeds';
                }
                
                // Tools
                if (stream.match(/([dth][0-9]+)/i)) {
                    return 'tools';
                }
                
                // X, Y Coordinates
                if (stream.match(/([xy]-?[0-9]+\.?[0-9]*)/i)) {
                    return 'xycoords';
                }
                
                // Z Coordindates
                if (stream.match(/([z]-?[0-9]+\.?[0-9]*)/i)) {
                    return 'zcoords';
                }
                
                // A, B, C Rotations
                if (stream.match(/([abc]-?[0-9]+\.?[0-9]*)/i)) {
                    return 'axisrot';
                }
                
                // I, J, K
                if (stream.match(/([ijk]-?[0-9]+\.?[0-9]*)/i)) {
                    return 'ijknums';
                }
                
                // P, Q, R
                if (stream.match(/([pqr]-?[0-9]+\.?[0-9]*)/i)) {
                    return 'pqrnums';
                }
                
                // Strip Space
                if (stream.eatSpace()) {
                    return null;
                }
                
                // Eat the rest!
                stream.eat(/./);
                return null;
            },
            startState: function () {
                return {
                    inComment: false
                };
            }
        };
    });

    
    CodeMirror.defineMIME("text/x-gcode", "gcode");
    
    // Register with Brackets
    LanguageManager.defineLanguage("gcode", {
        name: "gcode",
        mode: "gcode",
        fileExtensions: ["nc", "tap", "mpf", "eia", "hnc", "min", "hd3", "ncc"],
        blockComment: ["(", ")"],
        lineComment: [";"]
    });
    console.log("g-code syntax highlighting extension loaded");
    
});
            
            