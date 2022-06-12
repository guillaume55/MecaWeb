/*******************************
 * All mechanical parameters are defined here
 *
 *
 *
 *
 *
 *
 * ****************************/
//be careful, send Tx ty tz rx ry rz in this order, which is not ideal to do tolerancing
//1 correspond to a possible mobility, 0 is blocked
function mech_links(){
    links = {}
    //links['Choix'] = [0,0,0,0,0,0];
    links['PG x']=[1,0,0,1,0,0];
    links['PG y']=[0,1,0,0,1,0];
    links['PG z']=[0,0,1,0,0,1];
    links['Piv x']=[0,0,0,1,0,0];
    links['Piv y']=[0,0,0,0,1,0];
    links['Piv z']=[0,0,0,0,0,1];
    links['G x']=[1,0,0,0,0,0];
    links['G y']=[0,1,0,0,0,0];
    links['G z']=[0,0,1,0,0,0];
    links['LA x']=[1,0,0,1,1,1];
    links['LA y']=[0,1,0,1,1,1];
    links['LA z']=[0,0,1,1,1,1];
    links['Rot']=[0,0,0,1,1,1];
    links['Ponct x']=[0,1,1,1,1,1];
    links['Ponct y']=[1,0,1,1,1,1];
    links['Ponct z']=[1,1,0,1,1,1];
    links['AP x']=[0,1,1,1,0,0];
    links['AP y']=[1,0,1,0,1,0];
    links['AP z']=[1,1,0,0,0,1];
    links['Doigt x']=[1,0,0,1,1,1];
    links['Doigt y']=[0,1,0,1,1,1];
    links['Doigt z']=[0,0,1,1,1,1];
    links['LR axe x norm y']=[1,0,1,1,1,0];
    links['LR axe x norm z']=[1,1,0,1,0,1];
    links['LR axe y norm x']=[0,1,1,1,1,0];
    links['LR axe y norm z']=[1,1,0,0,1,1];
    links['LR axe z norm x']=[0,1,1,1,0,1];
    links['LR axe z norm y']=[1,0,1,0,1,1];
    links['FC'] = [1,1,1,1,1,1];

    return links
}

//properties required to compute models
function mech_linkProp(){
    links = {}
    //links['Choix'] = [0,0,0,0,0,0];
    links['PG']=["nom","sa1","sa2","axis","point","jeu","tol"];
    links['Pivot']=["nom","sa1","sa2","axis","point","jeu","tol"];
    links['Glissiere']=["nom","sa1","sa2","axis","point","jeu","tol"];
    links['LA']=["nom","sa1","sa2","axis","point","jeu","tol"];
    links['Rot']=["nom","sa1","sa2","point","jeu","tol"];
    links['Ponctuelle']=["nom","sa1","sa2","norm","point","jeu","tol"];
    links['AP']=["nom","sa1","sa2","norm","point","jeu","tol"];
    links['Doigt']=["nom","sa1","sa2","axis","norm","point","jeu","tol"]; //revoir
    links['LR']=["nom","sa1","sa2","axis","norm","point","jeu","tol"];

    return links
}
