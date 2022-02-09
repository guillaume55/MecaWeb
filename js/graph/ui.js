function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  if(evt != undefined)
    evt.currentTarget.className += " active";
}

function show_color_realtime(id) {
    let element = document.getElementById(id)
    let color = element.value.trim().slice(0, 7);
    console.log(color.length, color)
    if(color.search('#') == 0) //html color
    {
        console.log("updatecolor", color)
        element.style.color = color;
    }
}
