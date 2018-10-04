/*
 ** header
*/

var a = function test(nbr1, nbr2) {
	let aString = "hello world";
	const bloup = 3;
	/* This is a comment */
	console.log(aString);
	console.log(bloup);
	return nbr1 + nbr2; /* This is a comment */
}

function test(number, anotherNumber) {
	var aString = "hello world";
	/* This is a comment */
	console.log(aString);
	return number + anotherNumber; /* This is a comment */
}

function lsda(lama) {
	var aString = "I am a ";
	console.log(aString);
	var aNumber = 42;
	aString += " lama";
	return aString; /* This is a comment */
}