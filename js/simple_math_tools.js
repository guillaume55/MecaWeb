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

//return variables involved in equation. need coffeequate
function getVariables(expr) {
    let x = CQ(expr).getAllVariables() 
    return x
}

//linearInterpolation
//main will gives the ratio between start and end point 
//this ratio will be applied on each array of args
function linInt(main, args){
	let res = []
	for(arg of args){
		let x = main[0]; let x0=main[1]; let x1=main[2];
		let y0 = arg[0]; let y1 = arg[1]
		console.log(x,x0,x1,y0,y1)
		d = x1 - x0;
		y = y0 + (x - x0) * (y1 - y0) /d;

		res.push(y)
	}
	return res
}