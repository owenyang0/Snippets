* [1,2,3,4,5].duplicator()
```javascript
Array.prototype.duplicator = function () {
  return this.concat(this)
}
```

* uniq([1, 2, 3, 2, 1])
```javascript
function uniq(arr) {
  return arr.reduce(function(pre, curr) {
    pre.indexOf(curr) !== -1 ? pre : pre.push(curr)
    return pre
  }, [])
}
```

* foo的值是什么？
```javascript
var foo = 10 + '20'; // 1020
```

* 如何实现以下函数？

```javascript
add(2, 5)
add(2)(5)

function add (a, b) {
  return a + b
}

function curry (f, n) {
  var args = Array.prototype.slice.call(arguments)

  args[1] = !n ? f.length : n

  if (args.length - 2 === n) {
    return f.apply(null, args.slice(2))
  }

  return function () {
    return curry.apply(null, args.concat(Array.prototype.slice.call(arguments)))
  }
}

var calc = curry(add)
console.log(calc(2, 5))
console.log(calc(2)(5))
```

* foo.x的值是什么?

```javascript
var foo = {n: 1};
var bar = foo;
foo.x = foo = {n: 2};

foo //  {n: 2}
bar // {n: 1, x: {n: 2}
```

* 继承
```javascript
function extend(Child, Parent) {
  var F = function(){};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.prototype.$super = Parent.prototype;
}
```
