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
    document.getElementById("screw-torque").value=roundDec(torque,4);
}

function getInput(id) {
    let inp = parseFloat(document.getElementById(id).value.replace(",","."));
    return inp;
}

function speedCurve(){
    let initVelocity = parseFloat(document.getElementById('curve_speedInit').value);
    let finalVelocity = parseFloat(document.getElementById('curve_speedFinal').value);
    let accel = parseFloat(document.getElementById('curve_accel').value);
    let distance = parseFloat(document.getElementById('curve_dist').value);
    let decelerating = document.getElementById('curve_decel').checked;
    console.log(initVelocity,finalVelocity,accel,distance)

    //time to do the movement

    //plot curve
    let x = []
    let data = []
    let color = "rgba(0,0,200,0.5)"; //green if there is a flat part

    //compute each distance
    let timeAccel = (finalVelocity - initVelocity) / accel //time spent on accel
    let dist_accel = initVelocity * timeAccel + 0.5 * accel * timeAccel * timeAccel
    let  dist_flat = distance - dist_accel //if only acceleration
    let totalTime = 0
    let reachableSpeed = -1 //if we cannot reach final velocity

    if(decelerating == true){
        //Accel +  decel
        //With not enougth distance to reach max speed
        if((dist_accel*2) > distance){
            console.log("Accel + decel, to short")
            dist_accel = distance/2
            dist_flat = 0

            //actual final velocity is reached at distance/2 and given by vf = sqrt(vi² - 2*accel * d)
            console.log(initVelocity, accel, distance)
            reachableSpeed = roundDec(Math.sqrt( (initVelocity*initVelocity) + 2*accel*(distance/2) ),2)  //distance of accel is distance /2
            timeAccel = (reachableSpeed - initVelocity) / accel
            totalTime = roundDec(timeAccel*2, 3)

            //graph related
            x = [0,roundDec(timeAccel,3),roundDec(totalTime,3)]
            data = [{x:x[0],y:initVelocity},{x:x[1],y:reachableSpeed},{x:x[3],y:initVelocity}]
            color = "rgba(200,0,0,0.8)"; //red
        } 
        else //with enougth distance to reach max speed
        {
            console.log("Accel + decel, okay")
            dist_flat = distance - dist_accel * 2 //if accel and deccel
            let timeFlat = dist_flat / finalVelocity //length (s) of the flat part
            totalTime = roundDec( 2*timeAccel + timeFlat,5)

            //graph
            x = [0,roundDec(timeAccel,3),roundDec(timeAccel+timeFlat,3),roundDec(totalTime,3)]
            data = [{x:x[0],y:initVelocity},{x:x[1],y:finalVelocity},{x:x[2],y:finalVelocity},{x:x[3],y:initVelocity}]
            
            //same calculation method but only 3 points on the graph
            if((dist_accel*2) == distance){
                x = [0,roundDec(timeAccel,3),roundDec(totalTime,3)]
                data = [{x:x[0],y:initVelocity},{x:x[1],y:finalVelocity},{x:x[3],y:initVelocity}]
            }
        }
    } else {
        //NO decel, Only accel
        //With not enougth distance to reach max speed
        if(dist_accel > distance){
            console.log("Accel only, to short")
            dist_accel = distance
            dist_flat = 0

            //actual final velocity is reached at distance/2 and given by vf = sqrt(vi² * 2a*d)
            reachableSpeed = roundDec(Math.sqrt( (initVelocity*initVelocity) + (2*accel*distance) ),2)
            timeAccel = (reachableSpeed - initVelocity) / accel
            totalTime = roundDec(timeAccel, 3)

            //graph related
            x = [0,roundDec(totalTime,3)]
            data = [{x:x[0],y:initVelocity},{x:x[1],y:reachableSpeed}]
            color = "rgba(200,0,0,0.8)"; //red
        }
        else //with enougth distance to reach max speed
        {
            console.log("Accel only, okay")
            dist_flat = distance - dist_accel //if accel only
            let timeFlat = dist_flat / finalVelocity //length (s) of the flat part
            totalTime = roundDec( timeAccel + timeFlat,5)

            //graph
            x = [0,roundDec(timeAccel,3),roundDec(totalTime,3)]
            data = [{x:x[0],y:initVelocity},{x:x[1],y:finalVelocity},{x:x[2],y:finalVelocity}]

            //same calculation method but only 3 points on the graph
            if(dist_accel >= distance){
                x = [0,roundDec(totalTime,3)]
                data = [{x:x[0],y:initVelocity},{x:x[1],y:finalVelocity}]    
            }
        }
    }
    console.log ("x",x)
    console.log("data",data)
    console.log('reachable speed', reachableSpeed)
    //answer table filled with values
    let table = `
        <table class='table'>
            <tr>
                <td>${T['Distance to reach max speed (same unit as distance provided)']}</td>
                <td>${dist_flat > 0 ? roundDec(dist_accel,3): T["Can't reach on time"]}</td>
                <td>mm</td>
            </tr>
            <tr>
                <td>${T['Time to reach max speed']} (s)</td>
                <td>${reachableSpeed == -1 ? roundDec(timeAccel,3) : T["Can't reach on time"]}</td>
                <td>s</td>
            </tr>
            <tr>
                <td>${T['Final speed']}</td>
                <td>${reachableSpeed == -1 ? finalVelocity : "<strike>"+finalVelocity.toString()+"</strike> "+ reachableSpeed.toString()}</td>
                <td>mm/s</td>
            </tr>
            <tr>
                <td>${T['Total time of the movement']} (s)</td>
                <td>${totalTime}</td>
                <td>s</td>
            </tr>
        </table>`
    document.getElementById("curve_div").innerHTML = table;

    //plot data
    var myChart = new Chart("curve_chart", {
        type: "line",
        data: {
            labels: x,
            datasets: [{
                label: T['Speed']+' (mm/s)',
                fill: false,
                pointRadius: 1,
                borderColor: color,
                data: data,
                lineTension: 0, 
            }]
        },
        options:{
            scales: {
                xAxes: [ {
                    scaleLabel: {
                        display: true,
                        labelString: "Time (s)"
                    }
                } ],
                yAxes: [ {
                    scaleLabel: {
                        display: true,
                        labelString: "Speed (mm/s)"
                    }
                } ]
            }
        }
      });
}