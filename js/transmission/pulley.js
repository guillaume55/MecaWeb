//diam1 is the small pulley
//take mm as input
function beltLength(diam1, diam2, e){
    diam1 /= 1000
    diam2 /= 1000
    e /= 1000

    let alphaSmalld = Math.PI - 2*Math.asin( (diam2-diam1)/(2*e) )
    let alphaBigD = Math.PI + 2*Math.asin( (diam2-diam1)/(2*e) )
    console.log(alphaBigD, alphaSmalld)

    let len = Math.sqrt( (4*e*e)-Math.pow(diam2-diam1,2) )
    len += 0.5*( alphaSmalld*diam1 + alphaBigD*diam2 )
    return len*1000

}


function beltLengthCrossed(diam1, diam2, e){
    diam1 /= 1000
    diam2 /= 1000
    e /= 1000

    let alpha = Math.PI - 2*Math.asin( (diam2-diam1)/(2*e) )
    console.log(alpha)
    let len = Math.sqrt( (4*e*e)-Math.pow(diam2+diam1,2) ) 
    len += 0.5*alpha*(diam1+diam2)
    return len*1000
}

function beltTension(){

}

function pulleyRatio(diam1,diam2){
    return roundDec(diam1/diam2,3)
}

function computeLengthBelt(){
    let d1 = parseFloat(document.getElementById('pulleyLen_pulley1').value)
    let d2 = parseFloat(document.getElementById('pulleyLen_pulley2').value)
    let e = parseFloat(document.getElementById('pulleyLen_e').value)

    //diam 1 is the small pulley
    if(d1 < d2){
        diam1 = d1; 
        diam2 = d2
    }else{
        diam1 = d2; 
        diam2 = d1
    }

    let len = roundDec(beltLength(diam1, diam2, e),3)
    let lenCrossed = roundDec(beltLengthCrossed(diam1, diam2, e),3)
    let ratio = roundDec(diam1/diam2, 3)
    console.log(diam1, diam2, e, len, lenCrossed)

    document.getElementById('pulleyLen_resLen').innerHTML = len;
    document.getElementById('pulleyLen_resLenCrossed').innerHTML = lenCrossed;
    document.getElementById('pulleyLen_resRatio').innerHTML = ratio;

}