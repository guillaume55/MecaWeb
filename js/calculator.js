function toggleCalculator(){
    let position = parseFloat(document.getElementById('embed_calculator').style.right);

    if(position >= 0) //close calculator pannel
    {
        document.getElementById('embed_calculator').style.right = "-305px";
    } 
    else //open calculator pannel
    { 
        document.getElementById('embed_calculator').style.right = "5px";
        //giving focus to calclator display doens't work locally, please use a web server (for ex, do in terminal $ python3 -m http.server 8080)
        document.getElementById("embed_calculator").contentWindow.document.getElementById('calculator_display').focus()  
    }
}

