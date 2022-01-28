function mechmath_babar(source_point, target_point, resultante, moment)
{
/*a torsor is a french mathematical tool define as
    {Resultante,
    Moment}
    or here (small displacement torsor)
    {Rot.x Rot.y Rot.z
    Trans.x Trans.y, Trans z}
    The resultante does not depends on the point but the moment do.
    In order to perfom calculations, we have to transport moment from source point (ie. A) to target point (ie. B)
    Moment(B) = Moment(A) + vector(BA) vectorialProduct Resultante
*/
    //a verifier si c'est dans le bon sens
    /*for(let i=0; i<3; i++) {
        if(sourcePoint[i] < targetPoint[i]) {ab[i] *= -1}
    }*/
    //Chasles relation MA = MO + OA
    var ba = [(-source_point[0]+target_point[0])*-1,(-source_point[1]+target_point[1])*-1,(-source_point[2]+target_point[2])*-1]

    moment[0] = `${moment[0]}`
    if(ba[1] != 0) { moment[0] += `+ (${ba[1]}*${resultante[2]})` }
    if(ba[2] != 0) { moment[0] += `- (${ba[2]}*${resultante[1]})` }

    moment[1] = `${moment[1]}`
    if(ba[2] != 0) { moment[1] += `+ (${ba[2]}*${resultante[0]})` }
    if(ba[0] != 0) { moment[1] += `- (${ba[0]}*${resultante[2]})` }

    moment[2] = `${moment[2]}`
    if(ba[0] != 0) { moment[2] += `+ (${ba[0]}*${resultante[1]})` }
    if(ba[1] != 0) { moment[2] += `- (${ba[1]}*${resultante[0]})` }


    return moment
}


function _mechmath_hDegree (nb_of_edge, nb_of_nodes) {

}
