//					Methods

//	在一个对象中申明的函数，称为这个对象的方法：

var xiaoming = {
	name: 'xiaoming',
	birth:1998,
	age: function(){
		var y = new Date().getFullYear();	// abtain the present year
		return y - this.birth;				// caculate age, pay attention to 'this'
	}
};

xiaoming.age()


// 用apply修复上面的函数
function getAge(){
	var y = new Date().getFullYear();
	return y - this.birth;
}

var xiaoming = {
	name: 'xiaoming',
	birth = 1998,
	age: getAge
}

xiaoming.age;	// 18
getAge.apply(xiaoming, []);    // 18, this指向xiaoming, 参数为空

//	另一个与apply()类似的方法是call()，唯一区别是：
//		apply()把参数打包成Array再传入；
//		call()把参数按顺序传入

//	比如调用Math.max(3, 5, 4)，分别用apply()和call()实现如下：
Math.max.apply(null, [3, 5, 4]); // 5
Math.max.call(null, 3, 5, 4); // 5
//	对普通函数调用，我们通常把this绑定为null


//		装饰器
//	利用apply()，我们还可以动态改变函数的行为
//	JavaScript的所有对象都是动态的，即使内置的函数，我们也可以重新指向新的函数

//	现在假定我们想统计一下代码一共调用了多少次parseInt()
//	可以把所有的调用都找出来，然后手动加上count += 1
//	不过这样做太傻了。最佳方案是用我们自己的函数替换掉默认的parseInt()：

var count = 0;
var oldParseInt = parseInt;
window.parseInt = function () {
	count =+ 1;
	return oldParseInt.apply(null, arguments);
}

// 测试:
parseInt('10');
parseInt('20');
parseInt('30');
count; // 3