// 现在我们来看JavaScript的几种循环方式：

// JavaScript 支持的循环方式有以下几种：
	// for
	// for in
	// while
	// do while

// 练习：
// 利用循环遍历数组中的每个名字，并显示Hello, xxx!：
// 尝试for循环和while循环，并以正序、倒序两种方式遍历

'use strict';
var arr = ['Bart', 'Lisa', 'Adam'];

for (var name in arr){
alert(`Hello, ${arr[name]}`);
};

var i = 0;
while(i < 3){
alert(`Hello, ${arr[i]}`);
i ++;
};

for (var i = 0; i < 3; i++){
alert(`Hello, ${arr[i]}`);
}

for (var i=arr.length-1; i>=0; i--){
alert(`Hello, ${arr[i]}`);
}

var i = arr.length-1;
while(i >= 0){
alert(`Hello, ${arr[i]}`);
i--;
}