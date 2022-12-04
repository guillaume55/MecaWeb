function computeBuckling(){
    pdfData = {}
    pdfData.textField = {}
    pdfData.imgField = {}
    pdfData.template = "https://guillaume55.github.io/MecaWeb/pdf/buckling_calculus_note.pdf";

    let len = parseFloat(document.getElementById('buckling_length').value);
    pdfData.textField.length = len;
    pdfData.textField.length2 = len;

    let young = parseFloat(document.getElementById('buckling_young').value);
    pdfData.textField.young = young;

    let load = parseFloat(document.getElementById('buckling_force').value);
    pdfData.textField.load = load;
    pdfData.textField.load2 = load;

    let thickness = parseFloat(document.getElementById("buckling_beamThick").value);
    let width = parseFloat(document.getElementById("buckling_beamWidth").value);
    let height = parseFloat(document.getElementById("buckling_beamHeight").value);
    let diam = parseFloat(document.getElementById("buckling_beamDiam").value);
    
    let material = document.getElementById('buckling_material').value;
    pdfData.textField.material = material;
    

    let mounting = parseFloat(getRadio('bucklingMoutingType'))
    bucklingMountingToPdfImg(mounting)

    let inertia = buckling_computeInertia(thickness, width, height, diam)

    //units !!! in newton
    let eulerCriticalLoad = (Math.PI*Math.PI * young*1000 * inertia)/(Math.pow(len*mounting,2))
    pdfData.textField.euler = roundDec(eulerCriticalLoad,1);

    if(eulerCriticalLoad > 10000){
        eulerCriticalLoad = Math.floor(eulerCriticalLoad/1000)
        document.getElementById('buckling_eulerUnit').innerHTML = 'kN'
    }else {
        eulerCriticalLoad = roundDec(eulerCriticalLoad,1)
        document.getElementById('buckling_eulerUnit').innerHTML = 'N'
    }
    document.getElementById('buckling_eulerCritical').innerHTML = eulerCriticalLoad

    fillPdf(pdfData);
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


function buckling_computeInertia(thickness, width, height, diam){
    let beamType = getRadio("bucklingSection")

    let inertia = inertiaMoment(beamType, diam, thickness, width, height)
    pdfData.textField.moment = roundDec(inertia,2);
    inertiaShapeToPdf(beamType, diam, thickness, width, height)

    document.getElementById('buckling_resInertia').value = roundDec(inertia,0)
    document.getElementById('buckling_resInertia2').innerHTML = roundDec(inertia,0)
    return inertia
}

function bucklingMountingToPdfImg(mounting){
    pdfData.imgField.mounting = {pos: [300,330], size:[50,70], page:0}
    console.log("mounting", mounting)
    if(mounting == 2)
    {
        pdfData.imgField.mounting.url = "https://guillaume55.github.io/MecaWeb/img/flambage_fixedFree.png"
        pdfData.textField.coef = 2
        pdfData.textField.load_type_txt = T["Fixed"] + " - " + T['Free']
    }
    else if (mounting == 0.7)
    {
        pdfData.imgField.mounting.url = "https://guillaume55.github.io/MecaWeb/img/flambage_fixedRot.png"
        pdfData.textField.coef = 0.7
        pdfData.textField.load_type_txt  = T["Fixed"] + " - " + T['Pinned']
    }
    else if (mounting == 1)
    {
        pdfData.imgField.mounting.url = "https://guillaume55.github.io/MecaWeb/img/flambage_RotRot.png"
        pdfData.textField.coef = 1
        pdfData.textField.load_type_txt  = T["Pinned"] + " - " + T['Pinned']
    }
    else if (mounting == 0.5)
    {
        pdfData.imgField.mounting.url = "https://guillaume55.github.io/MecaWeb/img/flambage_fixedFixed.png"
        pdfData.textField.coef = 0.5
        pdfData.textField.load_type_txt  = T["Fixed"] + " - " + T['Fixed']
    }
    
}