
let screen = document.querySelector(".calculator-screen");
const buttons = document.querySelectorAll(".button");
let storageOfCalculation = document.querySelector('.firstnumber');
const resultButton = document.querySelector('[data-value = "="]');
const clearButton = document.querySelector('.clearbutton');

screen.textContent = "0";

// handle operates
function getResult(obj){
    switch(obj.operator){
        case '+': return obj.num1 + obj.num2;
        case '-': return obj.num1 - obj.num2;
        case '*' : return obj.num1 * obj.num2;
        case '/': return parseFloat(obj.num1 / obj.num2).toFixed(2);
    }
}

// prepare then return the calculation result
function calculate(calculationString){
    
    let calculation;
    let calculationArray = calculationString.split(' ');

    // the calculation requires three members (num1, operator, num2) if
    if(calculationArray.length != 3) return false;
    // setting the operator then check it

    let operator = calculationArray[1];

    if(operator != "*" && operator != "/" && operator != "+" && operator != "-"){   
        return false;
    }

    let number1 = calculationArray[0];
    let number2 = calculationArray[2];

    // last check
    if(isNaN(number1) || isNaN(number2)){
        return false;
    }

    calculation = {
        num1: parseFloat(number1),
        operator: operator,
        num2: parseFloat(number2),
    }

    return getResult(calculation);
}


// strore calculation members
function store(screenDisplay, operator){
    let returnOutput = screenDisplay;
    if(operator != undefined){

        if(operator === "="){

            storageOfCalculation.textContent += ` ${screenDisplay.split(operator)[0]}`;
            // calculate give us a feedback if there is no result we got a false value
            if(calculate(storageOfCalculation.textContent)){
                returnOutput = calculate(storageOfCalculation.textContent);
            }else{
                returnOutput = "0";
                storageOfCalculation.textContent = "";
            }

        }else{
            storageOfCalculation.textContent = `${screenDisplay.split(operator)[0]} ${operator}`;
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
