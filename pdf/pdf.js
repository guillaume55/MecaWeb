
/**
 * Get and fill the template
 * @param {*} data 
 */
async function fillPdf(data) 
{
    /*
        Example for flexion :
        template: urlOfTheTemplate,
        pdfData = {
        textFields:{
            shape: ,
            height: ,
            width:,
            length:,
            material:,
            young:,
            load:,
            dist_a:,
            length2:,
            load2:,
            q_load:,
            moment:,
            max_disp:,
            abs:,
        },
        imgFields:{
            shape_img: {url: url, pos: [x,y], size:[x,y], page:0},
            load_type: {url: url, pos: [x,y], size:[x,y], page:pageIndex},
        }
    } 
    */
    console.log(data)
    console.log("loading pdf...")
    const formUrl = data.template
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
    const pdfDoc = await PDFLib.PDFDocument.load(formPdfBytes)
    const form = pdfDoc.getForm()

    //date
    const d = new Date();
    var months = ["Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep", "Oct", "Nov", "Dec"];
    d_str = `${d.getDate()} ${months[d.getMonth()-1]} ${d.getFullYear()}`
    const dateField = form.getTextField('date');
    dateField.setText(d_str)

    //fields
    for (const [key, value] of Object.entries(data.textField)) 
    {
        console.log(key, value);
        const field = form.getTextField(key);
        field.setText(value.toString())
    }

    //pictures, doesn't use form but [x,y] pos, maybe not optimal but works with onlyoffice forms
    for (const [key, value] of Object.entries(data.imgField)) 
    {
        console.log(key, value.url);

        const imageBytes = await fetch(value.url).then(res => res.arrayBuffer())
        const image = await pdfDoc.embedPng(imageBytes)

        const page = pdfDoc.getPage(value.page)
        page.drawImage(image, {
            x: value.pos[0],
            y: value.pos[1],
            width: value.size[0],
            height: value.size[1],
        })
    }

    //save and display in new tab
    pdfDataB64 = await pdfDoc.saveAsBase64(/*{ dataUri: true }*/);

    
    console.log("done.")
}

function openPdfInNewTab() 
{
        let pdfWindow = window.open("")
        pdfWindow.document.write("<iframe width='105%' height='105%' style='border:none; margin-left:-2.5%; margin-top:-2.5%'  src='data:application/pdf;base64, " + encodeURI(pdfDataB64) + "'></iframe>")
        pdfWindow.document.title("Calculus note");
}
