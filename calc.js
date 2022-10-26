let displayValue = 0;
let number1 = "";
let number2 = "";
let current_operator;
let sign = null;
let prevClickOperator = false; //true if the previous click was an operator

const screenDisplay = document.getElementById("display")
const smallDisplay = document.getElementById("display2")
const clear = document.getElementById("clear");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");

screenDisplay.textContent = displayValue;
smallDisplay.textContent = displayValue;
clear.addEventListener('click', () => clearAll());

numbers.forEach((number) => {
    number.addEventListener('click', () => {   
        updateNumbers(number.textContent);
    });
});
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        display(operator.id);
    });
});

function updateNumbers(num){
    //We assign a value to number1
    if(number1==""||displayValue==""||sign=="="){
        screenDisplay.textContent = displayValue = number1 = num;
        smallDisplay.textContent = displayValue;
        sign=null;
    }
    //We attach the value of the next digit to number1. Example: "5" becomes "58" 
    else if(!(number1=="")&&(number2=="")&&!(prevClickOperator)){
        screenDisplay.textContent = displayValue = number1 += num;
        smallDisplay.textContent = displayValue;
    }
    //number1 has a set value so now we give number2 a value
    else if(!(number1=="")&&(number2=="")&& prevClickOperator){
        screenDisplay.textContent = displayValue = number2 = num;
        smallDisplay.textContent = number1+sign+number2;
    }
    //We attach the value of the next digit to number2
    else if(!(number1=="")&&!(number2=="")&& !(prevClickOperator)){
        screenDisplay.textContent = displayValue = number2 += num;
        smallDisplay.textContent = number1+sign+number2;
    }    
    prevClickOperator = false;
}

function display(operator){
    sign = operator;
    if(sign =="/") sign = "÷";
    if(sign =="*") sign = "×";
    if(sign =="equals")  sign = "=";
    //We perform an operation using our 2 numbers and current_operator
    if(!(number1=="")&&!(number2=="")){
        //Displays an error message if user tries to divide by 0
        if(current_operator == "/" && (number2 == 0) &&!(prevClickOperator)){
            screenDisplay.textContent = displayValue = "Error";
            smallDisplay.textContent = number1+current_operator+number2;
        }
        else{
            number1 = operate(Number(number1),current_operator,Number(number2));
            displayValue = number1;
            screenDisplay.textContent = displayValue;
            if(sign=="=") smallDisplay.textContent = displayValue;
            else smallDisplay.textContent = displayValue+sign;
        }
        number2 = "";
    }
    else{
        screenDisplay.textContent = displayValue = sign;
        smallDisplay.textContent = number1+sign;
    }
    current_operator = operator;
    prevClickOperator = true;
}
//clears the screen and resets all stored values
function clearAll(){
    sign = current_operator =  null;
    number1 = number2 = "";
    screenDisplay.textContent = displayValue = 0;
    smallDisplay.textContent = 0;
    prevClickOperator = true; 
}
//Evaluates the two numbers using the operator
function operate(num1,operator,num2){
    if (operator === "+") return add(num1,num2);
    else if(operator === "-") return subtract(num1,num2);
    else if(operator === "*") return multiply(num1,num2);
    else if(operator ==="/") return divide(num1,num2);
    else if(operator ==="=") return operate(num1,current_operator,num2);
}
add = (a,b) => a + b;
subtract = (a,b) => a - b;
multiply = (a,b) => a * b;
divide = (a,b) => a / b;