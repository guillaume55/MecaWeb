



//try to find the best solution by finding all the equations
//not optimal, see v3
/*
function write_eq_V2(edges) {
    //helico --> cycles = [['P3','P2'],['P3','P5'],['P3','P4'],['P1','P2','P3','P4'],['P1','P5','P3','P4']]
    //boitier arriere
    cycles = [['Arbre','Carter',],['Arbre','Sat'],['Sat', 'Carter', 'Arbre'],['Sat','Carter']]
    let fc = get_cf();
    let equations = [] //add mobilities

    //find 6 equations for each cycle
    for(let i=0; i< cycles.length; i++) {
        //find all edges between two nodes
        let edges_between=[]
        if(cycles[i].length < 3) {
            edges_between = get_edges_from_nodes(cycles[i][0], cycles[i][1])
            //add to I_to_replace the numerical values of some I
            //compute_numerical_tol_val(edges_between);
        }
        else {
            c = [...cycles[i]]
            c.push(c[0]) //close the cycle
            for(let j=1; j<c.length; j++) {
                ed = get_edges_from_nodes(c[j-1], c[j])
                edges_between.push(ed[0]) //we need only one link between two nodes
            }

        }
        //remove equations with only one I, solve it now
        console.log(equations)
        equations = solve_oneI(equations)
        equations = equations.concat(write_eq_for_cycle(edges_between, fc))
        //start to solve if possible
        equations = replace_with_known_comp(equations)

    }
    //console.log(equations)
    //var coeffs = nerdamer.coeffs('3*x^2+1', 'x');
    //console.log("coef", coeffs)
    console.log('iIiiii', I_to_replace)
    console.log("eq", equations)
    equations = replace_with_known_comp(equations)
    console.log("-->",equations)
    //on peut donc chercher notre CF selon l'axe voulu
    let solved = nerdamer.solveEquations(equations[4], "I_v_CF")
    var coeffs = nerdamer.coeffs(equations[4], "I_v_CF");
    console.log(solved.toString())
    coeffs.each(function(e, i) {
        console.log('coeff #'+i+': ', nerdamer(e).add('t').toString());
    });

}*/

function write_eq_V3(edges) {
    //helico --> cycles = [['P3','P2'],['P3','P5'],['P3','P4'],['P1','P2','P3','P4'],['P1','P5','P3','P4']]
    //boitier arriere
    //cycles = [['Arbre','Carter',],['Arbre','Sat'],['Sat', 'Carter', 'Arbre'],['Sat','Carter']]
    cycles = findCycles();
    let fc = get_cf();
    let equations = [] //add mobilities

    //let target =
    //find 6 equations for each cycle
    for(let i=0; i< cycles.length; i++) {
        //find all edges between two nodes
        let edges_between=[]
        if(cycles[i].length < 3) {
            edges_between = get_edges_from_nodes(cycles[i][0], cycles[i][1])
            //add to I_to_replace the numerical values of some I
            //compute_numerical_tol_val(edges_between);
        }
        else {
            c = [...cycles[i]]
            c.push(c[0]) //close the cycle
            for(let j=1; j<c.length; j++) {
                ed = get_edges_from_nodes(c[j-1], c[j])
                edges_between.push(ed[0]) //we need only one link between two nodes
            }

        }
        for(let k=0; k<1; k++){ //mainly for the last loop
            //remove equations with only one I, solve it now
            equations = solve_oneI(equations)

            equations = equations.concat(write_eq_for_cycle(edges_between, fc))
            //start to solve if possible
            equations = replace_with_known_comp(equations)
        }

    }

    //start searching a way to find the functionnal condition
    for(k=0; k<equations.length;k++){
            //console.log("I_", count_I(equations[k]), extract_I(equations[k]))
            if(equations[k].search(fc['axis']) != -1) {
                console.log("this is this equations !", equations[k])
                find_child_eq(equations, fc['axis'])
            }
    }
    console.log(equations)
    //var sol = nerdamer.solveEquation(equations,fc['axis']);
}

function count_I (eq) {
    return eq.match(/I_/g).length
}

function extract_I(eq) {
    let I_things = [];
    sp = eq.split(/[+,-,=,*,/,\s,(,)]+/);
    for(let j=0; j<sp.length; j++)  {
        sp[j] = sp[j].toString()

        if(sp[j].search("I_") != -1) {
            I_things.push(sp[j])
        }
    }
    return I_things;
}

//check if all termes are known in the equation
function still_contains_I(eq)
{
}

//the aim if to find the "terme". I_xxx are unknown. Create a tree that we will explore to find the value of terme
function find_child_eq(eqs, terme){
    let eq_with_it = [] //it means the "terme"

    let branches = []
    let I_already_visited = {} //helps to not loop forever

    for(let i=0; i<eqs.length; i++){
        if(eqs[i].search(terme) != -1) {
            let res = extract_I(eqs[i])
            if(res.length == 1) { //can be solved now, end of the branch
                console.log("canbesolved")
            }

            if(res.length >= 2) {  //we will have to dig deeper

                for(r of res) {

                }
                eq_with_it.push(eqs[i])
            }

        }
    }

}

