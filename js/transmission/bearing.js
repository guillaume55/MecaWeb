function computeBearings(){
    let bearings = []
    let speed = parseFloat(document.getElementById('bearing_speed').value)

    for(let i=1; i<=2; i++){
        let bearingType = document.getElementById(`bearing_${i}`).value;
        let C0 = parseFloat(document.getElementById(`bearing_${i}C0`).value);
        let C = parseFloat(document.getElementById(`bearing_${i}C`).value);
        let Fr = parseFloat(document.getElementById(`bearing_${i}Fr`).value);
        let Fa = parseFloat(document.getElementById(`bearing_${i}Fa`).value);
        let useCase = parseFloat(document.getElementById(`bearing_useCase`).value);
        let bearing = {"type":bearingType, "C0":C0, "C":C,"Fr":Fr,"Fa":Fa,"useCase":useCase}
        if(bearingType=="ballRadial"){
            bearing = bearing_computeEXY(bearing);
            bearing = bearing_computeEqLoad(bearing);
            bearing = bearing_computeLife(bearing);
            bearings.push(bearing);

            life = ['L10','L5','L4','L3','L2','L1','L05'];
            console.log(bearing)
            for(l of life){
                //life in million of turns
                document.getElementById(`bearing_${i}${l}`).innerHTML = Math.floor(bearing[l]);
                //life in hours
                document.getElementById(`bearing_${i}${l}h`).innerHTML = Math.floor((1000000*bearing[l])/(60*speed));
            }
        }
    }
    //life of the set
    Lset10 = bearing_computeLifeOfSet(bearings)
    document.getElementById('bearing_setLife').innerHTML = Lset10
    document.getElementById('bearing_setLifeH').innerHTML = Math.floor((1000000*Lset10)/(60*speed));
}

//if read EXY == true, we won't calculate those value but use the ones in the array
function computeBearingsOblic(readEXY){
    let bearings = []
    let speed = parseFloat(document.getElementById('bearing_speed').value)
    
    //save in 
    for(let i=1; i<=2; i++){
        let bearingType = document.getElementById(`bearing_${i}`).value;
        let C0 = parseFloat(document.getElementById(`bearing_${i}C0`).value);
        let C = parseFloat(document.getElementById(`bearing_${i}C`).value);
        let Fr = Math.abs(parseFloat(document.getElementById(`bearing_${i}Fr`).value));
        let Fa = Math.abs(parseFloat(document.getElementById(`bearing_${i}Fa`).value));
        let useCase = parseFloat(document.getElementById(`bearing_useCase`).value);
        let bearing = {"type":bearingType, "C0":C0, "C":C,"Fr":Fr,"Fa":Fa,"useCase":useCase}
        if(readEXY == 0){
            bearing = bearing_computeEXY(bearing); //don't read, compute
        }
        else { //the user wants it's own values
            let bearingIndex = ['A','B']
            bearing['e'] = parseFloat(document.getElementById('bearingOX_e'+bearingIndex[i-1]))
            bearing['X'] = parseFloat(document.getElementById('bearingOX_X'+bearingIndex[i-1]))
            bearing['Y'] = parseFloat(document.getElementById('bearingOX_Y'+bearingIndex[i-1]))
        }
            
        bearings.push(bearing)
    }

    if(bearings[0].type.search('ballOblic') != -1){
        //iso calculation method
        bearings = bearing_oblicISO(bearings);
        //now we have enough informations to compute the lifespan of the bearings with induced loads
        bearings[0] = bearing_computeLife(bearings[0]);
        bearings[1] = bearing_computeLife(bearings[1]);
        //show it to the user
        bearing_fillTableWithComputedValues(bearings)
    }

    //life of the set
    Lset10 = bearing_computeLifeOfSet(bearings)
    document.getElementById('bearing_setLife').innerHTML = Lset10
    document.getElementById('bearing_setLifeH').innerHTML = Math.floor((1000000*Lset10)/(60*speed));
}

function bearing_computeLife(bearing){
    let coef_n = 3; //10/3 for rollerroller
    let L10 = Math.pow(bearing['C']/bearing['P'],coef_n)
    bearing['L10'] = L10;
    bearing['L5'] = L10*0.64;
    bearing['L4'] = L10*0.55;
    bearing['L3'] = L10*0.47;
    bearing['L2'] = L10*0.37;
    bearing['L1'] = L10*0.25;
    bearing['L05']= L10*0.175;
    return bearing;
}

function bearing_computeLifeOfSet(bearings){
    let Lset10 = 0;
    for(b of bearings){
        Lset10 += Math.pow((1/b['L10']),1.5);
    }
    Lset10 = Math.pow(Lset10,-1/1.5)
    return Lset10
}

