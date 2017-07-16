//			$符号
//	$是著名的jQuery符号。实际上，jQuery把所有功能全部封装在一个全局变量jQuery中，而$也是一个合法的变量名，它是变量jQuery的别名：
window.jQuery; // jQuery(selector, context)
window.$; // jQuery(selector, context)
$ === jQuery; // true
typeof($); // 'function'

//	$本质上就是一个函数，但是函数也是对象，于是$除了可以直接调用外，也可以有很多其他属性
//	注意，你看到的$函数名可能不是jQuery(selector, context)
//	因为很多JavaScript压缩工具可以对函数名和参数改名，所以压缩过的jQuery源码$函数可能变成a(b, c)

//	绝大多数时候，我们都直接用$（因为写起来更简单嘛）
//	但是，如果$这个变量不幸地被占用了，而且还不能改
//	那我们就只能让jQuery把$变量交出来，然后就只能使用jQuery这个变量：
$; // jQuery(selector, context)
jQuery.noConflict();
$; // undefined
jQuery; // jQuery(selector, context)

//	这种黑魔法的原理是jQuery在占用$之前，先在内部保存了原来的$,调用jQuery.noConflict()时会把原来保存的变量还原


//			选择器
//	为什么jQuery要发明选择器？回顾一下DOM操作中我们经常使用的代码：
// 按ID查找：
var a = document.getElementById('dom-id');

// 按tag查找：
var divs = document.getElementsByTagName('div');

// 查找<p class="red">：
var ps = document.getElementsByTagName('p');
// 过滤出class="red":
// TODO:

// 查找<table class="green">里面的所有<tr>：
var table = ...
for (var i=0; i<table.children; i++) {
    // TODO: 过滤出<tr>
}

//	按ID查找
//	如果某个DOM节点有id属性，利用jQuery查找如下：
// 查找<div id="abc">:
var div = $('#abc');

//	jQuery对象和DOM对象之间可以互相转化：
var div = $('#abc'); // jQuery对象
var divDom = div.get(0); // 假设存在div，获取第1个DOM元素
var another = $(divDom); // 重新把DOM包装为jQuery对象


//	按tag查找
//	按tag查找只需要写上tag名称就可以了：
var ps = $('p'); // 返回所有<p>节点
ps.length; // 数一数页面有多少个<p>节点


//	按class查找
//按class查找注意在class名称前加一个.：
var a = $('.red'); // 所有节点包含`class="red"`都将返回
// 例如:
// <div class="red">...</div>
// <p class="green red">...</p>

//	通常很多节点有多个class，我们可以查找同时包含red和green的节点：
var a = $('.red.green'); // 注意没有空格！
// 符合条件的节点：
// <div class="red green">...</div>
// <div class="blue green red">...</div>


//	按属性查找
//	一个DOM节点除了id和class外还可以有很多属性，很多时候按属性查找会非常方便，比如在一个表单中按属性来查找：
var email = $('[name=email]'); // 找出<??? name="email">
var passwordInput = $('[type=password]'); // 找出<??? type="password">
var a = $('[items="A B"]'); // 找出<??? items="A B">

//	当属性的值包含空格等特殊字符时，需要用双引号括起来
//	按属性查找还可以使用前缀查找或者后缀查找：
var icons = $('[name^=icon]'); // 找出所有name属性值以icon开头的DOM
// 例如: name="icon-1", name="icon-2"
var names = $('[name$=with]'); // 找出所有name属性值以with结尾的DOM
// 例如: name="startswith", name="endswith"

//	这个方法尤其适合通过class属性查找，且不受class包含多个名称的影响：
var icons = $('[class^="icon-"]'); // 找出所有class包含至少一个以`icon-`开头的DOM
// 例如: class="icon-clock", class="abc icon-home"


//	组合查找
//	组合查找就是把上述简单选择器组合起来使用。如果我们查找$('[name=email]')
//	很可能把表单外的<div name="email">也找出来，但我们只希望查找<input>，就可以这么写：
var emailInput = $('input[name=email]'); // 不会找出<div name="email">

//	同样的，根据tag和class来组合查找也很常见：
var tr = $('tr.red'); // 找出<tr class="red ...">...</tr>


//	多项选择器
//	多项选择器用 , 分割
//	多项选择器就是把多个选择器用,组合起来一块选：
$('p,div'); // 把<p>和<div>都选出来
$('p.red,p.green'); // 把<p class="red">和<p class="green">都选出来

//	要注意的是，选出来的元素是按照它们在HTML中出现的顺序排列的，而且不会有重复元素
//	例如，<p class="red green">不会被上面的$('p.red,p.green')选择两次


//	练习
/*
	使用jQuery选择器分别选出指定元素：

	仅选择JavaScript

	仅选择Erlang

	选择JavaScript和Erlang

	选择所有编程语言

	选择名字input

	选择邮件和名字input
*/

<!-- HTML结构 -->
/*
<div id="test-jquery">
    <p id="para-1" class="color-red">JavaScript</p>
    <p id="para-2" class="color-green">Haskell</p>
    <p class="color-red color-green">Erlang</p>
    <p name="name" class="color-black">Python</p>
    <form class="test-form" target="_blank" action="#0" onsubmit="return false;">
        <legend>注册新用户</legend>
        <fieldset>
            <p><label>名字: <input name="name"></label></p>
            <p><label>邮件: <input name="email"></label></p>
            <p><label>口令: <input name="password" type="password"></label></p>
            <p><button type="submit">注册</button></p>
        </fieldset>
    </form>
</div>
*/

selected = $('#para-1');
selected = $('.color-red.color-green');
selected = $('.color-red');
selected = $('[class^=color]');
selected = $('input[name=name]');
selected = $('input[name=name],input[name=email]');