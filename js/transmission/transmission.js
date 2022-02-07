function computeSpeed(event){
    let pitch = getInput("screw-pitch-speed");
    let rpm_in = getInput("screw-rpm");
    let rads_in = getInput("screw-rads");
    let mms_in = getInput("screw-mms");
    let mmmin_in = getInput("screw-mmmin");
    if(event == 'rpm') {
        let rads = roundDec((2*3.14159*rpm_in)/60,2);
        let mmmin = roundDec(pitch*rpm_in,2);
        let mms = roundDec(mmmin/60,2);
        document.getElementById("screw-rads").value = rads;
        document.getElementById("screw-mmmin").value = mmmin;
        document.getElementById("screw-mms").value = mms;
    }
    else if(event == 'rads') {
        let rpm = roundDec((rads_in*60)/(2*3.14159),2);
        let mmmin = roundDec(pitch*rpm,2);
        let mms = roundDec(mmmin/60,2);
        document.getElementById("screw-rpm").value = rpm;
        document.getElementById("screw-mmmin").value = mmmin;
        document.getElementById("screw-mms").value = mms;
    }
    else if(event == 'mmmin') {
        let mms = roundDec(mmmin_in/60,2);
        let rpm = roundDec(mmmin_in/pitch,2);
        let rads = roundDec((2*3.14159*rpm)/60,2);
        document.getElementById("screw-rpm").value = rpm;
        document.getElementById("screw-rads").value = rads;
        document.getElementById("screw-mms").value = mms;
    }
    else if(event == 'mms') {
        let mmmin = roundDec(mms_in*60,2);
        let rpm = roundDec(mmmin/pitch,2);
        let rads = roundDec((2*3.14159*rpm)/60,2);
        document.getElementById("screw-rpm").value = rpm;
        document.getElementById("screw-rads").value = rads;
        document.getElementById("screw-mmmin").value = mmmin;
    }

    

}

function computeForce() {
    let pitch = getInput("screw-pitch");
    let eff = getInput("screw-efficiency");
    let torque = getInput("screw-torque");
    let force = (torque*2000*3.14159*eff)/pitch;
    document.getElementById("screw-force").value=roundDec(force,2);
}

function computeTorque() {
    let pitch = getInput("screw-pitch");
    let eff = getInput("screw-efficiency");
    let force = getInput("screw-force");
    let torque = (pitch*force)/(2000*3.14159*eff);
    document.getElementById("screw-torque").value=roundDec(torque,2);
}

function getInput(id) {
    let inp = parseFloat(document.getElementById(id).value.replace(",","."));
    return inp;
}

function roundDec(nombre, precision){
	var precision = precision || 2;
	var tmp = Math.pow(10, precision);
	return Math.round( nombre*tmp )/tmp;
}