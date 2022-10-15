function computeFlexion(){
    computeDisplacement()
}

function computeDisplacement(){
    let len = parseFloat(document.getElementById('flexion_length').value)/1000;
    let young = parseFloat(document.getElementById('flexion_young').value)*1000000000;
    let f = parseFloat(document.getElementById('flexion_force').value);
    let q = parseFloat(document.getElementById('flexion_q').value);
    let a = parseFloat(document.getElementById("flexion_a").value)/1000;
    
    if(a >= len){
        document.getElementById('flexion_maxDisp').innerHTML = "a should be < beam length"
    }

    let mounting = getRadio('flexionMoutingType')
    let inertia = flexion_computeInertia()/1000000000000

    //units !!! in newton
    let maxDisp = 0;
    let xf = "x=L/2"
    //formulas from Guide de Mécanique, Jean Louis Fanchon, RDM - Formulaire (page 400 of 2008 édition) ISBN 978-2-09-160711-5
    if(mounting == "encas_concen"){ 
        maxDisp = -(f*Math.pow(len,3))/(3*young*inertia);
        xf = "x=L"
    }else if(mounting == "encas_concen_ab"){  
        maxDisp = -(f*Math.pow(a,2)*(3*len-a))/(6*young*inertia);
        xf = "x=L"
    }else if(mounting == "encas_distri"){
        maxDisp = -(q*Math.pow(len,4))/(8*young*inertia);
        xf = "x=L"
    }else if(mounting == "encas_distri_ab"){
        maxDisp = -(q*Math.pow(a,3)*(4*len-a))/(24*young*inertia);
        xf = "x=L"
    }
    else if(mounting == "2pts_concen"){  
        maxDisp = -(f*Math.pow(len,3))/(48*young*inertia);
    }else if(mounting == "2pts_concen_ab"){  //this formula is from omni calculator
        let b = len-a;
        let up = f*b*(3*len*len-4*b*b)
        let down = 48*young*inertia
        maxDisp = up/down;
        xf = `x=${Math.sqrt((len*len-b*b)/3)}`   //pont with max disp       
    }else if(mounting == "2pts_distri"){
        maxDisp = -(5*q*Math.pow(len,4))/(384*young*inertia);
    }

    maxDisp = -maxDisp*1000 //m to mm, reverted sign, we can imagine that maxDisp in <0
    console.log("maxDisp", maxDisp)
    if(maxDisp < 1){ //in µm
        maxDisp = maxDisp*1000;
        document.getElementById('flexion_maxDisp_unit').innerHTML = "µm";
        console.log("maxDisp um", maxDisp)
    }
    if(maxDisp < 1){ //in nm
        maxDisp = maxDisp*1000;
        console.log("maxDispnm", maxDisp)
        document.getElementById('flexion_maxDisp_unit').innerHTML = "nm";
    }

    console.log(young, inertia,len,mounting)
    document.getElementById('res_flexionLowest').innerHTML = xf

    document.getElementById('res_flexionLength').innerHTML = len
    document.getElementById('res_flexionForce').innerHTML = f
    document.getElementById('res_flexionYoung').innerHTML = roundDec(young/1000000000,2)
    document.getElementById('res_flexionQ').innerHTML = mounting.search("distri") != -1 ? q : "X"
    document.getElementById('res_flexionInertia').innerHTML = roundDec(inertia*1000000000000,2)
    document.getElementById('res_flexionA').innerHTML = mounting.search("ab") != -1 ? a : "X"
    document.getElementById('flexion_maxDisp').innerHTML = roundDec(maxDisp,3)
}


function flexion_computeInertia(){
    let thickness = parseFloat(document.getElementById("flexion_beamThick").value);
    let width = parseFloat(document.getElementById("flexion_beamWidth").value);
    let height = parseFloat(document.getElementById("flexion_beamHeight").value);
    let diam = parseFloat(document.getElementById("flexion_beamDiam").value);

    let beamType = getRadio("flexionSection")
    console.log(beamType, thickness,width,height,diam)

    let inertia = inertiaMoment(beamType, diam, thickness, width, height)
    
    document.getElementById('flexion_resInertia').value = roundDec(inertia,2)
    return inertia
}

function flexion_refreshQ(f){
    let len = parseFloat(document.getElementById('flexion_length').value)/1000;
    document.getElementById('flexion_q').value = roundDec(f/len,2)
}

function flexion_refreshF(q){
    let len = parseFloat(document.getElementById('flexion_length').value)/1000;
    document.getElementById('flexion_force').value = roundDec(q*len,2)
}

function lockF(){
    console.log("locked")
    document.getElementById('flexion_force').setAttribute("readonly",'true');
}

function unlockF(){
    console.log("unlocked")
    document.getElementById('flexion_force').removeAttribute("readonly");
}