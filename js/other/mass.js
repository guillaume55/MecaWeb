
function computeMass(){
    let len = parseFloat(document.getElementById('mass_beamLen').value);
    let thickness = parseFloat(document.getElementById("mass_beamThick").value);
    let width = parseFloat(document.getElementById("mass_beamWidth").value);
    let height = parseFloat(document.getElementById("mass_beamHeight").value);
    let diam = parseFloat(document.getElementById("mass_beamDiam").value);
    let density = parseFloat(document.getElementById("mass_density").value);

    let shape = getRadio('massShape')
    let mass = NaN; let sectionArea = NaN; let totalArea = NaN; let volume = NaN

    if(shape == "pa"){
        sectionArea = width*height;
        totalArea = 2*width*height+2*width*len+2*len*height;
        volume = width*height*len

    } else if (shape == "pa_hollow") {
        console.log("pa_hoolow")
        sectionArea = width*height-( (width-(2*thickness))*(height-(2*thickness)) );
        totalArea = 2*width*len+2*len*height; //external sides but not section
        totalArea += sectionArea*2; //section
        totalArea += 2* ( (width-(2*thickness))*len ) //2 internal sides
        totalArea += 2* ( (height-(2*thickness))*len ) //2 other internal sides
        volume = sectionArea * len;
    } else if (shape == "cyl") {
        let r = diam/2;
        sectionArea = Math.PI * r*r;
        totalArea = 2*Math.PI*r*len;
        volume = sectionArea * len;

    } else if (shape == "cyl_hollow") {
        let r = diam/2;
        let rInt = r-thickness;
        sectionArea = Math.PI * r*r - (Math.Pi *rInt*rInt);
        totalArea = 2*Math.PI*r*len; //outside
        totalArea += 2*sectionArea //2 sections
        totalArea += 2*Math.PI*rInt*len;
        volume = sectionArea * len;
    }
    mass = volume*density/1000000000;
    console.log(mass)
    if(mass < 1){
        document.getElementById('mass_unit').innerHTML = "g"
        mass*=1000;
    }
    else{
        document.getElementById('mass_unit').innerHTML = "kg"
    }

    document.getElementById('mass_mass').innerHTML = roundDec(mass,4)
    document.getElementById('mass_sectionArea').innerHTML = roundDec(sectionArea,3)
    document.getElementById('mass_totalArea').innerHTML = roundDec(totalArea,3)
    document.getElementById('mass_volume').innerHTML = roundDec(volume,3)
}
