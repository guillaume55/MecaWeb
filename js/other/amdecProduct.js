function amdec_appendLine(){
    document.getElementById('choiceTable').innerHTML += `
    <tr id="amdecProduct_${currentLine}_tr" class="lines">
        <td id="amdecProduct_${currentLine}" onclick="removeLine('amdecProduct_${currentLine}_tr')" title="{Remove line}" style="color:red">⌦</td>
        <td><textarea id="features_${currentLine}"></textarea></td>
        <td><textarea id="mode_${currentLine}"></textarea></td>
        <td><textarea id="effect_${currentLine}"></textarea></td>
        <td><textarea id="cause_${currentLine}"></textarea></td>

        <td><input class="xtra-small-input" type="number" min=1 max=4 id="dect1_${currentLine}" onchange="computeCriticity(${currentLine})" value=1></input></td>
        <td><input class="xtra-small-input" type="number" min=1 max=4 id="occ1_${currentLine}" onchange="computeCriticity(${currentLine})" value=1></input></td>
        <td><input class="xtra-small-input" type="number" min=1 max=4 id="grav1_${currentLine}" onchange="computeCriticity(${currentLine})" value=1></input></td>
        <td id="crit1_${currentLine}">1</td>

        <td><textarea id="recommended_${currentLine}"></textarea></td>
        <td><textarea id="done_${currentLine}"></textarea></td>

        <td><input class="xtra-small-input" type="number" min=1 max=4 id="dect2_${currentLine}" onchange="computeCriticity(${currentLine})" value=1></input></td>
        <td><input class="xtra-small-input" type="number" min=1 max=4 id="occ2_${currentLine}" onchange="computeCriticity(${currentLine})" value=1></input></td>
        <td><input class="xtra-small-input" type="number" min=1 max=4 id="grav2_${currentLine}" onchange="computeCriticity(${currentLine})" value=1></input></td>
        <td id="crit2_${currentLine}">1</td>
    </tr>`
    refreshTableColors();
    currentLine ++;
}


function computeCriticity(line) {
    var fields = ["dect", "occ", "grav"]
    var oldCriticity = 1
    var newCriticity = 1
    for(var i=0; i<3; i++){
        oldCriticity *= parseInt(document.getElementById(`${fields[i]}1_${line}`).value);
        newCriticity *= parseInt(document.getElementById(`${fields[i]}2_${line}`).value);
        console.log(`${fields[i]}2_${line}`, parseInt(document.getElementById(`${fields[i]}2_${line}`)))
    }
    document.getElementById(`crit1_${line}`).innerHTML = oldCriticity;
    document.getElementById(`crit2_${line}`).innerHTML = newCriticity;

    if(oldCriticity > 18)
        document.getElementById(`crit1_${line}`).style.color = 'red'
    else if(oldCriticity > 10)
        document.getElementById(`crit1_${line}`).style.color = 'orange'
    else
        document.getElementById(`crit1_${line}`).style.color = 'green'

    if(newCriticity > 18)
        document.getElementById(`crit2_${line}`).style.color = 'red'
    else if(newCriticity > 10)
        document.getElementById(`crit2_${line}`).style.color = 'orange'
    else
        document.getElementById(`crit2_${line}`).style.color = 'green'
}