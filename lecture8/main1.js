function cb(x) {
    console.log("callback function", x);
    return function (y) {
    console.log("inner function", y);
    return x + y;
};
}

function higher(callback){
    console.log("higher order function");
    let innerFunc = callback(5);
    console.log("this is below call");
    return innerFunc(10);
}
console.log(higher(cb));