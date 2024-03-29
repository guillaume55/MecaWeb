function bearingChoice_findBest(){
    let dir = parseFloat(document.getElementById('bearingChoice_axialLoadSide').value);
    //let Fa = parseFloat(document.getElementById('bearingChoice_axialLoad').value);
    //let Fr = parseFloat(document.getElementById('bearingChoice_radialLoad').value);
    let radAx = document.getElementById('bearingChoice_RadAx').value;
    let perf = document.getElementById('bearingChoice_perf').value;
    
    let paf = document.getElementById('bearingChoice_paf').checked
    let thermalConstraint = document.getElementById('bearingChoice_thermal').checked

    //values comes from nowhere, We can talk about that 
    let res = {"bearingChoice_12":5, "bearingChoice_34":5,"bearingChoice_5":5,"bearingChoice_67":5, "bearingChoice_X":5, "bearingChoice_O":5}
    if(dir==2){
        res['bearingChoice_34']-=3
        res['bearingChoice_67']-=4
    }
    if(perf==1) //economical
    {
        res['bearingChoice_67']+=3
        res['bearingChoice_5']-=3
        res['bearingChoice_X']-=4
        res['bearingChoice_O']-=4
    }
    else if(perf==3) //high perf
    {
        res['bearingChoice_67']-=3
        res['bearingChoice_5']+=3
        res['bearingChoice_X']+=3
        res['bearingChoice_O']+=3
    }
    if(radAx >3){
        res['bearingChoice_67']-=3
        res['bearingChoice_34']-=2
        res['bearingChoice_5']+=radAx
        res['bearingChoice_X']+=2
        res['bearingChoice_O']+=2
    }
    if(thermalConstraint == true){
        //hyperstatic mounting is not the friend of thermal expension
        res['bearingChoice_O']-=4
        res['bearingChoice_X']-=4

        res['bearingChoice_5']-=3
    }
    if(paf == true){
        res['bearingChoice_O']+=3
        res['bearingChoice_X']-=3
    }
    
    //Object.keys(res).sort()
    for(m of Object.keys(res)){
        if(res[m] > 10){ res[m]="&#x1f3c6;" /*trophy */}
        else if (res[m] > 4) { res[m]="&#9745;" /*checkbox checked */}
        else{ res[m]="&#9587;" /*Cross  */}
        console.log(m, res[m])
        document.getElementById(m).innerHTML = res[m]
    }



}

function bearingChoice_refreshSliderVal(val, slider){
    console.log(val, slider)
    if(slider=="perf"){
        let perfData = [T['Economical'], T['Middle'], T['High performance']]
        document.getElementById('bearingChoice_PerfVal').innerHTML = perfData[val-1]
    }
    else if(slider=="radAx"){
        let data = [T['Mainly radial'],T['More radial'],T['Equilibrated'],T['More axial'],T['Mainly axial']]
        document.getElementById('bearingChoice_RadAxVal').innerHTML = data[val-1]
    }
}