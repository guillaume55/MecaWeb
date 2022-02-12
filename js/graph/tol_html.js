function tol_fillOutputsCycle(cycl){
    let html = ""
    for (c of cycl) {
        html += (c.join(',')) + "</br>"
      }

    document.getElementById('cycles').innerHTML = html
}

function tol_fillOutputsEq(eq){
    let html = "</br><br>"
    for (e of eq) {
        html += (e) + "</br>"
      }
    document.getElementById('equations').innerHTML += html
}