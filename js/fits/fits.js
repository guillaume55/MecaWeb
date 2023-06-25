/********* 
 * 
 * python generation code
 * 

from csv import reader, writer 
with open('bore.csv') as f, open('aj_bore.csv', 'w') as fw: 
    writer(fw, delimiter=',').writerows(zip(*reader(f, delimiter=',')))


And
import csv

with open('aj_bore.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    for row in spamreader:
        #print(row)
        print("aj_bore['"+str(row[0])+"']=[")
        e = ","
        for i in range(1,20,2):
            if i == 19:
                e = "]"
            print("["+str(row[i])+","+str(row[i+1])+"]", end=e)
        print("\n") 
*/

/* How to read 
aj_bore['a11']=[
        [-270,-330],[-270,-345],[-280,-370],[-290,-400],[-300,-430],["X","X"],["X","X"],["X","X"],["X","X"],["X","X"]]
a --> shaft
A--> Bore
'11' --> quality
array -->
[0] from 1mm to 3mm [included]
[1] from 3 [excl] to 6
[2] 6 to 10mm
[3] 10 to 18mm
[4] 18 to 30
[5] 30 to 50
[6] 50 to 80
[7] 80 to 120
[8] 120 to 180
[9] 180 to 250


*/

function shaftFit(){
    let aj_shaft = {}
    //ok
    aj_shaft['a11']=[
    [-270,-330],[-270,-345],[-280,-370],[-290,-400],[-300,-430],[-320,-470],[-360,-530],[-410,-600],[-580,-710],[-820,-950]]
        
    aj_shaft['c8']=[
    [-60,-74],[-70,-88],[-80,-102],[-95,-122],[-110,-143],["X","X"],["X","X"],["X","X"],["X","X"],["X","X"]]
    
    aj_shaft['c9']=[
    [-60,-85],[-70,-100],[-80,-115],[-95,-138],[-110,-162],["X","X"],["X","X"],["X","X"],["X","X"],["X","X"]]
    
    aj_shaft['d8']=[
    [-20,-34],[-30,-48],[-40,-62],[-50,-77],[-65,-98],[-80,-119],[-100,-146],[-120,-174],[-145,-208],[-170,-242]]
    
    //ok
    aj_shaft['d9']=[
    [-20,-45],[-30,-60],[-40,-75],[-50,-93],[-65,-117],[-80,-142],[-100,-174],[-120,-207],[-145,-245],[-170,-285]]
    
    //ok
    aj_shaft['d11']=[
    [-20,-80],[-30,-105],[-40,-130],[-50,-160],[-65,-195],[-80,-240],[-100,-290],[-120,-340],[-145,-395],[-170,-460]]
    
    //ok
    aj_shaft['e7']=[
    [-14,-24],[-20,-32],[-25,-40],[-32,-50],[-40,-61],[-50,-75],[-60,-90],[-72,-107],[-85,-125],[-100,-146]]
    
    //ok
    aj_shaft['e8']=[
    [-14,-28],[-20,-38],[-25,-47],[-32,-59],[-40,-73],[-50,-89],[-60,-106],[-72,-126],[-85,-148],[-100,-172]]
    
    //ok
    aj_shaft['e9']=[
    [-14,-39],[-20,-50],[-25,-61],[-32,-75],[-40,-92],[-50,-112],[-60,-134],[-72,-159],[-85,-185],[-100,-215]]
    
    //ok
    aj_shaft['f6']=[
    [-6,-12],[-10,-18],[-13,-22],[-16,-27],[-20,-33],[-25,-41],[-30,-49],[-36,-58],[-43,-68],[-50,-79]]
    
    //ok
    aj_shaft['f7']=[
    [-6,-16],[-10,-22],[-13,-28],[-16,-34],[-20,-41],[-25,-50],[-30,-60],[-36,-71],[-43,-83],[-50,-96]]
    
    //ok
    aj_shaft['f8']=[
    [-6,-20],[-10,-28],[-13,-35],[-16,-43],[-20,-53],[-25,-64],[-30,-76],[-36,-90],[-43,-106],[-50,-122]]
    
    //ok
    aj_shaft['g5']=[
    [-2,-6],[-4,-9],[-5,-11],[-6,-14],[-7,-16],[-9,-20],[-10,-23],[-12,-27],[-14,-32],[-15,-35]]
    
    //ok
    aj_shaft['g6']=[
    [-2,-8],[-4,-12],[-5,-14],[-6,-17],[-7,-20],[-9,-25],[-10,-29],[-12,-34],[-14,-39],[-15,-44]]
    
    //ok
    aj_shaft['h5']=[
    [0,-4],[0,-5],[0,-6],[0,-8],[0,-9],[0,-11],[0,-13],[0,-15],[0,-18],[0,-20]]
    
    //ok
    aj_shaft['h6']=[
    [0,-6],[0,-8],[0,-9],[0,-11],[0,-13],[0,-16],[0,-19],[0,-22],[0,-25],[0,-29]]
    
    //ok
    aj_shaft['h7']=[
    [0,-10],[0,-12],[0,-15],[0,-18],[0,-21],[0,-25],[0,-30],[0,-35],[0,-40],[0,-46]]
    
    //ok
    aj_shaft['h8']=[
    [0,-14],[0,-18],[0,-22],[0,-27],[0,-33],[0,-39],[0,-46],[0,-54],[0,-63],[0,-72]]
    
    //ok
    aj_shaft['h9']=[
    [0,-25],[0,-30],[0,-36],[0,-43],[0,-52],[0,-62],[0,-74],[0,-87],[0,-100],[0,-115]]

    //ok
    aj_shaft['h10']=[
    [0,-40],[0,-48],[0,-58],[0,-70],[0,-84],[0,-100],[0,-120],[0,-140],[0,-160],[0,-185]]
    
    //ok
    aj_shaft['h11']=[
    [0,-60],[0,-75],[0,-90],[0,-110],[0,-130],[0,-160],[0,-190],[0,-220],[0,-250],[0,-290]]
    
    aj_shaft['js5']=[
    [2,-2],[2.5,-2.5],[3,-3],[4,-4],[4.5,-4.5],[5.5,-5.5],[6.5,-6.5],[7.5,-7.5],[9,-9],[10,-10]]
    
    aj_shaft['js6']=[
    [3,-3],[4,-4],[4.5,-4.5],[5.5,-5.5],[6.5,-6.5],[8,-8],[9.5,-9.5],[11,-11],[12.5,-12.5],[14.5,-14.5]]
    
    aj_shaft['js7']=[
    [5,-5],[6,-6],[7.5,-7.5],[9,-9],[10.5,-10.5],[12.5,-12.5],[15,-15],[17.5,-17.5],[20,-20],[23,-23]]
    
    aj_shaft['k5']=[
    [4,0],[6,1],[7,1],[9,1],[11,2],[13,2],[15,2],[18,3],[21,3],[24,4]]
    
    aj_shaft['k6']=[
    [6,0],[9,1],[10,1],[12,1],[15,2],[18,2],[21,2],[25,3],[26,3],[33,4]]
    
    aj_shaft['k7']=[
    [10,0],[13,1],[16,1],[19,1],[23,2],[27,2],[32,2],[38,3],[43,3],[50,4]]
    
    aj_shaft['m5']=[
    [6,2],[9,4],[12,6],[15,7],[17,8],[20,9],[24,11],[28,13],[33,15],[37,17]]
    
    aj_shaft['m6']=[
    [8,2],[12,4],[15,6],[18,7],[21,8],[25,9],[30,11],[35,13],[40,15],[46,17]]
    
    aj_shaft['m7']=[
    ["X",2],[16,4],[21,6],[25,7],[29,8],[34,9],[41,11],[48,13],[55,15],[63,17]]
    
    aj_shaft['n6']=[
    [10,4],[16,8],[19,10],[23,12],[28,15],[33,17],[39,20],[45,23],[52,27],[60,31]]
    
    aj_shaft['n7']=[
    [14,4],[20,8],[25,10],[30,12],[36,15],[42,17],[50,20],[58,23],[67,27],[77,31]]
    
    aj_shaft['p6']=[
    [12,6],[20,12],[24,15],[29,18],[35,22],[42,26],[51,32],[59,37],[68,43],[79,50]]
    
    aj_shaft['p7']=[
    [16,6],[24,12],[30,15],[36,18],[43,22],[51,26],[62,32],[72,37],[83,43],[96,50]]
    
    aj_shaft['r6']=[
    [16,10],[23,15],[28,19],[34,23],[41,28],[50,34],["X","X"],["X","X"],["X","X"],["X","X"]]
    
    aj_shaft['r7']=[
    [20,10],[27,15],[34,19],[41,23],[49,28],[59,34],["X","X"],["X","X"],["X","X"],["X","X"]]
    
    aj_shaft['s6']=[
    [20,14],[27,19],[32,23],[39,28],[48,35],[59,43],["X","X"],["X","X"],["X","X"],["X","X"]]
    
    aj_shaft['s7']=[
    [24,14],[31,31],[38,23],[46,28],[56,35],[68,43],["X","X"],["X","X"],["X","X"],["X","X"]]
    
    return aj_shaft
}

