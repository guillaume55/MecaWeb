function cy_create(c) {
  var cy = cytoscape({
  container: c,
  elements: [
    { data: { id: 'P1', color:'#5599FF', shape:'ellipse'} },
    { data: { id: 'P2', color:'#fa9411', shape:'ellipse'} },
    { data: { id: 'P3', color:'#b24622', shape:'ellipse'} },
    { data: { id: 'P4', color:'#bc5b73', shape:'ellipse'} },
    { data: { id: 'P5', color:'#559933', shape:'ellipse'} },
    {
      data: {
        id: 'J1-LA',
        source: 'P3',
        target: 'P2',
        label: 'J1-LA',
        type: 'LA x'
      }
    },
    {
      data: {
        id: 'J1-AP',
        source: 'P3',
        target: 'P2',
        label: 'J1-AP',
        type: 'AP x'
      }
    },
    {
      data: {
        id: 'J2-LA',
        source: 'P3',
        target: 'P4',
        label: 'J2-LA',
        type: 'La x'
      }
    },
    {
      data: {
        id: 'J2-AP',
        source: 'P3',
        target: 'P4',
        label: 'J2-AP',
        type: 'AP x'
      }
    },
    {
      data: {
        id: 'J3-AP',
        source: 'P3',
        target: 'P5',
        label: 'J3-AP',
        type: 'AP x'
      }
    },
    {
      data: {
        id: 'J3-LA',
        source: 'P3',
        target: 'P5',
        label: 'J3-LA',
        type: 'La x'
      }
    },
    {
      data: {
        id: 'J4',
        source: 'P2',
        target: 'P1',
        label: 'J4'
      }
    },
    {
      data: {
        id: 'J5',
        source: 'P4',
        target: 'P1',
        label: 'J5'
      }
    },
    {
      data: {
        id: 'CF',
        source: 'P5',
        target: 'P1',
        label: 'CF'
      }
    }


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
}

function get_cf(){
    var val = 0.1
    var axis = "v"
    return {val: val, axis: axis}
}
