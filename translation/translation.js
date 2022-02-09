var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');

function translate(){
    var lang = document.cookie['lang']
    if(lang == undefined) {
        lang = navigator.language || navigator.userLanguage;
    }
    //get name of the windows
    var currenturl = window.location.pathname.split("/")
    var htmlfile = currenturl[currenturl.length-1].split(".")[0]
    try {
        url = `https://guillaume55.github.io/MecaWeb/${lang}/${htmlfile}.csv`
        reader.open('get', url, true); 
        reader.onreadystatechange = parseCsv;
        reader.send(null);
    }catch{
        console.log("Cannot translate") 
        //remove at least the braces
        //keep replacing because it will be a disaster with csv if we modify/correct what is inside braces
        url = `https://guillaume55.github.io/MecaWeb/en/${htmlfile}.csv`
        reader.open('get', url, true); 
        reader.onreadystatechange = parseCsv;
        reader.send(null);
    }
}

function parseCsv() {
    if(reader.readyState==4) {
        let text = reader.responseText;
        let L = {}
        console.log(text)
        let lines = text.split(/\r\n|\n/);
        for(l of lines){
            var item = l.split(",")
            L[item[0]] = item[1]
        }
        translateReplace(L)
    }
}

function translateReplace(){
    
    html = document.body.innerHTML;
    for(k of Object.keys(L)) {
        html = html.replaceAll("{"+k+"}",L[k])
        console.log(document.body.innerHTML.search(k))
        //console.log(k,L[k])
    }
    document.body.innerHTML = html;
    //console.log(html)
}