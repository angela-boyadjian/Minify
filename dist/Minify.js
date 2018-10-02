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
        process.stdout.write(this.result);
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
    handleString(i, j) {
        if (this.fileContent[i] === '"' || this.fileContent[i] === '\\') {
            this.insertAt(j, "\\");
            ++j;
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
        if (this.fileContent[0] === '/') {
            return this.handleComment(0);
        }
        return 1;
    }
    minify() {
        this.readContent();
        if (!this.error) {
            this.result = this.fileContent[0];
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
exports.Minify = Minify;
function main() {
    const args = process.argv;
    if (process.argv.length < 3) {
        console.log("Not enough arguments.\nPlease specify a file path.");
        return -1;
    }
    const obj = new Minify(args[2]);
    const result = obj.minify();
    obj.printResult();
    return 0;
}
main();
//# sourceMappingURL=Minify.js.map