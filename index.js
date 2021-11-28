let nfa = []
let dfa = []
let done = []
let added = []
let difference = []
let language = []
let state_nb
let states = []
let output_format;
let transition_string
let send = ``;


//function to be called on load
function loader() {
  var form = document.getElementById("form");
  function handleForm(event) { event.preventDefault(); }
  form.addEventListener('submit', handleForm);
  document.getElementById("accordion").disabled = true;
  radio_value()
  snackbar(false)
}

//function to be called when user submit language and number of state
function submit_form() {

  var lang = document.getElementById('language').value;
  language = lang.split("-");

  state_nb = document.getElementById('number').value;

  //create table structure according to input
  create_table();

  document.getElementById("accordion").disabled = false;

  var btn = document.getElementById("submit");
  btn.disabled = true
  $(".radio").show();
  
  //fill 'enter string' with random number
  let string = ``
  for (let i = 0; i < states.length+1; i++) {
    var item = language[Math.floor(Math.random() * language.length)];
    string += item
  }

  var enter = document.getElementById("check_string").placeholder = `Ex: `+string;
  
}

//function to create table and append it in HTML page
function create_table() {

  for (var i = 1; i <= state_nb; i++) {
    let temp = `Q${i}`
    states.push(temp);
  }

  var container = document.getElementById('in_table');

  var tbl = document.createElement("table");
  tbl.setAttribute("id", "table");

  container.appendChild(tbl);
  
//rows depends on state number of states
  for (let i = 0; i <= state_nb; i++) {

    const tr = tbl.insertRow();
//columns depends on number of language strings
    for (let j = 0; j <= language.length + 1; j++) {

      if (i == 0) {

        if (j == 0) {
          //element 0,0 
          const td = tr.insertCell();
          td.setAttribute("class", "first");
          td.appendChild(document.createTextNode(`State Name`));

        }
        else if (j == 1) {
        //element 0,1 
          const td = tr.insertCell();
          td.setAttribute("class", "first");
          td.appendChild(document.createTextNode(`Final State`));

        }

        else {
          //elements 0,n (language)
          const td = tr.insertCell();
          td.setAttribute("class", "lang");
          td.appendChild(document.createTextNode(`${language[j - 2]}`));

        }

      }

      else {
        //column 0 contains states name
        if (j == 0) {
          const td = tr.insertCell();
          td.setAttribute("class", "state_cell");

          const input = document.createElement("input");
          input.setAttribute("type", "text");
          input.setAttribute("class", "statename");
          input.setAttribute("disabled", "true");
          input.setAttribute("onclick", "findtable()");
          input.setAttribute("value", `Q${i}`);

          td.appendChild(input);
        }

        else if (j == 1) {
          //column 1 contains checkbox to check final state(s)
          const td = tr.insertCell();

          td.setAttribute("class", "transition_cell");
          td.setAttribute("id", "check_final");
          const input = document.createElement("input");
          input.setAttribute("type", "checkbox");
          input.setAttribute("class", "checkbox");
          if (i==1) {
            input.setAttribute("checked", "checked");
          }
          input.setAttribute("onclick", "findtable()");
          td.appendChild(input);

        }

        else {
          //other columns for user to add transitions using multi-select box
          const td = tr.insertCell();
          td.setAttribute("class", "transition_cell");
          //Create and append select list
          var selectList = document.createElement("select");

          selectList.setAttribute("class", "mySelect");
          selectList.setAttribute("id", `myMulti`);
          selectList.setAttribute("multiple", "true");
          selectList.addEventListener('change', function () {
            findtable();
          });

          //Create and append the options
          for (var p = 0; p < states.length; p++) {

            if (p == 0) {
              var option = document.createElement("option");
              option.value = ``;
              option.text = ``;
              selectList.appendChild(option);
            }

            var option = document.createElement("option");
            option.value = states[p];
            option.text = states[p];
            selectList.appendChild(option);
          }
          td.appendChild(selectList);
        }


      }

    }

  }

}


