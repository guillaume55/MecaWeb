function getScrewData(){
    //also called din912
    let screwData = {
        "M3_iso4762":{"head_size":5.5 ,"section":5.03, "pitch":0.5, "nominal_diam":3, "drill_diam":2.5, "hole":3.4},
        "M4_iso4762":{"head_size":7 ,"section":8.78, "pitch":0.7, "nominal_diam":4, "drill_diam":3.3, "hole":4.5},
        "M5_iso4762":{"head_size":8.5 ,"section":14.2, "pitch":0.8, "nominal_diam":5, "drill_diam":4.2, "hole":5.5},
        "M6_iso4762":{"head_size":10 ,"section":20.1, "pitch":1, "nominal_diam":6, "drill_diam":5, "hole":6.6},
        "M8_iso4762":{"head_size":13 ,"section":36.6, "pitch":1.25, "nominal_diam":8, "drill_diam":6.8, "hole":9},
        "M10_iso4762":{"head_size":16 ,"section":58.0, "pitch":1.5, "nominal_diam":10, "drill_diam":8.5, "hole":11},
        "M12_iso4762":{"head_size":18 ,"section":84.3, "pitch":1.75, "nominal_diam":12, "drill_diam":10.25, "hole":13.5},
        "M14_iso4762":{"head_size":21 ,"section":115.0, "pitch":2, "nominal_diam":14, "drill_diam":12, "hole":15.5},
        "M16_iso4762":{"head_size":24 ,"section":157.0, "pitch":2, "nominal_diam":16, "drill_diam":14, "hole":17.5},
        "M18_iso4762":{"head_size":27 ,"section":192.0, "pitch":2.5, "nominal_diam":18, "drill_diam":15.5, "hole":20},
        "M20_iso4762":{"head_size":30 ,"section":245.0, "pitch":2.5, "nominal_diam":20, "drill_diam":17.5, "hole":22},
        "M22_iso4762":{"head_size":33 ,"section":303, "pitch":2.5, "nominal_diam":22, "drill_diam":19.5, "hole":24},
        "M24_iso4762":{"head_size":36 ,"section":353, "pitch":3, "nominal_diam":24, "drill_diam":21, "hole":26},
        "M27_iso4762":{"head_size":40 ,"section":459, "pitch":3, "nominal_diam":27, "drill_diam":24, "hole":30},
        "M30_iso4762":{"head_size":45 ,"section":561, "pitch":3.5, "nominal_diam":30, "drill_diam":26.5, "hole":33},
        "M33_iso4762":{"head_size":50 ,"section":694, "pitch":3.5, "nominal_diam":33, "drill_diam":29.5, "hole":36},
        "M36_iso4762":{"head_size":55 ,"section":817, "pitch":4, "nominal_diam":36, "drill_diam":32, "hole":39},

        "M3_iso4017":{"head_size":5.5 ,"section":5.03, "pitch":0.5, "nominal_diam":3, "drill_diam":2.5, "hole":3.4},
        "M4_iso4017":{"head_size":7 ,"section":8.78, "pitch":0.7, "nominal_diam":4, "drill_diam":3.3, "hole":4.5},
        "M5_iso4017":{"head_size":8 ,"section":14.2, "pitch":0.8, "nominal_diam":5, "drill_diam":4.2, "hole":5.5},
        "M6_iso4017":{"head_size":10 ,"section":20.1, "pitch":1, "nominal_diam":6, "drill_diam":5, "hole":6.6},
        "M8_iso4017":{"head_size":13 ,"section":36.6, "pitch":1.25, "nominal_diam":8, "drill_diam":6.8, "hole":9},
        "M10_iso4017":{"head_size":17 ,"section":58.0, "pitch":1.5, "nominal_diam":10, "drill_diam":8.5, "hole":11},
        "M12_iso4017":{"head_size":19 ,"section":84.3, "pitch":1.75, "nominal_diam":12, "drill_diam":10.5, "hole":13.5},
        "M14_iso4017":{"head_size":22 ,"section":115.0, "pitch":2, "nominal_diam":14, "drill_diam":12, "hole":15.5},
        "M16_iso4017":{"head_size":24 ,"section":157.0, "pitch":2, "nominal_diam":16, "drill_diam":14, "hole":17.5},
        "M18_iso4017":{"head_size":27 ,"section":192.0, "pitch":2.5, "nominal_diam":18, "drill_diam":15.5, "hole":20},
        "M20_iso4017":{"head_size":30 ,"section":245.0, "pitch":2.5, "nominal_diam":20, "drill_diam":17.5, "hole":22},
        "M22_iso4017":{"head_size":34 ,"section":303, "pitch":2.5, "nominal_diam":22, "drill_diam":19.5, "hole":24},
        "M24_iso4017":{"head_size":36 ,"section":353, "pitch":3, "nominal_diam":24, "drill_diam":21, "hole":26},
        "M27_iso4017":{"head_size":41 ,"section":459, "pitch":3, "nominal_diam":27, "drill_diam":24, "hole":30},
        "M30_iso4017":{"head_size":46 ,"section":561, "pitch":3.5, "nominal_diam":30, "drill_diam":26.5, "hole":33},
        "M33_iso4017":{"head_size":50 ,"section":694, "pitch":3.5, "nominal_diam":33, "drill_diam":29.5, "hole":36},
        "M36_iso4017":{"head_size":55 ,"section":817, "pitch":4, "nominal_diam":36, "drill_diam":32, "hole":39}
    }

    return screwData;
}

