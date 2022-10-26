function appendLine(){
    document.getElementById('choiceTable').innerHTML += `
    <tr id="choiceLine_${currentLine}_tr" class="lines">
        <td id="choiceLine_${currentLine}" onclick="removeLine('choiceLine_${currentLine}_tr')" title="{Remove line}" style="color:red">⌦</td>
        <td style="display: flex; flex-direction: column;">
            <textarea id="solution_${currentLine}"></textarea>
            <div style="display: flex; flex-direction: row;">
                <input id="urlImg_${currentLine}" placeholder="Image link"/><button onclick="getImage('${currentLine}')">Get</button>
            </div>
            <img src="" class="thumb" id="img_${currentLine}">
        </td>
        <td><textarea id="strengths_${currentLine}"></textarea></td>
        <td><textarea id="weaknesses_${currentLine}"></textarea></td>
        <td>
            <select id="cost_${currentLine}">
                <option value="€">💰</option>
                <option value="€€">💰💰</option>
                <option value="€€€">💰💰💰</option>
                <option value="€€€€">💰💰💰💰</option>
            </select>
            </td>
        <td>
            <select id="rank_${currentLine}" class="choice_rank"></select>
        </td>
    </tr>`
    incSelectRank();
    refreshTableColors();
    currentLine ++;
}

/**
 * Update the select field for rank
 */
function incSelectRank(){
    var cells = document.getElementsByClassName('choice_rank')
    nb = cells.length
    options = ""
    for(var i=1; i< nb+1; i++){
        options += `<option value=${i}>${i}</option>`
    }
    for(var cell of cells){

        cell.innerHTML = options
    }
}

function removeLine(id){
    document.getElementById(id).remove();
    refreshTableColors();
}

function getImage(index){
    
    var url = document.getElementById(`urlImg_${index}`).value;
    if(!isImage(url)){
        alert('Not an image. Please copy the url of the image. Right click on the image and click "Copy the link of the image"')
        return
    }
    document.getElementById(`img_${index}`).src = url
}
function isImage(url) {
    var extensions = ["jpg","jpeg","png","webp","avif","gif","svg","bing"] //I hate you bing
    for(ext of extensions){
        var res = url.search(ext)

        if(res != -1)
            return true
    }
    return false
}

function exportCSV(firstline, fields){
    csv = firstline+"\n"
    fields = fields.split(',')
    var lines = document.getElementsByClassName('lines')
    for(var l=0; l<lines.length; l++){
        var index = lines[l].id.split("_")[1].toString()
        for(var i=0; i<fields.length; i++){
            ty = document.getElementById(fields[i]+index).type;
            console.log(fields[i]+index, document.getElementById(fields[i]+index))
            if(ty == undefined)
                csv += document.getElementById(fields[i]+index).innerHTML +",";
            else if (ty == 'img')
                csv += document.getElementById(fields[i]+index).src +",";
            else
                csv += document.getElementById(fields[i]+index).value +",";
        }
        csv = csv.slice(0, -1) + '\n'; //replac last , with end of line
    }   
    console.log(csv)

    down = document.getElementById('save-csv');
    down.disabled = false;  
    down.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
    down.target = '_blank';  
      
    //provide the name for the CSV file to be downloaded  
    down.download = 'choice.csv'; 
    down.click() 
}

function refreshTableColors(colors = ['#eee', 'white']){
    lines = document.getElementsByClassName('lines')
    for(var i=0; i< lines.length; i++){
        lines[i].style.backgroundColor = colors[i%2]
    }
}