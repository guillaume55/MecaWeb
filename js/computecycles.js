var graph = []
let cycles = []
//helico let I_to_replace = { 'I_alpha_J2_LA':"0", 'I_alpha_J1_LA':"0", "I_alpha_J3_LA":"0","I_alpha_J4_ROT":"0"} //I stands for unknown. if we find their value, they will be logged here
//boitier
I_to_replace = { 'I_gamma_ARBRE_CARTER_LA1':"0", 'I_gamma_ARBRE_CARTER_LA2':"0", 'I_gamma_SAT_ARBRE_LA':'0','I_gamma_SAT_ARBRE_ROT':'0' } //c'est vrai ce mensonsonge ?

function findCycles() {
    //graph = [[1,2],[1,2],[1,3],[2,3]]
    graph = extract_graph()



    for (const edge of graph) {
        for (const node of edge) {
            findNewCycles([node])//This function has a min nb of nodes = 3
        }
        //add 2 nodes cycles
        for(const edge2 of graph) {
            if( (edge[1] == edge2[1] || edge[1] == edge2[0]) && (edge[0] == edge2[1] || edge[0] == edge2[0]) && (edge.length == 2 && edge2.length ==2) ) {//a two node cycle
                var add = 1;
                for(c of cycles) { //if cycle if already in list may be removed because of bellow code about redundant cycles

                    if( (edge[1] == c[1] || edge[1] == c[0]) && (edge[0] == c[1] || edge[0] == c[0]) ) {add=0;}
                }
                if(add == 1) { cycles.push([edge[0],edge[1]]); }
            }
        }
    }
    //remove redundant cycles
    /*
    for(let i=0; i< cycles.length; i++) {
        for(let j=0; j< cycles.length; j++) {
            if(j != i) {
                cy1 = JSON.stringify(cycles[i].sort())
                cy2 = JSON.stringify(cycles[j].sort())
                if(cy1 == cy2) { j-=1; i-=1; cycles.splice(i,1) }
            }
        }/*********** PAS FINI et peut bugger **************/
    //}


  for (cycle of cycles) {
    console.log(cycle.join(','))
  }
}

function write_eq_V2(edges) {
    //helico --> cycles = [['P3','P2'],['P3','P5'],['P3','P4'],['P1','P2','P3','P4'],['P1','P5','P3','P4']]
    //boitier arriere
    cycles = [['Arbre','Carter',],['Arbre','Sat'],['Sat', 'Carter', 'Arbre'],['Sat','Carter']]
    let fc = get_cf();
    let equations = [] //add mobilities

    //find 6 equations for each cycle
    for(let i=0; i< cycles.length; i++) {
        //find all edges between two nodes
        let edges_between=[]
        if(cycles[i].length < 3) {
            edges_between = get_edges_from_nodes(cycles[i][0], cycles[i][1])
            //add to I_to_replace the numerical values of some I
            //compute_numerical_tol_val(edges_between);
        }
        else {
            c = [...cycles[i]]
            c.push(c[0]) //close the cycle
            for(let j=1; j<c.length; j++) {
                ed = get_edges_from_nodes(c[j-1], c[j])
                edges_between.push(ed[0]) //we need only one link between two nodes
            }

        }
        //remove equations with only one I, solve it now
        console.log(equations)
        equations = solve_oneI(equations)
        equations = equations.concat(write_eq_for_cycle(edges_between, fc))
        //start to solve if possible
        equations = replace_with_known_comp(equations)

    }
    //console.log(equations)
    //var coeffs = nerdamer.coeffs('3*x^2+1', 'x');
    //console.log("coef", coeffs)
    console.log('iIiiii', I_to_replace)
    console.log("eq", equations)
    equations = replace_with_known_comp(equations)
    console.log("-->",equations)
    //on peut donc chercher notre CF selon l'axe voulu
    let solved = nerdamer.solveEquations(equations[4], "I_v_CF")
    var coeffs = nerdamer.coeffs(equations[4], "I_v_CF");
    console.log(solved.toString())
    coeffs.each(function(e, i) {
        console.log('coeff #'+i+': ', nerdamer(e).add('t').toString());
    });



}