function getSwcrewMaxLoad(elasticLimit,section) {
    return 0.9*elasticLimit*section
}

function computeScrewTorque(pitch, nomDiam, friction, headDiam, tension, drill_diam, hole){
    let Dt = 0.5 * (nomDiam + drill_diam)
    let Dh = 0.5 * (headDiam + hole)
    let argDt = (friction * Dt) / 1.715
    let argDh = (friction * Dh) / 2
    console.log("computeScrewTorque", Dt, Dh, headDiam, hole)
    //flankDiam = nomDiam - 0.6495*pitch
    //console.log(pitch,flankDiam,friction,headDiam,tension)
    //return (0.16*pitch+0.583*flankDiam*friction+0.5*friction*headDiam)*tension
    return tension * (0.161 * pitch + argDt + argDh)
}

function fillScrewTable(){
    let screwSize = document.getElementById("screwLoad_size").value;
    let elasticLimit = parseFloat(document.getElementById("screwLoad_type").value);
    let coating = document.getElementById('screwLoad_surface').value;
    let percentOfRe = parseFloat(document.getElementById('screwLoad_percentReSlider').value)/100;
    let wrenchPrecision = parseFloat(document.getElementById('screwLoad_wrench').value);
    
    let data = getScrewData();

    
    //console.log("tension",percentOfRe, wrenchPrecision, data[screwSize]['section'],elasticLimit)
    let tension = (percentOfRe * elasticLimit * data[screwSize]['section'])/wrenchPrecision;
    let load = getSwcrewMaxLoad(elasticLimit,data[screwSize]['section']);
    let torque = computeScrewTorque(data[screwSize]['pitch'],data[screwSize]['nominal_diam'],coating,data[screwSize]['head_size'],tension, data[screwSize]['drill_diam'],data[screwSize]['hole']);
     console.log(data[screwSize]);
    //fill table
    document.getElementById("screwLoad_resTension").innerHTML = Math.floor(tension);
    document.getElementById("screwLoad_resElasticLimit").innerHTML = elasticLimit;
    document.getElementById("screwLoad_resPitch").innerHTML = data[screwSize]['pitch'];
    document.getElementById("screwLoad_resHeadSize").innerHTML = data[screwSize]['head_size'];
    document.getElementById("screwLoad_resSection").innerHTML = data[screwSize]['section'];
    document.getElementById("screwLoad_resLoad").innerHTML = roundDec(load/1000,3);
    document.getElementById("screwLoad_resTorque").innerHTML = roundDec(torque/1000,3);
}

//show or hide torque section
function screwLoad_showTorque(state){
    let display
    state ? display="block" : display="none";
    //console.log(display)
    document.getElementById('screwLoad_torqueRelated').style.display = display;
    document.getElementById('screwLoad_torqueRes').style.display = display;

}
