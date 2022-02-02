function cy_create(c) {
  var cy = cytoscape({
  container: c,
  elements: [
    { data: { id: 'Bati', color:'#5599FF', shape:'ellipse', width:'50px'} },



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



