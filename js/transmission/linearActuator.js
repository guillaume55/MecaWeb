function la_refreshType(value){
    
    //need reduction ratio only
    if(value == "screw"){
        document.getElementById("la_redRatioDiv").style.display = "inline-block";
        document.getElementById("la_pulleyDiv").style.display = "none";
    }
    else if(value == "pulley"){
        document.getElementById("la_redRatioDiv").style.display = "inline-block";
        document.getElementById("la_pulleyDiv").style.display = "inline-block";
    }
    else {//so much possibilities, ignore them
        document.getElementById("la_redRatioDiv").style.display = "none";
        document.getElementById("la_pulleyDiv").style.display = "none";
    }
}

function computeAccelFromDuration(duration, distance) {
    //reaching max speed and decelerating
    //that's an assumption, but if you use this tool, you are likely to want the fastest movement
    let halfDuration = duration / 2; //assume that we are accelerating and decelerating to reach max speed
    //a = dv/dT
    let accel = ( distance / halfDuration ) * ( 1 / halfDuration)
    return accel;
}

function computeMaxSpeedFromAccelAndDuration(accel, duration){
    let halfDuration = duration / 2;
    let maxSpeed = accel * halfDuration;
    
    return maxSpeed;
}

function mPerSecToRPM_pulley(mPerSec, pulleyRadius){
    return ((mPerSec / pulleyRadius) / (2 * Math.PI) ) * 60; //in rpm
}

function la_compute(){
    //first find the acceleration to perform the movement in the given time
    let duration = parseFloat(document.getElementById('la_duration').value);
    let distance = parseFloat(document.getElementById('la_distance').value/1000);
    //let maxSpeed = parseFloat(document.getElementById('la_maxSpeed').value/1000);

    console.log(duration, distance)
    let accel = computeAccelFromDuration(duration, distance);
    let maxSpeed = computeMaxSpeedFromAccelAndDuration(accel,duration);

     //Force = mass * accel, we now have both
    let mass = parseFloat(document.getElementById("la_mass").value);
    let force = mass * accel;

    console.log(mass, accel, force)

    //if checked, take the gravity into account, add the weight to the force
    let vertical = document.getElementById('la_vertical').checked;
    if(vertical)
        force += mass * 9.81; //assume that we are in Paris, or at least on earth. Change that if we release for other planets
    
    console.log("Weight (if checked)", mass*9.81);

    //piston : force is enough,  do not fill fields
    let torque = "NC";
    let rotSpeed = "NC";
    let pulleyRadius = "NC";
    let redRatio = "NC";

    //not 100% efficiencient sadly
    let efficiency = parseFloat(document.getElementById('la_efficiencySlider').value)/100;
    force = force / efficiency;

    //add a margin, we cannot exepct the motor to have exactly the right torque. Usually between 1.3 to 1.4, until 2 for small systems
    let margin = parseFloat(document.getElementById('la_marginSlider').value);
    force *= margin;

    //if there is a rotary actuator somewhere, check rotationnal speed as well as torque 
    let type = document.getElementById('la_type').value;
    if(type == "screw"){
        redRatio = parseFloat(document.getElementById('la_redRatio').value);
    }
    else if(type == "pulley"){
        console.log("pulley")
        redRatio = parseFloat(document.getElementById('la_redRatio').value);
        pulleyRadius = parseFloat(document.getElementById('la_pulleyDiam').value)/2000; // diam to radius, then mm to m
        torque = ( force * pulleyRadius ) / redRatio;

        //convert maxSpeed to rpm from m/s
        rotSpeed = mPerSecToRPM_pulley(maxSpeed, pulleyRadius) * redRatio;
    }

    la_showResults(accel, force, torque, redRatio, pulleyRadius, maxSpeed, rotSpeed);
    la_plotCurve(duration, maxSpeed, rotSpeed);
}

