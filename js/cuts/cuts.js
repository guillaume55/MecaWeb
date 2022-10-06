function AddBarAndCutsForTest(barArray, cutArray){
    barArray.push({ len: 6000, remainingLen:6000, cuts:[], height: 32 });
    barArray.push({ len: 8000, remainingLen:8000, cuts:[], height: 32 });
    barArray.push({ len: 600, remainingLen:600, cuts:[], height: 32 });
    cutArray.push({ len: 5990,  angle1: 0, angle2: 0 }); 
    cutArray.push({ len: 2546, angle1: 45, angle2: 45 });
    cutArray.push({ len: 2263, angle1: 45, angle2: 45 });
    cutArray.push({ len: 2869, angle1: 45, angle2: 45 });
    cutArray.push({ len: 2200, angle1: 45, angle2: 45 });
    cutArray.push({ len: 2665, angle1: 45, angle2: 45 }); 
    cutArray.push({ len: 600, angle1: 0, angle2: 0 }); 
    
    return [barArray, cutArray]
}

function compute() {
    var barArray = [];
    var cutArray = [];
   
    if(debug){
        var bars = AddBarAndCutsForTest(barArray, cutArray)
        barArray = bars[0]
        cutArray = bars[1]
    }

    //fill raw material array      
    var i, lengthArr, heightArr
    lengthArr = document.getElementsByClassName('barLength');
    heightArr = document.getElementsByClassName('barHeight');

    for(i=0; i<lengthArr.length; i++) {
        var length = Number(lengthArr[i].value)
        var height = Number(heightArr[i].value)
        barArray.push({ len: length, remainingLen:length, cuts:[], height: height});
    } 

    //fill cuts Array
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

    var resHtml, res

    res = fitCutsStandard(barArray, cutArray)
    /*//if there are angles, try to optimize, if not, fit with the standard method
    var anglesToOptim
    anglesToOptim = areThereAngles(cutArray)
    
    //impossible to optimize if there is no enougth angles with same values or if the shortest cut is shorter than the length we can save
    if(anglesToOptim.length == 0 || maxOptimLength(barArray, cutArray, anglesToOptim) < cutArray[cutArray.length-1]['len']) {
        //try to fit everything
        console.log("No angled cuts to optimize")
        res = fitCutsStandard(barArray, cutArray)
        
    }
    else {
        console.log("Trying to optimize because of angles")
        res = fitCutsAngle(barArray, cutArray, anglesToOptim)
        
    }*/

   
    bars = res['bars']
    remainingCuts = res['cuts']
    cl("completed", bars)
    cl("remaining cuts", remainingCuts)
    resHtml = graphRes(bars)

    resHtml += showRemainingCuts(remainingCuts)
    document.getElementById("resDiv").innerHTML = resHtml
    exportToCsv(bars, remainingCuts)

}