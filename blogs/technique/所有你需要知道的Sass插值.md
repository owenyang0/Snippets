# 所有你需要知道的Sass插值

你也许会不时地写写 `Sass` 玩玩，你也会很享受它带给你各种便利。但还有一件事，你并不一定完全了解：`插值` (interpolation) - 将一个占位符，替换成一个值。好了，你们都很幸运，因为今天我将把这种问题说清楚。

## 插值。啥玩意儿？
`插值`，通常是指变量插值，或者变量替换。这不是`Sass`独有的。实际上，你可以在很多编程语言中，发现这种特性。比如 `PHP`, `Perl`, `Ruby`, `Tcl`, `Groovy`, `Unix shells`, 等等。我们经常说的是，插入一个变量，或者插入一个表达式。

我们还是先来看看一个例子吧。如果你有PHP的基础，接下来应该会很容易了解。比如说，你想打印一个包含变量的字符串，最常见的方式：

```PHP
  $description = "awesome";
  echo "Tuts+ is " . $description . "!";
```
这就不是插值的方式，你这是字符串的连接。这其中，连接了三个字符串：`"Tuts+ is "`，`awesome`(被 `$description`所引用) 以及 `"!"`。现在，我们就来看看使用插值而非字符串连接的方式：

```PHP
  $description = "awesome";
  echo "Tuts+ is ${description}!";
```
包裹在变量两边的花括号会告诉PHP，用字符串打印出变量的值。值得注意的是：它需要在双引号里面才可以工作（大多语言都是这样）。

不管怎样，这就是变量/表达式插值。是使用字符串连接，还是使用插值，这都取决于你自己。但可以说一点：插值其实就是字符串连接的语法糖而已。

![Sweet](../images/pour.png "Sweet")

## Sass的插值
我们先看看在Sass中，变量替换是怎么工作。
Sass变量的命名，就像PHP一样，都有着美元符号的前缀(`$`)。两者的对比，显得就结束了，因为谈到插值，两者的表现是不同的。有一个很好的解释是：Sass是基于`Ruby`的，它使用 `${}`进行表达式替换。

在Sass中，你会这样做：
```Sass
  $description: "awesome";
  @warn "Tuts+ is #{$description}!";
```
![Awesome](../images/awesome.png "awesome")

需要注意的是，变量中的`$` 不能像PHP一样丢掉。变量被`#{}`包裹了起来。另外值得一提的是：你可以插入任何类型的变量，不仅仅是字符串。
比如：
```Sass
  $answer: 42;
  @warn "The Answer to the Ultimate Question of Life, the Universe, and Everything is #{$answer}.";
```

## 什么时候应该使用插值
现在你应该明白什么是插值了，也知道怎么在Sass中工作的了。是时候，开始着手实际场景了。首先，我们会再次使用刚才做过的`@warn`指令，它将打印相应内容到控制台。

### 字符串（Strings)
假设你有一组叫`$colors`名的颜色映射（映射是指一个存储了一系列 key/value 组合的变量），但你已经受够了一次又一次地敲 `map-get($colors, ...)`。所以，你写了一个简单的`color()`函数，使用key去获得相应的值。
把这些组合一下就是：

```Sass
  // _config.scss
  $colors: (
    "primary": tomato,
    "secondary": hotpink
  );

  // _function.scss
  @function color($key) {
    @return map-get($colors, $key);
  }

  // _component.scss
  .el {
    background-color: color(primary);
  }
```

一切都很好，不是吗？现在，当你敲错名称，或者去取一个不存在的key时，你想给出错误的信息。这将通过 `@warn`指令来完成。`color()`函数如下：

```Sass
  @function color($key) {
    @if not map-has-key($colors, $key) {
      @warn "Key not found.";
    }
    @return map-get($colors, $key);
  }
```
还不错。如果你想知道哪个key没有找到呢？

```Sass
  @function color($key) {
    @if not map-has-key($colors, $key) {
      @warn "Key `#{$key}` not found.";
    }
    @return map-get($colors, $key);
  }
```

嘣～～变量插值。调用 `color(awesomeness)` 时，将会抛出以下信息：
> Key `awesomeness` not found

这真的很棒，但我们却不知道上下文是什么。为使后来的方便，我们可以将映射的名称写到错误信息里面。
```Sass
  @function color($key) {
    @if not map-has-key($colors, $key) {
      @warn "Key `#{$key}` not found in $colors map.";
    }
    @return map-get($colors, $key);
  }
```

在这个场景里，由于这个 `$colors` 变量没有使用插值，它将打印以下信息：
> Key `awesomeness` not found in $colors map.

### CSS函数
到目前为止，我们已经见到了最常见的变量替换场景：打印字符串中变量的内容。这确实是一个好的示例，但我觉得应该还有更好的场景：CSS函数中的变量，比如 `calc()`。

假设你想基于侧边栏的宽度设置主容器的大小。你是一个勤奋的前端开发者，已经把这个宽度存储在一个变量中，所以，你可能会这样做：
```
  $sidebar-width: 250px;

  .main {
    width: calc(100% - $sidebar-width);
  }
```
然后，你会惊讶地发现，根本不work。没有报错，容器的大小却又不正确。如果你去审查你的dom元素，你会看到这个 — 被划掉了。因为，这是不合法的。
```
  .main {
    width: calc(100% - $sidebar-width);
  }
```

现在我们应该想到：`calc()` 是一个CSS函数，不是一个Sass函数。这就是说Sass会将整个表达式解释成一个字符串。你可以试试：
```
$type-of-expression: type-of(calc(100% - $sidebar-width)); // string
```
因为这是一个字符串，难怪Sass表现和之前`@warn`中的`$colors`字符串一样。`$sidebar-width`被认为是一个常规字符串，所以打出来就是它自己。但这都不是我们所想要的，是吧？我们用插值这样做。
```
  .main {
    width: calc(100% - #{$sidebar-width});
  }
```
现在当Sass编译这个样式文件时，它会用`#{$sidebar-width}`的值，250px替换`#{$sidebar-width}`。最后，便是合法的CSS表达式。
```
  .main {
    width: calc(100% - 250px);
  }
```
任务完成！我们仅仅在这里谈了`calc()`，但其实和其他CSS 原生函数是一样的，包括伪类。比如：`url()`，`linear-gradient()`，`radial-gradient()`，`cubic-bezier()`。

以下是另一个使用CSS函数的例子：
```
  @for $i from 1 through $max {
    .el:nth-of-type(#{$i}) {
      // ...
    }
  }
```

这是一个你有可能遇到过的场景：`for`循环和`:nth-*()`选择器一起使用。再一次说明，你需要使用插值变量，才能最终得到想得到的结果。

小结：Sass会把CSS函数认为是字符串，所以想要在最后获得它们的值，要求你转义所有同它们一起使用的变量。