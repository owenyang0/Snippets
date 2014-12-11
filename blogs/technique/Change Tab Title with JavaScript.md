## 用JavaScript修改浏览器tab标题

修改tab或者window的标题，是一项较老的实践。` Gmail ` 用它来提示用户新的聊天消息，当有新的page通过` AJAX `加载的时候，本站同样用它更新` tab title `。这是怎样做到的呢？当时是通过设置` document `对象。

```JavaScript
document.title = 'Hello!'; // New title :)
```
有一个常识性的错误是：你会以为应该去修改 ` window.title `。但实际上，你应该使用` document `对象，否则你做的肯定是无用的。注意一下，你将会看到：很多时候会用 ` setInterval `来实际更新 ` document.title `，用以引起用户的注意！

**原文：**[Change Tab Title with JavaScript](http://davidwalsh.name/change-title-javascript)
