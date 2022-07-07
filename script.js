
let screen = document.querySelector(".calculator-screen");
const buttons = document.querySelectorAll(".button");
let storageOfCalculation = document.querySelector('.firstnumber');
const clearButton = document.querySelector('.clearbutton');
const decimalButton = document.querySelector('[data-value="."]');
screen.textContent = "0";

// handle operates
function getResult(obj){

    if(obj.num1 == 0 && obj.operator == "/" ){
        return false;
    }

    switch(obj.operator){
        case '+': return (obj.num1 + obj.num2);
        case '-': return (obj.num1 - obj.num2);
        case '*' : return (obj.num1 * obj.num2);
        case '/': return parseFloat(obj.num1 / obj.num2).toFixed(2);
    }
}

// prepare then return the calculation result
function calculate(calculationString){
    
    let calculation;
    let calculationArray = calculationString.split(' ');

    // the calculation requires three members (num1, operator, num2)
    if(calculationArray.length != 3) return false;
    // setting the operator then check it

    let operator = calculationArray[1];

    if(operator != "*" && operator != "/" && operator != "+" && operator != "-"){   
        return false;
    }

    let number1 = calculationArray[0];
    let number2 = calculationArray[2];

    // last check
    if(isNaN(number1) || isNaN(number2) || number1 == ""  || number2 == ""){
        return false;
    }

    calculation = {
        num1: parseFloat(number1),
        operator: operator,
        num2: parseFloat(number2),
    }

    if(!getResult(calculation)){
        alert('You cannot divide by 0');
        return false;
    }

    return getResult(calculation);
}


// strore and display the calculation members
function store(screenDisplay, operator){
    let returnOutput = screenDisplay;
    if(operator != undefined){

        if(operator === "=" || operator === "Enter"){

            storageOfCalculation.textContent += ` ${screenDisplay.split(operator)[0]}`;
            // calculate give us a feedback if there is no result we got a false value
            if(calculate(storageOfCalculation.textContent)){
                returnOutput = calculate(storageOfCalculation.textContent);
            }else {
                returnOutput = "0";
                storageOfCalculation.textContent = "";
            }

        }else if(operator == "."){

           if(screenDisplay.includes(operator)){
                decimalButton.disabled = true;
           }

        }else{
            storageOfCalculation.textContent = `${screenDisplay.split(operator)[0]} ${operator}`;
            decimalButton.disabled = false;
            returnOutput = "";
        }
    }
    return returnOutput;
}

// handle the display content
function handleScreen(value){
    if(isNaN(parseInt(value))){
        screen.textContent += value;
        screen.textContent = store(screen.textContent, value);
    }else{
        if(screen.textContent == "0"){
            screen.textContent = value;
        }else{
            screen.textContent += value;
        }
        store(screen.textContent);
    }
}

// add handle calculator screen funtion on buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleScreen(button.dataset.value);
    });
});

// keysupport
window.addEventListener('keydown', e => {
   handleScreen(e.key);
});

// delete all numbers 
clearButton.addEventListener('click', () => {
    screen.textContent = "0";
    storageOfCalculation.textContent = "";
    decimalButton.disabled = false;
});
