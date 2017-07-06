//					RegExp（Regular Expression）

//	字符串是编程时涉及到的最多的一种数据结构，对字符串进行操作的需求几乎无处不在
//	比如判断一个字符串是否是合法的Email地址
//	虽然可以编程提取@前后的子串，再分别判断是否是单词和域名，但这样做不但麻烦，而且代码难以复用
//	正则表达式是一种用来匹配字符串的强有力的武器
//	它的设计思想是用一种描述性的语言来给字符串定义一个规则
//	凡是符合规则的字符串，我们就认为它“匹配”了，否则，该字符串就是不合法的

//	所以我们判断一个字符串是否是合法的Email的方法是：
//		创建一个匹配Email的正则表达式；
//		用该正则表达式去匹配用户的输入来判断是否合法

//	因为正则表达式也是用字符串表示的，所以，我们要首先了解如何用字符来描述字符


//	首先，JavaScript 默认的正则表达规则跟 python 是一样的：
//	在正则表达式中，如果直接给出字符，就是精确匹配
//	用\d可以匹配一个数字，\w可以匹配一个字母或数字，所以：
/*		
		'00\d'可以匹配'007'，但无法匹配'00A'；
		'\d\d\d'可以匹配'010'；
		'\w\w'可以匹配'js'；
		.可以匹配任意字符，所以：
		'js.'可以匹配'jsp'、'jss'、'js!'等等
*/

//	要匹配变长的字符，在正则表达式中，用*表示任意个字符（包括0个）
//	用+表示至少一个字符，用?表示0个或1个字符，用{n}表示n个字符，用{n,m}表示n-m个字符：

//	来看一个复杂的例子：\d{3}\s+\d{3,8}
//		'\d{3}' 	3个数字
//		'\s+' 		\s表示空格或者制表符，\s+则表示至少一个空格
//		'\d{3,8}' 	表示 3-8 个数字

//	综合起来，上面的正则表达式可以匹配以任意个空格隔开的带区号的电话号码
//	如果要匹配'010-12345'这样的号码呢
//	由于'-'是特殊字符，在正则表达式中，要用'\'转义，所以，上面的正则是\d{3}\-\d{3,8}

// 	小提示： 在观察正则表达式的时候，首先以 ／ 来断句
//	但是，仍然无法匹配'010 - 12345'，因为带有空格。所以我们需要更复杂的匹配方式
//	\d{3}\s{1}\-\s{1}\d{3,8}			这样不行吗？

//--------------------------------------------------------------------------

//	进阶

//	要做更精确地匹配，可以用[]表示范围，比如：
/*
		[0-9a-zA-Z\_]可以匹配一个数字、字母或者下划线；
		[0-9a-zA-Z\_]+可以匹配至少由一个数字、字母或者下划线组成的字符串，比如'a100'，'0_Z'，'js2015'等等；
		[a-zA-Z\_\$][0-9a-zA-Z\_\$]*可以匹配由字母或下划线、$开头，后接任意个由一个数字、字母或者下划线、$组成的字符串，也就是JavaScript允许的变量名；
		[a-zA-Z\_\$][0-9a-zA-Z\_\$]{0, 19}更精确地限制了变量的长度是1-20个字符（前面1个字符+后面最多19个字符）
*/

/*
		A|B可以匹配A或B
		所以(J|j)ava(S|s)cript可以匹配'JavaScript'、'Javascript'、'javaScript'或者'javascript'
*/

/*
		^表示行的开头，^\d表示必须以数字开头。
		$表示行的结束，\d$表示必须以数字结束。
		你可能注意到了，js也可以匹配'jsp'，但是加上^js$就变成了整行匹配，就只能匹配'js'了
*/

//------------------------------------------------------------------------

//			RegExp

//	有了准备知识，我们就可以在JavaScript中使用正则表达式了
//	JavaScript有两种方式创建一个正则表达式：
//		第一种方式是直接通过/正则表达式/写出来
//		第二种方式是通过new RegExp('正则表达式')创建一个RegExp对象

//	两种写法是一样的：
var re1 = /ABC\-001/;
var re2 = new RegExp('ABC\\-001');

//	注意，如果使用第二种写法，因为字符串的转义问题，字符串的两个\\实际上是一个\

//	先看看如何判断正则表达式是否匹配：
var re = /^\d{3}\-\d{3,8}$/;
re.test('010-12345'); // true
re.test('010-1234x'); // false
re.test('010 12345'); // false
re.test('010-123456') // false
//	RegExp对象的test()方法用于测试给定的字符串是否符合条件


//			切分字符串

