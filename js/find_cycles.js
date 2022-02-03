
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
    }
  for (cycle of cycles) {
    console.log(cycle.join(','))
  }
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
//This function has a min nb of nodes = 3 (to find a cycle)
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
    } 
    //small modification from stackoverflow code, added ability to find cycle between 2 nodes
    else if( (path.length > 2 && next_node === path[path.length - 1]) || (path.length == 2 && get_edges_from_nodes(path[0], path[1]).length > 1) ){
      // cycle found
      //console.log("path", path)
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

//modified to avoid same cycles but in different order, add .sort() two times
function isNew(path) {
  const p = JSON.stringify(path.sort())
  for (const cycle of cycles) {
    if (p === JSON.stringify(cycle.sort())) {
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
