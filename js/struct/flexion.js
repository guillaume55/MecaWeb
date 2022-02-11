function computeDisplacement(){
    let len = parseFloat(document.getElementById('flexion_length').value);
    let young = parseFloat(document.getElementById('flexion_young').value);
    let load = parseFloat(document.getElementById('flexion_force').value);
    let a = parseFloat(document.getElementById("flexion_a").value);
    
    let mounting = parseFloat(getRadio('flexionMoutingType'))
    let inertia = computeInertia()

    //units !!! in newton
    let maxDisp = 0;
    let xf = "L/2"
    //formulas from Guide de Mécanique, Jean Louis Fanchon, RDM - Formulaire (page 400 of 2008 édition) ISBN 978-2-09-160711-5
    if(mounting == "encas_concen"){
        maxDisp = -(load*Math.pow(len,3))/(3*young*inertia);
    }else if(mounting == "encas_concen_ab"){
        maxDisp = -(load*Math.pow(a,2)*(3*len-a))/(6*young*inertia);
    }else if(mounting == "encas_distri"){
        maxDisp = -(load*Math.pow(a,4))/(8*young*inertia);
    }else if(mounting == "encas_distri_ab"){
        maxDisp = -(load*Math.pow(a,3)*(4*len-a))/(24*young*inertia);
    }
    else if(mounting == "2pts_concen"){
        maxDisp = -(load*Math.pow(len,3))/(48*young*inertia);
    }else if(mounting == "2pts_concen_ab"){
        let b = len-a;
        let up = load*b*Math.sqrt(len*len-b*b, 3/2)
        let down = 
        maxDisp = up/down;
        xf = Math.sqrt((len*len-b*b)/3)   //pont with max disp       
    }else if(mounting == "2pts_distri"){
        maxDisp = -(5*load*Math.pow(len,4))/(384*young*inertia);
    }
   
    console.log(young, inertia,len,mounting)
    document.getElementById('flexion_maxDisp').innerHTML = roundDec(maxDisp,8)
}


function flexion_computeInertia(){
    let thickness = parseFloat(document.getElementById("flexion_beamThick").value);
    let width = parseFloat(document.getElementById("flexion_beamWidth").value);
    let height = parseFloat(document.getElementById("flexion_beamHeight").value);
    let diam = parseFloat(document.getElementById("flexion_beamDiam").value);

    let beamType = getRadio("flexionSection")
    console.log(beamType, thickness,width,height,diam)

    let inertia = inertiaMoment(beamType, diam, thickness, width, height)
    
    document.getElementById('flexion_resInertia').innerHTML = roundDec(inertia,2)
    document.getElementById('flexion_resInertia2').innerHTML = roundDec(inertia,2)
    return inertia
}

