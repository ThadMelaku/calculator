let displayValue = 0;
let number1 = 0;
let number2 = 0;
let current_operator;
let sign = null;
let prevClickOperator= false; //keeps track of whether the previous click was an operator

const screenDisplay = document.getElementById("display")
screenDisplay.textContent = displayValue;

const zero = document.getElementById("zero");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const plus = document.getElementById("add");
const minus = document.getElementById("subtract");
const times = document.getElementById("multiply");
const division = document.getElementById("divide");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");

zero.addEventListener('click', () => updateNumbers("0"));
one.addEventListener('click', () => updateNumbers("1"));
two.addEventListener('click', () => updateNumbers("2"));
three.addEventListener('click', () => updateNumbers("3"));
four.addEventListener('click', () => updateNumbers("4"));
five.addEventListener('click', () => updateNumbers("5"));
six.addEventListener('click', () => updateNumbers("6"));
seven.addEventListener('click', () => updateNumbers("7"));
eight.addEventListener('click', () => updateNumbers("8"));
nine.addEventListener('click', () => updateNumbers("9"));
plus.addEventListener('click', () => display("+"));
minus.addEventListener('click', () => display("-"));
times.addEventListener('click', () => display("*"));
division.addEventListener('click', () => display("/"));
equals.addEventListener('click', () => display("="));
clear.addEventListener('click', () => clearAll());

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
    //We perform an operation on number1 and number2
    else if(!(number1==0)&&!(number2==0)&& prevClickOperator){
        number1 = operate(Number(number1),sign,Number(number2));
        displayValue = number1;
        screenDisplay.textContent = displayValue;
        number2 = 0;
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