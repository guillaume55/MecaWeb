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
        console.log(url)
        let searchParams = new URLSearchParams(url);
        var tab = parseInt(searchParams.get("tab"));
        if(isNaN(tab)){ tab = 0}
    }
    finally {
        console.log("tab",tab)
        document.getElementsByClassName('tablinks')[tab].click() //open tab
    }
}