function solve_oneI(eq) {
    for(let i=0; i<eq.length; i++) {
        //we can solve if there is only one I
        if(eq[i].match(/I_/g) !== null) { //see line bellow
            if(eq[i].match(/I_/g).length < 2 ) { //bug because we try to find length of null if eq => 0+0+0=0
                //find which terme is unknown
                let sp = eq[i].split(/[+,-,=,*,/,\s,(,)]+/);
                for(let j=0; j<sp.length; j++)  {
                    sp[j] = sp[j].toString()

                    if(sp[j].search("I_") != -1) {
                        console.log(eq[i])
                        if(I_to_replace[sp[j]] === undefined) {
                            let solved = nerdamer.solve(eq[i], sp[j]);
                            let res = solved.toString().replaceAll("[","").replaceAll("]","")
                            //let res = solved['symbol']['elements'][0]['value']

                            I_to_replace[sp[j]] = res;
                            eq.splice(i)
                            i = i-1
                            console.log("------111111")
                        }
                    }
                }
            }
        }
    }
    //console.log("itoreplace",I_to_replace)
    //console.log("eq",eq)
    return eq
}

//contresens,sert à l'analyse statistique
function compute_numerical_tol_val(edges) {
    for(let i=0; i<edges.length; i++) {
        let mob = get_mobilities_from_edge(edges_bet[i]['type'])
        for(let j=0; j<6; j++) {
            if(mob[j] == 0) { //we know the max tolerance values

            }
        }
    }
}

//we will find I_xxx = xxx, instead of adding a new equation, we will replace I_xxx by its value later
function write_resultantes_two_nodes(edges_bet) {
    //sum each link

    let components = ["alpha", "beta", "gamma"]
    if(edges_bet.length > 2) { console.log(`Maybe there is an error, because ${edges_bet.length} are between 2 nodes`) }

    //I_to_replace
    var mob0 = get_mobilities_from_edge(edges_bet[0]['type'])
    var mob1 = get_mobilities_from_edge(edges_bet[1]['type'])
    console.log(mob0, mob1)
    for(let j=3; j<6; j++) { //for the rotations
        if(mob0[j] == 1 && mob1[j]==1) //mobility
        {   console.log(edges_bet[0]['id'], edges_bet[1]['id'], "A mobility remains")   }
        else if( mob0[j] == 1 && mob1[j] == 0 ) {  //Imob0 found, save it's value for futur use
            I_to_replace[`I_${components[j-3]}_${edges_bet[0]['id']}`] =`${components[j-3]}_${edges_bet[1]['id']}`
        } else if( mob0[j] == 0 && mob1[j] == 1 ) {  //same idea as previous if
            I_to_replace[`I_${components[j-3]}_${edges_bet[1]['id']}`] = `${components[j-3]}_${edges_bet[0]['id']}`
        }
        else {  //something == somethingElse, hyperstatic, can't be solved with this method
            console.log(`Error: Model is hyperstatic ${edges_bet[0]['id']}, ${edges_bet[1]['id']}`)
        }
    }
}

