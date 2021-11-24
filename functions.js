

function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
      var item = a[i];
      if (seen[item] !== 1) {
        seen[item] = 1;
        out[j++] = item;
      }
    }
    return out;
  }
  
  
  function compare_array(array1, array2) {
    uniq_fast(array1)
    for (let i = 0; i < array1.length; i++) {
      array1[i] = array1[i].replace(/ /g, '')
    }
    if (array1.sort().join(',') === array2.sort().join(',')) {
  
      return true;
    }
    else {
      return false;
    }
  
  
  }
  
  //remove all spaces and commas
  function fix_dfa() {
  
  
    for (let i = 0; i < dfa.length; i++) {
      dfa[i][`name`] = dfa[i][`name`].replaceAll(',', '').replace(/ /g, '')
      language.map(x => {
        dfa[i][x] = dfa[i][x].replaceAll(',', '').replace(/ /g, '')
  
      })
  
    }
  
  }
  
//reset check string
function reset_string() {
    let string = document.getElementById('check_string').value = '';
    document.getElementById('receive').innerHTML = ''
  }
  
  function searchStringInArray(str, strArray) {
    for (var j = 0; j < strArray.length; j++) {
      if (strArray[j].match(str)) return j;
    }
    return -1;
  }

  //get values from select multiple
function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;
  
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }

  function remove(value,arr) {
    
    const index = arr.indexOf(`Q1`);
    if (index > -1) {
      arr.splice(index, 1);
    }
    
  }
// added
// done
  function diff() {
   
difference = added.filter(function(val) {
  return done.indexOf(val) == -1;
});
  }