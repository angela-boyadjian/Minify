/*
 * @Author: Angela 
 * @Date: 2018-09-27 22:28:39 
 * @Last Modified by: Angela
 * @Last Modified time: 2018-09-27 22:35:28
 */

class Minify {
	constructor(file: string) {
		this.fileName = file;
	}
	public getResult() : string {
		return this.result;
	}
	public printResult() : void {
		console.log(this.result);
	}
	private result: string;
	private fileName: string;
}