//get transitions from table
function findtable() {
 
  nfa = []
  states = []
  transition_string = ``
  var info = document.getElementById('demo');
  var table = document.getElementById('table');

  // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
  for (i = 1; i < table?.rows.length; i++) {

    // GET THE CELLS COLLECTION OF THE CURRENT ROW.
    var objCells = table.rows.item(i).cells;

    const myObject = {}

    //item(0) to get name from first column
    const myVar = objCells.item(0).querySelector('input').value;

    //get states from rows except row nb 0
    if (myVar != `State Name`) {
      myObject[`name`] = myVar;
      states.push(myVar);
      var info = document.getElementById('demo');
    }

    // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
    for (var j = 2; j < objCells.length; j++) {
      var counter = j - 2;

      //check if final or not
      if (objCells.item(1).querySelector('.checkbox').checked) {
        myObject[`final`] = true;
      }

      else {
        myObject[`final`] = false;
      }

      let a = getSelectValues(objCells.item(j).querySelector('select'));

      myObject[language[counter]] = a.join(",");
    }

    nfa.push(myObject);
  }

  write(nfa);

}

//function to convert data to VIZ
function write(objects) {

  //check if at least one checkbox is checked to display error
if (!atLeastOneCheckboxIsChecked()) {
  snackbar(true)
  return;
} 
else{
  snackbar(false) 
}

  transition_string = ``
  let temp
  objects.forEach(function (item) {
    transition_string += `${item.name} [shape=circle];`

  })

  for (var i = 0; i < objects.length; i++) {

    var name = objects[i].name;
    if (objects[i].final == true) {
      transition_string += `${name} [shape=doublecircle]`
    }
    else {
      transition_string += `${name} [shape=circle]`
    }

    language.map(x => {
    
      if (objects[i][x]) {
        transition_string += ` ${name} -> ${objects[i][x]} [label=${x}];`
      }
    })
  }
      //add syntax to GraphViz 
    send = `digraph { rankdir=LR;
    size="8,5"
      init [label="", shape=point]
      node [shape = doublecircle]; 
      init -> ${objects[0].name} [style="solid"]
    node [shape = circle];  ${transition_string}} `

  if (objects == nfa) {
    draw_nfa(send);
  }
  else {
    draw_dfa(send);
  }
}

//function to draw NFA
function draw_nfa(input) {
  if (output_format == `SVG`) {
    // SVG
    var image1 = Viz(input, 'svg');
    var main = document.getElementById('graph');
    main.innerHTML = image1;
  }
  else {
    //png
    parent = document.getElementById('graph')
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    let imgelement1 = Viz(input, { format: "png-image-element" });
    
    parent.appendChild(imgelement1);
  }
  convertDFA();
}

//function to draw DFA
function draw_dfa(input) {

  if (output_format == `SVG`) {
    // SVG
    var image2 = Viz(input, 'svg');
    var main = document.getElementById('graph2');
    main.innerHTML = image2;
  }

  else {
    //png
    parent = document.getElementById('graph2')
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    let imgelement2 = Viz(input, { format: "png-image-element" });
    parent.appendChild(imgelement2);
  }
}

//check if string is accepted by designed machine
function check_string() {

  let string = document.getElementById('check_string').value;
  output = document.getElementById('receive')
  output2 = output = document.getElementById('output')
  output.innerHTML = ``
  let digit
  let test = 0;
  let trap = false
  let print = `${dfa[0].name}`
 
  //take first digit until all checked
  while (string) {
   
  digit = string.charAt(0);
//if transition leads to TRAP/DEADSTATE
  if (dfa[test][`${digit}`] == `TRAP`) {
    trap = true
    print += `--${digit}--> TRAP `
    break;
  }
//if transition leads to a DFA STATE
  else if (dfa[test][`${digit}`]) {

    let a = dfa[test][`${digit}`];
    print += `--${digit}--> ${dfa[test][`${digit}`]}  `
    test = dfa.findIndex(x => x.name === a);
    string = string.slice(1);
  }
//if reached state / or /  digit not found
    else {
      print += `--${digit}--> X `
      break;
    }
  }

  receive = document.getElementById('receive')
 //if string reached trap
  if (trap) {
    
    output2.innerHTML = '✘ REJECTED: ';
  
  }
  //if string reached a final state
  else if (dfa[test][`final`] && searchStringInArray(digit, language) !== -1) {
 
    output2.innerHTML = '✔ ACCEPTED: ';
   
  }
  //else
  else {
    output2.innerHTML = '✘ REJECTED: ';
  }

  output2.innerHTML += `` + print;
}

