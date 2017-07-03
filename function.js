function abs(x){
	if (typeof x !== 'number')
		throw 'Not a number';
	if (x >= 0)
		return x;
	else
		return -x;
}


//			Arguments

//	JavaScript还有一个免费赠送的关键字arguments，它只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数
//	arguments类似Array但它不是一个Array：
function foo(x){
	alert(x);
	for (var i=0; i<arguments.length; i++){
		alert(arguments[i]);
	}
}

//	利用arguments，你可以获得调用者传入的所有参数
//	也就是说，即使函数不定义任何参数，还是可以拿到参数的值：

function abs(x){
	if (arguments.length === 0)
		return 0;
	var x = arguments[0];
	return x >= 0 ? x : -x;
}

//	实际上arguments最常用于判断传入参数的个数
//	你可能会看到这样的写法：
function fun(a, b, c){
	if (arguments.length === 2){
		c = b;		// 将 b 的值赋给 c ，目的是将b变为可选参数
		b = null;	// 也就是当 传入的参数只有两个是，只考虑a和c的值
	}
}



//			rest
//	由于JavaScript函数允许接收任意个参数，于是我们就不得不用arguments来获取所有参数：

function funa(a, b){
	var i, rest = [];
	if (arguments > 2){
		for (i=2; i < arguments.length; i++){
			rest.push(arguments[i]);
		}
	}
	console.log('a = ' + a);
	console.log('b = ' + b);
	console.log(rest);
}
// 为了获取除了已定义参数a、b之外的参数，我们不得不用arguments，
//	并且循环要从索引2开始以便排除前两个参数，这种写法很别扭，只是为了获得额外的rest参数，有没有更好的方法？


//	ES6标准引入了rest参数，上面的函数可以改写为：
function funa(a, b, ...rest){
	console.log('a = ' + a);
	console.log('a = ' + b);
	console.log(rest);
}


//	测试代码（测试你的浏览器是否支持SE6）
'use strict';
function sum(...rest) {
   var sum = 0;
   for (var i=0; i<rest.length; i++){. // or (var i in rest)
      sum = sum + rest[i];
}
   return sum;
}

var i, args = [];
for (i=1; i<=100; i++) {
    args.push(i);
}
if (sum() !== 0) {
    alert('测试失败: sum() = ' + sum());
} else if (sum(1) !== 1) {
    alert('测试失败: sum(1) = ' + sum(1));
} else if (sum(2, 3) !== 5) {
    alert('测试失败: sum(2, 3) = ' + sum(2, 3));
} else if (sum.apply(null, args) !== 5050) {
    alert('测试失败: sum(1, 2, 3, ..., 100) = ' + sum.apply(null, args));
} else {
    alert('测试通过!');
}


//	测试代码（定义一个计算圆面积的函数area_of_circle()，它有两个参数）
//		r: 表示圆的半径；
//		pi: 表示π的值，如果不传，则默认3.14
'use strict';
function area_of_circle(r, pi) {
	if (arguments.length < 2){
      	return r * r * 3.14;
	}else{
      	return r * r * pi;
	}
}


// 测试代码（max()函数，返回两个数中较大的那个）
'use strict';
function max(a, b) {
	return a >= b ? a : b;
}