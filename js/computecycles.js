var graph = []
let cycles = []
let I_to_replace = { 'I_alpha_J2_LA':"0"} //I stands for unknown. if we find their value, they will be logged here


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
    for(let i=0; i< cycles.length; i++) {
        for(let j=0; j< cycles.length; j++) {
            if(j != i) {
                console.log(cycles.length)
                cy1 = JSON.stringify(cycles[i].sort())
                cy2 = JSON.stringify(cycles[j].sort())
                if(cy1 == cy2) { j-=1; i-=1; cycles.splice(i,1) }
            }
        }/*********** PAS FINI et peut bugger **************/
    }


  for (cycle of cycles) {
    console.log(cycle.join(','))
  }
}

//ATtention !!! au meme pt !
function write_eq(edges) {
    /*for(let i=0; i< cycles.length; i++) {
        console.log(cycles[i])
    }*/

    //console.log(get_cf())
    //begin with 2 node cycle to find some I (mainly on resultantes)
    cycles = [['P3','P2'],['P3','P5'],['P3','P4'],['P1','P2','P3','P4'],['P1','P2','P3','P4']]

    //transport everything to the FC point


    for(let i=0; i< cycles.length; i++) {
        //find resulting cycle of the 2 mobilities
        if(cycles[i].length == 2) {
            //find all edges between two nodes
            ed = get_edges_from_nodes(cycles[i][0], cycles[i][1])
            //get every edge between these two nodes
            var eq = ["I","I","I","I","I","I"]
            for(e of ed) {    //[sub-ass1, sub-ass2, jointType, point]
                console.log("****** EDGE ******", e);
                /***************  RESULTANTES ***********/
                //console.log("type------->",e[2])
                var mob = get_mobilities_from_edge(e['type']);
                //on transforme les 1 et 0 en composantes alpha, beta, gamma, u, v, w
                for(let j=0; j<6; j++) {
                    if(mob[i]== 0) //un degré de liaison
                    {
                        //remplacer par la composante
                        //ICIIIIIIIII
                    }
                }
                //resultantes x, y and z
                //inversion des translations et des rotations
                for(let i=3; i<6; i++) {
                    if(mob[i-3] == 1) {console.log("mobilite")}
                    else if(eq[i] == "I") { eq[i] = mob[i-3] }
                    else if(eq[i] != "I" && mob[i-3] == 1) {                    console.log("isostatisme")/*do nothing but avoid else statement*/ }
                    //a vérifier, hyperstatique avec rot + AP x (2 SE et deux liaisons en //)
                    //Heummmm, plutôt insoluble que hyperstatique car h dépend des mobilités de sortie du mécanisme
                    //A vérifier mais probablment faux ou moyen moyen
                    else { console.log("Hyperstatisme !") }
                }

                /*************  MOMENTS  **************/
                //let's fight with moments
                /*
                var cf_params = get_cf()
                //deplacement du moment au point de la CF
                var m = mechmath_babar(e[3], cf_params['point'], [mob[3],mob[4],mob[5]],[mob[0],mob[1],mob[2]])
                console.log("BABAR=>",m)

                for(let i=0; i<3; i++) {
                    console.log("point------->",m[i])

                }*/
            }

            //AU MEME PT

            //////////// REPRENDRE ICI /////// commencer par trouver les I (mobilités) des cycles à deux noeuds )
        }
    }
}
function write_eq_V2(edges) {
    cycles = [['P3','P2'],['P3','P5'],['P3','P4'],['P1','P2','P3','P4'],['P1','P2','P3','P4']]
    let fc = get_cf();

    //do the job for each cycle
    for(let i=0; i< cycles.length; i++) {
        if(cycles[i].length == 2) { //cycle with two nodes can have a different behavior
            //find all edges between two nodes
            var edges_between = get_edges_from_nodes(cycles[i][0], cycles[i][1])
            console.log("edge b", edges_between)
            write_resultantes_two_nodes(edges_between)

        }
    }
    //2 for loops because it will be easier to solve equations if we know more things
    for(let i=0; i< cycles.length; i++) {
        if(cycles[i].length == 2) { //cycle with two nodes can have a different behavior
            write_moments_two_nodes(edges_between, fc)
        }
    }
}

//TODO what we have to do mathematically if there is 3 links between 2 nodes ?
function write_resultantes_two_nodes(edges_bet) {
    //sum each link
    //let equation = ["","",""];
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

//should be at the same point, the fc (= cf) point
function write_moments_two_nodes(edges_bet, cf) {

    if(edges_bet.length > 2) { console.log(`Maybe there is an error, because ${edges_bet.length} are between 2 nodes`) }
    let mob0 = mobs_to_components(get_mobilities_from_edge(edges_bet[0]['type']),edges_bet[0]['id'])
    let mob1 = mobs_to_components(get_mobilities_from_edge(edges_bet[1]['type']),edges_bet[1]['id'])
    console.log(mob0, mob1)

    //move everything to the same point
    let m0 = mechmath_babar(edges_bet[0]['point'], cf['point'], [mob0[3],mob0[4],mob0[5]],[mob0[0],mob0[1],mob0[2]])
    let m1 = mechmath_babar(edges_bet[1]['point'], cf['point'], [mob1[3],mob1[4],mob1[5]],[mob1[0],mob1[1],mob1[2]])
    mob0 = replace_with_known_comp(m0)  //TODO A tester Ne fonctionne pas
    mob1 = replace_with_known_comp(m1)
    console.log("BABAR=>",m0, m1)
    for(let j=0; j<3; j++) { //for the translations (aka moment)
        //if there is only one I, the unknown terme can be found

        //solve_oneI() //resoudre l'equation si un seul I //TODO ICIIIIIIIII
    }
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
    return mob[type]
}

//solve the equation if there is only one missing terme
//TODO
function solve_oneI(/*equation*/){
    //split does not reconize type if _ instead of #
    let equation = "v_J2_LA+(60*I_alpha_J2_LA)-(60*gamma_J2_LA)".replaceAll("_","#");

    let res = equation.replaceAll("-", "+(-1)*").split("+");

    let unknown_multiply = []
    let unknown = ""
    console.log(res)
    let nb_I = 0;
    let I_index  = 0;
    //ensure that there is only one I
    for(let i=0; i<res.length; i++) {
        if(res[i].search('I#') != -1) {
            nb_I += 1;
            I_index = i
            console.log("unknown index ", I_index)
            //find the 'I' thing //may be multiplied to something
            unknown_multiply = res[i].replaceAll('(','').replaceAll(')','').split("*")
            for(let j=0; j< unknown_multiply.length; j++) {
                if(unknown_multiply[j].search('I#') != -1) {
                    unknown = unknown_multiply[j]
                    console.log("unknown", unknown)
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
        console.log(str)
    }

}

//replace already found component in equations
//TODO Is it working ? NOOOOOOO
function replace_with_known_comp(equations)  {
    console.log("I replace", I_to_replace)
    console.log('before', equations)

    for(let i=0; i<equations.length; i++) {
        for(var key in I_to_replace) {
            equations[i] = equations[i].replaceAll(key, I_to_replace[key] );
            //console.log("replacing", key, "by", I_to_replace[key])
        }

    }
    console.log('after', equations)
    return equations
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
