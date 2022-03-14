
const multiplication=require("./multiplication");
const division=require("./division");
const addition=require("./Addition");
const substract=require("./substract");
function calculator(a,b)
{
    console.log(addition(a,b));
    console.log(substract(a,b));
    console.log(multiplication(a,b));
    console.log(division(a,b));
}
calculator(10,5);