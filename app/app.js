'use strict';
let module = angular.module('app', []);

//Class for RPN test algorithm
class MathSolver {
    constructor(postfix) {
        this.postfix = postfix;

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
                        resultStack.push(42);
                    }
                    else {
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
//String isNumber checker
String.prototype.isNumeric = function() {
    return !isNaN(parseFloat(this)) && isFinite(this);
};
// Init RPN calculator
let calc = new MathSolver();

module.controller("calculateRPN", function ($scope, $http, $window) {


    $scope.result;
    $scope.serverResult;
    $scope.url = 'https://www.eliftech.com/school-task';

    //$scope.response;
    //GET function
    $scope.GET = function () {
        $http.get($scope.url)
            .then(function (response) {
                console.log(response.data);
                $scope.calculate(response.data);
                //$scope.details = response.data;
            });
    };
    //$scope.resultArr;
    // Calculate respond from server
    $scope.calculate = function (response) {
        this.response = response;
        $scope.resultArr = [];
        for( let item of response.expressions) {
            $scope.resultArr.push(calc.solvePostfix(item));
        }
        $scope.result = {
            "id": response.id,
            "results": $scope.resultArr

        };
        console.log($scope.result);
    };

    //POST results to server
    $scope.POST = function () {
        $http.post($scope.url, $scope.result)
            .success(function(result)
            {
                console.log(result);
                $scope.serverResult = result.passed;
            })
            .error(function (result) {
                console.log('Error in RPN post', result);
            });
    };
});
