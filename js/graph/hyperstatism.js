/*
Those functions are used to compute hyperstaticity in a graph from the cycles and graph
We used a french mathematical tool named kinetic torsor (torseur cinématique) define as 2 sets of 3 mobilities. The first set is the 3 rotations, that does not depends on the point of application. We call it resultante
The seconde set is the moment, and is compose of the 3 translations in space. It does depends on the point of application and should be displaced. All calculations for the moment should be done at the same point. We choose the point of the first link
The torsor is defined as
{
    wx, wy, wz
    Vx, Vy, Vy
}
w corresponds to rotations (speeds, because it's a kinetic torsor)
V are translation speeds and depends of the position of the point

Then we compute the hyperstaticity with those torsor and the kinematic method. This method differs when we study a group of two nodes (local hyperstaticity) and a cycle (global hyperstaticity)
Then, we add all hyperstaticity to find the total

*/

//find hyperstatisms for the provided cycles 
function processHyperstatism(cycles){
    let equations = [] //add mobilities

    //the first links will define the point where we will do all the calculation
    pointOfApplication = get_edges_from_nodes(cycles[0][0], cycles[0][1])[0].point
    let totalHyperstatism = [0,0,0,0,0,0]
    let hyperstatismData = []

    //find all edges between two nodes
    
    let equivalent_links = {}
    //first, process cycles of two nodes (local) of group all the links in one equivalent link
    for(let i=0; i< cycles.length; i++) {
        //let equivalent_link = [0,0,0,0,0,0]
        let edges_between=[]
        if(cycles[i].length <= 2) { //cycle of two nodes
            console.log("cycle of two nodes",cycles[i].toString())
            c = [...cycles[i]]
            for(let j=1; j<c.length; j++) {
                ed = get_edges_from_nodes(c[j-1], c[j])
                edges_between.push(ed)               
            }
            
            data = findLocalHyperstatism(edges_between[0], pointOfApplication);  
            hyperstatism = data[0]
            equivalent_links[cycles[i].toString()] = data[1]
            //console.log("-->", equivalent_link)
            
            if(countInArray(hyperstatism, 1) > 0){ //at least one degree of hyperstaticity
                hyperstatismData.push({edge: edges_between, cycle: cycles[i], h:hyperstatism})
            }
            
            for(let k=0; k<6; k++){
                totalHyperstatism[k] += hyperstatism[k];
            }
            ///equivalent_links[cycles[i].toString()]=equivalent_link
            //console.log("totalHyperstatism",totalHyperstatism)
        }
    }


    console.log("No more cycles of two nodes, computaing big cycles", "equivalent_links", equivalent_links)
    //then process bigger cycles with the equivalent links
    for(let i=0; i< cycles.length; i++) {
        let edges_between=[]
        //cycle of more than 3 nodes (different behavior)
        if(cycles[i].length > 2) {
            //close cycle so we will have also links between last and first node
            cycles[i].push(cycles[i][0])
            c = [...cycles[i]]
            for(let j=1; j<c.length; j++) {
                ed = get_edges_from_nodes(c[j-1], c[j])
                edges_between.push(ed[0])               
            }
            //equations = equations.concat(write_eq_for_cycle(edges_between, fc))
            hyperstatism = findGlobalHyperstatism(edges_between, pointOfApplication);
        
            if(countInArray(hyperstatism, 1) > 0){ //at least one degree of hyperstaticity
                hyperstatismData.push({edge: edges_between, cycle: cycles[i], h:hyperstatism})
            }
            
            for(let k=0; k<6; k++){
                totalHyperstatism[k] += hyperstatism[k];
            }
        }
    }

    return {degree: sumArray(totalHyperstatism), data:hyperstatismData}
}

//this one is between two nodes only (we call it "local")
//use the method of kinematic torsors
//because the loop is closed , we can write for Rx, Ry, Rz, Tx, Ty, Tz equations on the form w1x = w2x = w3x where the number is the nth link betwwen the nodes
//if we got more than one zero in one of the six equations (materialized by an array), it's an hyperstaticity
//if we got only ones, it's a mobility
//be carreful, each links have to be used at the same point, that's why we use babar function here
function findLocalHyperstatism(edges, pointForBabar){
    //now conbine all links by calculating them at the same point
    let kinematicTorsor = makeEquationsFromEdges(edges, pointForBabar) // 0 is blocked, 1 is a mobility (aka speed)
    console.log("kin", kinematicTorsor)
    let blocked = [0,0,0,0,0,0]
    let hyperstaticity = [0,0,0,0,0,0]
    //let mobility = [0,0,0,0,0,0]

    //rotation (resultante of the kinematic torsor)
    for(let i=0; i<3; i++){ //6 mobilities (3+3)
        let countZero = countInArray(kinematicTorsor[i],0) //0 can produce hyperstaticity
        hyperstaticity[i] = (countZero)>0?countZero-1:0;
        blocked[i] = (countZero)>0?1:blocked[i];

        //let countOne = countInArray(kinematicTorsor[i],1) //can produce mobility
        //console.log(countOne,kinematicTorsor[i].length)
        //mobility[i] = (countOne==kinematicTorsor[i].length?1:0)
    }

    //translations (moment of the kinematic torsor)
    for(let i=3; i<6; i++){ 
        let uniqueElts = howManyDifferentEntriesInArrayExcluding1(kinematicTorsor[i]) //0 can produce hyperstaticity
        let countOne = countInArray(kinematicTorsor[i],1) //can produce mobility
        console.log(countOne,kinematicTorsor[i].length)
        hyperstaticity[i] = (uniqueElts)>1?uniqueElts-1:0;
        //hyperstaticity[i]=countOne;
        //blocked[i] = (uniqueElts)>0?1:blocked[i];
        
    }
    //console.log("hyperstaticity",hyperstaticity)
    console.log("blocked",blocked)
    return [hyperstaticity, blocked];
}

