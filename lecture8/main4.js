let num = prompt("ENter a number : ")
console.log(num)

if(num > 0){
    console.log("Greater than 0")
}
else if (num < 0) {
    console.log("less than 0")
} 
else if(num == 0) {
    console.log("Zero")
}
else{
    console.log("Enter a number!")
}

(num==0?console.log("its zero"):num>0?console.log("greater than zero"):num<0?console.log("less than zero"):console.log("its a word"))
