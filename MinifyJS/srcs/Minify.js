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
		this.fileContent = "";
		this.error = false;
		this.array = [];
		this.mapVar = new Map();
		this.key = 'a';
		this.mapVar.set(this.key, "");
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

	isAlphaNum(ch) {
		return ch.match(/^[a-z0-9]+$/i) !== null;
	}
	
	initArray() {
		var save = "";

		for (var i = 0; this.fileContent[i]; ++i) {
			if (!this.isAlphaNum(this.fileContent[i])) {
				if (this.fileContent[i] === ' ')
				continue;
				if (this.fileContent[i] === '\n')
					continue;
				save += this.fileContent[i];
				if (save !== '\t')
					this.array.push(save);
				save = ""
			} else {
				while (this.isAlphaNum(this.fileContent[i]))
					save += this.fileContent[i++];
				this.array.push(save);
				save = ""
			}
		}
	}

	getKey(str) {
		for (var [key, value] of this.mapVar) {
			if (str === value)
				return key;
		}
		return -1;
	}

	incrementKey() {
		switch (this.key) {
			case 'a':
				this.key = 'b';
				break;
			case 'b':
				this.key = 'c';
				break;
			case 'c':
				this.key = 'd';
				break;
			case 'd':
				this.key = 'e';
				break;
			case 'e':
				this.key = 'f';
				break;
			case 'f':
				this.key = 'g';
				break;
			default:
				this.key = 'a';
				break;
		}
	}

	handleVariables(i) {
		this.mapVar.set(this.key, this.array[i]);
		this.result += this.key;
		this.incrementKey();
	}

	minify() {
		this.readContent();

		if (!this.error) {
			this.handleHeader();
			this.initArray();
			this.result = "";
			var i = 1;
			if (this.array[0] === "var") {
				this.handleVariables(1);
				++i;
			} else {
				this.result = this.array[0];
			}
			for (i; i < this.array.length; ++i) {
				if (this.array[i] === "var") {
					this.handleVariables(i + 1);
					++i;
				} else {
					var key = this.getKey(this.array[i]);

					if (key != -1) { {
						this.result += key;
					}
					} else {
						this.result += this.array[i];
					}
				}
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