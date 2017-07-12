//					删除DOM

//	删除一个DOM节点就比插入要容易得多
//	要删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的removeChild把自己删掉：

// 拿到待删除节点:
var self = document.getElementById('to-be-removed');
//	拿到父节点
var parent = self.parentElement;
//	删除
var removed = parent.removedChild(self);
removed === self;	// true

//	注意到删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置
//	当你遍历一个父节点的子节点并进行删除操作时，要注意
//	children属性是一个只读属性，并且它在子节点变化时会实时更新

//	例如，对于如下HTML结构：
<div id="parent">
    <p>First</p>
    <p>Second</p>
</div>/

//	当我们用如下代码删除子节点时：
var parent = document.getElementById('parent');
parent.removeChild(parent.children[0]);
parent.removeChild(parent.children[1]); // <-- 浏览器报错

//	这是因为删除第一个子节点之后，子节点会实时更新，这个时候 Second 就不是在 [1] 位置上了，已经变动到了[0] 位置
//	因此，删除多个节点时，要注意children属性时刻都在变化