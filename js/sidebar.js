let sidebar_items = [["img/graph.png", "Graphs","joint-graph.html"],["img/tol.png", "Graphs","cytoscape.html"], ["img/cut.png", "CF", "cuts.html"],
["img/link.png", "Liaisons composées", "joint-composition.html"],["img/gears.png", "Transmission", "transmission.html"],["img/struct.png", "Structures", "structure.html"],["img/fits.png", "Ajustements", "fits.html"]];

function appendToSidebar(container) {
    if (window==window.top){ //do not show sidebar if embed in an Iframe
        let html = document.getElementById(container).innerHTML;
        for(let i=0; i<sidebar_items.length; i++){
            html += `<div class="sidebar-item"><a href="${sidebar_items[i][2]}"><img class="sidebar-logo" src="${sidebar_items[i][0]}"/><div class="sidebar-text">${sidebar_items[i][1]}</div></a></div>`
        }
        html += add_lang()
        document.getElementById(container).innerHTML = html;
    }
    else{ //hide sidebar
        document.getElementById("mySidebar").style.display = "none"
    }
}

function add_lang(){
    let available_languages = [["",""],["Français","fr"], ["English","en"]]
    let select = "<select onchange='translateRefresh(this.value)'>"
    for(o of available_languages){
        select += `<option value=${o[1]}>${o[0]}</option>`
    }
    select += "</select>"
    var html = `<div class="sidebar-item"><img class="sidebar-logo" src="img/lang.png"/><div class="sidebar-text">${select}</div></div>`
    return html
}

function changeLang(value){
    document.cookie = "lang="+value;
    translate("en");
}

function toggleSidebar(){
    let state = document.getElementById("sidebar-btn").innerHTML;
    if (state.search("☰") != -1) {//closed
        openNav();
    }
    else {
        closeNav();
    }
}

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("sidebar-btn").innerHTML = "×";
    let texts = document.getElementsByClassName("sidebar-text")
    for(t of texts){
        t.style.display = "block";
    }
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "50px";
    document.getElementById("main").style.marginLeft= "50px";
    document.getElementById("sidebar-btn").innerHTML = "&#9776;";
    let texts = document.getElementsByClassName("sidebar-text")
    for(t of texts){
        t.style.display = "none";
    }
}