function write_eq_for_cycle(edges_bet,cf) {
    //sum each link
    let equations = []
    let mob = []

    for(let i=0; i<edges_bet.length; i++)  {
        console.log(edges_bet[i]['type'],edges_bet[i]['id'])
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
/*
//should be at the same point, the fc (= cf) point
function write_moments_two_nodes(edges_bet, cf) {
    let equations = []
    if(edges_bet.length > 2) { console.log(`Maybe there is an error, because ${edges_bet.length} are between 2 nodes`) }
    let mob0 = mobs_to_components(get_mobilities_from_edge(edges_bet[0]['type']),edges_bet[0]['id'])
    let mob1 = mobs_to_components(get_mobilities_from_edge(edges_bet[1]['type']),edges_bet[1]['id'])
    console.log(mob0, mob1)

    //move everything to the same point
    let m0 = mechmath_babar(edges_bet[0]['point'], cf['point'], [mob0[3],mob0[4],mob0[5]],[mob0[0],mob0[1],mob0[2]])
    let m1 = mechmath_babar(edges_bet[1]['point'], cf['point'], [mob1[3],mob1[4],mob1[5]],[mob1[0],mob1[1],mob1[2]])
    mob0 = replace_with_known_comp(m0)
    mob1 = replace_with_known_comp(m1)
    console.log("BABAR=>",m0, m1)
    for(let j=0; j<3; j++) { //for the translations (aka moment)
        //if there is only one I, the unknown terme can be found
        //if(str.match(/I_/g).length > 1 ) {
            //solve_oneI()
        //}
    }


}*/

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
/*
//solve the equation if there is only one missing terme
function solve_oneI(equation){
    //split does not reconize type if _ instead of #
    equation = equation.replaceAll("_","#");

    let res = equation.replaceAll("-", "+(-1)*").split("+");

    let unknown_multiply = []
    let unknown = ""
    let nb_I = 0;
    let I_index  = 0;
    //ensure that there is only one I
    for(let i=0; i<res.length; i++) {
        if(res[i].search('I#') != -1) {
            nb_I += 1;
            I_index = i
            //find the 'I' thing //may be multiplied to something
            unknown_multiply = res[i].replaceAll('(','').replaceAll(')','').split("*")
            for(let j=0; j< unknown_multiply.length; j++) {
                if(unknown_multiply[j].search('I#') != -1) {
                    unknown = unknown_multiply[j]
                }
            }

        }
    }
    //console.log(
    //write the symbolic equation
    if(nb_I == 1) {
        let str = "(-1)*("
        for(let i=0; i< res.length; i++) {
            if(i != I_index) {
                str += `${res[i]}`
                if(i < (res.length-1) ) { str += "+"; }
            }

        }
        str += ")"
        //if something multiply the 'I' thing. No division expeted
        if(unknown_multiply.length > 1) //there was a *I_thing
        {
            str += `/(${res[I_index].replaceAll(unknown,"1")})`
        }

        I_to_replace[res[I_index]] = str.replaceAll("#","_");
    }
}
*/
//replace already found component in equations
function replace_with_known_comp(equations)  {
    for(let i=0; i<equations.length; i++) {
        for(var key in I_to_replace) {
            equations[i] = equations[i].replaceAll(key, I_to_replace[key] );
            //console.log("replacing", key, "by", I_to_replace[key])
        }

    }
    return equations
}

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

function get_edges_from_nodes(node1, node2){
    var edges = cy.edges()
    var res = []
    for(let i=0; i<edges.length;i++) {
        var json = cy.data(edges[i].json())
        var source = json.data()['data']['source']
        var target = json.data()['data']['target']
        var type = json.data()['data']['type']
        var point = json.data()['data']['point']
        if((source == node1 && target == node2) || (source == node2 && target == node1) ) { res.push(json.data()['data']) }
    }
    return res
}




//from stackoverflow
//https://stackoverflow.com/questions/12367801/finding-all-cycles-in-undirected-graphs
//This function has a min nb of nodes = 3
function findNewCycles(path) {
  const start_node = path[0]
  let next_node = null
  let sub = []

  // visit each edge and each node of each edge
  for (const edge of graph) {
    const [node1, node2] = edge
    if (edge.includes(start_node)) {
      next_node = node1 === start_node ? node2 : node1
    }
    if (notVisited(next_node, path)) {
      // eighbor node not on path yet
      sub = [next_node].concat(path)
      // explore extended path
      findNewCycles(sub)
    } else if (path.length > 2 && next_node === path[path.length - 1]) {
      // cycle found
      const p = rotateToSmallest(path)
      const inv = invert(p)
      if (isNew(p) && isNew(inv)) {
        cycles.push(p)
      }
    }
  }
}

//from stackoverflow too
function invert(path) {
  return rotateToSmallest([...path].reverse())
}

// rotate cycle path such that it begins with the smallest node
function rotateToSmallest(path) {
  const n = path.indexOf(Math.min(...path))
  return path.slice(n).concat(path.slice(0, n))
}

function isNew(path) {
  const p = JSON.stringify(path)
  for (const cycle of cycles) {
    if (p === JSON.stringify(cycle)) {
      return false
    }
  }
  return true
}

function notVisited(node, path) {
  const n = JSON.stringify(node)
  for (const p of path) {
    if (n === JSON.stringify(p)) {
      return false
    }
  }
  return true
}