function boreFit(){
    let aj_bore = {}
    aj_bore['A11']=[
    [330,270],[345,270],[370,280],[400,290],[430,300],["X","X"],["X","X"],["X","X"],["X","X"],["X","X"]]
        
    aj_bore['B9']=[
    [165,140],[170,140],[186,150],[193,150],[212,160],["X","X"],["X","X"],["X","X"],["X","X"],["X","X"]]
    
    aj_bore['B11']=[
    [200,140],[215,140],[240,150],[260,150],[290,160],["X","X"],["X","X"],["X","X"],["X","X"],["X","X"]]
    
    aj_bore['C9']=[
    [85,60],[100,70],[116,80],[138,95],[162,110],["X","X"],["X","X"],["X","X"],["X","X"],["X","X"]]
    
    aj_bore['C11']=[
    [120,60],[145,70],[170,80],[205,95],[240,110],["X","X"],["X","X"],["X","X"],["X","X"],["X","X"]]
    
    aj_bore['D9']=[
    [45,20],[60,30],[76,40],[93,50],[117,65],[142,80],[174,100],[207,120],[245,145],[285,170]]
    
    //ok
    aj_bore['D10']=[
    [60,20],[78,30],[98,40],[120,50],[149,65],[180,80],[220,100],[260,120],[305,145],[335,170]]
    
    aj_bore['D11']=[
    [80,20],[105,30],[130,40],[160,50],[195,65],[240,80],[290,100],[340,120],[395,145],[460,170]]
    
    aj_bore['E8']=[
    [28,14],[38,20],[47,25],[59,32],[73,40],[89,50],[106,60],[126,72],[148,85],[172,100]]
    
    //ok
    aj_bore['E9']=[
    [39,14],[50,20],[61,25],[75,32],[92,40],[112,50],[134,60],[159,72],[185,85],[215,100]]
    
    aj_bore['F7']=[
    [16,6],[22,10],[28,13],[34,16],[41,20],[50,25],[60,30],[71,36],[83,43],[96,50]]
    
    //ok
    aj_bore['F8']=[
    [20,6],[28,10],[35,13],[43,16],[53,20],[64,25],[76,30],[90,36],[106,43],[122,50]]
    
    aj_bore['G6']=[
    [8,2],[12,4],[14,5],[17,6],[20,7],[25,9],[29,10],[34,12],[39,14],[44,15]]
    
    //ok
    aj_bore['G7']=[
    [12,2],[16,4],[20,5],[24,6],[28,7],[34,9],[40,10],[47,12],[54,14],[61,15]]
    
    aj_bore['H5']=[
    [4,0],[5,0],[6,0],[8,0],[9,0],[11,0],[13,0],[15,0],[18,0],[20,0]]
    
    //ok
    aj_bore['H6']=[
    [6,0],[8,0],[9,0],[11,0],[13,0],[16,0],[19,0],[22,0],[25,0],[29,0]]
    
    //ok
    aj_bore['H7']=[
    [10,0],[12,0],[15,0],[18,0],[21,0],[25,0],[30,0],[35,0],[40,0],[46,0]]
    
    //ok
    aj_bore['H8']=[
    [14,0],[18,0],[22,0],[27,0],[33,0],[39,0],[46,0],[54,0],[63,0],[72,0]]
    
    //ok
    aj_bore['H9']=[
    [25,0],[30,0],[36,0],[43,0],[52,0],[62,0],[74,0],[87,0],[100,0],[115,0]]
    
    //ok
    aj_bore['H11']=[
    [60,0],[75,0],[90,0],[110,0],[130,0],[160,0],[190,0],[220,0],[250,0],[290,0]]
    
    aj_bore['Js6']=[
    [3,-3],[4,-4],[4.5,-4.5],[5.5,-5.5],[6.5,-6.5],[8,-8],[9.5,-9.5],[11,-11],[12.5,-12.5],[14.5,-14.5]]
    
    aj_bore['Js7']=[
    [5,-5],[6,-6],[7.5,-7.5],[-9,-9],[10.5,-10.5],[12.5,-12.5],[15,-15],[17.5,-17.5],[20,-20],[23,-23]]
    
    //ok
    aj_bore['K6']=[
    [0,-6],[2,-6],[2,-7],[2,-9],[2,-11],[3,-13],[4,-15],[4,-18],[4,-21],[5,-24]]
    
    //ok
    aj_bore['K7']=[
    [0,-10],[3,-9],[5,-10],[6,-12],[6,-15],[7,-18],[9,-21],[10,-25],[12,-28],[13,-33]]
    
    aj_bore['M6']=[
    [-2,-8],[-1,-9],[-3,-12],[-4,-15],[-4,-17],[-4,-20],[-5,-24],[-6,-28],[-8,-33],[-8,-37]]
    
    //ok
    aj_bore['M7']=[
    [0,-12],[0,-12],[0,-15],[0,-18],[0,-21],[0,-25],[0,-30],[0,-35],[0,-40],[0,-46]]
    
    aj_bore['N6']=[
    [-4,-10],[-5,-13],[-7,-16],[-9,-20],[-11,-24],[-12,-28],[-14,-33],[-16,-38],[-20,-45],[-22,-51]]
    
    //ok
    aj_bore['N7']=[
    [-4,-14],[-4,-16],[-4,-19],[-5,-23],[-7,-28],[-8,-33],[-9,-39],[-10,-45],[-12,-52],[-14,-60]]
    
    aj_bore['P6']=[
    [-6,-12],[-9,-17],[-12,-21],[-15,-26],[-18,-31],[-21,-37],[-26,-45],[-30,-52],[-36,-61],[-41,-70]]
    
    //ok
    aj_bore['P7']=[
    [-6,-16],[-8,-20],[-9,-24],[-11,-29],[-14,-35],[-17,-42],[-21,-51],[-24,-59],[-28,-68],[-33,-79]]
    
    aj_bore['P9']=[
    [-6,-31],[-12,-42],[-15,-51],[-18,-61],[-22,-74],[-26,-88],[-32,-106],[-37,-124],[-43,-143],[-50,-165]]
    
    aj_bore['R7']=[
    [-10,-20],[-11,-23],[-13,-28],[-16,-34],[-20,-41],[-25,-50],["X","X"],["X","X"],["X","X"],["X","X"]]
    
    aj_bore['S7']=[
    [-14,-24],[-15,-27],[-17,-32],[-21,-39],[-27,-48],[-34,-59],["X","X"],["X","X"],["X","X"],["X","X"]]

    return aj_bore
}

