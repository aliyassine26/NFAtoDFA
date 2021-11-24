let array = []
let dfa = []
let language = []
let state_nb
let states = []
let output_format = `svg`;


function delete_table() {
  // $('#table').detach();
  var removeTab = document.getElementById('table');

  var parentEl = removeTab.parentElement;
  parentEl.removeChild(removeTab);

  var btn = document.getElementById("submit");
  btn.disabled = false

  document.getElementById("accordion").disabled = true;

  states = []
  let send = ''

  draw_nfa(send);
  draw_dfa(send);


}

function loader() {

  var form = document.getElementById("form");
  function handleForm(event) { event.preventDefault(); }
  form.addEventListener('submit', handleForm);

  document.getElementById("accordion").disabled = true;
}


function submit_form() {

  var lang = document.getElementById('language').value;
  language = lang.split("-");

  state_nb = document.getElementById('number').value;

  create_table();

  document.getElementById("accordion").disabled = false;

  var btn = document.getElementById("submit");
  btn.disabled = true
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


    // tr.style.border = '1px solid black';

    for (let j = 0; j <= language.length + 1; j++) {


      if (i == 0) {

        if (j == 0) {

          const td = tr.insertCell();
          // td.style.border = '1px solid black';
          td.setAttribute("class", "first");
          td.appendChild(document.createTextNode(`State Name`));

        }
        else if (j == 1) {

          const td = tr.insertCell();
          // td.style.border = '1px solid black';
          td.setAttribute("class", "first");
          td.appendChild(document.createTextNode(`Final State`));

        }

        else {
          const td = tr.insertCell();
          td.setAttribute("class", "lang");

          // td.style.border = '1px solid black';
          td.appendChild(document.createTextNode(`${language[j - 2]}`));

        }

      }

      else {

        if (j == 0) {
          const td = tr.insertCell();
          // td.style.border = '1px solid black';

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
          // td.style.border = '1px solid black';

          td.setAttribute("class", "transition_cell");
          td.setAttribute("id", "check_final");
          const input = document.createElement("input");
          input.setAttribute("type", "checkbox");
          input.setAttribute("class", "checkbox");

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



          // input.setAttribute("class", "transition_select");
          // input.setAttribute("onchange", "findtable()");

          // td.appendChild(input);
        }


      }

    }

  }

}



let transition_string

let send = ``;



function findtable() {
 
  array = []
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




      // console.log(values);

      //   let a = objCells.item(j).querySelector('select').toString();

      let a = getSelectValues(objCells.item(j).querySelector('select'));

      myObject[language[counter]] = a.join(",");
    }

    // console.log(objCells.item(j).querySelector('option:checked')());
    //  myObject[language[counter]] = values;
    //  info.innerHTML = info.innerHTML + ' ' + objCells.item(j).innerHTML;



    array.push(myObject);
  }
  write(array);
  // info.innerHTML = info.innerHTML + '<br />';     // ADD A BREAK (TAG).
}




function write(objects) {
  transition_string = ``
  let temp
  objects.forEach(function (item) {
    transition_string += `${item.name} [shape=circle];`

  })


  //  var name = array[i].name;
  // transition_string += `${name} [shape=circle];`
  for (var i = 0; i < objects.length; i++) {


    var name = objects[i].name;
    if (objects[i].final == true) {
      transition_string += `${name} [shape=doublecircle]`
    }
    else {
      transition_string += `${name} [shape=circle]`
    }

    language.map(x => {
      // transition_string += `${name} [shape=circle];`

      if (objects[i][x]) {


        // if(array[i].value == array[i][x+1] )
        // temp = `${array[i].x}`

        transition_string += ` ${name} -> ${objects[i][x]} [label=${x}];`
        // console.log(transition_string);
      }
      // else{
      //     transition_string += `${name}`
      // }

    })

  }
  send = `digraph { rankdir=LR;
	size="8,5"
    init [label="", shape=point]
    node [shape = doublecircle]; 
    init -> ${objects[0].name} [style="solid"]
	node [shape = circle];  ${transition_string}} `

  if (objects == array) {
    draw_nfa(send);
  }
  else {
    draw_dfa(send);
  }





}

