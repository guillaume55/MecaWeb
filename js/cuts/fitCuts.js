/**
 * Compute the ratio of the bar that is consumed
 * @param {Dict} bar 
 */
function computeRatio(bar){
    return ratio = roundDec((bar.remainingLen/bar.len)*100,1)
}

/**
 * If the size of some bar are very close to the size of some cuts
 * @param {Array} bars 
 * @param {Array} cuts 
 */
function cutsIsAlmostTheSameSizeAsBar(bars, cuts, sawWidth){
    for(var bar of bars){
        skip = false
        var c=0
        for(var cut of cuts){
            if(bar.len >= cut.len && bar.len <= cut.len+35 && skip == false){
                var removed = cuts.splice(c,1)
                skip = true
                bar.remainingLen = bar.len - cut.len - sawWidth
                bar.cuts.push(cut)
            }
            c++
        }
    }
    return [bars,cuts]
}

/**
 * Fit the cuts in the bars with the simpliest method
 * No optimisation with angles
 * @param {Array} barArray 
 * @param {Array} cutArray 
 * @returns 
 */
function fitCutsStandard(barArray, cutArray){
    res = []
    lostWhileCuting = parseFloat(document.getElementById('lostWhileCuting').value);
    barArray = sortArrayReverse(barArray)
    cutArray = sortArrayReverse(cutArray)

    //first, match cut and bars with a close dimension
    data = cutsIsAlmostTheSameSizeAsBar(barArray, cutArray, lostWhileCuting)
    barArray = data[0]
    cutArray = data[1]
    
    //then place try to place the greater and so on
    for(bar of barArray){
        for(var c=0; c<cutArray.length;c++){
            cut = cutArray[c]
            if(bar.remainingLen > cut.len){
                bar.remainingLen -= (cut.len + lostWhileCuting)
                bar.cuts.push(cut)
                var removed = cutArray.splice(c,1)
                c--;
            }
        }
        bar.ratio = computeRatio(bar) 
        cl("\n")
    }

    return {bars:barArray, cuts:cutArray}
}


