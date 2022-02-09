function roundDec(nombre, precision){
	var precision = precision || 2;
	var tmp = Math.pow(10, precision);
	return Math.round( nombre*tmp )/tmp;
}

//num is number of elements in array, from stackoverflowfrom user STJ
//https://stackoverflow.com/questions/40475155/does-javascript-have-a-method-that-returns-an-array-of-numbers-based-on-start-s 
function linspace(start, stop, num, endpoint = true) {
	const div = endpoint ? (num - 1) : num;
	const step = (stop - start) / div;
	return Array.from({length: num}, (_, i) => start + step * i);
}