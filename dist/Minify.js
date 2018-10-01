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
    getStringLength(idx) {
        let i;
        for (i = idx; this.fileContent[i] && this.fileContent[i] !== '\"'
            && this.fileContent[i - 1] !== '\\'; ++i)
            ;
        return i;
    }
    handleString(i, j) {
        if (this.fileContent[i] === '"') {
            this.insertAt(j, "\\");
            // this.insertAt(j + 1, "\"");
            j += 1;
        }
        return j;
    }
    addChar(i, j) {
        if (this.fileContent[i] !== '\n' && this.fileContent[i] !== '\t') {
            this.insertAt(j, this.fileContent[i]);
            ++j;
        }
        return j;
    }
    handleComment(i) {
        if (this.fileContent[i] === '/' && this.fileContent[i + 1] === '*') {
            for (i; this.fileContent[i + 1] !== '/'; ++i)
                ;
            return i + 2;
        }
        return i;
    }
    handleHeader() {
        if (this.fileContent[0] === '/')
            return this.handleComment(0);
        return 1;
    }
    minify() {
        this.readContent();
        this.result = this.fileContent[0];
        if (!this.error) {
            let j = 1;
            for (let i = 1; this.fileContent[i]; ++i) {
                j = this.handleString(i, j);
                j = this.addChar(i, j);
            }
            return this.result;
        }
        return "";
    }
}
const obj = new Minify("./script.js");
const str = obj.minify();
if (str)
    process.stdout.write(str);
//# sourceMappingURL=Minify.js.map