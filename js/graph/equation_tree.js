//

function makeTreeFromEquations(eq, target){
    //find the equations with the target
    //there should be only one
    let firstEq = []
    for( e of eq){
        if(e.search(target)!=-1)
            firstEq.push(e)
    }
    console.log("first eq", firstEq)
    if(firstEq.length == 0){
        console.log("Cannot solve")
        return 0
    }

    let tree_already_visited = [target]
    //now we can take the other terms of each branch and contruct a tree
    //we cannot pass two times by the same "I_" term as it will be an infinite loop
    for(e of firstEq){
        var variables = tol_getVariables(e)
        exploreBranch(eq, variables, tree_already_visited)
    }

}

function exploreBranch(eq, vars, doNotVisitAgain){
    v = vars[0]
    let dnva = [...doNotVisitAgain]
    let branch = [v]
    for(e of eq){
        if(e.search(v)!=-1 && !dnva.includes('z')){
            branch.push(e)

        }
    }


/*   
    for(v of vars){
        //avoid infinite loop
        let dnva = [...doNotVisitAgain]
        //will be branchs
        let eqThatContains = []
        //first var of this branch is already visited
        dnva.push(v)

        for(e of eq){
            if(e.search(v)!=-1){
                eqThatContains.push(e)

            }
        }

    }*/
}

function tol_getVariables(expr) {
    let x = CQ(expr).getAllVariables() 
    return x
}