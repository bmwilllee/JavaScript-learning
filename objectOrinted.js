//					javaScript 的面相对象编程

//	JavaScript不区分类和实例的概念，而是通过原型（prototype）来实现面向对象编程
//	原型是指当我们想要创建xiaoming这个具体的学生时，我们并没有一个Student类型可用
//	那怎么办？恰好有这么一个现成的对象：
var robot = {
    name: 'Robot',
    height: 1.6,
    run: function () {
        console.log(this.name + ' is running...');
    }
};
//	于是我们把它改名为Student，然后创建出xiaoming：
var Student = {
	name: 'Robot',
	height: 1.6,
	run: function(){
		console.log(this.name + 'is running...');
	}
};

var xiaoming = {
	name: '小明'
};
xiaoming.__proto__ = Student;	// 把xiaoming的原型指向了 Student
//	看上去 xiaoming 仿佛是从 Student 上继承下来的：
xiaoming.name;	// '小明'
xiaoming.run();	// 小明 is running...

//	xiaoming有自己的name属性，但并没有定义run()方法
//	不过，由于小明是从Student继承而来，只要Student有run()方法，xiaoming也可以调用：

//	JavaScript的原型链和Java的Class区别就在，它没有“Class”的概念，所有对象都是实例
//	所谓继承关系不过是把一个对象的原型指向另一个对象而已

//	如果你把xiaoming的原型指向其他对象：
var Bird = {
    fly: function () {
        console.log(this.name + ' is flying...');
    }
};
xiaoming.__proto__ = Bird;

//	现在xiaoming已经无法run()了，他已经变成了一只鸟：
xiaoming.fly(); // 小明 is flying...


//	在JavaScrip代码运行时期，你可以把xiaoming从Student变成Bird，或者变成任何对象
//	在编写JavaScript代码时，不要直接用obj.__proto__去改变一个对象的原型，并且，低版本的IE也无法使用__proto__
//	Object.create()方法可以传入一个原型对象，并创建一个基于该原型的新对象
//	但是新对象什么属性都没有，因此，我们可以编写一个函数来创建xiaoming：

// 原型对象:
var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

function createStudent(name){
	// 基于Student原型创建一个新对象:
	var s = Object.create(Student);
	//	初始化对象
	s.name = name;
	return s;
}


var xiaoming = createStudent('小明')；
xiaoming.run(); // 小明 is running...
xiaoming.__proto__ === Student; // true