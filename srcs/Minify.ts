import { readFile } from "fs";

/*
 * @Author: Angela 
 * @Date: 2018-09-27 22:28:39 
 * @Last Modified by: Angela
 * @Last Modified time: 2018-09-27 22:35:28
 */

const fs = require('fs');

class Minify {
	constructor(file: string) {
		this.filePath = file;
	}
	public getResult() : string {
		return this.result;
	}
	public printResult() : void {
		console.log(this.result);
	}
	public processFile() {
		console.log(this.result);
	}
	public readContent() : void {
		fs.exists(this.filePath, (fileok: any) => {
			if(fileok)fs.readFile(this.filePath, (error:any, data: string) => {
				this.fileContent = data;
			});
				else console.log("File not found\n");
			});
	}
	private result: string;
	private fileContent: string;
	private filePath: string;
}

let obj: Minify = new Minify("./script.js");
obj.readContent();