function getFit(fit, size){
    // check if it's a bore or a shaft
    let type = 1 //1 looks like a shaft
    if(fit[0] === fit[0].toUpperCase())
        type = 0 //0 looks like a bore

    let aj = (type ? shaftFit() : boreFit());
    console.log(aj)
    

}

//"bore" or "shaft"
//return all the type, for ex ; ["a11","c8",...]
function getFits(type){
    let aj 
    if(type == "bore") {
        aj = boreFit()
    }else if (type == "shaft") {
        aj = shaftFit()
    }
    return Object.keys(aj);
}

function computeClearance(){
    //inputs
    let sel_bore = document.getElementById("c_select_bore").value;
    let sel_shaft = document.getElementById("c_select_shaft").value;
    let diam = parseFloat(document.getElementById("c_diam").value);
    
    let index =0;
    for(d of [3,6,10,18,30,50,80,120,180,250]){
        if(diam>d) index += 1;
    }
    let bore = boreFit()[sel_bore][index];
    let shaft = shaftFit()[sel_shaft][index];
    console.log(bore, shaft)
    //outputs
    
    let max_s = diam+shaft[0]*0.001
    let min_s = diam+shaft[1]*0.001
    let max_b = diam+bore[0]*0.001
    let min_b = diam+bore[1]*0.001
    
    document.getElementById("c_shaft_it").innerText = `${shaft[0]}µm, ${shaft[1]}µm`;
    document.getElementById("c_bore_it").innerText = `${bore[0]}µm, ${bore[1]}µm`;
    document.getElementById("c_bore_int").innerText = `Min : ${min_b}, Max : ${max_b}`;
    document.getElementById("c_shaft_int").innerText = `Min : ${min_s}, Max : ${max_s}`;
    
    //radial gap
    let min = roundDec(min_b-max_s,3); //min clearance
    let max = roundDec(max_b-min_s,3); //max clearance
    let avg = roundDec((min+max)/2,3); //avg clearance
    //at least an undefined value
    if(!isNaN(shaft[0]) && !isNaN(shaft[1]) && !isNaN(bore[0]) && !isNaN(bore[1])){
        res = `${T['Clearance in']} µm</br><table><tr><th>Min</th><th>Avg</th><th>Max</th></tr><tr><td>${min*1000}</td><td>${avg*1000}</td><td>${max*1000}</td></tr></table>`
        
    }else{
        res = T["At least a non normalised IT: cannot compute"]
    }
    document.getElementById("c_result").innerHTML = res;

    //if(document.getElementById("is_pivot").checked)
        computePivot(diam,min_s,max_s,min_b,max_b)
    
}

