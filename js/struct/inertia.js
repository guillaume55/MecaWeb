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

function inertiaShapeToPdf(beamType, diam, thickness, width, height){
    pdfData.imgField.shape_img = {}
    pdfData.imgField.shape_img.pos = [100,610];
    pdfData.imgField.shape_img.size = [80,80];
    pdfData.imgField.shape_img.page = 0;

    if(beamType == "circ") {
        pdfData.imgField.shape_img.url = "https://guillaume55.github.io/MecaWeb/img/shapes/cyl.png"
        pdfData.textField.width = `Ø${diam}`
        pdfData.textField.height = "See width"
        pdfData.textField.shape = "Cylinder"
    }
    else if(beamType == "circ_pipe") {
        pdfData.imgField.shape_img.url = "https://guillaume55.github.io/MecaWeb/img/shapes/hollow_cyl.png"
        pdfData.textField.width = `Ø${diam}`
        pdfData.textField.height = "See width"
        pdfData.textField.thickness = thickness
        pdfData.textField.shape = "Hollow cylinder (pipe)"

    }
    else if(beamType == "rect") {
        pdfData.imgField.shape_img.url = "https://guillaume55.github.io/MecaWeb/img/shapes/pave.png"
        pdfData.textField.width = width
        pdfData.textField.height = height
        pdfData.textField.shape = "Rectangular"
    }
    else if(beamType == "rect_pipe") {
        pdfData.imgField.shape_img.url = "https://guillaume55.github.io/MecaWeb/img/shapes/hollow_pave.png"
        pdfData.textField.width = width
        pdfData.textField.height = height
        pdfData.textField.thickness = thickness
        pdfData.textField.shape = "Hollow rectangle"
    }
    
}