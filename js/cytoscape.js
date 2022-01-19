function cy_create(c) {
  var cy = cytoscape({
  container: c,
  elements: [
    { data: { id: 'Sous_ensemble_1', color:'#5599FF' } },
    { data: { id: 'Sous_ensemble_2', color:'#559933' } },
    {
      data: {
        id: 'ab',
        source: 'Sous_ensemble_1',
        target: 'Sous_ensemble_2',
        label: 'laision'
      }
    },
    {
      data: {
        id: 'abbb',
        source: 'Sous_ensemble_1',
        target: 'Sous_ensemble_2',
        label: 'lias'
      }
    }


    ],
    style: [
    {
        selector: 'node',
        style: {
            //shape: 'hexagon',
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
            'curve-style': 'bezier'

        }

    }
    ]
});
  return cy

}
