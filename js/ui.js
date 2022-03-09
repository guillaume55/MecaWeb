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
        var tab = searchParams.get("tab");
    }
    finally {
        document.getElementsByClassName('tablinks')[parseInt(tab)].click() //open tab
    }
    console.log("ab",tab)
}