//show appropriate units
function la_showResults(accel, force, torque, redRatio, pulleyRadius, maxSpeed, rotSpeed){
    //show results and curve
    document.getElementById('la_resAccel').innerHTML = roundDec(accel,3);
    document.getElementById('la_resForce').innerHTML = roundDec(force,3);
    document.getElementById('la_resRedRatio').innerHTML = redRatio;
    document.getElementById('la_resMaxSpeed').innerHTML = roundDec(maxSpeed,3); //linear
    document.getElementById('la_resRotSpeed').innerHTML = isNaN(rotSpeed)? "NC" : roundDec(rotSpeed,3); //rotational (optional)
    document.getElementById('la_resPulleyRadius').innerHTML = isNaN(pulleyRadius)? "NC" : roundDec(pulleyRadius*1000,3);

    console.log("linear speed ", maxSpeed, " m/s");
    console.log("torque ", torque, " N.m");
    // linear speed
    if (maxSpeed > 1) {
        document.getElementById('la_resMaxSpeed').innerHTML = isNaN(maxSpeed)? "NC" : roundDec(maxSpeed,3);
        document.getElementById('la_resMaxSpeedUnit').innerHTML = "m/s";
    }
    else {
        document.getElementById('la_resMaxSpeed').innerHTML = isNaN(maxSpeed)? "NC" : roundDec(maxSpeed*1000,3);
        document.getElementById('la_resMaxSpeedUnit').innerHTML = "mm/s";
    }

    //torque
    if(torque > 1000) {
        document.getElementById('la_resTorque').innerHTML = isNaN(torque)? "NC" : roundDec(torque/1000,3);
        document.getElementById('la_resTorqueUnit').innerHTML = "kN.m";
    }
    else if (torque > 1) {
        document.getElementById('la_resTorque').innerHTML = isNaN(torque)? "NC" : roundDec(torque,3);
        document.getElementById('la_resTorqueUnit').innerHTML = "N.m";
    }
    else {
        document.getElementById('la_resTorque').innerHTML = isNaN(torque)? "NC" : roundDec(torque*100,3);
        document.getElementById('la_resTorqueUnit').innerHTML = "N.cm";
    }
}

//plot the curve. For now, only triangle curves are supported (not flat part)
function la_plotCurve(duration, maxSpeed, maxRotSpeed = 0){

    let x = [0,roundDec(duration/2,3), duration]
    let dataLin = [0,maxSpeed,0] 

    //linear speed plot
    let datasets = [{
        label: T['Speed']+' (m/s)',
        fill: false,
        pointRadius: 1,
        borderColor: "rgba(0,0,200,0.5)", /*blue*/
        data: dataLin,
        lineTension: 0, 
        yAxisID: 'y1',
    }]

    let yscales = [ {
        id: "y1",
        scaleLabel: {
            display: true,
            labelString: "Linear speed (m/s)"
        },
    } ];

    //0 if there is no rotary actuator
    if(maxRotSpeed != 0 && maxRotSpeed !=  "NC") {
        let dataRot = [0,maxRotSpeed,0]
        datasets.push(
            {
                label: T['Speed']+' (rpm)',
                fill: false,
                pointRadius: 1,
                borderColor: "rgba(0,200,0,0.5)", /*green*/
                data: dataRot,
                lineTension: 0, 
                yAxisID: 'y2',
            }
        );
        yscales.push(
            {
                // Extra axis on the right
                id: "y2",
                position: 'right',
                scaleLabel: {
                    display: true,
                    labelString: "Rotational speed (rpm)",
                },
            } 
        );
    }

    var myChart = new Chart("curve_chart", {
        type: "line",
        data: {
            labels: x,
            datasets: datasets
        },
        options:{
            scales: {
                xAxes: [ {
                    scaleLabel: {
                        display: true,
                        labelString: "Time (s)"
                    }
                } ],
                yAxes: yscales,
            }
        }
    });
}