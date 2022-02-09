/*****************************************************************
 * Insert a component such as add link or add cf, add edge
 *
 *
 * function comp_rNodeList issue with string comparison
 *
 *TODO get mobilités pilotées
 *
 *
 *
 *
 *
 *
 *
 * ********************************************************************/



/**************************  LINKS *******************/
//Show link windows
//fields is a string with space separated elements to indicate which fields are needed. call comp_sLink(container) or comp_sLink(container,"") to show all
//Some links does not require all fields, when chosen by the select menu, non required fields will disapear


function comp_sLink(container,fields) {
    var html = ""
    if(fields == undefined || fields == "") { fields = "point axis norm sa1 sa2 name point spec"}
    fields = fields.split(' '); //unused for now

    var prop = mech_linkProp()
    //select link type
    html += "<div><select id=\"select_link_type\" name=\"link_type\"onchange=\"rLink()\"></div><div id=\"link_params\">"
    for(k in prop) {
        html += "<option name=\""+k+"\">"+k+"</option>"
    }
    html+="</select></div><div id=\"div_link_params\"></div>"

    container.innerHTML = html //need to create this before accessing it

    rLink(fields)
}

//refresh fields when link change (required parameters are not the same)
function rLink(fields) {

    var nodes = comp_nodeList()

    var html = "<form>"
    var type = document.getElementById('select_link_type').value

    //create needed fields
    //get type of link
    var prop = mech_linkProp() //dict with type of link and required properties
    //var fields = prop[type]

    //first standard fields
    html+="<input id=\"link_toedit\" class=\"hidden\"></input>"
    html+="</br></br><input id=\"link_name\" placeholder=\"Name\"></input>"
    html+= "</br><label>Sous-ensembles</label></br>"

    //populate selects
    var sel_sa = ""
    var sa = comp_nodeList()

    for(let i=0; i<sa.length;i++) {
        sel_sa += "<option value=\""+sa[i]+"\">"+sa[i]+"</option>"
    }
    html += "<select id=\"link_sa1\" onchange=\"\">"+sel_sa+"</select>"
    html += "<select id=\"link_sa2\" onchange=\"\">"+sel_sa+"</select>"


    for(let i=0; i<prop.length;i++) {
        if(fields[i] == "axis") {
            html+= "</br></br><label>Axe</label></br>"
            html+=" X <input class=\"small-input\" id=\"link_axis_x\" type=\"number\" value=\"1\">"
            html+=" Y <input class=\"small-input\" id=\"link_axis_y\" type=\"number\" value=\"0\">"
            html+=" Z <input class=\"small-input\" id=\"link_axis_z\" type=\"number\" value=\"0\">"
        }
        else if(fields[i] == "point") {
            html+= "</br></br><label>Point</label></br>"
            html+=" X <input class=\"small-input\" id=\"link_point_x\" type=\"number\" value=\"0\">"
            html+=" Y <input class=\"small-input\" id=\"link_point_y\" type=\"number\" value=\"0\">"
            html+=" Z <input class=\"small-input\" id=\"link_point_z\" type=\"number\" value=\"0\">"
        }
        else if(fields[i] == "norm") {
            html+= "</br></br><label>Normale</label></br>"
            html+=" X <input class=\"small-input\" id=\"link_norm_x\" type=\"number\" value=\"0\">"
            html+=" Y <input class=\"small-input\" id=\"link_norm_y\" type=\"number\" value=\"0\">"
            html+=" Z <input class=\"small-input\" id=\"link_norm_z\" type=\"number\" value=\"0\">"
        }
    }
    //some links have a different play between axis like rotule by ball bearings (axial play is != radial play)
    if (fields.indexOf("spec") != -1) {
        html+= "</br></br><label>Jeu de la liaison</label></br>"
        html += " X <input class=\"small-input\" id=\"link_play_x\" type=\"number\" placeholder=\"Jeu/2\">"
        html += " Y <input class=\"small-input\" id=\"link_play_y\" type=\"number\" placeholder=\"Jeu/2\">"
        html += " Z <input class=\"small-input\" id=\"link_play_z\" type=\"number\" placeholder=\"Jeu/2\">"
        //tolerance (based on iso specifications)
        html += "</br></br><label>Spécification</label></br>"
        html += "<input class=\"small-input\" id=\"link_spec_x\" type=\"number\" placeholder=\"Spec/2 direction x\">"
    }
    html += "</br><div class=\"error\" id=\"link_err\"></div>"
    html += "</br></br><input value=\"Valider\" type=\"button\" onclick=\"comp_aLink()\" /></form>"
    var div = document.getElementById("div_link_params")
    div.innerHTML = html
    //return html
}

