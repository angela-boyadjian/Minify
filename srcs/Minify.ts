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

	private readContent() {
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

	private getStringLength(idx: number) : number {
		let i;

		for (i = idx; this.fileContent[i] && this.fileContent[i] !== '\"'
			&& this.fileContent[i - 1] !== '\\'; ++i);
		return i;
	}

	private handleString(i: number, j: number) : number {
		if (this.fileContent[i] === '"') {
			this.insertAt(j, "\\");
			++j;
		}
		return j;
	}
	
	private addChar(i: number, j: number) : number {
		if (this.fileContent[i] !== '\n' && this.fileContent[i] !== '\t') {
			this.insertAt(j, this.fileContent[i]);
			++j;
		}
		return j;
	}

	private handleComment(i: number) : number {
		if (this.fileContent[i] === '/' && this.fileContent[i + 1] === '*') {
			for (i; this.fileContent[i + 1] !== '/'; ++i);
			return i + 2;
		}
		return i;
	}

	private handleHeader() : number {
		if (this.fileContent[0] === '/')
			return this.handleComment(0);
		return 1;
	}

	minify() : string {
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

	private result: string;
	private fileContent: string;
	private filePath: string;
	private error: boolean;
}

const obj: Minify = new Minify("./script.js");
const str = obj.minify();
if (str) process.stdout.write(str);