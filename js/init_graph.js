function cy_create(c) {
  var cy = cytoscape({
  container: c,
  elements: [
    { data: { id: 'Bati', color:'#5599FF', shape:'ellipse'} },



    ],
    style: [
    {
        selector: 'node',
        style: {
            shape: 'data(shape)',
            'background-color': 'data(color)',
            label: 'data(id)',
            'text-valign': 'center',
            'text-halign': 'center'
        }
    },
    {
        selector: 'edge',
        style: {
            'color': 'red',
            'label': 'data(label)',
            //'stacking': 'auto bend'
            'curve-style': 'bezier',
            "edge-text-rotation": "autorotate"

        }

    }
    ]
});
  return cy

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

//must be shorten. No internet, have to recycle
/*
function get_type_from_edge(edge){
    var edges = cy.edges()

    for(let i=0; i<edges.length;i++) {
        var json = cy.data(edges[i].json())
        if ( (edge[0] == json.data()['data']['source'] && edge[1] == json.data()['data']['target']) || (edge[0] == json.data()['data']['target'] && edge[1] == json.data()['data']['source'])) {
            var type = json.data()['data']['type']
            return type
        }
    }
    return 'error'
}*/

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

function get_cf(){
    var val = 0.1
    var axis = "v"
    var point = [10,20,30]
    return {val: val, axis: axis, point:point}
}
