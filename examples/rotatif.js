//this model is compose of 3 parts with 1 mobility (rotation in x axis) and 2 degrees of hyper
//2 PG not at the same point and an AP
function cy_create(c) {
  var cy = cytoscape({
  container: c,
  elements: [
    { data: { id: 'faceplate', color:'#5599FF', shape:'ellipse', width:'50px'} },
    { data: { id: 'Support_moteur', color:'#fa9411', shape:'ellipse', width:'50px'} },
    { data: { id: 'Arbre_sortie', color:'#b24622', shape:'ellipse', width:'50px'} },
    { data: { id: 'Moteur', color:'#b24622', shape:'ellipse', width:'50px'} },
    { data: { id: 'Boite_Rlts', color:'#b24622', shape:'ellipse', width:'50px'} },
    {
      data: {
        id: 'LA_fb',
        source: 'faceplate',
        target: 'Boite_Rlts',
        label: 'LA_fb',
        type: 'LA x',
        point:[0,0,0],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'AP_fb',
        source: 'faceplate',
        target: 'Boite_Rlts',
        label: 'AP_fb',
        type: 'AP x',
        point:[0,0,0],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'LA_bs',
        source: 'Support_moteur',
        target: 'Boite_Rlts',
        label: 'LA_bs',
        type: 'LA x',
        point:[60,0,0],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'Ponct_bs',
        source: 'Support_moteur',
        target: 'Boite_Rlts',
        label: 'Ponct_fb',
        type: 'Ponct x',
        point:[60,0,0],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'AP_sm',
        source: 'Support_moteur',
        target: 'Moteur',
        label: 'AP_sm',
        type: 'AP x',
        point:[60,0,0],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'Piv x_ma',
        source: 'Arbre_sortie',
        target: 'Moteur',
        label: 'Piv x_ma',
        type: 'Piv x',
        point:[60,0,0],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'Rot_ba',
        source: 'Arbre_sortie',
        target: 'Boite_Rlts',
        label: 'Rot_ba',
        type: 'Rot',
        point:[30,0,0],
        specSource: 0.2,
        specTarget: 0.2,
        play: 0.2
      }
    },
    {
      data: {
        id: 'LA_ba',
        source: 'Arbre_sortie',
        target: 'Boite_Rlts',
        label: 'LA_ba',
        type: 'LA x',
        point:[20,0,0],
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