//add link to graph
function comp_aLink(){
    var no_err = 1
    var link_edit = document.getElementById('link_toedit').value
    var name = document.getElementById('link_name').value.trim()
    var source = document.getElementById('link_sa1').value
    var target = document.getElementById('link_sa2').value
    let type = document.getElementById('select_link_type').value


    var err = document.getElementById('link_err')
    err.innerHTML= ''
    if(link_edit == "") {
        console.log('create_link')
        //if name already exists
        var edges = comp_linkList()  // get all names
        if(edges.indexOf(name.trim()) != -1) { no_err = 0; err.innerHTML= 'Le nom existe déjà' }
        if(name.search("I") != -1 || source.search("I") !=-1 || target.search("I") != -1) { no_err = 0; err.innerHTML= 'Merci d\'éviter le I majuscule' }
        if(name == "") { no_err = 0; err.innerHTML= 'Veuillez entrez un nom' }
        if(source == target) { no_err = 0; err.innerHTML= 'Les deux sous-ensembles ne peuvent être les mêmes' }

        if(no_err) {
            cy.add({
            group: 'edges',
            data: { id: name,
                    source: source,
                    target: target,
                    label: name,
                    color: 'blue', //does nothing
                    type: type
            },
                //position: { x: 200, y: 200 }
            });
        }
    } else if (no_err) { //edit link //TODO other fields
        console.log('edit_link', elt.data('target'))
        elt = cy.getElementById(link_edit)
        elt.data('id', name)
        elt.data('source', source) //TODO, does not work
        elt.data('target', target) //TODO, does not work
        elt.data('label',name)
        document.getElementById('link_toedit').value = "" //reset edition mode
        console.log('edit_link', elt.data('target'),target)
        console.log(elt.data())
    }

}

function comp_linkList() {
    var edges = cy.edges()
    var res = []
    for(let i=0; i<edges.length;i++) {
        var json = cy.data(edges[i].json())
        var data = json.data()['data']['id']
        res.push(data)
    }
    return res
}

/**************************  Sub-assemblies *******************/
function comp_sNode(container) {
    var html = "<form><label>Sous-ensemble</label>"
    html += "<input id=\"node_toedit\" class=\"hidden\"/>"
    html += "</br><input id=\"node_name\" placeholder=\"carter\"/>"
    html += "</br><div class=\"error\" id=\"node_err\"></div>"
    let color = Math.floor(Math.random() * 0xFFFFFF).toString(16);
    if(color.length <6) { color += "6" } //sometimes only 5 digit are shown, maybe first 0
    html += "</br><input id=\"node_color\" type='color' value=\"#"+color+"\" style=\"color:#"+color+";\" onchange=\"show_color_realtime('node_color')\" onkeyup = \"this.onchange();\"/>"
    html += "</br></br><input type=\"button\" value=\"Valider\" onclick=\"comp_aNode()\" />"
    html += "</form>"

    container.innerHTML = html //need to create this before accessing it


}

