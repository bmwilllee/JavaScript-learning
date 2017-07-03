//					scope

//	1. 在js中，在有for循环等语句块中是无法定义具有局部作用域的变量的：
function foo() {
    for (var i=0; i<100; i++) {
        //
    }
    i += 100; // 仍然可以引用变量i
}

//			let 关键字
// 为了解决块级作用域，ES6引入了新的关键字let，用let替代var可以申明一个块级作用域的变量：
function foo(){
	var sum = 0;
	for (let i=0; i<100; i++){
		sum += i;
	}
	i += 1;	//	SyntaxError
}


//			window
//	JavaScript默认有一个全局对象window
//	全局作用域的变量实际上被绑定到window的一个属性：
var course = 'Learn JavaScript';
alert(course); // 'Learn JavaScript'
alert(window.course); // 'Learn JavaScript'
//	因此，直接访问全局变量course和访问window.course是完全一样的

// 同样，也可以把全局定义的函数当成是 window 对象的一个变量
function foo() {
    alert('foo');
}

foo(); // 直接调用foo()
window.foo(); // 通过window.foo()调用

//	全局变量会绑定到window上，不同的JavaScript文件如果使用了相同的全局变量
//	或者定义了相同名字的顶层函数，都会造成命名冲突，并且很难被发现
//	减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中。例如：
// 唯一的全局变量MYAPP:
var MYAPP = {};
// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {
    return 'foo';
};

//	把自己的代码全部放入唯一的名字空间MYAPP中，会大大减少全局变量冲突的可能
//	许多著名的JavaScript库都是这么干的：jQuery，YUI，underscore等等


//			声明常量（不可更改）
//	由于var和let申明的是变量，如果要申明一个常量，在ES6之前是不行的
//	我们通常用全部大写的变量来表示“这是一个常量，不要修改它的值”：
var PI = 3.14

//	ES6标准引入了新的关键字const来定义常量，const与let都具有块级作用域：
const PI = 3.14
PI = 3; // 某些浏览器不报错，但是无效果！
PI; // 3.14