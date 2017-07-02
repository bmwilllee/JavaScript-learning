//	JavaScript的对象是一种无序的集合数据类型，它由若干键值对组成
//	JavaScript的对象用于描述现实世界中的某个对象。例如，为了描述“小明”这个淘气的小朋友，我们可以用若干键值对来描述他
var xiaoming = {
	name: "小明",
	birth: '1996',
	chool: 'No.1 Middle School',
    height: 1.70,
    weight: 65
};

//	JavaScript用一个{...}表示一个对象，键值对以xxx: xxx形式申明，用,隔开
//	注意，最后一个键值对不需要在末尾加,，如果加了，有的浏览器（如低版本的IE）将报错

//	访问对象属性：
xiaoming.name;
xiaoming.weight;

//	如果属性名包含特殊字符，就必须用''括起来：
var xiaohong = {
    name: '小红',
    'middle-school': 'No.1 Middle School' // 该变量名是非法变量，要用 ‘’ 包起来
};
// 同样，访问这样的非法变量也不能用 . 来访问，必须用['xxx']来访问：
xiaohong['middle-school'];
xiaohong['name'] // '小红'
xiaohong.name // '小红'

//	由于JavaScript的对象是动态类型，你可以自由地给一个对象添加或删除属性：

var xiaowang = {
	name: 'xiaowang'
};	
xiaowang.age = 18;	// 增加一个age属性
delete xiaowang.age;	// 删除age属性
delete xiaowang['name'];	// 另外一种删除属性的方式

//如果我们要检测xiaoming是否拥有某一属性，可以用in操作符：
var xiaoming = {
    name: '小明',
    birth: 1990,
    school: 'No.1 Middle School',
    height: 1.70,
    weight: 65,
    score: null
};

'name' in xiaoming; // true
'address' in xiaoming; // false

//不过要小心，如果in判断一个属性存在，这个属性不一定是xiaoming的，它可能是xiaoming继承得到的：
'toString' in xiaoming; // true, 虽然我们并没有定义该属性，但是，该属性是由继承得到的，因此同样具有该属性

// 要判断一个属性是否是xiaoming自身拥有的，而不是继承得到的，可以用hasOwnProperty()方法：
var xiaonming = {
	name: 'xiaoming'
};
xiaoming.hasOwnProperty('name'); // true
xiaoming.haiOwnProperty('toString'); // false