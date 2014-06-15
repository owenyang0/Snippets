define(['widget', 'jquery', 'jqueryUI'], function (widget, $, $UI) {
  function Window() {
    this.cfg = {
      width: 500,
      height: 300,
      title: 'System Info',
      content: '',
      skinClassName: null,
      handler4Alert: null,
      handler4Close: null,
      dragHandle: '.window_header',
      text4Alert: 'OK',
      isDraggable: true,
      hasMask: true,
      hasCloseBtn: false
    };
  }

  Window.prototype = $.extend({}, new widget.Widget(), {
    renderUI: function () {
      this.boundingbox = $('<div class="window_boundingbox">' +
        '<div class="window_header">' + this.cfg.title + '</div>' +
        '<div class="window_body">' + this.cfg.content + '</div>' +
        '<div class="window_footer">' +
        '<button class="window_alert">' + this.cfg.text4Alert + '</button>' + '</div>' +
        '</div>');

      if (this.cfg.hasMask) {
        this._mask = $('<div class="window_mask"></div>');
        this._mask.appendTo('body');
      }
      if (this.cfg.hasCloseBtn) {
        this.boundingbox.append('<span class="window_close">X</span>');
      }
      this.boundingbox.appendTo('body');
    },
    bindUI: function () {
      var self = this;
      this.boundingbox.delegate('.window_alert', 'click', function () {
        self.fire('alert');
        self.destroy();
      }).on('click', '.window_close', function () {
        self.fire('close');
        self.destroy();
      });

      if (this.cfg.handler4Alert) {
        this.on('alert', this.cfg.handler4Alert);
      }

      if (this.cfg.handler4Close) {
        this.on('close', this.cfg.handler4Close);
      }
    },
    syncUI: function () {
      this.boundingbox.css({
        width: this.cfg.width,
        height: this.cfg.height,
        left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2),
        top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2),
      });

      if (this.cfg.skinClassName) {
        this.boundingbox.addClass(this.cfg.skinClassName);
      }

      if (this.cfg.isDraggable) {
        if (this.cfg.dragHandle) {
          this.boundingbox.draggable({
            handle: this.cfg.dragHandle
          });
        } else {
          this.boundingbox.draggable();
        }
      }
    },
    destructor: function() {
      this._mask && this._mask.remove();
    },
    alert: function (cfg) {
      $.extend(this.cfg, cfg);
      this.render();
      return this;
    },
    confirm: function () {

    },
    prompt: function () {

    }
  });

  return {
    Window: Window
  }
})
