//Non scientific focused function

//get which radio button is checked
function getRadio(name){
    radios = document.getElementsByName(name)
    for(e of radios){
        if(e.checked==true)
            return e.value
    }
}

//to be replaced with ui.js --> refreshSliderValue
function refreshSliderVal(val, toRefresh){
    document.getElementById(toRefresh).innerHTML = val;
}