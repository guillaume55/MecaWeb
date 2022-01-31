function cy_create(c) {
  var cy = cytoscape({
  container: c,
  elements: [
    { data: { id: 'Sat', color:'#5599FF', shape:'ellipse'} },
    { data: { id: 'Arbre', color:'#fa9411', shape:'ellipse'} },
    { data: { id: 'Carter', color:'#b24622', shape:'ellipse'} },
    {
      data: {
        id: 'SAT_ARBRE_LA',
        source: 'Sat',
        target: 'Arbre',
        label: 'SAT_ARBRE_LA',
        type: 'LA z',
        point:[5,0,10],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'SAT_ARBRE_ROT',
        source: 'Sat',
        target: 'Arbre',
        label: 'SAT_ARBRE_ROT',
        type: 'Rot',
        point:[5,0,-10],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'SAT_CARTER_LRy',
        source: 'Sat',
        target: 'Carter',
        label: 'SAT_CARTER_LRy',
        type: 'LR axe z norm y',
        point:[25,0,0],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'ARBRE_CARTER_LA2',
        source: 'Carter',
        target: 'Arbre',
        label: 'ARBRE_CARTER_LA2',
        type: 'LA z',
        point:[0,0,-30],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'ARBRE_CARTER_LA1',
        source: 'Carter',
        target: 'Arbre',
        label: 'ARBRE_CARTER_LA1',
        type: 'LA z',
        point:[0,0,-100],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'CF',
        source: 'Sat',
        target: 'Carter',
        label: 'CF',
        point:[0,0,0],
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
    var axis = "I_v_CF"
    var point = [0,0,0]
    return {val: val, axis: axis, point:point}
}
