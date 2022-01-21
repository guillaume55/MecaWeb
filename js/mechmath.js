function mechmath_babar(ba, resultante, moment)
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


    moment[0] = `${moment[0]} + (${ba[1]}*${resultante[2]}) -  (${ba[2]}*${resultante[1]})`
    moment[1] = `${moment[1]} + (${ba[2]}*${resultante[0]}) -  (${ba[0]}*${resultante[2]})`
    moment[2] = `${moment[2]} + (${ba[0]}*${resultante[1]}) -  (${ba[1]}*${resultante[0]})`

    return moment
}

//return the signed distance between two point used to transport the moment. Not easy as it seems
function mechmath_ba(pointB, pointA) {

}

function _mechmath_hDegree (nb_of_edge, nb_of_nodes) {

}
