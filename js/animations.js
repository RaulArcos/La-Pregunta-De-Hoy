var nameArray = ["cow", "horse", "slug", "pinata", "crow"]; //One of those will be randomly chosen

var lastIndex = 0; //Used to remember the last word picked

var domHeaderName = document.getElementsByClassName("nameContainer")[0]; //Put the ID of the DOM element you want to change here

var bWhichContainer = 0;

//This function will get a random INT used later as the array index
function getRandomInt(iMin, iMax) {
    var newIndex = Math.floor(Math.random() * (iMax - iMin)) + iMin;
    while( lastIndex == newIndex ){
        var newIndex = Math.floor(Math.random() * (iMax - iMin)) + iMin;
    }
  lastIndex = newIndex;  

  return newIndex;
}

function switchContainer( domContainer, index ) {
    
    
    document.getElementsByClassName("nameContainer")[bWhichContainer].classList.add("hidden");
    
    if( bWhichContainer == 0){
        bWhichContainer = 1;
    }
    else {
        bWhichContainer = 0;
    }
  //Change the class name here to fit yours
    document.getElementsByClassName("nameContainer")[bWhichContainer].classList.remove("hidden");
    document.getElementsByClassName("nameContainer")[bWhichContainer].innerHTML = nameArray[index];
}

function pickRandomName() {
    var randomIndex = getRandomInt(0, nameArray.length);

    //Put the randomly chosen name in the DOM
    switchContainer(domHeaderName, randomIndex);
    //loop
    setTimeout(pickRandomName, 2000); //Loop every 2000ms (2s)
}

pickRandomName();