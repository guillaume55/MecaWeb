/************************  EXPORT  *************************/
function export_button(container,fields){
    var html = ""
    if(fields == undefined || fields == "") { fields = "png jpg json pdf"}
    fields = fields.split(' '); //unused for now

    html += "<div>"
    for(let i=0; i<fields.length;i++) {
        if(fields[i] == "png") {
            html += "<input type='button' onclick='export_callback(\"png\")' value='Png'></input>"
        }
        else if(fields[i] == "jpg") {
            html += "<input type='button' onclick='export_callback(\"jpg\")' value='Jpg'></input>"
        }
        else if(fields[i] == "json") {
            html += "<input type='button' onclick='export_callback(\"json\")' value='Json (Cytoscape)'></input>"
        }
        else if(fields[i] == "pdf") {
            html += "<input type='button' onclick='export_callback(\"pdf\")' value='Pdf'></input>"
        }
    }

    html+="</div>"

    container.innerHTML = html //need to create this before accessing it

}


function export_callback(format) {
    //creating an invisible element
    if(format == 'png'){
        data = cy.png();
        filename = 'graph.png';

    }
    else if (format == 'json'){
        data = cy.json();
        filename = 'graph.json';

    }
    else {
        data = cy.jpg();
        filename = 'graph.jpg';
    }

    var element = document.createElement('a');
    element.href = data;
    element.download = filename;

    // Above code is equivalent to
    // <a href="path of file" download="file name">

    document.body.appendChild(element);

    //onClick property
    element.click();

    document.body.removeChild(element);
}
