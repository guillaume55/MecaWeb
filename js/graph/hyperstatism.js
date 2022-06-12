/*
BE CARREFUL, WHEN THERE ARE MANY PATH BETWEEN X PARTS, WE DO NOT CHECK EACH PATH CURRENTLY. SO WE MISS SOME HYPERTATISM
*/

//ARCHITECTURE
/*
first, we find cycles
then we group (by writing blocked mobilities in an array) all the links between two nodes
Now we can process cycles with more nodes with equations

*/

//find hyperstatisms for the provided graph 
//hyperstatism between two parts with multiple links is a bit different because the nodes of the graph are the same, but the path can be different

function processHyperstatism(cycles){
    let equations = [] //add mobilities

    //the first links will define the point where we will do all the calculation
    pointOfApplication = get_edges_from_nodes(cycles[0][0], cycles[0][1])[0].point

    for(let i=0; i< cycles.length; i++) {

        //find all edges between two nodes
        let edges_between=[]
        //cycle of more than 3 nodes (different behavior)
        if(cycles[i].length > 3) {
            console.log("cycle of more than two nodes")
            edges_between = get_edges_from_nodes(cycles[i][0], cycles[i][1])
            equations = equations.concat(write_eq_for_cycle(edges_between, fc))
        }
        else { //cycle of two nodes
            console.log("cycle of two nodes")
            c = [...cycles[i]]
            for(let j=1; j<c.length; j++) {
                ed = get_edges_from_nodes(c[j-1], c[j])
                edges_between.push(ed)               
            }
            console.log("edges ",edges_between)
            findLocalHyperstatism(edges_between[0], pointOfApplication);
        }
        
    }
}

//this one is between two nodes only (we call it "local")
//use the method of kinematic torsors
//because the loop is closed , we can write for Rx, Ry, Rz, Tx, Ty, Tz equations on the form w1x = w2x = w3x where the number is the nth link betwwen the nodes
//if we got more than one zero in one of the six equations (materialized by an array), it's an hyperstaticity
//if we got only ones, it's a mobility
//be carreful, each links have to be used at the same point, that's why we use babar function here
function findLocalHyperstatism(edges, pointForBabar){
    let kinematicTorsor = [[],[],[],[],[],[]] ; //do I have to use shorter names ? 0 is blocked, 1 is a mobility (aka speed)

    for(edge of edges){
        mobs_r = get_mobilities_from_edge(edge.type) //be careful, send Tx Ty Tz Rx Ry Rz
        mobs = [mobs_r[3], mobs_r[4], mobs_r[5], mobs_r[0], mobs_r[1], mobs_r[2]]; //in this torsor, we use Rx Ry Rz Tx Ty Tz
 
        let moment = mechmath_babarTrueFalse(edge.point, pointForBabar, [mobs[0], mobs[1], mobs[2]], [mobs[3], mobs[4], mobs[5]])
        mobs[3]=moment[0];
        mobs[4]=moment[1];
        mobs[5]=moment[2];
        
        for(let i=0; i<6; i++){ //6 mobilities
            kinematicTorsor[i].push(mobs[i]);
        }
    }
    let hyperstaticity = [0,0,0,0,0,0]
    let mobility = [0,0,0,0,0,0]
    for(let i=0; i<6; i++){ //6 mobilities
        let countZero = countInArray(kinematicTorsor[i],0) //can produce hyperstaticity
        hyperstaticity[i] = (countZero)>0?countZero-1:0;

        //let countOne = countInArray(kinematicTorsor[i],1) //can produce mobility
        //mobility[i] = (countOne==kinematicTorsor[i].length?1:0)
    }
    console.log(hyperstaticity, mobility)
    return hyperstaticity;
}

//this one is for global hyperstaticity, which is the hyperstaticity in a cycle of more than two nodes
function findGlobalHyperstatism(edges, pointForBabar){
    let kinematicTorsor = makeEquationsFromEdges(edges, pointForBabar) // 0 is blocked, 1 is a mobility (aka speed)
    
    let hyperstaticity = [0,0,0,0,0,0]
    let mobility = [0,0,0,0,0,0]
    for(let i=0; i<6; i++){ //6 mobilities
        let countZero = countInArray(kinematicTorsor[i],0) //can produce hyperstaticity
        hyperstaticity[i] = (countZero)>0?countZero-1:0;

        //let countOne = countInArray(kinematicTorsor[i],1) //can produce mobility
        //mobility[i] = (countOne==kinematicTorsor[i].length?1:0)
    }
    console.log(hyperstaticity, mobility)
    return hyperstaticity;
}

//as an array of each terms
function makeEquationsFromEdges(edges, pointForBabar){
    let kinematicTorsor = [[],[],[],[],[],[]]
    for(edge of edges){
        mobs_r = get_mobilities_from_edge(edge.type) //be careful, send Tx Ty Tz Rx Ry Rz
        mobs = [mobs_r[3], mobs_r[4], mobs_r[5], mobs_r[0], mobs_r[1], mobs_r[2]]; //in this torsor, we use Rx Ry Rz Tx Ty Tz
 
        let moment = mechmath_babarTrueFalse(edge.point, pointForBabar, [mobs[0], mobs[1], mobs[2]], [mobs[3], mobs[4], mobs[5]])
        mobs[3]=moment[0];
        mobs[4]=moment[1];
        mobs[5]=moment[2];
        
        for(let i=0; i<6; i++){ //6 mobilities
            kinematicTorsor[i].push(mobs[i]);
        }
    }
    return kinematicTorsor
}

function countInArray(array, target){
    let counter = 0;
    for (elt of array) {
        if (elt == target) {
            counter++;
        }
    };
    return counter;
}


//
/*
function findLocalHyperstatisms(graph){


}*/

/*
function findHyperstatismInEquations(equations){
    //if no I_ in an equation, we are sure that there is an hyperstaticity
    let h = 0; //hyperstaticity degree
    let m = 0; //number of mobilities
    for(eq of equations){
        //console.log(eq)
        if(isEquationHyperstatic(eq)){
            console.log(eq, " is hyperstatic")
            h += 1;
        }
        if(isEquationMobility(eq)){
            console.log(eq, " is a mobility")
            m += 1;
        }
    }
    document.getElementById("hyperstatismDiv").innerHTML = `There is ${h} degree${h<1?"s":""} of hyperstaticity in your model<br> and ${m} degree${m<1?"s":""} of mobility (which can be residual or piloted mobilit${m<1?"ies":"y"})`


    return {hyperstaticity:h, mobilities:m}
}
*/
/*
//If an equation has no component with an "I" (and two distincts termes) it means that there is an hyperstaticity
//return 1 if hyperstatic, 0 if not
function isEquationHyperstatic(equation){
    if(countI_(eq) == 0 && countMechTerms(eq)>= 2){ //I not found in at least two terms : hyperstatic
        return 1;
    } 
    return 0; //may not be hyperstatic
}

//if there is only "I_", this is a mobility
function isEquationMobility(eq){
    if(countI_(eq) == countMechTerms(eq) && countI_(eq) >1){ //each term is I_
        return 1;
    } 
    return 0; //is not a mobility
}

//counct the number of terms with an I in an equation
function countI_(eq){
    let matchs = eq.match(/I_/g)
    if(matchs == null || matchs.length == 0)
        return 0;
    return matchs.length;
 }

//counct the number of termes (alpha beta gamma, u, v, w only) in an equation
function countMechTerms(eq){
    let regex = /alpha_|beta_|gamma_|u_|v_|w_/ig;
    let matchs = eq.match(regex);
    if(matchs == null || matchs.length == 0)
        return 0;
    return matchs.length;
}

*/