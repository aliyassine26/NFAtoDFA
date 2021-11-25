let nfa = []
let dfa = []
let done = []
let added = []
let difference = []
let language = []
let state_nb
let states = []
let output_format;

function loader() {

  var form = document.getElementById("form");
  function handleForm(event) { event.preventDefault(); }
  form.addEventListener('submit', handleForm);
  document.getElementById("accordion").disabled = true;
  radio_value()

}


function submit_form() {

  var lang = document.getElementById('language').value;
  language = lang.split("-");

  state_nb = document.getElementById('number').value;

  create_table();

  document.getElementById("accordion").disabled = false;

  var btn = document.getElementById("submit");
  btn.disabled = true
  $(".radio").show();
}

function create_table() {


  for (var i = 1; i <= state_nb; i++) {
    let temp = `Q${i}`
    states.push(temp);
  }

  var container = document.getElementById('in_table');

  var tbl = document.createElement("table");
  tbl.setAttribute("id", "table");

  container.appendChild(tbl);
  for (let i = 0; i <= state_nb; i++) {

    const tr = tbl.insertRow();

    for (let j = 0; j <= language.length + 1; j++) {


      if (i == 0) {

        if (j == 0) {

          const td = tr.insertCell();
          td.setAttribute("class", "first");
          td.appendChild(document.createTextNode(`State Name`));

        }
        else if (j == 1) {

          const td = tr.insertCell();
          td.setAttribute("class", "first");
          td.appendChild(document.createTextNode(`Final State`));

        }

        else {
          const td = tr.insertCell();
          td.setAttribute("class", "lang");
          td.appendChild(document.createTextNode(`${language[j - 2]}`));

        }

      }

      else {

        if (j == 0) {
          const td = tr.insertCell();
          td.setAttribute("class", "state_cell");

          const input = document.createElement("input");
          input.setAttribute("type", "text");
          input.setAttribute("class", "statename");

          input.setAttribute("onclick", "findtable()");
          input.setAttribute("value", `Q${i}`);

          td.appendChild(input);
        }
        else if (j == 1) {

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
          const td = tr.insertCell();
          td.setAttribute("class", "transition_cell");

          //Create and append select list
          var selectList = document.createElement("select");

          selectList.setAttribute("class", "mySelect");
          // selectList.setAttribute("id", `check${i}${j}`);
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



let transition_string

let send = ``;

function findtable() {
 
  nfa = []
  states = []
  transition_string = ``
  var info = document.getElementById('demo');
  var table = document.getElementById('table');

  // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
  for (i = 1; i < table.rows.length; i++) {

    // GET THE CELLS COLLECTION OF THE CURRENT ROW.
    var objCells = table.rows.item(i).cells;

    const myObject = {}

    //item(0) to get name from first column
    const myVar = objCells.item(0).querySelector('input').value;

    if (myVar != `State Name`) {
      myObject[`name`] = myVar;
      states.push(myVar);
      var info = document.getElementById('demo');
      // info.innerHTML += ` ` + myVar;
    }

    // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
    for (var j = 2; j < objCells.length; j++) {
      var counter = j - 2;

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

function write(objects) {


if (!atLeastOneCheckboxIsChecked()) {
  alert("Final state required")
  return;
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
 
  while (string) {

    digit = string.charAt(0);

    if (dfa[test][`${digit}`] == `TRAP`) {
      trap = true
      print += `--${digit}--> TRAP `
      break;
    }

    else if (dfa[test][`${digit}`]) {

      let a = dfa[test][`${digit}`];
      print += `--${digit}--> ${dfa[test][`${digit}`]}  `
      test = a.charAt(a.length - 1) - 1;
      string = string.slice(1);

    }

    else {
      print += `--${digit}--> X `
      break;
    }
  }
  receive = document.getElementById('receive')
 
  if (trap) {
    
    output2.innerHTML = '✘ REJECTED: ';
  
  }

  else if (dfa[test].final && searchStringInArray(digit, language) !== -1) {
 
    output2.innerHTML = '✔ ACCEPTED: ';
   
  }
  else {
   
    output2.innerHTML = '✘ REJECTED: ';
   
  }
  output2.innerHTML += `` + print;
}

function convertDFA() {

  let trap = false
  dfa = []
   done = []
   added = []
   difference = []
  let myObject = {}
  
  myObject[`name`] = nfa[0][`name`];
  myObject[`final`] = nfa[0][`final`];

  language.map(x => {

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

  diff();

  dfa.push(myObject);

 

  var count = 0;
  while (difference!=0) {
    count++;
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
      language.map(x => {

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
      language.map(x => {
        var nb
        temp_string = ``;
        let temp_array = []
        test.forEach(element => {
          nb = element.replace(/^\D+/g, '');
          nb--;

          if (nfa[nb][`final`] == true) {
            check_final = true;
          }

          if (nfa[nb][x]) {
            temp_string += nfa[nb][x] + `,`
          }
        });

        //remove , from the end
        temp_string = temp_string.replace(/,$/, "").replace(/ /g, '');

        temp_array = temp_string.split(",")

        temp_array = temp_array.sort();
        temp_array = uniq_fast(temp_array)
    
        temp_string = temp_array.join(",");

        myObject[x] = temp_string;
       
        temp_string = temp_string.replace(/\s/g, '');

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

