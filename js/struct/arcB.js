function computeArcB(){
    let f_coef = parseFloat(document.getElementById('arcB_coef').value);
    let longueur = parseFloat(document.getElementById('arcB_length').value);
    let bl = parseFloat(document.getElementById('arcB_bl').value);

    let d_computed = longueur / (2*f_coef)
    document.getElementById('resArcB').innerHTML = d_computed < bl ? "Blocked" : "Sliding"

}

function selectArcB(val){
    let coef_friction = getFriction()
    if(val == "custom"){
        //document.getElementById('arcB_coef').style.display ="none";
    }else {
        //document.getElementById('arcB_coef').style.display ="block";
        document.getElementById('arcB_coef').value = coef_friction[val];
    }
}

function getFriction(){
    let coef_friction = {"custom":"","steel-steel-dry":0.15,"steel-steel-lub":0.12,
                         "steel-al-dry":0.35,"steel-Mo-S2":0.16,
                         "steel-bronze-dry":0.19,"steel-steel-lub":0.11,
                         "steel-bronze-dry":0.19,"steel-bronze-lub":0.11,
                         "steel-graphite-dry":0.20,
                         "steel-polyethylene-dry":0.30,"steel-PTFE-dry":0.04,
                         "steel-polyurethane-dry":0.50,"steel-polyurethane-lub":0.20}
    return coef_friction
}

function fillSelect(id, data){
    s = document.getElementById(id)
    //let options = getFriction()
    for(k of Object.keys(data)) {
        var c = document.createElement("option");
        c.text = k;
        s.options.add(c, 1);
    }
}

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