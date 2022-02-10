function computeBuckling(){
    let len = parseFloat(document.getElementById('buckling_length').value);
    let young = parseFloat(document.getElementById('buckling_young').value);
    let load = parseFloat(document.getElementById('buckling_force').value);
    let thickness = parseFloat(document.getElementById("buckling_beamThick").value);
    let width = parseFloat(document.getElementById("buckling_beamWidth").value);
    let height = parseFloat(document.getElementById("buckling_beamHeight").value);
    let diam = parseFloat(document.getElementById("buckling_beamDiam").value);
    
    let mounting = parseFloat(getRadio('bucklingMoutingType'))
    let inertia = computeInertia()

    //units !!! in newton
    let eulerCriticalLoad = (Math.PI*Math.PI * young*1000 * inertia)/(Math.pow(len*mounting,2))
    console.log(young, inertia,len,mounting)
    document.getElementById('buckling_eulerCritical').innerHTML = roundDec(eulerCriticalLoad,2)
}

function selectYoung(val){
    let materials = getMaterials()
    let young = 0
    for(k of Object.keys(materials)){
        if(materials[k][val] != undefined){
            young = materials[k][val];
        }
    }

    if(val == "custom"){
        //document.getElementById('arcB_coef').style.display ="none";
    }else {
        //document.getElementById('arcB_coef').style.display ="block";
        document.getElementById('buckling_young').value = young;
    }
}

function getMaterials(){
    let steels = {"Stainless":195,"A36":200}
    let al = {"Al 1100":69,"Al 2024":72.4,"Al 6061":69,"Al7075":71}
    let otherMetals = {"Brass":106,"Bronze":112,"Inconel":207,"Copper":110,"Gold":77.2,"Mg alloy":45.2,"Nickel":200, "Ti Alloy Ti- 6AL-4V":114}
    let plastics = {"HDPE":1.1,"LDPE":0.228,"PC":2.2,"PP":1.68,"PET":3.14,"Nylon 66":2.93}
    let other = {"Human bone":14,"Diamond":1130}
    let materials = {"":{"custom":""},"Steel":steels,"Aluminum":al,"Other metals":otherMetals,"Plastics":plastics, "Other": other}
    
    return materials
}

function showBeamParams(beamType) {
    if(beamType.search("rect")!=-1) {
        document.getElementById("buckling_beamHeight_div").style.display="Block";
        document.getElementById("buckling_beamWidth_div").style.display="Block";
        document.getElementById("buckling_beamDiam_div").style.display="none";
    }
    if(beamType.search("circ")!=-1) {
        document.getElementById("buckling_beamHeight_div").style.display="none";
        document.getElementById("buckling_beamWidth_div").style.display="none";
        document.getElementById("buckling_beamDiam_div").style.display="block";
    }
    if(beamType.search("pipe")!=-1) {
        document.getElementById("buckling_beamThick_div").style.display="Block";
    }else {
        document.getElementById("buckling_beamThick_div").style.display="none";
    }
}

function getRadio(name){
    radios = document.getElementsByName(name)
    for(e of radios){
        if(e.checked==true)
            return e.value
    }
}

function computeInertia(){
    let thickness = parseFloat(document.getElementById("buckling_beamThick").value);
    let width = parseFloat(document.getElementById("buckling_beamWidth").value);
    let height = parseFloat(document.getElementById("buckling_beamHeight").value);
    let diam = parseFloat(document.getElementById("buckling_beamDiam").value);

    let beamType = getRadio("bucklingSection")
    console.log(beamType, thickness,width,height,diam)


    let inertia = 0

    if(beamType == "circ") {
        inertia = (Math.PI*Math.pow(diam,4))/64
    }
    else if(beamType == "circ_pipe") {
        inertia = (Math.PI*Math.pow(diam,4))/64 - (Math.PI*Math.pow((diam-thickness*2),4))/64
    }
    else if(beamType == "rect") {
        inertia = (width*Math.pow(height,3))/12
    }
    else if(beamType == "rect_pipe") {
        inertia = (width*Math.pow(height,3))/12-inertia - ((width-thickness*2)*Math.pow((height-thickness*2),3))/12
    }

    document.getElementById('buckling_resInertia').innerHTML = roundDec(inertia,2)
    document.getElementById('buckling_resInertia2').innerHTML = roundDec(inertia,2)
    return inertia
}

