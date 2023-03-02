/**
 * 
 */
function computeArcB(){
    let f_coef = parseFloat(document.getElementById('arcB_coef').value);
    let longueur = parseFloat(document.getElementById('arcB_length').value);
    let bl = parseFloat(document.getElementById('arcB_bl').value);

    let d_computed = longueur / (2*f_coef)

    // slider to give a bit more information
    const threshold = 25 //area where we are not sure 

    if(d_computed < bl - threshold)
    { 
        document.getElementById('arcB_range').value = 2; //locked
        document.getElementById("arcB_range").style.backgroundColor = 'lightred';
        document.getElementById('resArcB').innerHTML = T["Blocked"];
    }
    else if (d_computed < bl)
    {
        document.getElementById('arcB_range').value = 1; //maybe locked
        document.getElementById("arcB_range").style.backgroundColor = 'orange';
        document.getElementById('resArcB').innerHTML = T["Probably"] + " " +T["Blocked"];

    }
    else if (d_computed > bl + threshold) 
    { //
        document.getElementById('arcB_range').value = -2; //sliding
        document.getElementById("arcB_range").style.backgroundColor = 'green';
        document.getElementById('resArcB').innerHTML = T["Sliding"];

    }
    else
    {
        document.getElementById('arcB_range').value = -1;  //maybe sliding
        document.getElementById("arcB_range").style.backgroundColor = 'lightgreen';
        document.getElementById('resArcB').innerHTML = T["Probably"] + " " + T["Sliding"];

    }
}
