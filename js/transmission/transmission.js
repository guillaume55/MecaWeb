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

function speedCurve(){
    let vi = parseFloat(document.getElementById('curve_speedInit').value);
    let vf = parseFloat(document.getElementById('curve_speedFinal').value);
    let a = parseFloat(document.getElementById('curve_accel').value);
    let d = parseFloat(document.getElementById('curve_dist').value);
    console.log(vi,vf,a,d)

    //time to do the movement
    let ta = (vf - vi) / a //time spent on accel
    let dist_accel = vi * ta + 0.5 * a * ta * ta
    let dist_flat = d - dist_accel * 2
    let tf = dist_flat / vf //length (s) of the flat part
    if(dist_flat <= 0) //can't reach max speed at time
        tf = 0
    
    let totalTime = roundDec( 2*ta + tf,5)

    let table = `<table class='table'><tr><td>${T['Distance to reach max speed (same unit as distance provided)']}</td><td>${roundDec(dist_accel,3)}</td></tr><tr><td>${T['Time to reach max speed']} (s)</td><td>${dist_flat > 0 ? roundDec(ta,3) : T["Can't reach at time"]}</td></tr>`
    table += `<tr><td>${T['Total time of the movement']} (s)</td><td>${totalTime}</td></tr></table>`
    document.getElementById("curve_div").innerHTML = table;

    //plot curve
    let x = [0,roundDec(ta,3),roundDec(ta+tf,3),roundDec(totalTime,3)]
    let data = [{x:x[0],y:vi},{x:x[1],y:vf},{x:x[2],y:vf},{x:x[3],y:vi}]
    let color = "rgba(0,0,200,0.5)";
    if(dist_flat < 0){ //can't reach max speed at time
        tf = 0
        x = [0,roundDec(ta,3),roundDec(totalTime,3)]
        data = [{x:x[0],y:vi},{x:x[1],y:vf},{x:x[3],y:vi}]
        color = "rgba(200,0,0,0.8)";
    }
    
    var myChart = new Chart("curve_chart", {
        type: "line",
        data: {
            
            labels: x,
            datasets: [{
                label: 'Speed',
                fill: false,
                pointRadius: 1,
                borderColor: color,
                data: data,
                lineTension: 0, 
            }]
        },
        options:{
           
        }
      });
}