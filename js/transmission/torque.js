function computeJCylinder(){
    //x is the axis of revolution
    masse = parseFloat(document.getElementById('torque_masse').value)
    radius = parseFloat(document.getElementById('torque_diam').value)/2
    
    let Jx = masse * radius * radius * 0.5
    document.getElementById('torque_momentOfInertia').value = Jx;

    return Jx
}

function computeJSphere(){
    //x is the axis of revolution
    masse = parseFloat(document.getElementById('torque_masse').value)
    radius = parseFloat(document.getElementById('torque_diam').value)/2
    
    let Jx = masse * radius * radius * (2/3)
    document.getElementById('torque_momentOfInertia').value = Jx;

    return Jx
}

function computeJRect(){
    //x is the axis of revolution
    masse = parseFloat(document.getElementById('torque_masse').value)
    a = parseFloat(document.getElementById('torque_aSide').value)
    b = parseFloat(document.getElementById('torque_bSide').value)
    
    let Jx = masse * (a*a+b*b) * (1/1)
    document.getElementById('torque_momentOfInertia').value = Jx;

    return Jx
}

function getJCustom(){
    //x is the axis of revolution
    let Jx = document.getElementById('torque_momentOfInertia').value
    return Jx
}

//add manually the inertia to this term
//Total moment of inertia = this + moment of inertia of the solid/on its axis of rotation
function huygens(){
    masse = parseFloat(document.getElementById('torque_masse').value)
    bl = parseFloat(document.getElementById('torque_distance').value)
    return masse * bl*bl
}

function computeInertiaOfSolid(){
    type = getRadio("torqueSolid")
    let Jx = 0;
    if(type == "rect"){
        Jx = computeJRect();
    } else if(type == "cyl"){
        Jx = computeJCylinder();
    } else if(type == "sphere"){
        Jx = computeJSphere();
    } else if(type == "custom"){
        Jx = getJCustom();
    }
    totalMomentOfInertia = Jx + huygens();
    document.getElementById('torque_resMomentOfInertia').innerHTML = roundDec(Jx,6)
    document.getElementById('torque_totalMomentOfInertia').value = roundDec(totalMomentOfInertia,6)
    document.getElementById('torque_resTotalMomentOfInertia').innerHTML = roundDec(totalMomentOfInertia,6)

    return totalMomentOfInertia
}

function showTorqueSolidParams(beamType, prefix) {
    prefix = prefix.trim()
    if(beamType.search("rect")!=-1) {
        document.getElementById(prefix+"_aSide_div").style.display="Block";
        document.getElementById(prefix+"_bSide_div").style.display="Block";
        document.getElementById(prefix+"_diam_div").style.display="none";
        document.getElementById(prefix+"_momentOfInertia").disabled =true;
    }
    else if(beamType.search("cyl")!=-1) {
        document.getElementById(prefix+"_aSide_div").style.display="none";
        document.getElementById(prefix+"_bSide_div").style.display="none";
        document.getElementById(prefix+"_diam_div").style.display="block";
        document.getElementById(prefix+"_momentOfInertia").disabled =true;
    }
    else if(beamType.search("sphere")!=-1) {
        document.getElementById(prefix+"_aSide_div").style.display="none";
        document.getElementById(prefix+"_bSide_div").style.display="none";
        document.getElementById(prefix+"_diam_div").style.display="block";        
        document.getElementById(prefix+"_momentOfInertia").disabled =true;
    }else {
        document.getElementById(prefix+"_aSide_div").style.display="none";
        document.getElementById(prefix+"_bSide_div").style.display="none";
        document.getElementById(prefix+"_diam_div").style.display="none";
        document.getElementById(prefix+"_momentOfInertia").disabled =false;
    }
}

function torque_accelTorque(){
    let J = computeInertiaOfSolid()
    let deltaSpeed = parseFloat(document.getElementById('torque_finalRpm').value)
    deltaSpeed -= parseFloat(document.getElementById('torque_initRpm').value)
    let accelT = parseFloat(document.getElementById('torque_accelTime').value)
    let ta = ((Math.PI*deltaSpeed*J)/(30*accelT))*0.001
    document.getElementById('torque_resTorqueAccel').innerHTML = roundDec(ta,3)
    return ta
}

function torque_resistiveTorque() {
    //from https://zpag.net/Tecnologies_Indistrielles/Roulements_Etude.htm
    let friction = parseFloat(document.getElementById('torque_bearingFriction').value)
    let radLoad = parseFloat(document.getElementById('torque_radialLoad').value)
    let avgRadius = parseFloat(document.getElementById('torque_avgRadius').value)
    
    let cf = friction*radLoad*(avgRadius/1000)

    document.getElementById('torque_resResistiveTorque').innerHTML = roundDec(cf,3)
    return cf
}

function torque_MechPower(totalTorque){
    let rpm = parseFloat(document.getElementById('torque_finalRpm').value)

    P = rpm * (Math.PI/30) * totalTorque
    document.getElementById('torque_resMechPower').innerHTML = roundDec(P,3)
}

function computeTorques(){
    let t = 0; 
    t += torque_accelTorque()
    t += torque_resistiveTorque()
    torque_MechPower(t)
    document.getElementById('torque_totalTorque').innerHTML=roundDec(t,3)
}