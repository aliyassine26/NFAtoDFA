let array = [


]
let language = [0,1,2]

function test(){

    const myObject = {}
    const myVar = `ali`
    
    myObject[`name`] = 'test'
    myObject[`myVar`] = 'test'

    // array.push(myObject);

    // console.log(array);
    findtable();
 
}

function test1(){
   

}


 function findtable(){
      var info =  document.getElementById('demo');
      var table =  document.getElementById('table');
    
           // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
           for (i = 1; i < table.rows.length; i++) {
            
            // GET THE CELLS COLLECTION OF THE CURRENT ROW.
            var objCells = table.rows.item(i).cells;
    
            const myObject = {}

          

            //item(0) to get name from first column
            const myVar = objCells.item(0).innerHTML;

            if(myVar != `State Name`){
                myObject[`name`] = myVar;

                var info =  document.getElementById('demo');
                // info.innerHTML += ` ` + myVar;
            }
           
            // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
            for (var j = 1; j < objCells.length ; j++) {
            var counter = j - 1;
                myObject[language[counter]] = objCells.item(j).innerHTML;
                //  info.innerHTML = info.innerHTML + ' ' + objCells.item(j).innerHTML;
            }
            
              array.push(myObject);

             
              
            // info.innerHTML = info.innerHTML + '<br />';     // ADD A BREAK (TAG).
        }
    write();
   
 }

 function write(){
 console.log(array);

    // var a = aa + `-> `+ qq +` [label=T,r];    `+aa+` [shape=doublecircle];  `
    // var c = `digraph a{   ` + a + `} `
var transition_string = ``

 for(var i=0; i<array.length; i++){

   
    var name = array[i].name;
    // var L = array[i].0;
    language.map(x=>{
        if(array[i][x].length > 0){

            transition_string += ` ${name} -> ${array[i][x]} [label=${x}];`
        }
      
    })

    
    // var L = array[i]+`.L`+i;

    //   a += name + `-> `+ L +` [label=`+language[i]+`];` +  name+ ` [shape=circle];     `
    
    //  var b = `digraph a{   ` + a + b + `} `
 
    // console.log(name);
 }
 var send = `digraph a{ rankdir=LR;
	size="8,5"
    init [label="", shape=point]
    node [shape = doublecircle]; Q1 Q2;
    init -> Q1 [style="solid"]
	node [shape = circle];  ` +transition_string+ ` Q1 -> ALI [label = "a,b"];} `
 console.log(transition_string);
   draw(send);




 }
 
 function draw(input) {
    var image1  = Viz(input, 'svg');
    var main = document.getElementById('graph');
    main.innerHTML = image1;		// SVG
  
  }