//formulas from CETIM excel sheet
function computePivot(diam,min_s,max_s,min_b,max_b){
    let e = parseFloat(document.getElementById("pivot_entraxe").value);
    let l = parseFloat(document.getElementById("pivot_bearing_length").value);

    //outputs
    //if L/D > 1.5 --> usually a pivot, else if < 0.6, usualy a linéaire annulaire 
    let ld = l/diam
    document.getElementById("pivot_ld").innerText = roundDec(ld,2);

    //alpha rot, angle de rotulage in min of arc
    let radialPlayMin = min_b-min_s; 
    let radialPlayMax = max_b-max_s;

    let radialPlayAvg = (radialPlayMax+radialPlayMin)/2;
    let aRotMin = Math.atan(radialPlayMin/(l*0.8))*180/Math.PI*60;
    let aRotMax = Math.atan(radialPlayMax/(l*0.8))*180/Math.PI*60;
    let aRotAvg = Math.atan(radialPlayAvg/(l*0.8))*180/Math.PI*60;
    document.getElementById("pivot_alphaMin").innerHTML = roundDec(aRotMin,2);
    document.getElementById("pivot_alphaMax").innerHTML = roundDec(aRotMax,2);
    document.getElementById("pivot_alphaAvg").innerHTML = roundDec(aRotAvg,2);

    //pivot or not 
    let ld_LA = radialPlayMin/(math.tan(20/60*Math.PI/180)*diam)/0.8;
    let ld_PG = radialPlayMax/(math.tan(5/60*Math.PI/180)*diam)/0.8;
    let type = T["Not defined"]
    if(aRotMax < 5.0001)
        type = T["Sliding pivot"]
    else if(aRotMin > 19.9999)
        type = T["Sliding Sphere"]
    document.getElementById("pivot_ld_LA").innerText = roundDec(ld_LA,2);
    document.getElementById("pivot_ld_PG").innerText = roundDec(ld_PG,2);
    document.getElementById("pivot_type").innerText = type;

    let AvgRadialSpaceCompensatedonOtherBearing = e*math.tan(radialPlayAvg/60*Math.PI/180); //sorry for this variabee name, hope your have a good IDE

    let AvgCompensatedLocalisation = 2*AvgRadialSpaceCompensatedonOtherBearing;
    console.log(AvgCompensatedLocalisation)
    document.getElementById("pivot_maxLoc").innerHTML = roundDec(Math.abs(AvgCompensatedLocalisation*1000),3)+"µm";
}