//function to convert NFA to DFA
function convertDFA() {

  let trap = false
   dfa = []
   done = []
   added = []
   difference = []
  let myObject = {}
  
  myObject[`name`] = nfa[0][`name`];
  myObject[`final`] = nfa[0][`final`];

  //map on language
  language.map(x => {

    //if transition is not empty
    if (nfa[0][x]) {

      //remove space
      nfa[0][x] = nfa[0][x].replace(/\s/g, '');
      myObject[x] = nfa[0][x]
      added.push(nfa[0][x])

    }
    //if empty
    else {
      trap = true
      myObject[x] = `TRAP`

    }

  })
  added.push(nfa[0][`name`])
  done.push("Q1")

  //remove duplicated states
  added = uniq_fast(added)

  //function to get difference betweeen added & done
  diff();

  dfa.push(myObject);

  while (difference!=0) {
    
    added = uniq_fast(added);
    done = uniq_fast(done);

    var test = difference[0].split(',');

    //remove comma from name since it is not compatible with Viz
    var name = difference[0].replace("", "");

    //extract number from state name to reach it in array
    var number = name.replace(/^\D+/g, '');
    diff();
    myObject = {}
    myObject[`name`] = name;

//transition contains 1 state
    if (test.length == 1) {
      //loop according to language
      language.map(x => {
        
        //if transition not empty
        if (nfa[number - 1][x]) {
          myObject[x] = nfa[number - 1][x];
          added.push(nfa[number - 1][x])
        }

        else {
          trap = true
          myObject[x] = `TRAP`
        }

        myObject[`final`] = nfa[number - 1][`final`]

        added = uniq_fast(added)
      })

      done.push(name);
      diff();
      dfa.push(myObject);
    }

    //transition contains multiple states
    else if (test.length > 1) {
      
      diff();
      let check_final = false
      let temp_string = ``
        //loop according to language
      language.map(x => {
        var nb
        temp_string = ``;
        let temp_array = []
        test.forEach(element => {
          nb = element.replace(/^\D+/g, '');
          nb--;
          //check if final
          if (nfa[nb][`final`] == true) {
            check_final = true;
          }
          //check if not empty
          if (nfa[nb][x]) {
            temp_string += nfa[nb][x] + `,`
          }
        });
        //remove , from the end 
        temp_string = temp_string.replace(/,$/, "").replace(/ /g, '');
        //create array and sort
        temp_array = temp_string.split(",")
        temp_array = temp_array.sort();
        temp_array = uniq_fast(temp_array)
        //return array back to string
        temp_string = temp_array.join(",");
        myObject[x] = temp_string;
        temp_string = temp_string.replace(/\s/g, '');
        //check if not empty
        if (temp_string != '') {
          added.push(temp_string)
        }

        added = uniq_fast(added)
        diff();
      });
      
      added = uniq_fast(added);
      done = uniq_fast(done);
      myObject['final'] = check_final;
      done.push(name);
      done = uniq_fast(done);
      diff();
      dfa.push(myObject);
    }
    added = uniq_fast(added);
    done = uniq_fast(done);
    diff();
  }

  //add deadstate (TRAP) if needed 
  if (trap) {
    let myObject = {}
    myObject[`name`] = `TRAP`
    myObject[`final`] = false


    language.map(x => {
      myObject[x] = myObject[`name`]
    })
    dfa.push(myObject);
  }
  added = uniq_fast(added);
  done = uniq_fast(done);
  fix_dfa();
  write(dfa);
}




