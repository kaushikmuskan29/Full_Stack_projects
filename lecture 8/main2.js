function cb(x) {
    console.log("callback function", x);
    if(x>10){
        return "Greater than 10"
    }
    else{
        return "Less than or equal to 10"
    }
}

function higher(callback, value){
    console.log("higher order function");
    let ans = callback(value);
    console.log("this is below call");
    return ans;
}
console.log(higher(cb,12));
console.log(higher(cb,8));