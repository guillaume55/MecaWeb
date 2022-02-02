function cy_create(c) {
  var cy = cytoscape({
  container: c,
  elements: [
    { data: { id: 'P1', color:'#5599FF', shape:'ellipse', width:'50px'} },
    { data: { id: 'P2', color:'#fa9411', shape:'ellipse', width:'50px'} },
    { data: { id: 'P3', color:'#b24622', shape:'ellipse', width:'50px'} },
    { data: { id: 'P4', color:'#bc5b73', shape:'ellipse', width:'50px'} },
    { data: { id: 'P5', color:'#559933', shape:'ellipse', width:'50px'} },
    {
      data: {
        id: 'J1_LA',
        source: 'P3',
        target: 'P2',
        label: 'J1_LA',
        type: 'LA x',
        point:[10,20,30],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'J1_AP',
        source: 'P3',
        target: 'P2',
        label: 'J1_AP',
        type: 'AP x',
        point:[40,50,60],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'J2_LA',
        source: 'P3',
        target: 'P4',
        label: 'J2_LA',
        type: 'LA x',
        point:[70,80,90],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'J2_AP',
        source: 'P3',
        target: 'P4',
        label: 'J2_AP',
        type: 'AP x',
        point:[10,20,30],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'J3_AP',
        source: 'P3',
        target: 'P5',
        label: 'J3_AP',
        type: 'AP x',
        point:[40,50,60],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'J3_LA',
        source: 'P3',
        target: 'P5',
        label: 'J3_LA',
        type: 'LA x',
        point:[70,80,90],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'J4_ROT',
        source: 'P2',
        target: 'P1',
        label: 'J4_ROT',
        type: 'Rot',
        point:[10,20,30],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'J5_LA',
        source: 'P4',
        target: 'P1',
        label: 'J5_LA',
        type: 'LA x',
        point:[40,50,60],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'CF',
        source: 'P5',
        target: 'P1',
        label: 'CF',
        point:[70,80,90],
        type: 'FC'
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
            'text-halign': 'center',
            'width': "data(width)"
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
function get_cf(){
    var val = 0.1
    var axis = "v"
    var point = [10,20,30]
    return {val: val, axis: axis, point:point}
}
