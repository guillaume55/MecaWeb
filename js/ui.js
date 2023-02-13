function hideElt(id){
    document.getElementById(id).style.display = "none"
}

function showElt(id){
    document.getElementById(id).style.display = "block"
}

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
    console.log("slider",slider)
    txtId = slider.id.replace("Slider","Value");
    console.log("txtid",txtId)
    value = slider.value.toString();
    document.getElementById(txtId).innerHTML = value;
  }
