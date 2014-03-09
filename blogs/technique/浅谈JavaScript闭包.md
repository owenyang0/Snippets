什么是闭包
----------

`JavaScript` 函数是将要执行的**代码**及执行这些代码的**作用域**构成的一个综合体。计算机术语称这种**代码**和**作用域**的综合体为**闭包**。故所有`JavaScript` 函数都是闭包。  
但我们常说的`JavaScript`**闭包**是指，一个嵌套函数被导出到它所定义的作用域外时，才明确地称为**闭包**。

JavaScript闭包
--------------

闭包是 `JavaScript` 一个非常重要的特性，这意味着当前作用域总是能够访问外部作用域中的变量。 因为**函数**是 `JavaScript` 中唯一拥有自身作用域的结构，因此闭包的创建**依赖于**函数。

简单写法
--------

该函数的私有持久变量，可以被多个函数共享

    var uniqueID = (function() {
        // 私有持久值
        var id = 0;
        return function() {
            return id++;
        }
    })();
    
循环中的闭包
------------

一个常见的错误出现在**循环**中使用闭包，开发人员在循环语句里创建函数（内部计数）时经常得不到预期的结果，假设我们需要在每次循环中调用循环**序号**

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

所输入的内容不是 `0-9`，取而代之的是打印10次 `10`。  
关键原因，在调用`console.log(i)`时，循环已经结束，同一个上下文中创建的闭包是共用一个[[Scope]]属性，导致**i**已经被修改成了`10`。  
在ECMAScript中，同一个父上下文中创建的闭包是共用一个`[[Scope]]`属性的。也就是说，某个闭包对其中[[Scope]]的变量做修改会影响到其他闭包对其变量的读取。

解决方式
---------

避免引用错误，获取正确序号。我们需要引入自执行函数，包裹一下。传入就是`i`的拷贝，这样就能获取正确的输出。

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

将`setTimeout`包裹在一个匿名函数中，匿名函数拥有变量`e`的引用，便不用被循环改变了。   

    
使用闭包的断点
--------------

在此贴上《JavaScript权威指南》中，使用`闭包的断点`代码。由`Steve Yen`所写，用来捕获一个函数中的当前作用域（包括局部变量和函数的参数），并返回其结果。

    function inspect(inspector, title) {
    	var expression, result;
    	if("ignore" in arguments.callee) {
    		return;
    	}
    
    	while(true) {
    		var message = "";
    		if(title) {
    			message = title + "\n";
    		}
    
    		if(expression) {
    			message += "\n" + expression + " ==> " + result + "\n";
    		} else {
    			expression = "";
    		}
    		
    		expression += "Enter an expression to evaluate:";
    		expression = prompt(message, expression);
    
    		if(!expression) {
    			return;
    		}
    
    		result = inspector(expression);
    	}
    }

用断点技术计算阶乘的函数
------------------------

    function factorial(n) {
    	var inspector = function($) {
    		return eval($);
    	}
    	
    	// inspect.ignore = true;
    	inspect(inspector, "Entering factorial()");
    
    	var result = 1;
    	while(n > 1) {
    		result *= n;
    		n--;
    		inspect(inspector, "factorial() loop");
    	}
    
    	inspect(inspector, "Exiting factorial()");
    	return result;
    }

参考
----

* [JavaScript权威指南](http://www.amazon.cn/JavaScript%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97-%E5%BC%97%E6%8B%89%E7%BA%B3%E6%A0%B9/dp/B0012UMVYA/ref=sr_1_2?ie=UTF8&qid=1393770256&sr=8-2&keywords=javascript+%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97)  
* [Closure](http://bonsaiden.github.io/JavaScript-Garden/zh/#function.closures)

