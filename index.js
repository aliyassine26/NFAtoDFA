let array = []
let language = []
let state_nb 
let states = []



function delete_table() {
    // $('#table').detach();
    var removeTab = document.getElementById('table');

var parentEl = removeTab.parentElement;
parentEl.removeChild(removeTab);

var btn = document.getElementById("submit");
btn.disabled = false

states = []
}

function loader(){

var form = document.getElementById("form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
}


function submit_form(){

    var lang =  document.getElementById('language').value;
    language = lang.split("-");

    state_nb =  document.getElementById('number').value;
  
    create_table();
  

    var btn = document.getElementById("submit");
    btn.disabled = true
}

function create_table(){

    
for(var i=1; i<=state_nb; i++){
    let temp = `Q${i}`
    states.push(temp);
}

var container = document.getElementById('in_table');

var tbl = document.createElement("table");
tbl.setAttribute("id", "table");
             
container.appendChild(tbl);
        for (let i = 0; i <= state_nb ; i++) {

            const tr = tbl.insertRow();
            
        
            // tr.style.border = '1px solid black';
           
          for (let j = 0; j <= language.length + 1 ; j++) {
           

            if(i==0){

                if(j==0){

                    const td = tr.insertCell();
                    // td.style.border = '1px solid black';
                    td.setAttribute("class", "first");
                    td.appendChild(document.createTextNode(`State Name`));
                    
                }
                else if(j==1){

                    const td = tr.insertCell();
                    // td.style.border = '1px solid black';
                    td.setAttribute("class", "first");
                    td.appendChild(document.createTextNode(`Final State`));
                    
                }

                else{
                    const td = tr.insertCell();
                    td.setAttribute("class", "lang");
                    
                    // td.style.border = '1px solid black';
                    td.appendChild(document.createTextNode(`${language[j-2]}`));
                   
                }   

            }

else{

    if(j==0){
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
    else if(j==1){

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
                    selectList.setAttribute("id", `check${i}${j}`);
                    selectList.setAttribute("multiple", "true");
                    selectList.addEventListener('change', function() {
                        findtable();
                      });

                    //Create and append the options
                    for (var p = 0; p < states.length; p++) {

                    if(p ==0){
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



 function findtable(){
    array=[]
    states = []
    transition_string=``
      var info =  document.getElementById('demo');
      var table =  document.getElementById('table');
    


           // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
           for (i = 1; i < table.rows.length; i++) {
            



            // GET THE CELLS COLLECTION OF THE CURRENT ROW.
            var objCells = table.rows.item(i).cells;
    
            const myObject = {}

          

            //item(0) to get name from first column
            const myVar = objCells.item(0).querySelector('input').value;

            if(myVar != `State Name`){
                myObject[`name`] = myVar;
                states.push(myVar);
                var info =  document.getElementById('demo');
                // info.innerHTML += ` ` + myVar;
            }
           
            // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
            for (var j = 2; j < objCells.length ; j++) {
            var counter = j - 2;
           
      
           
      
            if(objCells.item(1).querySelector('.checkbox').checked){
                myObject[`final`] = true;
            }
         
            else{
                myObject[`final`] = false;
            }
        

            
            
        // console.log(values);

            //   let a = objCells.item(j).querySelector('select').toString();
             
              let a =  getSelectValues(objCells.item(j).querySelector('select'));
                    
              myObject[language[counter]] = a.join(", ");
                  }
                 
                // console.log(objCells.item(j).querySelector('option:checked')());
                //  myObject[language[counter]] = values;
                //  info.innerHTML = info.innerHTML + ' ' + objCells.item(j).innerHTML;
            
        
            
              array.push(myObject);
console.log(array);
                }   
write();
            // info.innerHTML = info.innerHTML + '<br />';     // ADD A BREAK (TAG).
        }

   
 

 function write(){

let temp
 array.forEach(function(item){
    transition_string += `${item.name} [shape=circle];`
   
  })


//  var name = array[i].name;
// transition_string += `${name} [shape=circle];`
 for(var i=0; i<array.length; i++){

   
    var name = array[i].name;
   if(array[i].final == true){
    transition_string += `${name} [shape=doublecircle]`
   }
   else{
    transition_string += `${name} [shape=circle]`
   }

    language.map(x=>{
        // transition_string += `${name} [shape=circle];`

        if(array[i][x]){


            // if(array[i].value == array[i][x+1] )
            // temp = `${array[i].x}`

            transition_string += ` ${name} -> ${array[i][x]} [label=${x}];`
            console.log(transition_string);
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
    init -> ${array[0].name} [style="solid"]
	node [shape = circle];  ${transition_string}} `
 
   draw(send);




 }
 
 function draw(input) {
    var image1  = Viz(input, 'svg');
    var main = document.getElementById('graph');
    main.innerHTML = image1;		// SVG
    
   
   
  }


  
  
  function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;
  
    for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }


  function check_string(){

    let string = document.getElementById('check_string').value;
    output=document.getElementById('receive')
    output.innerHTML = ``
    let digit 
    let test = 0; 
    let print = `${array[0].name}`   


console.log(`testing string ${string}`);

// for (let i = 0; i < string.length; i++) {  

while(string){


     digit = string.charAt(0);
   

    if(array[test][`${digit}`] ){

    let a = array[test][`${digit}`];
    print += `--${digit}--> ${array[test][`${digit}`]}  `
    test = a.charAt(a.length-1) -1 ;

    string =  string.slice(1);


  }

  else {
    print += `--${digit}--> X `
    break;
  }
}

  if(array[test].final && searchStringInArray(digit,language) !== -1){
    console.log(`ACCEPTED`);
    document.getElementById('receive').innerHTML += 'ACCEPTED <br>';
}
else {
    console.log(` NOT ACCEPTED`);
    document.getElementById('receive').innerHTML += 'REJECTED <br>';
}

document.getElementById('receive').innerHTML += `` + print;
  
}


  function searchStringInArray (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
}