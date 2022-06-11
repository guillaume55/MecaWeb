function count_I (eq) {
    return eq.match(/I_/g).length
}

//write all the equation for all the cycles (6 eq by cycle, Rx,y,z,Tx,y,z)
function writeRawEquations(cycles){
    let fc = get_cf();
    let equations = [] //add mobilities
    for(let i=0; i< cycles.length; i++) {
        //console.log(cycles[i])
        //find all edges between two nodes
        let edges_between=[]
        //cycle of more than 3 nodes (different behavior)
        if(cycles[i].length < 3) {
            edges_between = get_edges_from_nodes(cycles[i][0], cycles[i][1])            
        }
        else { //cycle of two nodes
            c = [...cycles[i]]
            c.push(c[0]) //close the cycle
            for(let j=1; j<c.length; j++) {
                ed = get_edges_from_nodes(c[j-1], c[j])
                edges_between.push(ed[0]) //we need only one link between two nodes
            }
        }
        //console.log("edges_bet",edges_between)
        equations = equations.concat(write_eq_for_cycle(edges_between, fc))
    }
    return equations
}

//return the nodes to which the edge are linked
//used to get cycles
function extract_graph(){
    var edges = cy.edges()
    var res = []
    for(let i=0; i<edges.length;i++) {
        var json = cy.data(edges[i].json())
        var source = json.data()['data']['source']
        var target = json.data()['data']['target']
        res.push([source, target])
    }
    return res
} 

//take one cycle and write 6 equations (Rx, y, z, Tx, y, z) for it
//At the fonctionnal condition point for Translation as it depends of the point
function write_eq_for_cycle(edges_bet,cf) {
    //sum each link
    let equations = []
    let mob = []

    for(let i=0; i<edges_bet.length; i++)  {
        mob.push(mobs_to_components(get_mobilities_from_edge(edges_bet[i]['type']),edges_bet[i]['id']))
    }

    for(let j=3; j<6; j++) { //resultantes aka rotations alpha beta gamma
        let str = ""
        for(let k=0; k<mob.length; k++)  {
            str += mob[k][j]
            if(k<mob.length-1) {  str+= "+";  }
        }
        str += "=0"
        equations.push(str)

    }
    for(let j=0; j<3; j++) { //moments aka translation u v w
        let str ="";
        for(let k=0; k<mob.length; k++)  {
            //str += mob[k][j]
            //make the addition at the fc point
            let babar = mechmath_babar(edges_bet[k]['point'], cf['point'], [mob[k][3],mob[k][4],mob[k][5]],[mob[k][0],mob[k][1],mob[k][2]])
            str += babar[j]
            if(k<mob.length-1) {  str+= "+";  }
        }
        str += "=0"
        equations.push(str)
    }
    return equations
}

//take mobility array (0 and 1 and change to "alpha", "beta", "gamma","u", "v", "w"
function mobs_to_components(mob, linkName) {
    let comp = ["u", "v", "w","alpha", "beta", "gamma"] //be careful, reversed
    let res = []
    for(let i=0; i<6; i++) {
        let str = ""
        if(mob[i] == 1) {str += "I_" }
        str += `${comp[i]}_${linkName}`
        res.push(str)
    }
    return res
}

//return mobilities Tx,y,z and Rx, y, z from the name of the linkage
function get_mobilities_from_edge(type){
    mob = mech_links()
    if (mob[type] == undefined) {console.log("Unknown linkage",mob[type]);}
    return mob[type]
}

function reduceNbOfEquations(eq){
    for(let i=0; i<eq.length; i++){
        //console.log("i",i, eq.length)
        //count terms, if 2 terms, we will be able to substitue
        let terms = getVariables(eq[i])
        //console.log(terms)
        if(terms.length == 2){
            I_to_replace[terms[0]]= terms[1];
            eq.splice(i,1)
            i--; //? 
        }
    }
    return eq
}

//replace already found component in equations
function replace_with_known_comp(equations, dict)  {
    //console.log("begin", equations)
    for(let i=0; i<equations.length; i++) {
        for(var key in dict) {
            if(key.search("CF") == -1){ //do not replace what we are looking for
                //console.log("-->",equations[i], key, `(${dict[key]})`)
                equations[i] = equations[i].replaceAll(key, `(${dict[key]})`);
                //console.log("replacing ",key," by ", dict[key]," in ", eq[i])
                //console.log("------->",equations[i])
            }
            //console.log("replacing", key, "by", dict[key])
        }
    }
    //console.log("end", equations)
    return equations
}

//solve system of equations
function solveSystem(eq, target){
    //get first equation
    let firstEq = ""
    for(e of eq){
        if(e.search(target) != -1){
            firstEq = e
        }
    }

    let terms = getVariables(firstEq)
    console.log(terms)
    console.log("i are",getIOfEq(firstEq))

    let secondEq = []
    for(let i=0; i<terms.length; i++){
        canWeReplace(terms[i])
        for(e of eq){
            if(e.search(terms[i]) != -1){
                secondEq.push(e)
                
            }
        }
    }

    //console.log("second eq replaced", secondEq)
    //console.log("I_to_replace", I_to_replace)
    console.log("second eq", secondEq)
    //secondEq = replace_with_known_comp(secondEq, I_to_replace)
    
    //I_to_replace2 = switchKeysAndValues(I_to_replace)
    //console.log("*****************")
    //secondEq2 = replace_with_known_comp(secondEq, I_to_replace2)
    //console.log("*****************")
    
    //console.log("second eq2", secondEq)
    //console.log("I_to_replace22222",I_to_replace2)

    for(e of secondEq){
        let terms = getVariables(e)
        console.log(terms)
        for(t of terms){
            canWeReplace(t)
        }
    }

}

function canWeReplace(term){
    for(k of Object.keys(I_to_replace)){
        if(k == term || I_to_replace[k] == term){
            console.log("we can replace it")
        }
    }
}

function getIOfEq(eq){
    let terms = getVariables(eq)
    let I_terms = []
    for(t of terms){
        if(t.search("I_")!=-1){
            I_terms.push(t)
        }
    }
    return I_terms
}

function switchKeysAndValues(data){
    switched = {}
    for(k of Object.keys(data)){
        switched[data[k]]=k
    }
    return switched
}