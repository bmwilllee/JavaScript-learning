// First of all, review function decorator and apply methods

var count = 0;
var oldParseInt = window.parseInt; // keep original function

window.parseInt = function(){
	count =+ 1;
	return oldParseInt.apply(null, arguments);	// call the original function
};


//					高阶函数

//	高阶函数英文叫Higher-order function。那么什么是高阶函数？
//	JavaScript的函数其实都指向某个变量
//	既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数

// 例如：
function add(x, y, f){
	return f(x) + f(y);
}
// 当我们调用：
add(-5, 6, Math.abs);
// 执行结果为 11

// ----------------------------------------------------------

//					map()

function power(x){
	return x * x;		// 首先，定义我们需要用 map() 执行的函数体
}

var arry = [1, 2, 3, 4, 5, 6, 7];	// 传入需要被执行的变量
arry.map(power);			//	调用 map()
arry.map(String);			//	转换为字符串



//					reduce()

//	再看reduce的用法。Array的reduce()把一个函数作用在这个Array的[x1, x2, x3...]上
//	这个函数必须接收两个参数，reduce()把结果继续和序列的下一个元素做累积计算，其效果就是：
[x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)

//	比方说对一个Array求和，就可以用reduce实现：
var arr = [1, 2, 3, 4, 5];
arr.reduce(function(x, y){
	return x + y;
});

// 该过程等于 (5 + (4 + (3 + (2 + 1))))

//	练习：利用reduce()求积：
function product(arr) {
return arr.reduce(function(x, y){
      return x * y;
	})
}


//	要把[1, 3, 5, 7, 9]变换成整数13579，reduce()也能派上用场：
function toLargeNum(arr){
	return arr.reduce(function(x, y){
		return x * 10 + y;
	});
}

// 	进阶练习：
// 	1.
//	如果我们继续改进这个例子，想办法把一个字符串13579先变成Array——[1, 3, 5, 7, 9]
//	再利用reduce()就可以写出一个把字符串转换为Number的函数
//	(不要使用JavaScript内置的parseInt()函数，利用map和reduce操作实现一个string2int()函数)
function string2int(s) {
	var arr = s.split('');		// split(''), 可以用来分隔字符串，变成['1', '3', '5', '7', '9']
    arr = arr.map(function(x){  // map() 用来处理字符串中的每一个元素，变成[1, 3, 5, 7, 9]
      return 1 * x;
    });
    return arr.reduce(function(x, y){	// 	递加
        return x * 10 + y;
    });
}


//	2.
//	请把用户输入的不规范的英文名字，变为首字母大写，其他小写的规范名字
//	输入：['adam', 'LISA', 'barT']，输出：['Adam', 'Lisa', 'Bart']
function normalize(arr) {
	return arr.map(function (x) {
        return x[0].toUpperCase() + x.substring(1).toLowerCase();
	});
}


//	小明希望利用map()把字符串变成整数
var arr = ['1', '2', '3'];
var r;
function toINT(element){
    return parseInt(element, 10);	// 10 代表需要转换的进制
}
r = arr.map(toINT);

alert('[' + r[0] + ', ' + r[1] + ', ' + r[2] + ']');
