
function computeMass(prefix="mass"){
    let len = parseFloat(document.getElementById(prefix+'_beamLen').value);
    let thickness = parseFloat(document.getElementById(prefix+"_beamThick").value);
    let width = parseFloat(document.getElementById(prefix+"_beamWidth").value);
    let height = parseFloat(document.getElementById(prefix+"_beamHeight").value);
    let diam = parseFloat(document.getElementById(prefix+"_beamDiam").value);
    let density = parseFloat(document.getElementById(prefix+"_density").value);

    let shape = getRadio(prefix+'Shape')
    let mass = NaN; //if something goes wrong, display NaN instead of a wrong value
    let sectionArea = NaN; 
    let totalArea = NaN; 
    let volume = NaN;

    if(shape == "pa" || shape == "rect"){
        sectionArea = width*height;
        totalArea = 2*width*height+2*width*len+2*len*height;
        volume = width*height*len

    } else if (shape == "pa_hollow" || shape == "rect_pipe") {
        console.log("pa_hoolow")
        sectionArea = width*height-( (width-(2*thickness))*(height-(2*thickness)) );
        totalArea = 2*width*len+2*len*height; //external sides but not section
        totalArea += sectionArea*2; //section
        totalArea += 2* ( (width-(2*thickness))*len ) //2 internal sides
        totalArea += 2* ( (height-(2*thickness))*len ) //2 other internal sides
        volume = sectionArea * len;
    } else if (shape == "cyl" || shape == "circ") {
        let r = diam/2;
        sectionArea = Math.PI * r*r;
        totalArea = 2*Math.PI*r*len;
        volume = sectionArea * len;

    } else if (shape == "cyl_hollow" || shape == "circ_pipe") {
        let r = diam/2;
        let rInt = r-thickness;
        sectionArea = Math.PI * r*r - (Math.Pi *rInt*rInt);
        totalArea = 2*Math.PI*r*len; //outside
        totalArea += 2*sectionArea //2 sections
        totalArea += 2*Math.PI*rInt*len;
        volume = sectionArea * len;
    }
    mass = volume*density/1000000000;
    console.log("shape",shape)
    console.log("mass",mass)        

    //we are in kg until now
    let massKg = mass;  //keep the kg value
    if(prefix == "mass") {
        let cost = parseFloat(document.getElementById(prefix+"_costKg").value);
        cost = mass * cost
        if(mass < 1){
            document.getElementById(prefix+'_unit').innerHTML = "g"
            mass*=1000;
        }
        else{
            document.getElementById(prefix+'_unit').innerHTML = "kg"
        }

        document.getElementById(prefix+'_mass').innerHTML = roundDec(mass,4)
        document.getElementById(prefix+'_sectionArea').innerHTML = roundDec(sectionArea,3)
        document.getElementById(prefix+'_totalArea').innerHTML = roundDec(totalArea,3)
        document.getElementById(prefix+'_volume').innerHTML = roundDec(volume,3)
        document.getElementById(prefix+'_cost').innerHTML = roundDec(cost,2)
    }
    return massKg;
}
