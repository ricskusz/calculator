
let screen = document.querySelector(".calculator-screen");
const buttons = document.querySelectorAll(".button");
let storageOfCalculation = document.querySelector('.firstnumber');
const resultButton = document.querySelector('[data-value = "="]');

// handle operates
function oparate(obj){
    switch(obj.operator){
        case '+': return obj.num1 + obj.num2;
        case '-': return obj.num1 - obj.num2;
        case '*' : return obj.num1 * obj.num2;
        case '/': return obj.num1 / obj.num2;
    }
}

// prepare then return the calculation result
function calculate(calcultaion){
    // 
    let calculationMembers = calcultaion.split(' ').filter(element => element && element != "\n");
    let calculation = {
        num1: parseInt(calculationMembers[0]),
        operator : calculationMembers[1],
        num2: parseInt(calculationMembers[2]),
    }

    return oparate(calculation);
}


// strore calculation members
function store(screenDisplay, operator){
    let returnOutput;
    returnOutput = screenDisplay;
    if(operator != undefined){

        if(operator === "="){
            storageOfCalculation.textContent += " " + screenDisplay.split(operator)[0];
            returnOutput = calculate(storageOfCalculation.textContent);
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
            screen.textContent += button.dataset.value;
            store(screen.textContent);
        }
    })
});
