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
        this.fileContent = new String(str);
    }
    readContent() {
        let str = "error";
        fs.exists(this.filePath, (fileok) => {
            if (fileok) {
                fs.readFile(this.filePath, (error, data) => {
                    this.setFileContent = data;
                    str = data;
                    return data;
                });
            }
            else {
                console.log("File not found\n");
                this.error = true;
            }
        });
        return str;
    }
    insertAt(str, index, toAdd) {
        let firstHalf = str.slice(0, index);
        let secondHalf = str.slice(index, this.result.length);
        let newStr = firstHalf.concat(toAdd, secondHalf);
        return newStr;
    }
    getFilePath() {
        return this.filePath;
    }
    minify() {
        this.fileContent = fs.readFile(this.filePath, 'utf8');
        console.log(this.getFileContent);
        console.log(this.fileContent);
        this.result = new String(this.fileContent[0]);
        if (!this.error) {
            let j = 0;
            let idx = 0;
            for (let char of this.fileContent.toString()) {
                if (char != '\n' && char != '\t') {
                    let firstHalf = this.result.slice(0, idx);
                    let secondHalf = this.result.slice(idx, this.result.length);
                    let newStr = firstHalf.concat(char, secondHalf);
                    this.result = new String(newStr);
                    ++j;
                }
                ++idx;
            }
            return this.result.toString();
        }
        return "";
    }
}
let obj = new Minify("./test.js");
let s = obj.readContent();
let str = obj.minify();
if (str)
    console.log("str -> ", str);
//# sourceMappingURL=Minify.js.map