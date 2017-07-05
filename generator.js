//					generator

//	generator（生成器）是ES6标准引入的新的数据类型
//	一个generator看上去像一个函数，但可以返回多次

//	ES6定义generator标准的哥们借鉴了Python的generator的概念和语法

//	我们先复习函数的概念。一个函数是一段完整的代码，调用一个函数就是传入参数，然后返回结果：
function foo(x){
	return x * x;
}

var a = foo(5);

//	函数在执行过程中，如果没有遇到return语句,控制权无法交回被调用的代码
//	generator跟函数很像，定义如下：
function* foo(x){
	yield x + 1;
	yield x + 2;
	yield x + 3;
	return x + 4;
}

//	generator和函数不同的是，generator由function*定义
//	并且，除了return语句，还可以用yield返回多次

//	我们以一个著名的斐波那契数列为例，它由0，1开头：
0 1 1 2 3 5 8 13 21 34 ...

//	要编写一个产生斐波那契数列的函数，可以这么写：
function fib(max) {
    var
        t,
        a = 0,
        b = 1,
        arr = [0, 1];
    while (arr.length < max) {
        t = a + b;
        a = b;
        b = t;
        arr.push(t);
    }
    return arr;
}

//	函数只能返回一次，所以必须返回一个Array
//	但是，如果换成generator，就可以一次返回一个数，不断返回多次
//	用generator改写如下：
function fib(max){
	var 
		t, 
		a = 0,
		b = 1,
		n = 1;
	while (n < max){
		yield a;
		t = a + b;
		a = b;
		b = t;
		n++;
	}
	return a;
}

//	直接调用试试：
fib(5); // fib {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window}
//	直接调用一个generator和调用函数不一样，fib(5)仅仅是创建了一个generator对象，还没有去执行它。
//	调用generator对象有两个方法，一是不断地调用generator对象的next()方法：
var f = fib(5);
f.next(); // {value: 0, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 2, done: false}
f.next(); // {value: 3, done: true}

//	next()方法会执行generator的代码，然后，每次遇到yield x;就返回一个对象{value: x, done: true/false}，然后“暂停”
//	返回的value就是yield的返回值，done表示这个generator是否已经执行结束了
//	如果done为true，则value就是return的返回值

//	当执行到done为true时，这个generator对象就已经全部执行完毕，不要再继续调用next()了
//	第二个方法是直接用for ... of循环迭代generator对象，这种方式不需要我们自己判断done：
for (var x of fib(5)) {
    console.log(x); // 依次输出0, 1, 1, 2, 3
}

//	generator和普通函数相比，有什么用？

//	因为generator可以在执行过程中多次返回，所以它看上去就像一个可以记住执行状态的函数
//	利用这一点，写一个generator就可以实现需要用面向对象才能实现的功能
//	例如，用一个对象来保存状态，得这么写：

var fib = {
    a: 0,
    b: 1,
    n: 0,
    max: 5,
    next: function () {
        var
            r = this.a,
            t = this.a + this.b;
        this.a = this.b;
        this.b = t;
        if (this.n < this.max) {
            this.n ++;
            return r;
        } else {
            return undefined;
        }
    }
};
//	用对象的属性来保存状态，相当繁琐
//	generator还有另一个巨大的好处，就是把异步回调代码变成“同步”代码
//	这个好处要等到后面学了AJAX以后才能体会到
//	没有generator之前的黑暗时代，用AJAX时需要这么写代码：
ajax('http://url-1', data1, function (err, result) {
    if (err) {
        return handle(err);
    }
    ajax('http://url-2', data2, function (err, result) {
        if (err) {
            return handle(err);
        }
        ajax('http://url-3', data3, function (err, result) {
            if (err) {
                return handle(err);
            }
            return success(result);
        });
    });
});

//	回调越多，代码越难看。

//	有了generator的美好时代，用AJAX时可以这么写：
try {
    r1 = yield ajax('http://url-1', data1);
    r2 = yield ajax('http://url-2', data2);
    r3 = yield ajax('http://url-3', data3);
    success(r3);
}
catch (err) {
    handle(err);
}
//	看上去是同步的代码，实际执行是异步的


//	练习：
//	要生成一个自增的ID，可以编写一个next_id()函数：
'use strict';
function* next_id(){
	var current_id = 1;
	while(true){
   		yield current_id;
		current_id ++;
	}
}