//					filter

//	filter也是一个常用的操作，它用于把Array的某些元素过滤掉，然后返回剩下的元素
//	和map()类似，Array的filter()也接收一个函数
//	和map()类似，Array的filter()也接收一个函数
//	然后根据返回值是true还是false决定保留还是丢弃该元素
//	例如，在一个Array中，删掉偶数，只保留奇数，可以这么写
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function(x){
	return x % 2 !== 0;
});


//	把一个Array中的空字符串删掉，可以这么写：
var arr = ['A', '', 'B', null, undefined, 'C', '  '];
var r = arr.filter(function(x){	//	注意：IE9以下的版本没有trim()方法
	return x && x.trim();
});

//	可见用filter()这个高阶函数，关键在于正确实现一个“筛选”函数


//	filter()接收的回调函数，其实可以有多个参数
//	通常我们仅使用第一个参数，表示Array的某个元素
//	回调函数还可以接收另外两个参数，表示元素的位置和数组本身：

var arr = ['A', 'B', 'C'];
var r = arr.filter(function(element, index, self){
	console.log(element);	//	依次打印'A', 'B', 'C'
	console.log(index);		//	依次打印1， 2， 3
	console.log(self);		// self 就是 arr
	return true;
});

//	利用filter，可以巧妙地去除Array的重复元素：
var
    r,
    arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
r = arr.filier(function(element, index, self){
	return self.indexOf(element) === index;
});

alter(r.tostring());
//	去除重复元素依靠的是indexOf总是返回第一个元素的位置，后续的重复元素位置与indexOf返回的位置不相等，因此被filter滤掉了

//	练习
//	从一个数组里筛选出所又的素数
'use strict';

function get_primes(arr) {
return arr.filter(function (x) {
        if (x === 1) {
            return false;
        } else {
            for (var i = 2; i < x; i++) {
                if (x % i === 0) {
                    return false;
                } 
            }
            return true;
        }     
	}); 
}
