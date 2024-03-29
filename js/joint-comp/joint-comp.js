//recupère les paramètres
var init = 0
function get_mobs() {
    var mobs = ['Tx','Ty','Tz','Rx','Ry','Rz']
    for (let i = 0; i < mobs.length; i++) {
        var val =  document.getElementById(mobs[i]).value
        if (val == "mob") {
            mobs[i]=1
        } else { mobs[i] = 0; }
    }
    //console.log(mobs)
    remaining_links(mobs);

    //document.getElementById("table_liaisons")
    return mobs
}

function get_all_links() {
    available = {}
    available['Choix'] = [0,0,0,0,0,0];
    available['PG x']=[1,0,0,1,0,0];
    available['PG y']=[0,1,0,0,1,0];
    available['PG z']=[0,0,1,0,0,1];
    available['Piv x']=[0,0,0,1,0,0];
    available['Piv y']=[0,0,0,0,1,0];
    available['Piv z']=[0,0,0,0,0,1];
    available['G x']=[1,0,0,0,0,0];
    available['G y']=[0,1,0,0,0,0];
    available['G z']=[0,0,1,0,0,0];
    available['LA x']=[1,0,0,1,1,1];
    available['LA y']=[0,1,0,1,1,1];
    available['LA Z']=[0,0,1,1,1,1];
    available['Rot']=[0,0,0,1,1,1];
    available['Ponct x']=[0,1,1,1,1,1];
    available['Ponct y']=[1,0,1,1,1,1];
    available['Ponct Z']=[1,1,0,1,1,1];
    available['AP x']=[0,1,1,1,0,0];
    available['AP y']=[1,0,1,0,1,0];
    available['AP Z']=[1,1,0,0,0,1];
    available['Doigt x']=[1,0,0,1,1,1];
    available['Doigt y']=[0,1,0,1,1,1];
    available['Doigt Z']=[0,0,1,1,1,1];
    available['LR axe x norm y']=[1,0,1,1,1,0];
    available['LR axe x norm z']=[1,1,0,1,0,1];
    available['LR axe y norm x']=[0,1,1,1,1,0];
    available['LR axe y norm z']=[1,1,0,0,1,1];
    available['LR axe z norm x']=[0,1,1,1,0,1];
    available['LR axe z norm y']=[1,0,1,0,1,1];
    //si ajout/retrait CTRL F "29" et modifier par lg dict (bug avec length du dict)
    return available

}

function remaining_links(mobs) {
    var available=get_all_links();

    for(let k in available) {
        var del = 0
        for (let i = 0; i < 6; i++) {
            if(available[k][i] == 1 && mobs[i] == 0) { del = 1 }

        }
        if(del==1) {
            // console.log(k +' removed');
            //available.delete(k);
            delete available[k];
        }

    }
    for(let k in available) {
        //console.log( "remains " + k)
    }
    return available;
}

function select_available() {
    var options = remaining_links(get_mobs());
    var str = ""
    for (let k in options) {
        str += "<option value=\""+k+"\">"+k+"</option>";
    }
    return str
}



number_of_lines = 0
function new_row() {
    number_of_lines += 1;
    var table = document.getElementById('table_liaisons');
    var row = table.insertRow(number_of_lines);
    var cell = row.insertCell(0)
    cell.innerHTML = "<tr><td><select class=\"select_link\" id=\"link_"+number_of_lines+"\" onclick=\"refresh_line("+number_of_lines+")\">"+select_available()+"</select></td></tr>";
    for(let i=1; i<7; i++) {
        cell = row.insertCell(i)
        cell.innerHTML = "0"
        cell.id = "cell_"+number_of_lines+"_"+i
    }
}

function refresh_line(index){
    var link_list = get_all_links()
    var l = document.getElementById("link_"+index).value
    var mob = link_list[l]
    for(let i=1; i<7; i++) {
        var cell = document.getElementById("cell_"+index+"_"+i)
        cell.innerHTML = mob[i-1]
    }
    hint()


}

function check_state() {
    var mob = get_mobs() //target
    //mobs given by selected links
    var mob_links = [0,0,0,0,0,0]
    var link_list = get_all_links()
    for(let i=1; i<=number_of_lines; i++){
        sel = document.getElementById("link_"+i);
        if (sel.value != "Choix"){
            mob_current = link_list[sel.value]
            for(let i=0; i<6; i++) {
                mob_links [i] += mob_current[i]
            }
        }
    }
    //console.log(mob, mob_links);
    cells_id = ["mob_Tx","mob_Ty","mob_Tz","mob_Rx","mob_Ry","mob_Rz"]
    var cell_value = [0,0,0,0,0,0]
    for(let j=0; j<6; j++) {
        var cell = document.getElementById(cells_id[j])
        if(mob[j] == mob_links[j]) {
            cell.innerHTML = '☑'
            cell_value[j] = 1
        }
        else if (mob[j] < mob_links[j]){

            var mob_int = mob_links[j]-1
            //console.log(mob_int)
            cell.innerHTML = '☑ '+ mob_int + ' '+ T['internal mobilities']
            cell_value[j] = mob_int +1
        }
        else {
            cell.innerHTML = '0'
            cell_value[j] = 0
        }
    }
    return cell_value
}

function refresh_select_link() {
    //find remaining mobilities with target
    var mob = get_mobs()
    var rem = remaining_links(mob);

    for(let i=1; i<=number_of_lines; i++){
        sel = document.getElementById("link_"+i);
        for(let j = 0; j<29; j++) {
            sel.options.remove(0)

        }
        //console.log(sel.options)
        for(let k in rem) {
            var option = document.createElement("option");
            option.text = k;
            sel.add(option);
        }
    }
    document.getElementById("mob_Tx").innerHTML = mob[0]
    document.getElementById("mob_Ty").innerHTML = mob[1]
    document.getElementById("mob_Tz").innerHTML = mob[2]
    document.getElementById("mob_Rx").innerHTML = mob[3]
    document.getElementById("mob_Ry").innerHTML = mob[4]
    document.getElementById("mob_Rz").innerHTML = mob[5]

    check_state()
}

//try to find the link that will validate the model
function hint(){
    var mob = get_mobs()
    var current_state = check_state()
    var rem = remaining_links(mob);
    var mob_int = 0;
    var hints = {}
    for(let k in rem) {
        var ok = 0 //6 conditions to check
        mob_int = 0;
        for(i=0;i<6;i++) {
            //console.log(k, rem[k][i], current_state[i])
            if(rem[k][i] + current_state[i] > 0) {
                ok +=1;
                mob_int += rem[k][i] + current_state[i] -1
            }
        }
        if(ok==6) {hints[k]=mob_int}
    }
    if(Object.keys(hints).length >0) {
        show_hint(hints)
        console.log("hint",hints)
    }else {
        var table = document.getElementById("hint")
        table.style.display = "none"
    }
}

function show_hint(hint)
{
    var table = document.getElementById("hint")
    table.innerHTML = `<tr><th>Suggestion</th><th>${T['Internal mobilities']}</th></tr>`
    table.style.display = "block"

    for(k in hint) {
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = k
        cell2.innerHTML = hint[k]
    }
}