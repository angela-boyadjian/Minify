"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Angela
 * @Date: 2018-09-27 22:28:39
 * @Last Modified by: Angela
 * @Last Modified time: 2018-09-27 22:35:28
 */
const fs = require('fs');
class Minify {
    constructor(file) {
        this.filePath = file;
    }
    getResult() {
        return this.result;
    }
    printResult() {
        console.log(this.result);
    }
    processFile() {
        console.log(this.result);
    }
    readContent() {
        fs.exists("./script.js", (fileok) => {
            if (fileok)
                fs.readFile("./script.js", (error, data) => {
                    console.log("Contents: " + data);
                });
            else
                console.log("file not found");
        });
        // this. result = fs.readFile('../script/script.js', 'utf8', (error: any) => {console.log("Error on read\n");});
        // this.processFile();
        // console.log("File not found\n");
    }
    read(err, data) {
        if (err)
            throw err;
        let content = data;
    }
}
let obj = new Minify("path");
obj.readContent();
//# sourceMappingURL=Minify.js.map