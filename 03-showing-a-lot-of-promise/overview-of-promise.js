// Instant function
var synchronousFunction = function() {
    console.log("synchronousFunction finished.");
    return "Result from synchronousFunction.";
}

console.log(synchronousFunction());
console.log("finished!");

// Long-running function returning a Promise object.
var asynchronousFunction = function() {
    return new Promise(function(resolve, reject){
        setTimeout(
            function() {
                console.log("asynchronousFunction finished.");
                resolve("Result from asynchronousFunction.");
            },
            3000);
    });
}

asynchronousFunction()
    .then(function(result) {
        console.log(result);
        console.log("finished!");
    });

// Code that does other stuff
console.log("Doing other stuff...");