var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
let T = {} //all the translation
function translate(htmlfile, replaceTranslation = true, onLoadFunction = undefined){
    
    lang = getLanguage()
    //get name of the windows
    if(htmlfile == undefined) {
        var currenturl = window.location.pathname.split("/")
        var htmlfile = currenturl[currenturl.length-1].split(".")[0]
    }

    try {
        //console.log(`https://guillaume55.github.io/MecaWeb/translation/${lang}/${htmlfile}.csv`)
        //console.log("translating to ", lang)
        url = `https://guillaume55.github.io/MecaWeb/translation/${lang}/${htmlfile}.csv`
        reader.open('get', url, true); 
        reader.replace = replaceTranslation;
        reader.translateWithCareFunction = onLoadFunction  //a function that replace manually translation on sensitive page
        reader.onreadystatechange = parseCsv;
        reader.send(null);
        
    }catch{
        //console.log("Cannot translate") 
        //remove at least the braces
        //keep replacing because it will be a disaster with csv if we modify/correct what is inside braces
        url = `https://guillaume55.github.io/MecaWeb/en/${htmlfile}.csv`
        reader.open('get', url, true); 
        reader.replace = replaceTranslation;
        reader.translateWithCareFunction = onLoadFunction
        reader.onreadystatechange = parseCsv;
        reader.send(null);
    }

    //possibility to use async/await
    /*return new Promise((resolve) => {
    resolve();
  });*/
}

function getLanguage(){
    args = parseUrl()
    if(args['lang']==undefined){
        try{var lang = getLangCookie()}
        catch{console.log("Chrome does not store local cookies")}
        
        if(lang == undefined) 
            lang = (navigator.language || navigator.userLanguage).split("-")[0];
    }else{
        lang=args['lang']
    }
    return lang
}

function translateRefresh(language){
    window.location.href = window.location.pathname+"?lang="+language
}

function getLangCookie(){
    c = getCookiesAsJson()
    //console.log(document.cookie)
    return c['lang']
}

//from https://gist.github.com/rendro/525bbbf85e84fa9042c2
function getCookiesAsJson(){
    Object.fromEntries(document.cookie.split('; ').map(c => {
        const [ key, ...v ] = c.split('=');
        return [ key, v.join('=') ];
    }));
}

function parseUrl(){
    args = {}
    if(document.location.toString().indexOf('?') !== -1) {
        var query = document.location
                       .toString()
                       // get the query string
                       .replace(/^.*?\?/, '')
                       // and remove any existing hash string (thanks, @vrijdenker)
                       .replace(/#.*$/, '')
                       .split('&');
    
        for(var i=0, l=query.length; i<l; i++) {
           var aux = decodeURIComponent(query[i]).split('=');
           args[aux[0]] = aux[1];
        }
    }
    return args
}


function parseCsv() {
    if(reader.readyState==4) {
        let text = reader.responseText;
        let L = {}
        let lines = text.split(/\r\n|\n/);
        for(var l of lines){
            var item = l.split(",")
            L[item[0]] = item[1]
        }
        T=L  //store translations in T
        if(reader.replace == true)
            translateReplace(L)
        if(reader.translateWithCareFunction != undefined) {
            reader.translateWithCareFunction(L)
        }
       
    }
}

function translateReplace(){
    html = document.body.innerHTML;
    head = document.getElementsByTagName("head")[0].innerHTML;
    for(k of Object.keys(T)) {
        html = html.replaceAll("{"+k+"}",T[k])
        head = head.replaceAll("{"+k+"}",T[k])
    }
    document.body.innerHTML = html;
    document.getElementsByTagName("head")[0].innerHTML = head;
}
