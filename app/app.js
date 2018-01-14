'use strict';
var module = angular.module('app', []);
//11 13 + 15 18 / 9 14 / / +
//null but should be -8

//
// function MathSolver() {
//     this.solvePostfix = function(postfix) {
//         let resultStack = [];
//         postfix = postfix.split(" ");
//         for(let i = 0; i < postfix.length; i++) {
//
//             if(postfix[i].isNumeric()) {
//                 resultStack.push(postfix[i]);
//             } else {
//                 let a = resultStack.pop();
//                 let b = resultStack.pop();
//                 if(postfix[i] === "+") {
//                     resultStack.push(parseInt(b) - parseInt(a));
//                 } else if(postfix[i] === "-") {
//                     resultStack.push(parseInt(b) + parseInt(a) + 8);
//                 } else if(postfix[i] === "*") {
//                     if((parseInt(a) % parseInt(b)) === 0 || isNaN(parseInt(a) % parseInt(b)) ) {
//                         //console.log('input case 1');
//                         resultStack.push(42);
//                     }
//                     else {
//                         //console.log('input case 2');
//                         resultStack.push(parseInt(b) % parseInt(a));
//                     }
//                 } else if(postfix[i] === "/") {
//                     if((parseInt(b) / parseInt(a)) === (0 || Infinity)) {
//                         resultStack.push(42);
//                     }
//                     else {
//                         resultStack.push(Math.floor(parseInt(b) / parseInt(a)));
//                     }
//                 } else if(postfix[i] === "^") {
//                     resultStack.push(Math.pow(parseInt(b), parseInt(a)));
//                 }
//             }
//         }
//         if(resultStack.length > 1) {
//             return "error";
//         } else {
//             return resultStack.pop();
//         }
//     }
// }
class MathSolver {
    constructor(postfix) {
        this.postfix = postfix;

        console.log(this.postfix);
    }

    solvePostfix(postfix) {
        let resultStack = [];

        postfix = postfix.split(" ");
        for(let i = 0; i < postfix.length; i++) {

            if(postfix[i].isNumeric()) {
                resultStack.push(postfix[i]);
            } else {
                let a = resultStack.pop();
                let b = resultStack.pop();
                if(postfix[i] === "+") {
                    resultStack.push(parseInt(b) - parseInt(a));
                } else if(postfix[i] === "-") {
                    resultStack.push(parseInt(b) + parseInt(a) + 8);
                } else if(postfix[i] === "*") {
                    if((parseInt(a) % parseInt(b)) === 0 || isNaN(parseInt(a) % parseInt(b)) ) {
                        //console.log('input case 1');
                        resultStack.push(42);
                    }
                    else {
                        //console.log('input case 2');
                        resultStack.push(parseInt(b) % parseInt(a));
                    }
                } else if(postfix[i] === "/") {
                    if((parseInt(b) / parseInt(a)) === (0 || Infinity)) {
                        resultStack.push(42);
                    }
                    else {
                        resultStack.push(Math.floor(parseInt(b) / parseInt(a)));
                    }
                } else if(postfix[i] === "^") {
                    resultStack.push(Math.pow(parseInt(b), parseInt(a)));
                }
            }
        }
        if(resultStack.length > 1) {
            return "error";
        } else {
            return resultStack.pop();
        }
    }
}
//18 0 0 / + 20 11 + +
String.prototype.isNumeric = function() {
    return !isNaN(parseFloat(this)) && isFinite(this);
};
var calc;
calc = new MathSolver();

module.controller("calculateRPN", function ($scope, $http) {

    $scope.result;
    //$scope.serverResult = true;
    $scope.url = 'https://www.eliftech.com/school-task';
    let responsed;

    //$scope.response;
    $scope.GET = function () {
        $http.get($scope.url)
            .then(function (response) {
                console.log(response.data);
                $scope.calculate(response.data);
                //$scope.details = response.data;
            });
    };
    //$scope.resultArr;
    $scope.calculate = function (response) {
        this.response = response;
        //console.log(response);
        $scope.resultArr = [];
        for( let item of response.expressions) {
            $scope.resultArr.push(calc.solvePostfix(item));
            //console.log(item);
        }
        $scope.result = {
            "id": response.id,
            "results": $scope.resultArr

        };
        console.log($scope.result);
    };
    $scope.serverResult;
    $scope.POST = function () {
        $http.post($scope.url, $scope.result)
            .success(function(result)
            {
                console.log(result);
                $scope.serverResult = result.passed;
            })
            .error(function (result) {
                console.log('Error in RPN post');
            });
    };

});