//	用正则表达式切分字符串比用固定的字符更灵活，请看正常的切分代码：
'a b 	c'.split(' ');// ['a', 'b', '', '', 'c']

//	嗯，无法识别连续的空格，用正则表达式试试：
'a b 	c'.split(/\s+/);// ['a', 'b','c']   表示用至少一个空格来分割字符串

//	无论多少个空格都可以正常分割。加入,试试：
'a,b, c  d'.split(/[\s\,]+/); // ['a', 'b', 'c', 'd']

//	再加入;试试：
'a,b;; c  d'.split(/[\s\,\;]+/); // ['a', 'b', 'c', 'd']

//	如果用户输入了一组标签，下次记得用正则表达式来把不规范的输入转化成正确的数组


//	分组

//	除了简单地判断是否匹配之外，正则表达式还有提取子串的强大功能
//	用()表示的就是要提取的分组（Group），比如：

//	^(\d{3})-(\d{3,8})$分别定义了两个组，可以直接从匹配的字符串中提取出区号和本地号码：
var re = /^(\d{3})-(\d{3,8})$/;
re.exec('010-12345'); // ['010-12345', '010', '12345']
re.exec('010 12345'); // null  （匹配失败时返回 null）

//	我自己的改进型：
var re2 = /^(\d{3})[\s,-](\d{3,8})$/		// 上面的两种形式的电话都可以匹配
//	我在 chrome 上的返回值为 ["010-12345", "010", "12345", index: 0, input: "010-12345"]
/*
	0:"010-12345"
	1:"010"
	2:"12345"
	index:0
	input:"010-12345"
	length:3
*///				可以直接加上这些尾缀来调用相关参数


//	提取子串非常有用。来看一个更凶残的例子：

var re = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;
re.exec('19:05:30'); // ['19:05:30', '19', '05', '30']
//	这个正则表达式可以直接识别合法的时间。但是有些时候，用正则表达式也无法做到完全验证，比如识别日期：

var re = /^(0[1-9]|1[0-2]|[0-9])-(0[1-9]|1[0-9]|2[0-9]|3[0-1]|[0-9])$/;
//	对于'2-30'，'4-31'这样的非法日期，用正则还是识别不了，或者说写出来非常困难，这时就需要程序配合识别了


//			贪婪匹配

//	需要特别指出的是，正则匹配默认是贪婪匹配，也就是匹配尽可能多的字符
//	举例如下，匹配出数字后面的0
var re = /^(\d+)(0*)$/;
re.exec('102300'); // ['102300', '102300', '']
//	由于\d+采用贪婪匹配，直接把后面的0全部匹配了，结果0*只能匹配空字符串了

//	必须让\d+采用非贪婪匹配（也就是尽可能少匹配），才能把后面的0匹配出来，加个?就可以让\d+采用非贪婪匹配：
var re = /^(\d+?)(0*)$/;
re.exec('102300'); // ['102300', '1023', '00']



//			全局搜索

//	JavaScript的正则表达式还有几个特殊的标志，最常用的是g，表示全局匹配：
var r1 = /teat/g;
// 等价于:
var r2 = RegExp('test', 'g');
//	全局匹配可以多次执行exec()方法来搜索一个匹配的字符串
//	当我们指定g标志后，每次运行exec()，正则表达式本身会更新lastIndex属性，表示上次匹配到的最后索引：
var s = 'JavaScript, VBScript, JScript and ECMAScript';
var re=/[a-zA-Z]+Script/g;

//	使用全局匹配
re.exec(s); // ['JavaScript']
re.lastIndex; // 10

re.exec(s); // ['VBScript']
re.lastIndex; // 20

re.exec(s); // ['JScript']
re.lastIndex; // 29

re.exec(s); // ['ECMAScript']
re.lastIndex; // 44

re.exec(s); // null，直到结束仍没有匹配到

//	全局匹配类似搜索，因此不能使用/^...$/，那样只会最多匹配一次。
//	正则表达式还可以指定i标志，表示忽略大小写，m标志，表示执行多行匹配


//			练习
//	请尝试写一个验证Email地址的正则表达式。版本一应该可以验证出类似的Email：
var re = /^\w+[\w.]*@\w+.(org|com)$/;

//	版本二可以验证并提取出带名字的Email地址：
var re = /^<([\w\s]+)>\s*(\w+@\w+.org)$/;

/*
	匹配顺序：
	开头
	<小于号，
	分组1：
		字母或数组或空白符一个或多个，
		>大于号,
		空白符零个或多个，
	分组2：
    	字母或数字一个或多个，
    	@符号，
    	字母或数字一个或多个，
    	.，
    	org
*/

