function getLang(filename){
    var allText =[];
    var allTextLines = [];
    var Lines = [];
    var txtFile = new XMLHttpRequest();
    txtFile.open("GET", filename, true);
    txtFile.onreadystatechange = function()
    {
        allText = txtFile.responseText;
        allTextLines = allText.split(/\r\n|\n/);
        console.log("hey", allTextLines);
    };
    
    
}