function draw_nfa(input) {
  if (output_format == `svg`) {
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


  if (output_format == `svg`) {
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
  output.innerHTML = ``
  let digit
  let test = 0;
  let trap = false
  let print = `${dfa[0].name}`
 

  console.log(`testing string ${string}`);

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
    console.log(` NOT ACCEPTED`);
    receive.style.backgroundColor = "red";
    receive.innerHTML += 'REJECTED <br>';

  }
  else if (dfa[test].final && searchStringInArray(digit, language) !== -1) {
    console.log(`ACCEPTED`);
    receive.style.backgroundColor = "#008CBA";
    receive.innerHTML += 'ACCEPTED <br>';
  }
  else {
    console.log(` NOT ACCEPTED`);
    receive.style.backgroundColor = "red";
    receive.innerHTML += 'REJECTED <br>';
  }

  receive.innerHTML += `` + print;
}

let done = []
let added = []
let difference = []


function convertDFA() {

  let trap = false
  dfa = []
   done = []
   added = []
   difference = []
  let myObject = {}
  // console.log(array);



  myObject[`name`] = array[0][`name`];
  myObject[`final`] = array[0][`final`];





  language.map(x => {


    if (array[0][x]) {

      //remove space
      array[0][x] = array[0][x].replace(/\s/g, '');

      myObject[x] = array[0][x]
      added.push(array[0][x])

    }
    //if empty
    else {
      trap = true
      myObject[x] = `TRAP`

    }


  })
  added.push(array[0][`name`])
  done.push("Q1")

  //remove duplicated states
  added = uniq_fast(added)

  diff();

  dfa.push(myObject);

  console.log(dfa);

  var count = 0;
  while (difference!=0) {
    count++;
    added = uniq_fast(added);
    done = uniq_fast(done);
    console.log(`added`)
    console.log(added)
    console.log(`done`)
    console.log(done)

    var test = difference[0].split(',');



    /*END ERROR */

    //remove comma from name since it is not compatible with Viz
    var name = difference[0].replace("", "");

    //extract number from state name to reach it in array
    var number = name.replace(/^\D+/g, '');
    diff();
    myObject = {}
    myObject[`name`] = name;



    if (test.length == 1) {


      language.map(x => {

        if (array[number - 1][x]) {
          myObject[x] = array[number - 1][x];
          added.push(array[number - 1][x])
        }

        else {
          trap = true
          myObject[x] = `TRAP`
        }

        myObject[`final`] = array[number - 1][`final`]

        added = uniq_fast(added)
      })

      done.push(name);
      diff();
      dfa.push(myObject);




    }


    ////////////////////////////////////////////////////////////////////////////////
    else if (test.length > 1) {
      
      diff();
      let check_final = false
      let temp_string = ``
      language.map(x => {
        // let string = '';
        var nb
        temp_string = ``;
        let temp_array = []
        test.forEach(element => {


          nb = element.replace(/^\D+/g, '');
          nb--;
          // console.log(nb); 

          if (array[nb][`final`] == true) {
            check_final = true;
          }

          if (array[nb][x]) {

            temp_string += array[nb][x] + `,`


          }

        });
        //remove , from the end
        temp_string = temp_string.replace(/,$/, "").replace(/ /g, '');

        temp_array = temp_string.split(",")

        temp_array = temp_array.sort();
        temp_array = uniq_fast(temp_array)
        // console.log(`temp_array`);
        // console.log(temp_array);
        temp_string = temp_array.join(",");

        myObject[x] = temp_string;
        // console.log(temp_string);
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
  ////////////////////////////////////////////////////////////////////////
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

  // console.log(`added: `+added)
  // console.log(`done: `+done)

  added = uniq_fast(added);
  done = uniq_fast(done);
  fix_dfa();
  write(dfa);
}
