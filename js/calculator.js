function toggleCalculator(){
    //let position = parseFloat(document.getElementById('calculator_table').style.right);
    //var ifrm = document.getElementById('embed_calculator')
    //var doc = ifrm.contentDocument? ifrm.contentDocument:
        //ifrm.contentWindow.document
    let position = parseFloat(document.getElementById('embed_calculator').style.right);
    console.log(position)
    if(position >= 0){
     document.getElementById('embed_calculator').style.right = "-305px";
    } else {
     document.getElementById('embed_calculator').style.right = "5px";
    }
}

