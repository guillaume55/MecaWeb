//TODO
//Check center of gravity


/**
 * Compute moment of inertia
 * in kg/mm²
 * @returns 
 */
function computeJCylinder(){
    //x is the axis of revolution
    masse = parseFloat(document.getElementById('torque_masse').value)
    radius = parseFloat(document.getElementById('torque_diam').value)/2
    
    let Jx = masse * radius * radius * 0.5

    return Jx
}

/**
 * Get custom moment of inertia
 * in kg/mm²
 * @returns 
 */
function getJCustom(){
    //x is the axis of revolution
    let Jx = document.getElementById('torque_momentOfInertia').value
    return Jx
}

//add manually the inertia to this term
//Total moment of inertia = this + moment of inertia of the solid/on its axis of rotation
function huygens(){
    masse = parseFloat(document.getElementById('torque_masse').value) // in kg
    bl = parseFloat(document.getElementById('torque_distance').value) // in mm
    return masse * bl * bl
}

function computeInertiaOfSolid(){
    type = getRadio("torqueSolid")
    let Jx = 0;

    if(type == "cyl")
    {
        Jx = computeJCylinder();
    } 
    else if(type == "cog")
    {
        Jx = huygens();
    }
    else if(type == "custom")
    {
        Jx = getJCustom();
    }

    //totalMomentOfInertia = Jx + huygens(); //confusing, huygens only for cog

    document.getElementById('torque_resInertia').innerHTML = roundDec(Jx,6); //in kg.mm²
    console.log("show inertia; Jx=", Jx)
    return Jx
}

/**
 * Custom moment of inertia does not need mass because it is already integrated
 * @param {*} show 
 */
function showHideMass(show) {
    if(!show)
        document.getElementById("mass").style.display = "none";
    else    
        document.getElementById("mass").style.display = "block";
}
/**
 * Compute the torque induced by the accelerated movement
 * Torque = Moment of Inertia * Angular acceleration
 * @returns 
 */

function torque_accelTorque(){
    let J = computeInertiaOfSolid() * 0.000001; //kg/mm² to kg/m²
    let deltaSpeed = parseFloat(document.getElementById('torque_finalRpm').value); //in rpm
    deltaSpeed -= parseFloat(document.getElementById('torque_initRpm').value);

    let deltaTime = parseFloat(document.getElementById('torque_accelTime').value); //in seconds

    //let ta = ((Math.PI*deltaSpeed*J)/(30*accelT))*0.001  // A verifier RPM to rad/s
    
    deltaSpeed = (Math.PI/30) * deltaSpeed; //rpm to rad/s
    let acceleration = deltaSpeed / deltaTime;
    let torque = acceleration * J;
    
    console.log("J",J, "deltaSpeed",deltaSpeed, "deltaTime", deltaTime, "acceleration",acceleration, "torque",torque)
    return torque
}

/**
 * Caused by bearings
 * @returns 
 */
function torque_resistiveTorque() {
    let rTorque = 0;
    for(let i=1; i<3; i++)
    {
        let bearingType = document.getElementById("select_bearingType"+i.toString()).value;
        if(bearingType != "custom")
        {
            let load = parseFloat(document.getElementById('select_bearingLoad'+i.toString()).value);
            beamType= parseFloat(bearingType);
            //from https://zpag.net/Tecnologies_Indistrielles/Roulements_Etude.htm
            rTorque += load * beamType;
        }
        else
        {
            console.log(document.getElementById('manufacturerResistiveTorque'+i.toString()).value);
            rTorque += parseFloat(document.getElementById('manufacturerResistiveTorque'+i.toString()).value);
        }
    }
    return rTorque
}

/**
 * Power = torque(N.m) * angular speed (rad/s)
 * @param {*} totalTorque 
 * @returns 
 */
function torque_MechPower(totalTorque){
    let rpm = parseFloat(document.getElementById('torque_finalRpm').value)
    let power = rpm * (Math.PI/30) * totalTorque
    
    return power
}

/**
 * Torque needed if composed of torque caused by friction and torque caused by acceleration
 */
function computeTorques(){
    let tBearings = torque_resistiveTorque()
    document.getElementById('torque_resResistiveTorque').innerHTML = roundDec(tBearings,6)

    let tAccel = torque_accelTorque();
    let totalTorque = tAccel + tBearings;
    let power = torque_MechPower(totalTorque)


    document.getElementById('torque_totalTorque').innerHTML=roundDec(totalTorque,3)
    document.getElementById('torque_resMechPower').innerHTML = roundDec(power,3)

    drawPieChart(tBearings,tAccel);
}

/**
 * refresh fields for bearings friction
 * @param {*} typeField 
 * @param {*} customField 
 * @param {*} loadField 
 * @returns 
 */
function refreshCustomfield(typeField ,customField, loadField){

    type = document.getElementById(typeField).value;
    if(type == "custom")
    {
        document.getElementById(customField).disabled = false;
        return 
    }

    document.getElementById(customField).disabled = true;
    load = parseFloat(document.getElementById(loadField).value);
    cf = parseFloat(type) * load;
    document.getElementById(customField).value = roundDec(cf,6);

    return
}

/**
 * Shows the repartition between bearing induced resistive torque and torque due to acceleration
 * @param {*} rTorque 
 * @param {*} aTorque 
 */
function drawPieChart(rTorque,aTorque){
    var myChart = new Chart("pieChartDiv", {
        type: 'doughnut',
        data: {
            labels: ["Friction", "Acceleration"],
            datasets: [
            {
                data: [rTorque, aTorque],
                backgroundColor: [
                   "#FF6384",
                    "#4BC0C0"
                ]
            }]
        },
        options: {
            title: {
                display: true,
                text: ['Repartition of moment caused by bearings and acceleration'],
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}