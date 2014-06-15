define(['jquery'], function ($) {
  function Widget() {
    this.boundingbox = null;
  }

  Widget.prototype = {
    on: function (type, handler) {
      if (typeof this.handlers[type] === 'undefined') {
        this.handlers[type] = [];
      }
      this.handlers[type].push(handler);
      return this;
    },
    fire: function (type, data) {
      if (this.handlers[type] instanceof Array) {
        var handlers = this.handlers[type];
        handlers.forEach(function (handler) {
          handler(data);
        });
      }
      return this;
    },
    render: function (container) {
      this.renderUI();
      this.handlers = {};
      this.bindUI();
      this.syncUI();
      $(container || document.body).append(this.boundingbox);
    },
    destroy: function () {
      this.destructor();
      this.boundingbox.off();
      this.boundingbox.remove();
    },
    renderUI: function () {},
    bindUI: function () {},
    syncUI: function () {},
    destructor: function () {}
  }

  return {
    Widget: Widget
  }
});
