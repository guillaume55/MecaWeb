function computeBuckling(){
    let len = parseFloat(document.getElementById('buckling_length').value);
    let young = parseFloat(document.getElementById('buckling_young').value);
    let load = parseFloat(document.getElementById('buckling_force').value);
    let thickness = parseFloat(document.getElementById("buckling_beamThick").value);
    let width = parseFloat(document.getElementById("buckling_beamWidth").value);
    let height = parseFloat(document.getElementById("buckling_beamHeight").value);
    let diam = parseFloat(document.getElementById("buckling_beamDiam").value);
    
    let mounting = parseFloat(getRadio('bucklingMoutingType'))
    let inertia = buckling_computeInertia()

    //units !!! in newton
    let eulerCriticalLoad = (Math.PI*Math.PI * young*1000 * inertia)/(Math.pow(len*mounting,2))
    console.log(young, inertia,len,mounting)
    document.getElementById('buckling_eulerCritical').innerHTML = roundDec(eulerCriticalLoad,2)
}


function showBeamParams(beamType, prefix) {
    prefix = prefix.trim()
    if(beamType.search("rect")!=-1) {
        document.getElementById(prefix+"_beamHeight_div").style.display="Block";
        document.getElementById(prefix+"_beamWidth_div").style.display="Block";
        document.getElementById(prefix+"_beamDiam_div").style.display="none";
    }
    if(beamType.search("circ")!=-1) {
        document.getElementById(prefix+"_beamHeight_div").style.display="none";
        document.getElementById(prefix+"_beamWidth_div").style.display="none";
        document.getElementById(prefix+"_beamDiam_div").style.display="block";
    }
    if(beamType.search("pipe")!=-1) {
        document.getElementById(prefix+"_beamThick_div").style.display="Block";
    }else {
        document.getElementById(prefix+"_beamThick_div").style.display="none";
    }
}


function buckling_computeInertia(){
    let thickness = parseFloat(document.getElementById("buckling_beamThick").value);
    let width = parseFloat(document.getElementById("buckling_beamWidth").value);
    let height = parseFloat(document.getElementById("buckling_beamHeight").value);
    let diam = parseFloat(document.getElementById("buckling_beamDiam").value);

    let beamType = getRadio("bucklingSection")

    let inertia = inertiaMoment(beamType, diam, thickness, width, height)

    document.getElementById('buckling_resInertia').innerHTML = roundDec(inertia,2)
    document.getElementById('buckling_resInertia2').innerHTML = roundDec(inertia,2)
    return inertia
}

