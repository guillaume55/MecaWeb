function inertiaMoment(beamType, diam, thickness, width, height){
    if(beamType == "circ") {
        inertia = (Math.PI*Math.pow(diam,4))/64
    }
    else if(beamType == "circ_pipe") {
        inertia = (Math.PI*Math.pow(diam,4))/64 - (Math.PI*Math.pow((diam-thickness*2),4))/64
    }
    else if(beamType == "rect") {
        inertia = (width*Math.pow(height,3))/12
    }
    else if(beamType == "rect_pipe") {
        inertia = (width*Math.pow(height,3))/12-inertia - ((width-thickness*2)*Math.pow((height-thickness*2),3))/12
    }
    return inertia
}