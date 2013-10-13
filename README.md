seeif
=====
Chainable validation based on `validator`, `lodash`, `moment` and `type-detect` with syntax almost looks like chai.js combine with sync or async report and non 'throw' ing things around so that you don't have to 'try' and 'catch'.

##Installation
    npm install seeif
    
##Example

    seeIf([], {collective:true})
        .ofType(["undefined"])
        .ofType(["null"])
        .ofType(["regexp"])
        .isNull()
        .size([1,10])
        .fi(function(err, errors) {
            if(err) {
                //Do something with `err`, or with multiple errors gathered in `errors`.
            } else {
                //All passed, continue.
            }
        });
        
    var result = unless({})
        .isNull()
        .ofType(["undefined"])
        .fi();
    if(result) {
        throw result;
    } else {
        console.log("Plain object is neither undefined nor Null");
    }
    
##Document
Sorry, document is unavailable at the moment. Will make up to you latter.

###TODO: 

    + isAtMost(inclusiveMax) 
    + isAtLeast(inclusiveMMin) 
    + isBelow(exclusiveMax) 
    + isAbove(exclusiveMin) 
    + isBetween(lowerBound, upperBound): exclusive bounds 
    + isWithin(lowerBound, upperBound): inclusive bounds 
    + not getter 
    + is getter 
    + eliminate all the 'is' in function names 
    + fix meaningless function names 
    + improve rationale in naming functions. (like is.Function, not.beFunction) 