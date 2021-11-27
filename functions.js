
//remove duplicated elements from array
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

  
  //compare 2 arrays
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
  
  //remove all spaces and commas from DFA to be compatible with VIZ
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
    document.getElementById('output').innerHTML = 'Output displayed here'

  }
  
  //search for specific element in array
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

//store difference between array1 and array2 in array3
  function diff() {
difference = added.filter((val)=> done.indexOf(val) == -1);
  }

//remove table on reset
  function delete_table() {
    const removeTab = document.getElementById('table');

    const parentEl = removeTab?.parentElement;
    parentEl?.removeChild(removeTab);
  
    var btn = document.getElementById("submit");
    btn.disabled = false
  
    document.getElementById("accordion").disabled = true;
  
    states = []
    let send = ''
    $(".radio").hide();
    draw_nfa(send);
    draw_dfa(send);
    snackbar(false)
  
  }


  //get output format from radio buttons
function radio_value() {
  output_format = document.querySelector('input[name="switch-one"]:checked').value;
  findtable()
}

function atLeastOneCheckboxIsChecked(){
  const checkboxes = Array.from(document.querySelectorAll(".checkbox"));
  return checkboxes.reduce((acc, curr) => acc || curr.checked, false);
}

function snackbar(bool) {
  var x = document.getElementById("snackbar");
  
  if (bool) {
    x.classList.add("show");
  }
  else{
    x.classList.remove("show");
  }
 

}

//nav bar function
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}