function solve_oneI(eq) {
    for(let i=0; i<eq.length; i++) {
        //we can solve if there is only one I
        if(eq[i].match(/I_/g) !== null) { //see line bellow
            let termes = extract_I(eq[i])
            if(termes.length < 2 ) { //bug because we try to find length of null if eq => 0+0+0=0
                //find which terme is unknown
                //replace sp[x] with "termes", cleaner and shorter
                let sp = eq[i].split(/[+,-,=,*,/,\s,(,)]+/);
                for(let j=0; j<sp.length; j++)  {
                    sp[j] = sp[j].toString()

                    if(sp[j].search("I_") != -1) {
                        console.log(eq[i])
                        if(I_to_replace[sp[j]] === undefined) {
                            let solved = nerdamer.solve(eq[i], sp[j]);
                            let res = solved.toString().replaceAll("[","").replaceAll("]","")

                            I_to_replace[sp[j]] = res;
                            eq.splice(i)
                            i = i-1
                            console.log("------111111")
                        }
                    }
                }
            }
        }
    }
    //console.log("itoreplace",I_to_replace)
    //console.log("eq",eq)
    return eq
}

//we will find I_xxx = xxx, instead of adding a new equation, we will replace I_xxx by its value later
function write_resultantes_two_nodes(edges_bet) {
    //sum each link

    let components = ["alpha", "beta", "gamma"]
    if(edges_bet.length > 2) { console.log(`Maybe there is an error, because ${edges_bet.length} are between 2 nodes`) }

    //I_to_replace
    var mob0 = get_mobilities_from_edge(edges_bet[0]['type'])
    var mob1 = get_mobilities_from_edge(edges_bet[1]['type'])
    console.log(mob0, mob1)
    for(let j=3; j<6; j++) { //for the rotations
        if(mob0[j] == 1 && mob1[j]==1) //mobility
        {   console.log(edges_bet[0]['id'], edges_bet[1]['id'], "A mobility remains")   }
        else if( mob0[j] == 1 && mob1[j] == 0 ) {  //Imob0 found, save it's value for futur use
            I_to_replace[`I_${components[j-3]}_${edges_bet[0]['id']}`] =`${components[j-3]}_${edges_bet[1]['id']}`
        } else if( mob0[j] == 0 && mob1[j] == 1 ) {  //same idea as previous if
            I_to_replace[`I_${components[j-3]}_${edges_bet[1]['id']}`] = `${components[j-3]}_${edges_bet[0]['id']}`
        }
        else {  //something == somethingElse, hyperstatic, can't be solved with this method
            console.log(`Error: Model is hyperstatic ${edges_bet[0]['id']}, ${edges_bet[1]['id']}`)
        }
    }
}

function write_eq_for_cycle(edges_bet,cf) {
    //sum each link
    let equations = []
    let mob = []

    for(let i=0; i<edges_bet.length; i++)  {
        console.log(edges_bet[i]['type'],edges_bet[i]['id'])
        mob.push(mobs_to_components(get_mobilities_from_edge(edges_bet[i]['type']),edges_bet[i]['id']))
    }

    for(let j=3; j<6; j++) { //resultantes aka rotations alpha beta gamma
        let str = ""
        for(let k=0; k<mob.length; k++)  {
            str += mob[k][j]
            if(k<mob.length-1) {  str+= "+";  }
        }
        str += "=0"
        equations.push(str)
    }
    for(let j=0; j<3; j++) { //moments aka translation u v w
        let str ="";
        for(let k=0; k<mob.length; k++)  {
            //str += mob[k][j]
            //make the addition at the fc point
            let babar = mechmath_babar(edges_bet[k]['point'], cf['point'], [mob[k][3],mob[k][4],mob[k][5]],[mob[k][0],mob[k][1],mob[k][2]])
            str += babar[j]
            if(k<mob.length-1) {  str+= "+";  }
        }
        str += "=0"
        equations.push(str)
    }
    return equations
}

//take mobility array (0 and 1 and change to "alpha", "beta", "gamma","u", "v", "w"
function mobs_to_components(mob, linkName) {
    let comp = ["u", "v", "w","alpha", "beta", "gamma"] //be careful, reversed
    let res = []
    for(let i=0; i<6; i++) {
        let str = ""
        if(mob[i] == 1) {str += "I_" }
        str += `${comp[i]}_${linkName}`
        res.push(str)
    }
    return res
}


//return mobilities Tx,y,z and Rx, y, z from the name of the linkage
function get_mobilities_from_edge(type){
    mob = mech_links()
    if (mob[type] == undefined) {console.log("Unknown linkage",mob[type]);}
    return mob[type]
}

//replace already found component in equations
function replace_with_known_comp(equations)  {
    for(let i=0; i<equations.length; i++) {
        for(var key in I_to_replace) {
            equations[i] = equations[i].replaceAll(key, I_to_replace[key] );
            //console.log("replacing", key, "by", I_to_replace[key])
        }

    }
    return equations
}

function extract_graph(){
    var edges = cy.edges()
    var res = []
    for(let i=0; i<edges.length;i++) {
        var json = cy.data(edges[i].json())
        var source = json.data()['data']['source']
        var target = json.data()['data']['target']
        res.push([source, target])
    }
    return res
}






