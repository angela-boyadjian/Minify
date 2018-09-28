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

	public printResult() {
		console.log(this.result);
	}

	get getFileContent() : String {
		return this.fileContent;
	}

	set setFileContent(str: String) {
		this.fileContent = new String(str);
	}

	public readContent() : String {
		let str: String = "error";
		fs.exists(this.filePath, (fileok: any) => {
			if (fileok) {
				fs.readFile(this.filePath, (error:any, data: string) => {
					this.setFileContent = data;
					str = data;
					return data;
				});
			} else {
				console.log("File not found\n");
				this.error = true;
			}
		});
		return str;
	}
	
	private insertAt(str: String, index: number, toAdd: string) {
		let firstHalf = str.slice(0, index);
		let secondHalf = str.slice(index, this.result.length);
		let newStr = firstHalf.concat(toAdd, secondHalf);
		return newStr;
	}

	public getFilePath() : string {
		return this.filePath;
	}
	
	public minify() : string {
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
			return this.result.toString() as string;
		}
	return "";
	}
	private result: String;
	private fileContent: String;
	private filePath: string;
	private error: boolean;
}

let obj: Minify = new Minify("./test.js");
let s = obj.readContent();
let str = obj.minify();
if (str) console.log("str -> ", str);