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
		this.error = false;
		this.array = [];
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
		} else {
			console.log("File not found\n");
			this.error = true;
		}
	}
	
	handleComment(i) {
		if (this.fileContent[i] === '/' && this.fileContent[i + 1] === '*') {
			for (i; this.fileContent[i + 1] !== '/'; ++i);
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

	initArray() {
		var save = "";

		for (var i = 0; this.fileContent[i]; ++i) {
			while (this.fileContent[i] && this.fileContent[i] !== ' '
				&& this.fileContent[i] !== '\n' && this.fileContent[i] !== '\t')
				save += this.fileContent[i++];
			if (save !== "")
				this.array.push(save);
			save = "";
		}
	}

	minify() {
		this.readContent();

		if (!this.error) {
			this.handleHeader();
			this.initArray();
			this.result = this.array[0];
			this.result += " ";
			for (var i = 1; i < this.array.length; ++i) {
				if (this.array[i] === "var") {
					this.result += " ";

				}
				this.result += this.array[i];
			}
			return this.result;
		}
		return "";
	}
}

function main() {
	const args = process.argv;
	const obj = new Minify(args[2]);
	const result = obj.minify();
	obj.printResult();
}

main();