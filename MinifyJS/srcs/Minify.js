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
		this.brackets = {
			left:0,
			right:0
		};
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

	isAlphaNum(str) {
		return str.match(/^[a-z0-9]+$/i) !== null;
	};
	
	skipComment(i) {
		if (this.fileContent[i] === '/' && this.fileContent[i + 1] === '*') {
			for (i; this.fileContent[i + 1] !== '/'; ++i);
			i += 2;
		}
		return i;
	}

	addWordsToArray(i, save) {
		if (this.isAlphaNum(this.fileContent[i])) {
			while (this.isAlphaNum(this.fileContent[i]))
				save += this.fileContent[i++];
			--i;
			this.array.push(save);
			save = ""
		}
		return i;
	}

	addSymbolsToArray(i, save) {
		save += this.fileContent[i];
		if (save !== '\t' && save !== '\n')
			this.array.push(save);
		save = ""
		return i;
	}

	initArray() {
		var save = "";

		for (var i = 0; this.fileContent[i]; ++i) {
			i = this.skipComment(i);
			if (!this.isAlphaNum(this.fileContent[i]) && this.fileContent[i] !== ' ')
				i = this.addSymbolsToArray(i, save);
			else
				i = this.addWordsToArray(i, save);
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

	handleBrackets(i) {
		if (this.array[i] === "{")
			this.brackets.left += 1;
		else if (this.array[i] === "}") {
			this.brackets.right += 1;
			if (this.brackets.right === this.brackets.left) {
				this.brackets.right = 0;
				this.brackets.left = 0;
				return true;
			}
		}
		return false;
	}

	resetMap() {
		this.mapVar.clear();
		this.key = 'a';
		this.mapVar.set(this.key, "");
	}

	getParamName(i) {
	
		while (this.array[i] !== '(')
			this.result += this.array[i++];
		this.result += this.array[i];
		for (++i; this.array[i] !== ')'; ++i) {
			if (this.array[i] === ',')
				continue;
			else
				this.handleVariables(i);
		}
		return i;
	}

	fillWordToResult(i) {
		var key = this.getKey(this.array[i]);

		if (key != -1)
			this.result += key;
		else
			this.result += this.array[i];
	}

	fill(i) {
		for (i; i < this.array.length; ++i) {
			i = this.handleComment(i);
			if (this.handleBrackets(i))
				this.resetMap();
			if (this.array[i] === "function")
				i = this.getParamName(i);
			if (this.array[i] === "var") {
				this.handleVariables(i + 1);
				++i;
			} else {
				this.fillWordToResult(i);
			}
		}
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
			this.fill(i);
			return this.result;
		}
		return "";
	}

}

function main() {
	const args = process.argv;
	const obj = new Minify(args[2]);
	obj.minify();
	obj.printResult();
}

main();