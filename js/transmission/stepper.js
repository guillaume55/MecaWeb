function computeStepper(){
    let stepsPerTurn = parseFloat(document.getElementById('stepper-stepTurn').value)
    let ratio = parseFloat(document.getElementById('stepper-ratio').value)
    let mmTr = parseFloat(document.getElementById('stepper-mmTr').value)

    let microsteps = parseFloat(document.getElementById('stepper-microstep').value)
    let outputType = document.getElementById('stepper-output').value

    if(outputType == "lin"){
        console.log("lin")
        label1 = T['Steps/mm']
        label2 = T['mm/step']
        res = stepsPerTurn * microsteps * (1/mmTr)
    }
    else {
        label1 = T['Steps/deg']
        label2 = T['mm/deg']
        res = stepsPerTurn * microsteps * ratio

    }

    document.getElementById('stepper-resLabel1').innerHTML = label1
    document.getElementById('stepper-res').innerHTML = res
    document.getElementById('stepper-resLabel2').innerHTML = label2
    document.getElementById('stepper-invRes').innerHTML = roundDec(1/res,6)

}

function showRatioOrMmTr(val){
    console.log(val)
    if(val == "lin"){
        document.getElementById('stepper-divRot').style.display = "none"
        document.getElementById('stepper-divLin').style.display = "block"
    }else {
        document.getElementById('stepper-divRot').style.display = "block"
        document.getElementById('stepper-divLin').style.display = "none"
    }
}