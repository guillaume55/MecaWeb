function selectYoung(val,select_id){
    let materials = getYoungModulus()
    let young = 0
    for(k of Object.keys(materials)){
        if(materials[k][val] != undefined){
            young = materials[k][val];
        }
    }
    if(val == "custom"){
        //document.getElementById('arcB_coef').style.display ="none";
    }else {
        //document.getElementById('arcB_coef').style.display ="block";
        document.getElementById(select_id).value = young;
    }
}

//young modulus
function getYoungModulus(){
    let steels = {"Stainless":195,"A36":200}
    let al = {"Al 1100":69,"Al 2024":72.4,"Al 6061":69,"Al7075":71}
    let otherMetals = {"Brass":106,"Bronze":112,"Inconel":207,"Copper":110,"Gold":77.2,"Mg alloy":45.2,"Nickel":200, "Ti Alloy Ti- 6AL-4V":114}
    let plastics = {"HDPE":1.1,"LDPE":0.228,"PC":2.2,"PP":1.68,"PET":3.14,"Nylon 66":2.93}
    let other = {"Human bone":14,"Diamond":1130}
    let materials = {"":{"custom":""},"Steel":steels,"Aluminum":al,"Other metals":otherMetals,"Plastics":plastics, "Other": other}
    
    return materials
}

function getDensity(){
    let steels = {"Stainless":7800,"7800":200}
    let al = {"Al 1100":2710,"Al 2024":2780,"Al 6061":2700,"Al7075":2810}
    let otherMetals = {"Brass":8530,"Bronze":8170,"Inconel":8200,"Copper":8920,"Gold":19320,"Mg alloy":1800,"Nickel":8900, "Ti Alloy Ti- 6AL-4V":4500}
    let plastics = {"HDPE":950,"LDPE":915,"PC":1200,"PP":900,"PET":1350,"Nylon 66":1150}
    let other = {"Human bone":1850,"Diamond":3500}
    let materials = {"":{"custom":""},"Steel":steels,"Aluminum":al,"Other metals":otherMetals,"Plastics":plastics, "Other": other}
    
    return materials
}