function comp_aNode(){

    var no_err = 1
    var node_edit = document.getElementById('node_toedit').value

    var color = document.getElementById('node_color').value.trim().slice(0,7) //have to check if color is html
    var name = document.getElementById('node_name').value.trim()

    let err = document.getElementById('node_err');

    if(name == "") { no_err = 0; err.innerHTML= 'Veuillez entrez un nom' }

    if(node_edit == "") { //create node
        console.log('create_node')
        //check if node exists
        var nodes = comp_nodeList()
        if(nodes.indexOf(name) != -1) { no_err = 0; err.innerHTML= 'Le nom existe déjà' }



        if(no_err) {
            try {
                cy.add({
                    group: 'nodes',
                    data: { id: name,
                            color: color,
                            shape: 'ellipse',
                            width: (15+10*name.length)+"px"
                    },
                });
            }
            catch(err){
                console.log(err)

            }

            comp_sNode(document.getElementById('anode'))  //refresh color


        }

        //refresh node list
        comp_rNodeList('link_sa1','link_sa2')
    } else if (no_err) { //edit node but still no error
        console.log('edit node')
        elt = cy.getElementById(node_edit)
        elt.data('id', name)
        elt.data('color', color)
        elt.data('label',name)
        document.getElementById('node_toedit').value = "" //leave edition mode
    }

}


//each time the user select a node, the select menu refresh to avoid chosing 2 times the same node
function comp_rNodeList(changed_select, other_select) {

    var nodes = comp_nodeList()
    var select_selected = document.getElementById(changed_select)
    var select_not_selected = document.getElementById(other_select)

    //reset select
    select_not_selected.options.length = 0; //remove all options
    select_selected.options.length = 0; //remove all options

    for(let i=0; i < nodes.length; i++) {
        var option1 = document.createElement("option");
        var option2 = document.createElement("option");
        option1.text = nodes[i]
        option2.text = nodes[i]
        select_selected.add(option1);
        select_not_selected.add(option2);

    }

    /*
    for(let i=0; i < nodes.length; i++) {
        var option = document.createElement("option");
        console.log(nodes[i], select_selected, nodes[i].toString() == select_selected.value.toString())
        if(nodes[i] == select_selected.value) {
            option.text = nodes[i]
            select_not_selected.add(option);
        }
    }

    if(select_selected.value != select_not_selected.value) //reselect the previous option if not the already selected
    {
        //select_selected.value = select_not_selected.value
    }*/
}

function comp_nodeList() {
    var nodes = cy.nodes()
    var res = []
    for(let i=0; i<nodes.length;i++) {
        var json = cy.data(nodes[i].json())
        var data = json.data()['data']['id']
        res.push(data)
    }
    return res
}

/*******************  EDIT  *********************/
function edit_tab(container, elt_id) {

    var html = "Cliquez sur l'élément à modifier</br></br>"

    if(elt_id !== undefined) {
        elt = cy.getElementById(elt_id)
        console.log(elt)
        if(elt.isNode()){ html += "Sous-ensemble "; }
        else { html += "Liaison " }
        html += elt_id.toString() +"</br>"
        html += `<input type="button" onclick="fill_edit_elt('${elt_id.trim()}') " class="edit_button"/>`
        html += `<input type="button" onclick="remove_elt('${elt_id.trim()}')" class="del_button"/>`
    }

    container.innerHTML = html //need to create this before accessing it
}

function fill_edit_elt(elt_id)
{
    let name = elt_id.toString().trim();
    elt = cy.getElementById(name)
    if(elt.isNode()){
        openTab(event, 'anode')
        document.getElementById("node_name").value = name
        let color = elt.data('color');

        document.getElementById("node_color").value = color;
        document.getElementById("node_color").style.color = color;
        document.getElementById("node_toedit").value = name;

    }
    else {
        openTab(event, 'alink')

        document.getElementById("link_toedit").value = name;  //edit mode
        //fill saved data
        //name

        document.getElementById("link_name").value = elt.data("label")
        //sub assemblies
        document.getElementById("link_sa1").value = elt.data("target").toString().trim()
        document.getElementById("link_sa2").value = elt.data("source").toString().trim()
        document.getElementById("select_link_type").value = elt.data("type").split(" ")[0]
        console.log("type", elt.data("type"))

        //add type

        //and other fields
        //TODO //completer
        /*if(elt.data[fields["axis"]] != undefined) { // a verifier
            document.getElementById("link_axis_x").value = elt.data[fields["axis"][0]]
            document.getElementById("link_axis_y").value = elt.data[fields["axis"][1]]
            document.getElementById("link_axis_z").value = elt.data[fields["axis"][2]]

        }*/

    }

}

function remove_elt(elt_id) {
    elt = cy.getElementById(elt_id)
    cy.remove(elt)
}
