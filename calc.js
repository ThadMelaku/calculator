let displayValue = 0;
let number1 = 0;
let number2 = 0;
let current_operator;
let sign = null;
let prevClickOperator = false; //keeps track of whether the previous click was an operator

const screenDisplay = document.getElementById("display")
screenDisplay.textContent = displayValue;

const clear = document.getElementById("clear");
clear.addEventListener('click', () => clearAll());

const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");

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
    if(number1==0||displayValue==" "||sign=="="){
        number1 = num;
        displayValue = num;
        screenDisplay.textContent = displayValue;
    }
    //We attach the value of the next digit to number1 
    //Example: "5" becomes "58"
    else if(!(number1==0)&&(number2==0)&&!(prevClickOperator)){
        number1 += num;
        displayValue += num;
        screenDisplay.textContent = displayValue;
    }
    //number1 has a set value so now we give number2 a value
    else if(!(number1==0)&&(number2==0)&& prevClickOperator){
        number2 = num;
        displayValue = num;
        screenDisplay.textContent = displayValue; 
    }//We attach the value of the next digit to number2
    else if(!(number1==0)&&!(number2==0)&& !(prevClickOperator)){
        number2 += num;
        displayValue += num;
        screenDisplay.textContent = displayValue;
    }
    prevClickOperator = false;
}

function display(operator){
    sign = operator;
    //We perform an operation using our 2 numbers and current_operator
    if(!(number1==0)&&!(number2==0)){
        number1 = operate(Number(number1),current_operator,Number(number2));
        displayValue = number1;
        screenDisplay.textContent = displayValue;
        number2 = 0;
    }
     //Displays an error message if user tries to divide by 0
    else if(current_operator == "/" && number2 == 0){
        displayValue = "Error";
        screenDisplay.textContent = displayValue;
    }
    else{
        if(sign =="/") sign = "÷";
        if(sign =="*") sign = "×";
        displayValue = sign;
        screenDisplay.textContent = displayValue;
    }
    current_operator = operator;
    prevClickOperator = true;
}
//clears the screen and resets all stored values
function clearAll(){
    sign = current_operator =  null;
    number1 = number2 = 0;
    displayValue = 0;
    screenDisplay.textContent = displayValue;
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