function fitsToTable(div,data){
    let t = document.createElement("TABLE");
    t.setAttribute("id", div.replace("div", "table"));
    t.setAttribute("class", "table");
    document.getElementById(div).appendChild(t);

    //first line
    let tr = document.createElement("TR");
    let th1 = document.createElement("TH");
    let tex = document.createTextNode("From/Up to");
    th1.appendChild(tex);
    tr.appendChild(th1);
    for(k of Object.keys(data)){   
        let th = document.createElement("TH");
        let text = document.createTextNode(k);
        th.appendChild(text);
        tr.appendChild(th);
    }
    t.appendChild(tr);

    //content
    //loop --> all keys -->

    let dim = [1,3,6,10,18,30,50,80,120,180,250]
    for(let i=0; i<20; i++) {
        tr = document.createElement("TR");
        let td1 = document.createElement("TD");
        let text1 = document.createTextNode(dim[i]+0.001+"\n"+dim[i+1]+"mm");
        td1.appendChild(text1);
        tr.appendChild(td1);
        for(k of Object.keys(data)){   
            let td = document.createElement("TD");
            let text = document.createTextNode(data[k][i][0]+"\n"+data[k][i][1]);
            td.appendChild(text);
            tr.appendChild(td);
        }
        t.appendChild(tr);
    }
    

}