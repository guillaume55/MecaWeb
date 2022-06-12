//2 LA and an AP between two parts, h = 1, h=0 --> one LA becomes a ponct
/*
____________________________________
       |____|          |____|

_______      __________      _______
       |____|          |____|

*/
function cy_create(c) {
  var cy = cytoscape({
  container: c,
  elements: [
    { data: { id: 'Bati', color:'#5599FF', shape:'ellipse', width:'50px'} },
    { data: { id: 'Support', color:'#fa9411', shape:'ellipse', width:'50px'} },
    //{ data: { id: 'third', color:'#fabb11', shape:'ellipse', width:'50px'} },
    {
      data: {
        id: 'LA1',
        source: 'Support',
        target: 'Bati',
        label: 'LA1',
        type: 'LA x',
        point:[0,0,0],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'BS_AP',
        source: 'Bati',
        target: 'Support',
        label: 'BS_AP',
        type: 'AP x',
        point:[0,0,0],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'LA2',
        source: 'Bati',
        target: 'Support',
        label: 'LA2',
        type: 'LA x',
        point:[0,0,40],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    }/*,
    {
      data: {
        id: 'ponct ',
        source: 'Bati',
        target: 'Support',
        label: 'Ponctuelle',
        type: 'Ponct z',
        point:[0,10,0],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    }*/


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

function get_cf(){
    var val = 0.1
    var axis = "v"
    var point = [0,0,0]
    return {val: val, axis: axis, point:point}
}
