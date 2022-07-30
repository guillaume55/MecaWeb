function computeBearingLoads(){
    let load = parseFloat(document.getElementById("bearingLoad_load").value);
    let e = parseFloat(document.getElementById("bearingLoad_e").value)/1000;
    let L = parseFloat(document.getElementById("bearingLoad_L").value)/1000;
    let loadCase = getRadio("bearingLoad_mount");
    let loadA = "###";
    let loadB = "###";

    if( loadCase == "out"){
        loadA = -((e+L)*load)/e + load
        loadB = -(L*load)/e - load
    } else if (loadCase == 'in'){
        loadB = (load*L)/e;
        console.log(`(${load}*${L})/${e}`)
        loadA = load-loadB;
        
    }

    if(loadA > 10000){
        document.getElementById('bearingLoad_unitA').innerHTML = "kN"
        loadA = roundDec(loadA/1000,1)
    }else {
        document.getElementById('bearingLoad_unitA').innerHTML = "N"
        loadA = roundDec(loadA,3)
    }
    if (loadB > 10000){
        document.getElementById('bearingLoad_unitB').innerHTML = "kN"
        loadB = roundDec(loadB/1000,1)
    }else {
        document.getElementById('bearingLoad_unitB').innerHTML = "N"
        loadB = roundDec(loadB,3)
    }

    document.getElementById("bearingLoad_resA").innerHTML = loadA;
    document.getElementById("bearingLoad_resB").innerHTML = loadB;
}