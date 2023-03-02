/**
 * returns dict of standard friction coefficients
 * @returns 
 */
function frictionDB(){
    let coef_friction = {"custom":"","steel-steel-dry":0.15,"steel-steel-lub":0.12,
                         "steel-al-dry":0.35,"steel-Mo-S2":0.16,
                         "steel-bronze-dry":0.19,"steel-steel-lub":0.11,
                         "steel-bronze-dry":0.19,"steel-bronze-lub":0.11,
                         "steel-graphite-dry":0.20,
                         "steel-polyethylene-dry":0.30,"steel-PTFE-dry":0.04,
                         "steel-polyurethane-dry":0.50,"steel-polyurethane-lub":0.20}
    return coef_friction
}

function refreshFrictionCoef(selectValue,inputId){
    let frictionCoefs = frictionDB();

    if(selectValue == "custom")  //let the user choose
    { 
        document.getElementById(inputId).disabled ="";
    }
    else //coef from the list
    {
        document.getElementById(inputId).disabled ="true";
        document.getElementById(inputId).value = frictionCoefs[selectValue]; //find matching value 
    }
}
