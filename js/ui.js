function hideElt(id){
    document.getElementById(id).style.display = "none"
}

function showElt(id){
    document.getElementById(id).style.display = "block"
}

/**
 * For multi tabs calculators. Opens automatically the tab given in the url
 */
function openTabStartUp(){
    var url = window.location.href;
    var tab = 0
    try{
        let searchParams = new URLSearchParams(url);
        var tab = parseInt(searchParams.get("tab"));
        if(isNaN(tab)){ tab = 0}
    }
    finally {
        document.getElementsByClassName('tablinks')[tab].click() //open tab
    }
}

/**
 * Refresh the value next to a slider
 * The id of the text should be xxxxxxValue and the id of the slider xxxxSlider
 * @param {*} slider 
 */
function refreshSliderValue(slider){
    txtId = slider.id.replace("Slider","Value");
    value = slider.value.toString();
    document.getElementById(txtId).innerHTML = value;
}

/**
 * Fill a select element with a dict {"MyOption":"OptionValue",}
 * @param {string} id Id of the slect
 * @param {dict} data {"MyOption":"OptionValue",}
 */
function fillSelect(id, data){
    s = document.getElementById(id)
    for(k of Object.keys(data)) {
        var c = document.createElement("option");
        c.text = k;
        s.options.add(c, 1);
    }
}

/**
 * Fill a select element with a dict (with OPTGROUP) {"optgroup1":{"MyOption":"OptionValue",},}
 * @param {string} id Id of the slect
 * @param {dict} data {"optgroup1":{"MyOption":"OptionValue",},}
 */
function fillSelectGroup(id, data){
    s = document.getElementById(id)
    for(k of Object.keys(data)){
        let g = document.createElement("OPTGROUP");
        g.setAttribute("label", k);
        for(k2 of Object.keys(data[k])) {
            var c = document.createElement("option");
            c.text = k2;
            g.appendChild(c)
        }
        s.appendChild(g)
    }
}