function bearing_computeEqLoad(b){
    let ratio = b['Fa']/b['Fr'] 
    //dynamic equivalent load
    //P = X1.Fr + Y1.Fa if Fa/Fr ⩽ e
    //P = X2.Fr + Y2.Fa if Fa/Fr > e

    if(b['type']=="ballRadial"){
        b['P'] = (ratio > b['e'] ? (0.56*b['Fr']+b['Y1']*b['Fa']) : b['Fr']  )
    }
    //b['P'] = (ratio > b['e'] ? b['X2']*b['Fr'] + b['Y2']*b['Fa'] : b['X1']*b['Fr'] + b['Y1']*b['Fa'] )


    //static equivalent load
    b['P0']= b['useCase']*(b['X1']*b['Fr']+b['Y1']*b['Fa'])
    if(b['C0']<=b['P0']){
        b['P0'] = "ERROR C0<P0"
    }
    return b
}

function bearing_computeEXY(bearing){
    let e = "err"; let X1 = "err"; let X2 = "err"; let Y1="err"; let Y2="err"
    if(bearing['type']=="ballRadial"){

        let FaC0 =  bearing['Fa']/bearing['C0']
        X1 = 0.56; 
        console.log("int FaC0=",FaC0)
        if(FaC0 < 0.028){[e,Y1] = linInt([FaC0,0.014,0.028],[[0.19,0.22],[2.3,1.99]]);}
        else if(FaC0 < 0.056){[e,Y1] = linInt([FaC0,0.028,0.056],[[0.22,0.26],[1.99,1.71]]);}
        else if(FaC0 < 0.084){[e,Y1] = linInt([FaC0,0.056,0.084],[[0.26,0.28],[1.71,1.55]]);}
        else if(FaC0 < 0.11){[e,Y1] = linInt([FaC0,0.084,0.11],[[0.28,0.30],[1.55,1.45]]);}
        else if(FaC0 < 0.17){[e,Y1] = linInt([FaC0,0.11,0.17],[[0.30,0.34],[1.45,1.31]]);}
        else if(FaC0 < 0.28){[e,Y1] = linInt([FaC0,0.17,0.28],[[0.34,0.38],[1.31,1.15]]);}
        else if(FaC0 < 0.42){[e,Y1] = linInt([FaC0,0.28,0.42],[[0.38,0.42],[1.15,1.04]]);}
        else if(FaC0 < 0.56){[e,Y1] = linInt([FaC0,0.42,0.56],[[0.42,0.44],[1.04,1.0]]);}    
    }
    else if (bearing['type'].search("ballOblic") != -1){
        let angle = parseInt(bearing['type'].replace("ballOblicX","").replace("ballOblicO",""))
        
        if(angle == 20){ e = 0.57;}
        else if(angle == 25){ e = 0.68;}
        else if(angle == 30){ e = 0.80;}
        else if(angle == 35){ e = 0.95;}
        else if(angle == 40){ e = 1.14;}
        else if(angle == 45){ e = 1.33;}

        if(bearing['Fa']/bearing['Fr'] <=e){
            X1 = 1
            Y1 = 0
        }
        else {
            if(angle == 20){ X1=0.43; Y1=1.00; }
            else if(angle == 25){ X1=0.41; Y1=0.87}
            else if(angle == 30){ X1=0.39; Y1=0.76; }
            else if(angle == 35){ X1=0.37; Y1=0.66; }
            else if(angle == 40){ X1=0.35; Y1=0.57; }
            else if(angle == 45){ X1=0.33; Y1=0.50; }
        }
    }
    else if (bearing['type'].search("rollerOblic") != -1){
        let angle = parseInt(bearing['type'].replace("rollerOblicX","").replace("rollerOblicO",""))
        //e = 1.5*tan(alpha radians); Y=0.4*cotan(alpha radians)
        if(angle == 20){ e = 0.54; Y1=1.1; }
        else if(angle == 25){ e = 0.70; Y1=0.85; }
        else if(angle == 30){ e = 0.86;Y1=0.69; }
        else if(angle == 35){ e = 1.05; Y1=0.57; }
        else if(angle == 40){ e = 1.26;Y1=0.47; }
        else if(angle == 45){ e = 1.5; Y1=0.4; }
    }


    bearing['e']=e
    bearing['X1']=X1
    bearing['Y1']=Y1
    bearing['X2']=X2
    bearing['Y2']=Y2
    return bearing;
}

