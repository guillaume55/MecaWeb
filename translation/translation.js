var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
let L = {}

function getLang(url){
    
    reader.open('get', url, true); 
    reader.onreadystatechange = displayContents;
    reader.send(null);

    /*txtFile.onreadystatechange = function()
    {
        console.log("hey", allTextLines);
        allText = txtFile.responseText;
        allTextLines = allText.split(/\r\n|\n/);
        
    };*/
    
    
}

function displayContents() {
    if(reader.readyState==4) {
        let text = reader.responseText;
        console.log(text)
        let lines = text.split(/\r\n|\n/);
        for(l of lines){
            var item = l.split(",")
            L[item[0]] = item[1]
        }
    }
}

function translate(language){
    html = document.getElementsByTagName("BODY")[0].innerHTML;
    for(k of Object.keys(L)) {
        html.replaceAll(k,L[k])
    }

}