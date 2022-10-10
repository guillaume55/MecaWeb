//shorter console.log for debug
function cl (a, b="", c="", d="",e="",f="",g="",h=""){
    var a1 = JSON.parse(JSON.stringify(a))
    var b1 = JSON.parse(JSON.stringify(b))
    var c1 = JSON.parse(JSON.stringify(c))
    var d1 = JSON.parse(JSON.stringify(d))
    var e1 = JSON.parse(JSON.stringify(e))
    var f1 = JSON.parse(JSON.stringify(f))
    var g1 = JSON.parse(JSON.stringify(g))
    var h1 = JSON.parse(JSON.stringify(h))
    console.log(a1,b1,c1,d1,e1,f1,g1,h1)
}