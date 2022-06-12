//this model is compose of 3 parts with 1 mobility (rotation in x axis) and 2 degrees of hyperstaticity (2 rotation y and z)

function cy_create(c) {
  var cy = cytoscape({
  container: c,
  elements: [
    { data: { id: 'Bati', color:'#5599FF', shape:'ellipse', width:'50px'} },
    { data: { id: 'Support', color:'#fa9411', shape:'ellipse', width:'50px'} },
    { data: { id: 'Arbre', color:'#b24622', shape:'ellipse', width:'50px'} },
    {
      data: {
        id: 'AB_PG',
        source: 'Arbre',
        target: 'Bati',
        label: 'AB_PG',
        type: 'PG x',
        point:[10,20,30],
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
        point:[40,50,60],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'AS_PG',
        source: 'Arbre',
        target: 'Support',
        label: 'AS_PG',
        type: 'PG x',
        point:[40,50,60],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
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

function get_cf(){
    var val = 0.1
    var axis = "v"
    var point = [0,0,0]
    return {val: val, axis: axis, point:point}
}
