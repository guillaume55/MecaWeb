function computeFlexion(){
    pdfData = {}
    pdfData.textField = {}
    pdfData.imgField = {}

    pdfData.template = "https://guillaume55.github.io/MecaWeb/pdf/flexion_calculus_note.pdf";

    let len = parseFloat(document.getElementById('flexion_beamLen').value)
    pdfData.textField.length =  len
    pdfData.textField.length2 =  len
    len = len/1000;
    
    let young = parseFloat(document.getElementById('flexion_young').value);
    pdfData.textField.young = young
    young = young *1000000000

    let f = parseFloat(document.getElementById('flexion_force').value);
    pdfData.textField.load = f;
    pdfData.textField.load2 = f;

    let q = parseFloat(document.getElementById('flexion_q').value);
    pdfData.textField.q_load = q;

    let a = parseFloat(document.getElementById("flexion_a").value)/1000;
    //do not fill it here, an ancient value can be in the hidden field, we don't want to copy it if unused in our case

    let material = document.getElementById('flexion_material').value;
    pdfData.textField.material = material;

    let density = document.getElementById('flexion_density').value;
    pdfData.textField.density = density;

    computeDisplacement(len, young, f,q,a)

    fillPdf(pdfData);
}

function computeDisplacement(len, young, f,q,a){

    if(a >= len){
        document.getElementById('flexion_maxDisp').innerHTML = "a should be < beam length"
    }

    let deadWeight = document.getElementById('flexion_deadWeight').checked;
    let deadWeightForce = getSelfWeight();
    let deadWeightDisp = 0
    console.log(deadWeightForce)

    let mounting = getRadio('flexionMoutingType')
    let inertia = flexion_computeInertia()/1000000000000

    //units !!! in newton
    let maxDisp = 0;
    let xf = "x=L/2"

    //for displaying img on pdf
    pdfData.imgField.load_type = {}
    pdfData.imgField.load_type.pos = [270,310];
    pdfData.imgField.load_type.size = [150,70];
    pdfData.imgField.load_type.page = 0;

    //formulas from Guide de Mécanique, Jean Louis Fanchon, RDM - Formulaire (page 400 of 2008 édition) ISBN 978-2-09-160711-5
    if(mounting == "encas_concen")
    { 
        maxDisp = -(f*Math.pow(len,3))/(3*young*inertia);
        xf = "x=L"
        pdfData.imgField.load_type.url = "https://guillaume55.github.io/MecaWeb/img/flexion_F.png"
        pdfData.textField.load_type_txt = T['Encastré with point concentrated force']
    }
    else if(mounting == "encas_concen_ab")
    {  
        maxDisp = -(f*Math.pow(a,2)*(3*len-a))/(6*young*inertia);
        xf = "x=L"
        pdfData.imgField.load_type.url = "https://guillaume55.github.io/MecaWeb/img/flexion_F_ab.png"
        pdfData.textField.load_type_txt = T['Encastré with point concentrated force']
    }
    else if(mounting == "encas_distri")
    {
        maxDisp = -(q*Math.pow(len,4))/(8*young*inertia);
        xf = "x=L"
        pdfData.imgField.load_type.url = "https://guillaume55.github.io/MecaWeb/img/flexion_Q.png"
        pdfData.textField.load_type_txt = T['Encastré with distributed force']
    }
    else if(mounting == "encas_distri_ab")
    {
        maxDisp = -(q*Math.pow(a,3)*(4*len-a))/(24*young*inertia);
        xf = "x=L"
        pdfData.imgField.load_type.url = "https://guillaume55.github.io/MecaWeb/img/flexionQ_ab.png"
        pdfData.textField.load_type_txt = T['Encastré with distributed force']
    }
    else if(mounting == "2pts_concen")
    { 
        maxDisp = -(f*Math.pow(len,3))/(48*young*inertia);
        pdfData.imgField.load_type = "https://guillaume55.github.io/MecaWeb/img/flexion_F_2pts.png"
        pdfData.textField.load_type_txt = T['2 points concentrated force']
    }
    else if(mounting == "2pts_concen_ab") //this formula is from omni calculator
    {  
        let b = len-a;
        let up = f*b*(3*len*len-4*b*b)
        let down = 48*young*inertia
        maxDisp = up/down;
        xf = `x=${Math.sqrt((len*len-b*b)/3)}`   //pont with max disp
        pdfData.imgField.load_type.url = "https://guillaume55.github.io/MecaWeb/img/flexion_F_2pts_ab.png"
        pdfData.textField.load_type_txt = T['2 points concentrated force']
    }
    else if(mounting == "2pts_distri")
    {
        maxDisp = -(5*q*Math.pow(len,4))/(384*young*inertia);
        pdfData.imgField.load_type.url = "https://guillaume55.github.io/MecaWeb/img/flexion_Q_2pts.png"
        pdfData.textField.load_type_txt = T['2 points distributed force']
    }

    if(mounting == "encas_concen" || mounting == "encas_concen_ab" || mounting == "encas_distri" || mounting == "encas_distri_ab"){
        deadWeightDisp = -(deadWeightForce*Math.pow(len/2,2)*(3*len/2))/(6*young*inertia);
        console.log("deadweight", deadWeightForce, deadWeightDisp)
    }
    else 
    {
        deadWeightDisp = -(5*(deadWeightForce/len)*Math.pow(len,4))/(384*young*inertia);
    }

    if(deadWeight)
    {
        maxDisp = deadWeightDisp + maxDisp
    }

    maxDisp = -maxDisp*1000 //m to mm, reverted sign, we can imagine that maxDisp is <0
    pdfData.textField.max_disp = roundDec(maxDisp,6) //before changing units
    pdfData.textField.abs = xf //lowest point

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

    document.getElementById('res_flexionLowest').innerHTML = xf

    document.getElementById('res_flexionLength').innerHTML = len
    document.getElementById('res_flexionForce').innerHTML = f
    document.getElementById('res_flexionYoung').innerHTML = roundDec(young/1000000000,2)
    q_val = mounting.search("distri") != -1 ? q : "X"
    document.getElementById('res_flexionQ').innerHTML = q_val
    pdfData.textField.q_load = q_val;

    inertia_val = roundDec(inertia*1000000000000,2)
    document.getElementById('res_flexionInertia').innerHTML = inertia_val
    pdfData.textField.moment = inertia_val

    dist_a = mounting.search("ab") != -1 ? a : "X"
    document.getElementById('res_flexionA').innerHTML = dist_a
    pdfData.textField.dist_a = dist_a

    document.getElementById('flexion_maxDisp').innerHTML = roundDec(maxDisp,3)
}


function flexion_computeInertia(){
    let thickness = parseFloat(document.getElementById("flexion_beamThick").value);
    let width = parseFloat(document.getElementById("flexion_beamWidth").value);
    let height = parseFloat(document.getElementById("flexion_beamHeight").value);
    let diam = parseFloat(document.getElementById("flexion_beamDiam").value);

    let beamType = getRadio("flexionShape")
    console.log(beamType, thickness,width,height,diam)

    let inertia = inertiaMoment(beamType, diam, thickness, width, height)
    inertiaShapeToPdf(beamType, diam, thickness, width, height) //complete pdf data
    
    document.getElementById('flexion_resInertia').value = roundDec(inertia,2)
    return inertia
}

function flexion_refreshQ(f){
    let len = parseFloat(document.getElementById('flexion_beamLen').value)/1000;
    document.getElementById('flexion_q').value = roundDec(f/len,2)
}

function flexion_refreshF(q){
    let len = parseFloat(document.getElementById('flexion_beamLen').value)/1000;
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

function getSelfWeight(){ //return weight in N on earth
    let mass = computeMass("flexion");
    return mass * 9.81
}