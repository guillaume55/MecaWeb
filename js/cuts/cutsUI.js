/*****************  SHOW BARS AND DATA ***************/
function graphBar(cuts, initLen)  {
    var width
    html = "<div class='res-bar'>"

    for(var cut of cuts)  {
        width = ( (cut.len/initLen)*100 ).toString();
        html += `<div class="res-cut" style="width:${width}%;">${cut.len}</div>`
    }

    html += "</div>"
    return html
    
}

function graphRes(bars)  {
    var html, loss
    
    html = "<div class='res-bars'>"
    for(var bar of bars)  {
        loss = roundDec(100-bar.ratio,1).toString()
        html += `<div class="res-barLen">${T['Length']} :${bar.len}mm, ${T['Loss']}:${loss}%</div>`
        html += graphBar(bar.cuts, bar['len'])  
    }
    html += "</div>"

    return html
}

function showRemainingCuts(cuts) {
    var i, res =""
    if(cuts.length > 0) {
        res = `<div class='res-remaining'>${T['It remains']}: `
        for(i=0; i<cuts.length; i++)  {
            res += '<div class="res-rem">'+cuts[i]['len'].toString()+'</div>'
            
        }
        res += `</div></br>${T['Delimiter']}<input id='delimiter' value =','><a id="save-csv"> ${T['Download CSV']} </a>  `
        return res
    }
    return `No remaining part</br>${T['Delimiter']}<input id='delimiter' value =','><a id="save-csv"> ${T['Download CSV']} </a>`
}

/****************  EXPORTS  ********************/
/*
CSV STRUCTURE
Bars1 Length    Ratio(used/initialLength)  Cut 1   Cut 2   Cut x   
Bars2 Length    Ratio(used/initialLength)  Cut 1   Cut 2   Cut x   
Barsx Length    Ratio(used/initialLength)  Cut 1   Cut 2   Cut x   
Remaning        Cut 1   Cut 2   Cut x
*/
function exportToCsv(bars, remainingCuts) {
    var delimiter = document.getElementById('delimiter').value
    //write bars
    var csv = `${T['Bar Length']}${delimiter}Ratio${delimiter}Cuts\n`
    for(bar of bars){
        csv += `${bar.len},${bar.ratio}${delimiter}`
        
        for(cut of bar.cuts){
            csv += `${cut.len}${delimiter}`
        }
        csv += '\n'
    }
    csv += '\n'
    if(remainingCuts.length > 0){
        csv += "REMAINING CUTS,"
        for(cut of remainingCuts){
            csv += `${cut}${delimiter}`
        }
    }
    cl("csv", csv)
    
    down = document.getElementById('save-csv');  
    down.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
    down.target = '_blank';  
      
    //provide the name for the CSV file to be downloaded  
    down.download = 'Cuts.csv';  
}


function del_entry(button){
    const div = button.parentNode.parentNode;
    div.remove()
}

function add_bar(){
    document.getElementById("bars-div").innerHTML += `
    <div class="table-responsive col-md-10 section" class="barDiv">
        <div class="section-title">
            <div>${T['Raw Bar']}</div>
            <button class="del-button" onclick="del_entry(this)">${T['Delete']}</button>
        </div>
        <div class ="fields">
            <div class="field">${T['Length in mm']} 
                <input name="length" class="barLength" value="6000"/>
            </div>
            <div class="field hidden">
                Height in mm<input name="height" class="barHeight" value="30"></input>
            </div>
        </div>
    </div>`
}

function add_cut(){
    //with angles
    document.getElementById("cuts-div").innerHTML += `
    <div class="table-responsive col-md-10 section" class="barDiv">
        <div class="section-title"><div>${T['Bar to Cut']}</div>
            <button class="del-button" onclick="del_entry(this)">${T['Delete']}</button></div>
            <div class ="fields"><div class="field">${T['Length in mm']}
            <input name="cutLength" class="cutLength" value="300">
            </input></div><div class="field angle-field hidden">Angle 1 in deg<input name="cutAngle1" class="cutAngle1" value="90">
            </input></div><div class="field angle-field hidden">Angle 1 in deg<input name="cutAngle2" class="cutAngle2" value="90"></input>
            </div>
        </div>
    </div>`
}


function shape_cut(elt){
    angle = elt.value.toString()
    if(elt.name == "cutAngle1") {
        shape = elt.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('cut-shape1')[0];
    }
    else {
        shape = elt.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('cut-shape2')[0];
    }
    shape.style.transform = "skew("+angle+"deg)"
}