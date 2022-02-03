
//helico let I_to_replace = { 'I_alpha_J2_LA':"0", 'I_alpha_J1_LA':"0", "I_alpha_J3_LA":"0","I_alpha_J4_ROT":"0"} //I stands for unknown. if we find their value, they will be logged here
//boitier
//I_to_replace = { 'I_gamma_ARBRE_CARTER_LA1':"0", 'I_gamma_ARBRE_CARTER_LA2':"0", 'I_gamma_SAT_ARBRE_LA':'0','I_gamma_SAT_ARBRE_ROT':'0' } //c'est vrai ce mensonsonge ?
//boitier


let I_to_replace = { 'I_gamma_ARBRE_CARTER_LA1':"0" }
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
