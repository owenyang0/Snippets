本文介绍ECMAScript 6即将带给我们新的数组操作方法，以及在怎样在现有浏览器应用这些新的数组特性。

**Note:** 我将使用交替使用构造器(constructor)和类(class)两个术语。

## 类方法
数组(Array)自身所拥有的方法。

### Array.from(arrayLike, mapFunc?, thisArg?)
` Array.from() `的基本功能是，转换两种类型的对象成数组。

> **类数组对象(Array-like objects)**

该类对象有长度与索引的属性。DOM操作符的结果即属于该类，如`document.getElementsByClassName()`。

> **可迭代对象(Iterable objects)**

这类对象在取值时，每次只能取一个元素。数组是可迭代的，就如ECMAScript中新的数组结构，映射(Map)和集(Set)。

以下代码是一个转换类数组对象到数组的一个示例：

```javascript
let lis = document.querySelectorAll('ul.fancy li');
Array.from(lis).forEach(function (li) {
  console.log(node);
});
```

`querySelectorAll()`的结果不是一个数组，也不会有`forEach()`这个方法。这是我们需要在使用这个方法之前，将它转换成数组的原因。

**通过Array.from()使用Mapping**
`Array.from()`同样也是一个泛型使用`map()`的替代选择。

```javascript
let spans = document.querySelectorAll('span.name');

// map(), generically:
let names1 = Array.prototype.map.call(spans, s => s.textContent);

// Array.from():
let names2 = Array.from(spans, s => s.textContent);
```
两个方法中的第二个参数，都是箭头函数(arrow function)。
在这个示例中，`document.querySelectorAll()`的结果又是一个类数组对象，而非数组。这就是我们不能直接调用`map()`的原因。第一个示例中，为了使用`forEach()`，我们将类数组对象转换成了数组。这里我们通过泛型方法和两个参数版本的`Array.from()`，而省去了中间步骤。

**Holes**
`Array.from()`会忽略数组里缺失的元素 - 洞(holes)，它会以未定义的元素(undefined elements)进行对待。

```javascript
> Array.from([0,,2])
[ 0, undefined, 2 ]
```
这就意味着，你可以使用`Array.from()`来创建或者填充一个数组：

```javascript
> Array.from(new Array(5), () => 'a')
[ 'a', 'a', 'a', 'a', 'a' ]
> Array.from(new Array(5), (x,i) => i)
[ 0, 1, 2, 3, 4 ]
```

如果你想用一个固定的值去填充一个数组，那么`Array.prototype.fill()`(请看下文)将是一个更好的选择。第一个即是以上示例的两种方式。

**在数组(Array)子类中的from()**
另一个`Array.from()`的使用场景是，转换类数组对象或可迭代对象到一个数组(Array)子类的一个实例。如你创建了一个Array的子类MyArray，想将此类对象转化成MyArray的一个实例，你就可以简单地使用`MyArray.from()`。可以这样使用的原因是，在ECMAScript 6中构造器(constructors)会继承下去(父类构造器是它子类构造器的原型(prototype))。

```javascript
class MyArray extends Array {
  ...
}
let instanceOfMyArray = MyArray.from(anIterable);

```

你可以将该功能与映射(mapping)结合起来，在一个你控制结果构造器的地方完成映射操作(map operation)：

```javascript
// from() – determine the result’s constructor via the receiver
// (in this case, MyArray)
let instanceOfMyArray = MyArray.from([1, 2, 3], x => x * x);

// map(): the result is always an instance of Array
let instanceOfArray   = [1, 2, 3].map(x => x * x);
```

