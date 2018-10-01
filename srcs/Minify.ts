/*
* @Author: Angela 
* @Date: 2018-09-27 22:28:39 
* @Last Modified by: Angela
* @Last Modified time: 2018-09-27 22:35:28
*/

import { exists } from "fs";

const fs = require('fs');

class Minify {
	
	constructor(file: string) {
		this.filePath = file;
		this.error = false;
	}

	printResult() {
		console.log(this.result);
	}

	get getFileContent() : string {
		return this.fileContent;
	}

	set setFileContent(str: string) {
		this.fileContent = str;
	}

	readContent() {
		if (fs.existsSync(this.filePath)) {
				this.fileContent = fs.readFileSync(this.filePath, 'utf8');
		} else {
			console.log("File not found\n");
			this.error = true;
		}
	}
	
	private insertAt(index: number, toAdd: string) {
		const firstHalf = this.result.slice(0, index);
		const secondHalf = this.result.slice(index, this.result.length);
		const newStr = firstHalf.concat(toAdd, secondHalf);
		this.result = newStr;
	}

	getFilePath() : string {
		return this.filePath;
	}
	
	minify() : string {
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
	private result: string;
	private fileContent: string;
	private filePath: string;
	private error: boolean;
}

const obj: Minify = new Minify("./test.js");
const str = obj.minify();
if (str) console.log(str);