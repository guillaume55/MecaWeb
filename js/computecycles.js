var graph = []
let cycles = []

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

    //do the job for each cycle
    for(let i=0; i< cycles.length; i++) {
        if(cycles[i].length == 2) { //cycle with two nodes can have a different behavior
            //find all edges between two nodes
            var edges_between = get_edges_from_nodes(cycles[i][0], cycles[i][1])
        }
    }
}


function write_resultantes(edges_bet) {

}

//return mobilities Tx,y,z and Rx, y, z from the name of the linkage
function get_mobilities_from_edge(type){
    mob = mech_links()
    return mob[type]
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