### Array.of(...items)
如果你想将一组值转换成一个数组，你应该使用数组源文本(array literal)。特别是只有一个值且还是数字的时候，数组的构造器便罢工了。更多[信息](http://speakingjs.com/es5/ch18.html#array_constructor)请参考。

```javascript
> new Array(3, 11, 8)
[ 3, 11, 8 ]
> new Array(3)
[ , ,  ,]
> new Array(3.1)
RangeError: Invalid array length
```

便如果要将一组值转换成数字子构造器(sub-constructor)的一个实例，我们应该怎么做呢？这就是`Array.of()`存在的价值(记住，数组子构造器会继承所有的数组方法，当然也包括`of()`)。

```javascript
class MyArray extends Array {
  ...
}
console.log(MyArray.of(3, 11, 8) instanceof MyArray); // true
console.log(MyArray.of(3).length === 1); // true

```

把值包裹嵌套在数组里，`Array.of()`会相当方便，而不会有`Array()`一样怪异的处理方式。但也要注意`Array.prototype.map()`，此处有坑：

```javascript
> ['a', 'b'].map(Array.of)
[ [ 'a', 0, [ 'a', 'b' ] ],
[ 'b', 1, [ 'a', 'b' ] ] ]
> ['a', 'b'].map(x => Array.of(x)) // better
[ [ 'a' ], [ 'b' ] ]
> ['a', 'b'].map(x => [x]) // best (in this case)
[ [ 'a' ], [ 'b' ] ]
```
如你所看，`map()`会传递三个参数到它的回调里面。最后两个又是经常被忽略的([详细](http://speakingjs.com/es5/ch15.html#_pitfall_unexpected_optional_parameters))。

## 原型方法(Prototype methods)
数组的实例会有很多新的方法可用。

### 数组里的迭代(Iterating over arrays)
以下的方法，会帮助完成在数组里的迭代：

```javascript
Array.prototype.entries()
Array.prototype.keys()
Array.prototype.values()
```
以上的每一个方法都会返回一串值，却不会作为一个数组返回。它们会通过迭代器，一个接一个的显示。让我们看一个示例(我将使用`Array.from()将迭代器的内容放在数组中`)：

```javascript
> Array.from([ 'a', 'b' ].keys())
[ 0, 1 ]
> Array.from([ 'a', 'b' ].values())
[ 'a', 'b' ]
> Array.from([ 'a', 'b' ].entries())
[ [ 0, 'a' ],
[ 1, 'b' ] ]
```
你可以结合`entries()`和ECMAScript 6中的`for-of`循环，方便地将迭代对象拆解成key-value对：

```javascript
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}

```
**Note:** 这段代码已经可以在最新的Firefox浏览器里运行了。t Firefox.

### 查找数组元素

`Array.prototype.find(predicate, thisArg?)` 会返回满足回调函数的第一个元素。如果没有任何一个元素满足条件，它会返回`undefined`。比如：

```javascript
> [6, -5, 8].find(x => x < 0)
-5
> [6, 5, 8].find(x => x < 0)
undefined

```
`Array.prototype.findIndex(predicate, thisArg?)`
会返回满足回调函数的第一个元素的索引。如果找不任何满足的元素，则返回-1。比如：

```javascript
> [6, -5, 8].findIndex(x => x < 0)
1
> [6, 5, 8].findIndex(x => x < 0)
-1

```

两个find*方法都会忽略洞(holes)，即不会关注undefined的元素。回调的完成函数签名是：

```javascript
predicate(element, index, array)
```
**通过findIndex()找NaN**

`Array.prototype.indexOf()`有一个大家所熟知的限制，那就是不能查找NaN。因为它用恒等(===)查找匹配元素：

```javascript
> [NaN].indexOf(NaN)
-1
```

使用`findIndex()`，你就可以使用`Object.is()`，这就不会产生这样的问题：

```javascript
> [NaN].findIndex(y => Object.is(NaN, y))
0

```

你同样也可以采用更通用的方式，创建一个帮助函数`elemIs()`：

```javascript
> function elemIs(x) { return Object.is.bind(Object, x) }
> [NaN].findIndex(elemIs(NaN))
0

```

### Array.prototype.fill(value, start?, end?)
用所给的数值，填充一个数组：

```javascript
> ['a', 'b', 'c'].fill(7)
[ 7, 7, 7 ]

```
洞(Holes)也不会有任何的特殊对待：

```javascript
> new Array(3).fill(7)
[ 7, 7, 7 ]
```
你也可以限制你填充的起始与结束：

```javascript
> ['a', 'b', 'c'].fill(7, 1, 2)
[ 'a', 7, 'c' ]
```

## 什么时候可以使用新的数组方法？
有一些方法已经可以在浏览器里使用了。通过，你可以通过kangax查看兼容性[ECMAScript 6 compatibility table](http://kangax.github.io/compat-table/es6/)。

Paul Miller的 [es6-shim](https://github.com/paulmillr/es6-shim)库可以将ES6转换成ES5。

## 参考

- [http://www.2ality.com/2014/05/es6-array-methods.html](http://www.2ality.com/2014/05/es6-array-methods.html)
- [Holes in Arrays](http://speakingjs.com/es5/ch18.html#array_holes) (Speaking JavaScript)
