function cb() {
    console.log("callback function");
    return function () {
    console.log("inner function 1");
    return function(){
        console.log("inner function 2");
        return "Final return"
    }
};
}

function higher(callback){
    console.log("higher order function");
    let innerFunc1 = callback();
    console.log("this is below call 1");
    let innerFunc2 = innerFunc1();
    console.log("this is below call 2");
    return innerFunc2();
}
console.log(higher(cb));