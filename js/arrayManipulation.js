/**
 * Sort items from smallest to greater
 * @param {Array} items 
 * @returns sorted items
 */
 function sortArrayReverse(items){
    var i
    items.sort(function (a, b) {
      return b.len - a.len;
    });

    return items
}

function removeItem(array, item) {
    for(i = 0; i<array.length; i++){
      if(array[i] == item) {
        array.splice(array.indexOf(item), 1);
      }
    }
  }