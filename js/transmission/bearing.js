function computeBearings(){
    let bearings = []
    let speed = parseFloat(document.getElementById('bearing_speed').value)

    for(let i=1; i<=2; i++){
        let bearingType = document.getElementById(`bearing_${i}`).value;
        let C0 = parseFloat(document.getElementById(`bearing_${i}C0`).value);
        let C = parseFloat(document.getElementById(`bearing_${i}C`).value);
        let Fr = parseFloat(document.getElementById(`bearing_${i}Fr`).value);
        let Fa = parseFloat(document.getElementById(`bearing_Fa`).value);
        let useCase = parseFloat(document.getElementById(`bearing_useCase`).value);
        let bearing = {"type":bearingType, "C0":C0, "C":C,"Fr":Fr,"Fa":Fa,"useCase":useCase}
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
    else if (bearing['type'].find("ballOblicXO") != -1){
        let angle = parseInt(bearing['type'].replace(ballOblicXO,""))
        
        if(angle == 20){ e = 0.57;}
        else if(angle == 25){ e = 0.68;}
        else if(angle == 30){ e = 0.80;}
        else if(angle == 35){ e = 0.95;}
        else if(angle == 40){ e = 1.14;}
        else if(angle == 45){ e = 1.33;}

        if(bearing['Fa']/bearing['Fr'] <=e){
            X1 = 1
            if(angle == 20){ Y1=1.09; }
            else if(angle == 25){ Y1=0.92; }
            else if(angle == 30){ Y1=0.78; }
            else if(angle == 35){ Y1=0.66; }
            else if(angle == 40){ Y1=0.55; }
            else if(angle == 45){ Y1=0.47; }
        }
        else {
            if(angle == 20){ X1=0.7; Y1=1.63; }
            else if(angle == 25){ X1=0.67; Y1=1.41}
            else if(angle == 30){ X1=0.63; Y1=1.24; }
            else if(angle == 35){ X1=0.6; Y1=1.07; }
            else if(angle == 40){ X1=0.57; Y1=0.93; }
            else if(angle == 45){ X1=0.51; Y1=0.81; }
        }
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
    

    //determine the direction of the axial load
    if(AxialLoadDir == "to_1"){
        //inducted load on second bearing, nammed bearing A
        LoadsA = (0.5*bearings[1]['Fr'])/bearings[1]['Y1']
        //inducted load on first bearing, nammed bearing B
        LoadsB = (0.5*bearings[0]['Fr'])/bearings[0]['Y1'] + bearings[1]['Fa']

    } else if(AxialLoadDir == "to_2")

    
}
