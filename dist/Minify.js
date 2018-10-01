"use strict";
/*
* @Author: Angela
* @Date: 2018-09-27 22:28:39
* @Last Modified by: Angela
* @Last Modified time: 2018-09-27 22:35:28
*/
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
class Minify {
    constructor(file) {
        this.filePath = file;
        this.error = false;
    }
    printResult() {
        console.log(this.result);
    }
    get getFileContent() {
        return this.fileContent;
    }
    set setFileContent(str) {
        this.fileContent = str;
    }
    readContent() {
        if (fs.existsSync(this.filePath)) {
            this.fileContent = fs.readFileSync(this.filePath, 'utf8');
        }
        else {
            console.log("File not found\n");
            this.error = true;
        }
    }
    insertAt(index, toAdd) {
        const firstHalf = this.result.slice(0, index);
        const secondHalf = this.result.slice(index, this.result.length);
        const newStr = firstHalf.concat(toAdd, secondHalf);
        this.result = newStr;
    }
    getFilePath() {
        return this.filePath;
    }
    minify() {
        this.readContent();
        this.result = this.fileContent[0];
        if (!this.error) {
            let j = 0;
            let idx = 0;
            for (const char of this.fileContent) {
                if (char !== '\n' && char !== '\t') {
                    this.insertAt(j, char);
                    ++j;
                }
                ++idx;
            }
            return this.result;
        }
        return "";
    }
}
const obj = new Minify("./test.js");
const str = obj.minify();
if (str)
    console.log(str);
//# sourceMappingURL=Minify.js.map