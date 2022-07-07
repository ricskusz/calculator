
let screen = document.querySelector(".calculator-screen");
const buttons = document.querySelectorAll(".button");
let storageOfCalculation = document.querySelector('.firstnumber');
const resultButton = document.querySelector('[data-value = "="]');
const clearButton = document.querySelector('.clearbutton');

screen.textContent = "0";

// handle operates
function oparate(obj){
    switch(obj.operator){
        case '+': return obj.num1 + obj.num2;
        case '-': return obj.num1 - obj.num2;
        case '*' : return obj.num1 * obj.num2;
        case '/': return parseFloat(obj.num1 / obj.num2).toFixed(2);
    }
}

// prepare then return the calculation result
function calculate(calculationString){

    let array = calculationString.split(' ');
    console.log(array.length);

    let calculation;
    let returnValue;
    // the calculation requires three members (num1, operator, num2)
    if(array.includes('+') ||
       array.includes('-') || 
       array.includes('/') || 
       array.includes('*') && array.length == 3)
    {
        calculation = {
            num1: parseFloat(array[0]),
            operator : array[1],
            num2: parseFloat(array[2]),
        }
    
        storageOfCalculation.textContent = "";
        returnValue = oparate(calculation);
    }else{
        returnValue = "Error";
    }
    return returnValue;
}


// strore calculation members
function store(screenDisplay, operator){
    let returnOutput;
    returnOutput = screenDisplay;
    if(operator != undefined){

        if(operator === "="){

            storageOfCalculation.textContent += " " + screenDisplay.split(operator)[0];
            if(calculate(storageOfCalculation.textContent) == false){
                alert('enter an operation mark');
                storageOfCalculation.textContent = "";
                returnOutput = "0";
            }else{
                returnOutput = calculate(storageOfCalculation.textContent);
            }
        }else{
            storageOfCalculation.textContent = screenDisplay.split(operator)[0] + " " + operator;
            returnOutput = "";
        }
    }
    return returnOutput;
}

// add the store function on the buttons

buttons.forEach(button => {
    button.addEventListener('click', () => {

        if(isNaN(parseInt(button.dataset.value))){
            screen.textContent += button.dataset.value;
            screen.textContent = store(screen.textContent, button.dataset.value);
        }else{
            if(screen.textContent == "0"){
                screen.textContent = button.dataset.value;
            }else{
                screen.textContent += button.dataset.value;
            }
            store(screen.textContent);
        }
    })
});


clearButton.addEventListener('click', () => {
    screen.textContent = "0";
    storageOfCalculation.textContent = "";
});