//determine which bearing turn with an axial play and which support the axial load
function bearing_oblicISO(bearings){
    // ---BearingA-----------BearingB-------
    //in both case, Bearing A receive the Axial Load
    //mounted in X, Axial load 
    // ---BearingA------(<-----AxialLoad)-----BearingB-------

    //mounted in O, Axial load 
    // ---BearingA------(AxialLoad----->)-----BearingB-------

    //could be reduced by assigning values 1 or 0 to var A and B
    //if (bearing['type'].find("ballOblicX") != -1){
        console.log("fr", bearings[0]['Fr'], "Y1",bearings[0]['Y1'])
        LoadsA = (0.5*bearings[0]['Fr'])/bearings[0]['Y1']
        LoadsB = (0.5*bearings[1]['Fr'])/bearings[1]['Y1']

        //case 1 from Guide des et technologies indutrielles p298
        if(LoadsA <= LoadsB + bearings[0]['Fa']){
            document.getElementById("bearing_case1").style.color="green"
            document.getElementById("bearing_case2").style.color="red"
            //update Fa values (axial loads)
            console.log(bearings[0]['Fa'], LoadsA, LoadsB)
            bearings[0]['Fa']=LoadsA+bearings[0]['Fa'] //Bearing A
            bearings[1]['Fa']=LoadsB //Bearing B
            //determine P equivalent loads
            bearings[1]['P']=bearings[1]['Fr']
            if((bearings[0]['Fa']/bearings[0]['Fr'])>bearings[0]['e']){
                //console.log('P bearing 0',`0.4*${bearings[0]['Fr']}+${bearings[0]['Y1']}*${bearings[0]['Fa']}`, 0.4*bearings[0]['Fr']+bearings[0]['Y1']*bearings[0]['Fa'])
                bearings[0]['P']=0.4*bearings[0]['Fr']+bearings[0]['Y1']*bearings[0]['Fa']
            }else{
                bearings[0]['P']=bearings[0]['Fr']
            }

        }
        else { //case 2
            document.getElementById("bearing_case1").style.color="red"
            document.getElementById("bearing_case2").style.color="green"
            //update Fa values (axial loads)
            bearings[0]['Fa']=LoadsA //Bearing A
            bearings[1]['Fa']=LoadsB - bearings[0]['Fa'] //Bearing B  (Fa is the same for both bearings)
            //determine P equivalent loads
            bearings[0]['P']=bearings[0]['Fr']
            if((bearings[1]['Fa']/bearings[1]['Fr'])>bearings[1]['e']){
                bearings[1]['P']=0.4*bearings[1]['Fr']+bearings[1]['Y1']*bearings[1]['Fa']
            }else{
                bearings[1]['P']=bearings[1]['Fr']
            }
        }
    
    //}
    /*
    else if (bearing['type'].find("ballOblicO") != -1){
        LoadsA = (0.5*bearings[1]['Fr'])/bearings[1]['Y1']
        LoadsB = (0.5*bearings[0]['Fr'])/bearings[0]['Y1']
        if(LoadsA > LoadsB + bearings['Fa']){
            console.log("ISO ok")
            bearings[1]['Fa']=LoadsB-bearings[0]['Fa']
            bearings[0]['Fa']=LoadsA
            //determine P equivalent loads
            bearings[0]['P']=bearings[0]['Fr']
            if((bearings[1]['Fa']/bearings[1]['Fr'])>bearings[1]['e']){
                bearings[1]['P']=0.4*bearings[1]['Fr']+bearings[1]['Y1']*bearings[1]['Fa']
            }else{
                bearings[1]['P']=bearings[1]['Fr']
            }
        }
        else {console.log("ISO pas ok")}
    }*/

    /*
    //determine the direction of the axial load
    if(AxialLoadDir == "to_1"){
        //inducted load on second bearing, nammed bearing A
        LoadsA = (0.5*bearings[1]['Fr'])/bearings[1]['Y1']
        //inducted load on first bearing, nammed bearing B
        LoadsB = (0.5*bearings[0]['Fr'])/bearings[0]['Y1'] + bearings[1]['Fa']

    } else if(AxialLoadDir == "to_2"){}

    */
   return bearings
}

function bearing_fillTableWithComputedValues(bearings){
    let name = "A"
    for(b of bearings){
        //e factor
        document.getElementById("bearingOX_e"+name).value = b['e'];

        //
        document.getElementById("bearingOX_X"+name).value = b['X1'];

        //
        document.getElementById("bearingOX_Y"+name).value = b['Y1'];

        //axial load
        document.getElementById("bearingOX_Fa"+name).innerHTML = b['Fa'];

        //radial load
        document.getElementById("bearingOX_Fr"+name).innerHTML = b['Fr'];

        //equivalent load
        document.getElementById("bearingOX_P"+name).innerHTML = b['P'];

        name="B"
    }
}
