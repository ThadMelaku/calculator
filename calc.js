let currentTotal = 0;
let userInput = 0;
let displayValue = 0;

currentTotal = operate(3,"/",4);
console.log(currentTotal);

function add(a,b){
return a + b;
}

function subtract(a,b){
return a-b
}

function multiply(a,b){
return a*b
}

function divide(a,b){
return a/b
}

function operate(num1,operator,num2){
    if (operator === "+"){
        return add(num1,num2);
    }
    else if(operator === "-"){
        return subtract(num1,num2);
    }
    else if(operator === "*"){
        return multiply(num1,num2);
    }
    else if(operator ==="/"){
        return divide(num1,num2);
    }
}

const display2 = document.getElementById("display")

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


zero.addEventListener('click', () => display("0"));
one.addEventListener('click', () => display("1"));
two.addEventListener('click', () => display("2"));
three.addEventListener('click', () => display("3"));
four.addEventListener('click', () => display("4"));
five.addEventListener('click', () => display("5"));
six.addEventListener('click', () => display("6"));
seven.addEventListener('click', () => display("7"));
eight.addEventListener('click', () => display("8"));
nine.addEventListener('click', () => display("9"));
plus.addEventListener('click', () => display("+"));
minus.addEventListener('click', () => display("-"));
times.addEventListener('click', () => display("×"));
division.addEventListener('click', () => display("÷"));
equals.addEventListener('click', () => display("answer"));
clear.addEventListener('click', () => display(" "));




function display(text){
    if (displayValue == "0"){
        displayValue = text;
    }
    else if(!(text == "+")||!(text == "-")||!(text == "×")||!(text == "÷")||!(text == "answer")||!((text == " "))){
        displayValue += text;
    }


    let curr = display2.textContent;
    if(text == "+"||text == "-"||text == "×"||text == "÷"||text == "answer"||text == " "){
        display2.textContent = text; 
    }
    else if(curr == "+"||curr == "-"||curr == "×"||curr == "÷"||curr == "answer"||curr == " "){
        display2.textContent = text;
    }
    else if(text == "answer"){
        display2.textContent = text;
    }
    else{
        display2.textContent += text;
    }
}
