//					class继承

//	JavaScript的对象模型是基于原型实现的，特点是简单，缺点是理解起来比传统的类－实例模型要困难
//	最大的缺点是继承的实现需要编写大量代码，并且需要正确实现原型链

//	有没有更简单的写法？有！
//	新的关键字class从ES6开始正式被引入到JavaScript中!!!!

//	我们先回顾用函数实现Student的方法：
function Student(name){
	this.name = name;
}

Student.prototype.hello = function(){
	alert('Hello ' + this.name + ' !');
};

//	如果用新的class关键字来编写Student，可以这样写：
class Student{
	constructor(name){
		this.name = name;
	}

	hello(){
		alert('Hello ' + this.name + ' !');
	}
}

//	比较一下就可以发现，class的定义包含了构造函数constructor和定义在原型对象上的函数hello() （注意没有function关键字）
//	这样就避免了Student.prototype.hello = function () {...}这样分散的代码

//	最后，创建一个Student对象代码和前面章节完全一样：
var xiaoming = new Student('小明')；
xiaoming.hello();


//			class继承
//			跟 JAVA 太像了！！！！			稳！！！

//	用class定义对象的另一个巨大的好处是继承更方便了
//	想一想我们从Student派生一个PrimaryStudent需要编写的代码量
//	现在，原型继承的中间对象，原型对象的构造函数等等都不需要考虑了，直接通过extends来实现：

class PrimaryStudent extends Student{
	constructor(name, grade){
		super(name);
		this.name = name;
	}

	myGrade(){
		return this.grade;
	}
}


//	可以说 ES6 加入对 class 的支持就是对程序猿／媛 的福音