//this one is for global hyperstaticity, which is the hyperstaticity in a cycle of more than two nodes
function findGlobalHyperstatism(edges, pointForBabar){
    let kinematicTorsor = makeEquationsFromEdges(edges, pointForBabar) // 0 is blocked, 1 is a mobility (aka speed)
    
    let hyperstaticity = [0,0,0,0,0,0]
    let mobility = [0,0,0,0,0,0]
    console.log("kinematicTorsor",kinematicTorsor)
    for(let i=0; i<6; i++){ //6 mobilities
        let countZero = countInArray(kinematicTorsor[i],0) //can produce hyperstaticity
        hyperstaticity[i] = (countZero)>1?countZero-2:0;

        let countOne = countInArray(kinematicTorsor[i],1) //can produce mobility
        mobility[i] = (countOne==kinematicTorsor[i].length?1:0)
    }
    console.log(hyperstaticity, mobility)
    return hyperstaticity;
}

//as an array of each terms
//1 is libre, 0 is blocked
function makeEquationsFromEdges(edges, pointForBabar){
    let kinematicTorsor = [[],[],[],[],[],[]]
    for(edge of edges){
        mobs_r = get_mobilities_from_edge(edge.type) //be careful, send Tx Ty Tz Rx Ry Rz
        mobs = [mobs_r[3], mobs_r[4], mobs_r[5], mobs_r[0], mobs_r[1], mobs_r[2]]; //in this torsor, we use Rx Ry Rz Tx Ty Tz
        console.log("edge", edge.label,"mobs", mobs)
        let moment = mechmath_babar(edge.point, pointForBabar, [mobs[0], mobs[1], mobs[2]], [mobs[3], mobs[4], mobs[5]])
        mobs[3]=math.evaluate(moment[0]);
        mobs[4]=math.evaluate(moment[1]);
        mobs[5]=math.evaluate(moment[2]);
        console.log("sale moment", mobs)
        for(let i=0; i<6; i++){ //6 mobilities
            kinematicTorsor[i].push(mobs[i]);
        }
    }
    return kinematicTorsor
}
/*
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
*/

function countInArray(array, target){
    let counter = 0;
    for (elt of array) {
        if (elt == target) {
            counter++;
        }
    };
    return counter;
}

function howManyDifferentEntriesInArrayExcluding1(arr){
    uniqueCount = new Set(arr).size;
    if(arr.includes(1)) {uniqueCount -=1}
    return uniqueCount
}

function sumArray(array){
    let sum = 0
    for(let i=0; i< array.length; i++){
        sum += array[i]
    }
    return sum
}

function hyperstaticity_writeResume(data){
    console.log(data)
    str = "The total degree of hyperstaticity is "+ data.degree.toString() + "<br><br>"
    for(degree of data.data){
        console.log(degree)
        str += "<br> - There is one degree of hyperstaticity in the cycle " + degree.cycle
        if(sumArray(degree.h)>1){
            str += "<br>Some mobilities are blocked several times<br>"
            str += arrayHyperstaticityToHuman(degree.h)
        }     
        else{
            str += "<br>"+ arrayHyperstaticityToHuman(degree.h) +"is blocked several times"
        }

    }
    str += "<br><br>Please remember that hyperstaticity is not a bad thing if you know where it is and how to manage it. It will be more rigid but can make the assembly of the system hard. If you don't want the system to be hyperstatic, check the joint composition tool to transform some links. You can also change links."
    document.getElementById("hyperstatismDiv").innerHTML = str
}

//make a string from the array
function arrayHyperstaticityToHuman(h){
    let str = "";
    let type = "Rotation";
    let axis = ["x","y","z"];
    for(let i=0; i<6; i++){
        if(h[i]>=1) {
            str += "- " + type + " on the axis " + axis[i%3] + "<br>"
        }
        if(i==2){
            type = "Translation" //first 3 are rotations, lats 3 are translations
        }
    }
    return str
    
}
