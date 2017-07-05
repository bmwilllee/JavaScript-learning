//					closure

//			函数作为返回值
//	高阶函数除了可以接受函数作为参数外，还可以把函数作为结果值返回
//	我们来实现一个对Array的求和。通常情况下，求和的函数是这样定义的：
function sum(arr){
	return arr.reduce(function(x, y){
		return x + y;
	})
}

//	但是，如果不需要立刻求和，而是在后面的代码中，根据需要再计算怎么办?
//	可以不返回求和的结果，而是返回求和的函数！

function lazy_sum(arr) {
    var sum = function () {
        return arr.reduce(function (x, y) {
            return x + y;
        });
    }
    return sum;
}
//	当我们调用lazy_sum()时，返回的并不是求和结果，而是求和函数：
var f = lazy_sum([1, 2, 3, 4, 5]); // function sum()
//	调用函数f时，才真正计算求和的结果：
f();	// 要返回计算结果，得调用 f()

//	调用函数f时，才真正计算求和的结果：
//	并且，内部函数sum可以引用外部函数lazy_sum的参数和局部变量
//	当lazy_sum返回函数sum时，相关参数和变量都保存在返回的函数中
//	这种称为“闭包（Closure）”的程序结构拥有极大的威力

//	请再注意一点，当我们调用lazy_sum()时，每次调用都会返回一个新的函数，即使传入相同的参数：
var f1 = lazy_sum([1, 2, 3, 4, 5]);
var f2 = lazy_sum([1, 2, 3, 4, 5]);
f1 === f2; // false, 因为每次调用的时候都返回一个新的函数
//	f1()和f2()的调用结果互不影响



//			闭包
//	注意到返回的函数在其定义内部引用了局部变量arr
//	所以，当一个函数返回了一个函数后，其内部的局部变量还被新函数引用
//	所以，闭包用起来简单，实现起来可不容易

//	另一个需要注意的问题是，返回的函数并没有立刻执行
//	而是直到调用了f()才执行。我们来看一个例子：
function count(){
	var arr = [];
	for (var i=1; i<=3; i++){
		arr.push(function(){
			return i * i;
		});
	}
	return arr;
}

var results = count(); // count()  返回一个数组
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];

//	在上面的例子中，每次循环，都创建了一个新的函数，然后，把创建的3个函数都添加到一个Array中返回了

//	你可能认为调用f1()，f2()和f3()结果应该是1，4，9，但实际结果是：
f1(); // 16
f2(); // 16
f3(); // 16


//	全部都是16！原因就在于返回的函数引用了变量i，但它并非立刻执行
//	等到3个函数都返回时，它们所引用的变量i已经变成了4，因此最终结果为16

//	如果一定要引用循环变量怎么办？
//	方法是再创建一个函数，用该函数的参数绑定循环变量当前的值
//	无论该循环变量后续如何更改，已绑定到函数参数的值不变：

function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push((function (n) {
            return function () {
                return n * n;
            }
        })(i));	// 创建一个匿名函数并立刻执行
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];

f1(); // 1
f2(); // 4
f3(); // 9

//	注意这里用了一个“创建一个匿名函数并立刻执行”的语法：
(function (x) {
    return x * x;
})(3); // 9


//	理论上讲，创建一个匿名函数并立刻执行可以这么写:
function (x) { return x * x } (3);

//	但是由于JavaScript语法解析的问题，会报SyntaxError错误，因此需要用括号把整个函数定义括起来：
(function (x) { return x * x }) (3);

//	说了这么多，难道闭包就是为了返回一个函数然后延迟执行吗？
//	当然不是！闭包有非常强大的功能。举个栗子：
//	在面向对象的程序设计语言里，比如Java和C++，要在对象内部封装一个私有变量，可以用private修饰一个成员变量
//	在没有class机制，只有函数的语言里，借助闭包，同样可以封装一个私有变量。我们用JavaScript创建一个计数器：
'use strict';

function counter(initial){
	var x = initial || 0;
	return {
		inc: function(){
			x += 1;
			return x;
		}
	}

}

它用起来像这样：

var c1 = counter();
c1.inc(); // 1
c1.inc(); // 2
c1.inc(); // 3

var c2 = counter(10);
c2.inc(); // 11
c2.inc(); // 12
c2.inc(); // 13

//	在返回的对象中，实现了一个闭包，该闭包携带了局部变量x，并且，从外部代码根本无法访问到变量x
//	换句话说，闭包就是携带状态的函数，并且它的状态可以完全对外隐藏起来

//	闭包还可以把多参数的函数变成单参数的函数
//	例如，要计算xy可以用Math.pow(x, y)函数，不过考虑到经常计算x2或x3，我们可以利用闭包创建新的函数pow2和pow3：
function make_power(n){
	return function(x){
		return Math.pow(x, n);
	}
}

var = pow3 = make_power(3);	// 调用make_power() 返回的内部函数已经包含了由传入参数所构成的新函数
var = pow2 = make_power(2);

pow2(5);
pow3(6);

//			脑洞大开

// 写一个简单的程序，可以定制自己喜欢的运算符和运算类型
function make_compus(operator){
	return function(x){
		if (operator == '*' || 'x' || 'X'){
			return x.reduce(function(i, j){
				return i * j;
			});
		}
		if (operator == '+' || 'add' || 'plus'){
			return x.reduce(function(i, j){
				return i + j;
			});
		}
		if (operator == '-' || 'minus'){
			return x.reduce(function(i, j){
				return i - j;
			});
		}
	}
}
