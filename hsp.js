const display = document.querySelector(".calculator-input");
let keys = document.querySelector(".tuslar");


let displayValue = "0";

let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}


keys.addEventListener("click", function(e){
    const element = e.target;
    
    if(!element.matches("button")) return;

    if(element.classList.contains("operator")){
        handleOperator(element.value)
        updateDisplay();
        return;
    }

    if(element.classList.contains("clear")){
        clear();
        updateDisplay();
        return;
    }

    if(element.classList.contains("decimal")){
        inputDecimal();
        updateDisplay();
        return;
    }

    if(element.classList.contains("equal-sign")){
        updateDisplay();
        return;
    }
    
    inputNumber(element.value);
    updateDisplay();

});

function inputNumber(num){
    if(waitingForSecondValue){
        displayValue = num;
        waitingForSecondValue = false;
    }

    else{
        displayValue = displayValue ==="0"? num:displayValue+num;
    }
    
}

function inputDecimal(){
    if(!displayValue.includes(".")){
        displayValue += ".";
    }
}

function clear(){
    displayValue="0";
}

function handleOperator(secondOperator){
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue){
        operator = nextOperator;
        return;
    }

    if(firstValue === null){
        firstValue = value; 
    }

    else if(operator){
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }
    waitingForSecondValue = true;

    operator = secondOperator;
}

function calculate(first, second, operator){
    if(operator === "+"){
        return first+second;
    }

    else if(operator === "-"){
        return first-second;
    }

    else if(operator === "*"){
        return first*second;
    }

    else if(operator === "/"){
        return first/second
    }

    else if(operator === "="){
        return updateDisplay();
    }
    return second; 
}