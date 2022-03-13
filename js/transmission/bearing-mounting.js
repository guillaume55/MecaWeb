function bearingChoice_findBest(){
    let dir = parseFloat(document.getElementById('bearingChoice_axialLoadSide').value);
    let Fa = parseFloat(document.getElementById('bearingChoice_axialLoad').value);
    let Fr = parseFloat(document.getElementById('bearingChoice_radialLoad').value);
    let perf = parseFloat(document.getElementById('bearingChoice_perf').value);
}

function bearingChoice_refreshSliderVal(val, slider){
    console.log(val, slider)
    if(slider=="perf"){
        //let perfData = [T['Economical'], T['Middle'], T['High performance']]
        let perfData = ['Economical', 'Middle', 'High performance']
        document.getElementById('bearingChoice_PerfVal').innerHTML = perfData[val-1]
    }
    else if(slider=="radAx"){
        let data = [T['Mainly radial'],T['More radial'],T['Equilibrated'],T['More axial'],T['Mainly axial']]
        document.getElementById('bearingChoice_RadAx').innerHTML = data[val-1]
    }
}