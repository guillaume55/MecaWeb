/*****************************************************************
 * Insert a component such as add link or add cf, add edge
 *
 *TODO prevent two sub ass with the same name for creating links
 * function comp_rNodeList issue with string comparison
 *
 *
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
    html+="</br></br><input id=\"link_name\" placeholder=\"Name\"></input>"
    html+= "</br><label>Sous-ensembles</label></br>"

    //populate selects
    var sel_sa = ""
    var sa = comp_nodeList()
    console.log(sa,"sa")
    for(let i=0; i<sa.length;i++) {
        sel_sa += "<option value=\""+sa[i]+"\">"+sa[i]+"</option>"
    }
    html += "<select id=\"link_sa1\" onchange=\"\">"+sel_sa+"</select>"
    html += "<select id=\"link_sa2\" onchange=\"\">"+sel_sa+"</select>"


    for(let i=0; i<fields.length;i++) {
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
    var name = document.getElementById('link_name').value
    var source = document.getElementById('link_sa1').value
    var target = document.getElementById('link_sa2').value

    var err = document.getElementById('link_err')
    if(0) { no_err = 0; err.innerHTML= 'Le nom existe déjà' } //if name already exists
    if(name == "") { no_err = 0; err.innerHTML= 'Veuillez entrez un nom' }

    if(no_err) {
        cy.add({
        group: 'edges',
        data: { id: name,
                source: source,
                target: target,
                label: name,
                color: 'red'
        },
            //position: { x: 200, y: 200 }
        });
    }

}

function comp_linkList() {

}

/**************************  SUb-assemblies *******************/
function comp_sNode(container) {
    var html = "<form><label>Sous-ensemble</label>"
    html += "</br><input id=\"node_name\" placeholder=\"carter\"/>"
    html += "</br><div class=\"error\" id=\"node_err\"></div>"
    let color = Math.floor(Math.random() * 0xFFFFFF).toString(16);
    html += "</br><input id=\"node_color\" value=\"#"+color+"\"/>"
    html += "</br></br><input type=\"button\" value=\"Valider\" onclick=\"comp_aNode()\" />"
    html += "</form>"

    container.innerHTML = html //need to create this before accessing it


}

function comp_aNode(){

    var no_err = 1
    var color = document.getElementById('node_color').value //have to check if color is html
    var name = document.getElementById('node_name').value

    var err = document.getElementById('node_err')
    if(0) { no_err = 0; err.innerHTML= 'Le nom existe déjà' } //if name already exists
    if(name == "") { no_err = 0; err.innerHTML= 'Veuillez entrez un nom' }

    if(no_err) {
        console.log("addnode")
        cy.add({
            group: 'nodes',
            data: { id: name,
                    color: color
            },
            //position: { x: 200, y: 200 }
        });
    }

    //refresh node list
    comp_rNodeList('link_sa1','link_sa2')

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
