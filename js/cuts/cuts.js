function del_entry(button){
    const div = button.parentNode.parentNode;
    div.remove()
}

function add_bar(){
    document.getElementById("bars-div").innerHTML += '<div class="table-responsive col-md-10 section" class="barDiv" id="init_bar"><div class = "section-title"><div>Raw Bar </div><button class="del-button" onclick="del_entry(this)">Delete</button></div><div class ="fields"><div class="field">Length in mm <input name="length" class="barLength" value="6000" ></input></div><div class="field">Height in mm<input name="height" class="barHeight" value="30"></input></div></div></div>'
}

function add_cut(){
    document.getElementById("cuts-div").innerHTML += '<div class="table-responsive col-md-10 section" class="barDiv" id="init_cut"><div class = "section-title"><div>Bar to Cut </div><button class="del-button" onclick="del_entry(this)">Delete</button></div><div class ="fields"><div class="field">Length in mm <input name="cutLength" class="cutLength" value="300"></input></div><div class="field">Angle 1 in deg<input name="cutAngle1" class="cutAngle1" value="90"></input></div><div class="field">Angle 1 in deg<input name="cutAngle2" class="cutAngle2" value="90"></input></div></div></div>'
}


function shape_cut(elt){
    angle = elt.value.toString()
    if(elt.name == "cutAngle1") {
        shape = elt.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('cut-shape1')[0];
    }
    else {
        shape = elt.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('cut-shape2')[0];
    }
    
    console.log(shape)
    shape.style.transform = "skew("+angle+"deg)"
    
}

function compute() {
    var barArray = [];
    var cutArray = [];
    var resArray = [];
   
    //fill raw material array      
    var i, lengthArr, heightArr
    lengthArr = document.getElementsByClassName('barLength');
    heightArr = document.getElementsByClassName('barHeight');

    for(i=0; i<lengthArr.length; i++) {
        var length = Number(lengthArr[i].value)
        var height = Number(heightArr[i].value)
        barArray.push({ len: length, height: height});
    } 
    
    //fill cuts to perform array
    var j, lengthCutArr, angle1Arr, angle2Arr
    lengthCutArr = document.getElementsByClassName('cutLength');
    angle1Arr = document.getElementsByClassName('cutAngle1');
    angle2Arr = document.getElementsByClassName('cutAngle2');
    for(j=0; j<lengthCutArr.length; j++) {
        var lengthCut = Number(lengthCutArr[j].value)
        var angle1 = 90-Number(angle1Arr[j].value)
        var angle2 = 90-Number(angle2Arr[j].value)
        cutArray.push({ len: lengthCut, angle1: angle1, angle2: angle2});
    } 

/*
    //tests
    barArray.push({ len: 6000, height: 32 });
    barArray.push({ len: 8000, height: 32 });
    cutArray.push({ len: 2546, angle1: 45, angle2: 45 });
    cutArray.push({ len: 2263, angle1: 45, angle2: 45 });
    cutArray.push({ len: 2869, angle1: 45, angle2: 45 });
    cutArray.push({ len: 2200, angle1: 45, angle2: 45 });
    cutArray.push({ len: 2665, angle1: 45, angle2: 45 }); 
    barArray = sortBars(barArray)
    cutArray = sortBars(cutArray) 
    console.log(barArray, cutArray) 
    var bars, resHtml, res, remainingCuts
    */
    
    //if there are angles, try to optimize, if not, fit with the standard method
    var anglesToOptim
    anglesToOptim = areThereAngles(cutArray)
    
    //impossible to optim if there is no enougth angles with same values or if the shortest cut is shorter than the length we can save
    if(anglesToOptim.length == 0 || maxOptimLength(barArray, cutArray, anglesToOptim) < cuts[cuts.length-1]['len']) {
        //try to fit everything
        console.log("No angled cuts to optimize")
        res = fitCutsStandard(barArray, cutArray)
        
    }
    else {
        console.log("Trying to optimize beacuse of angles")
        console.log()
        res = fitCutsAngle(barArray, cutArray, anglesToOptim)
        
    }
    finalRes = res
    console.log("res", res)
    bars = res['bars']
    remainingCuts = res['remainingCuts']
    resHtml = graphRes(bars)

    resHtml += showRemainingCuts(remainingCuts)
    document.getElementById("resDiv").innerHTML = resHtml
    //TODO add csv download link
}