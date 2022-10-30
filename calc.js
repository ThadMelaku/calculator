let displayValue = 0;
let number1 = "";
let number2 = "";
let current_operator;
let sign = null;
let prevClickOperator = false; //true if the previous click was an operator
let justDeletedNum2 = false; //true when the last digit of number2 is deleted
let num1HasDecimal = false; 
let num2HasDecimal = false;
let performedOperation = false;
const screenDisplay = document.getElementById("display")
const smallDisplay = document.getElementById("display2")
const clear = document.getElementById("clear");
const backspace = document.getElementById("back");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");

screenDisplay.textContent = displayValue;
smallDisplay.textContent = displayValue;
clear.addEventListener('click', () => clearAll());
backspace.addEventListener('click', () => deleteNum());

numbers.forEach((number) => {
    number.addEventListener('click', () => {   
        updateNumbers(number.textContent);
    });
});
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        display(operator.value);
    });
});

function updateNumbers(num){
    checkIfNumbersHaveDecimal();
    let condition1 = !(num=="." && num1HasDecimal);//user can add only 1 decimal point
    let condition2 = !(num=="." && num2HasDecimal);
    let decimal = (number1==""||sign=="=")&&num=="."
    let decimal2 = (number2==""||sign=="=")&&num=="."
    //We assign a value to number1
    if((number1==""||sign=="=")&& !(justDeletedNum2)){
        if(decimal) number1 = "0."; //add 0 in front of decimal
        else if(condition1) number1 = num;  
        screenDisplay.textContent = displayValue = number1
        smallDisplay.textContent = displayValue;
        sign=null;
    }
    //We attach the value of the next digit to number1. Example: "5" becomes "58" 
    else if(!(number1=="")&&(number2=="")&&!(prevClickOperator)&&!(justDeletedNum2)||(sign==null)){
        if( (condition1) && (number1.length<14) ){
            screenDisplay.textContent = displayValue = number1 += num;
            smallDisplay.textContent = displayValue;
        }
    }
    //number1 has a set value so now we give number2 a value
    else if((!(number1=="")&&(number2=="")&&prevClickOperator)||(justDeletedNum2)){
        if(decimal2) number2 = "0."; //add 0 in front of decimal
        else if(condition2) number2 = num;
        screenDisplay.textContent = displayValue = number2;
        smallDisplay.textContent = number1+sign+number2;
    }
    //We attach the value of the next digit to number2
    else if(!(number1=="")&&!(number2=="")&& !(prevClickOperator)){
        if((condition2) && (number2.length<14)){
            screenDisplay.textContent = displayValue = number2 += num;
            smallDisplay.textContent = number1+sign+number2;
        }
    }    
    prevClickOperator = false;
    justDeletedNum2 = false;
    checkIfNumbersHaveDecimal();
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
            smallDisplay.textContent = number1+"÷"+number2;
        }
        else{
            if(!(number2==".")){
                number1 = operate(Number(number1),current_operator,Number(number2));
                displayValue = number1 = String(number1);
                if(number1.length>14) displayValue=number1=number1.substring(0,14);
                screenDisplay.textContent = displayValue;
                if(sign=="=") smallDisplay.textContent = displayValue;
                else smallDisplay.textContent = displayValue+sign;
            }
            else{
                screenDisplay.textContent = displayValue = sign;
                smallDisplay.textContent = number1+sign;
            }
        }
        number2 = "";
    }
    else{
        if(!(sign=="=")){
            screenDisplay.textContent = displayValue = sign;
            smallDisplay.textContent = number1+sign;
        }
    }
    current_operator = operator;
    prevClickOperator = true;
    checkIfNumbersHaveDecimal()
}
function deleteNum(){
    //deletes a digit off of number2
    if((number1.length>0)&&(number2.length>0)){
        if(number2.length>1) number2=number2.slice(0,-1);
        else {
            number2 = "";
            justDeletedNum2=true;
        }
        screenDisplay.textContent = displayValue = number2;
        smallDisplay.textContent = number1+sign+number2;
    }
    //deletes the operator
    else if((number1.length>0)&&(number2.length==0)&&!(sign==null)){
        //User just clicked "equals" so there is no operator to delete. We delete from number1 instead.
        if(sign=="="){
            if(number1.length>1) number1=number1.slice(0,-1);
            else number1 = "";
        }
        //We delete the operator
        else justDeletedNum2=false;
        current_operator= sign =null;
        smallDisplay.textContent = number1;
        screenDisplay.textContent = number1;
    }
    //deletes a digit off of number1
    else if((number1.length>0)&&(number2.length==0)){
        if(number1.length>1) number1=number1.slice(0,-1);
        else number1 = "";
        screenDisplay.textContent = displayValue = number1;
        smallDisplay.textContent = number1;
    }
    checkIfNumbersHaveDecimal();
}
function clearAll(){
    sign = current_operator =  null;
    number1 = number2 = "";
    screenDisplay.textContent = displayValue = 0;
    smallDisplay.textContent = 0;
    prevClickOperator = true; 
}
function checkIfNumbersHaveDecimal(){
    number1.includes(".")? num1HasDecimal = true : num1HasDecimal = false;
    number2.includes(".")? num2HasDecimal = true : num2HasDecimal = false;
}
function operate(num1,operator,num2){
    performedOperation = true;
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