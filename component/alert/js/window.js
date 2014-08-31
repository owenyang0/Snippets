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
      handler4ConfirmBtn: null,
      handler4CancelBtn: null,
      dragHandle: '.window_header',
      text4Alert: 'OK',
      text4ConfirmBtn: 'OK',
      text4CancelBtn: 'Cancel',
      isDraggable: true,
      hasMask: true,
      hasCloseBtn: false,
      text4PromptBtn: 'sure',
      isPromptInputPassword: false,
      defaultValue4PromptInput: '',
      maxlength4PromptInput: 10,
      handler4PromptBtn: null
    };
  }

  Window.prototype = $.extend({}, new widget.Widget(), {
    renderUI: function () {
      var footerContent = '';
      switch (this.cfg.wintype) {
      case 'alert':
        footerContent = '<button class="window_alert">' + this.cfg.text4Alert + '</button>';
        break;
      case 'confirm':
        footerContent = '<button class="window_confirm">' + this.cfg.text4ConfirmBtn + '</button>' +
          '<button class="window_cancel">' + this.cfg.text4CancelBtn + '</button>';
        break;
      };
      this.boundingbox = $('<div class="window_boundingbox">' +
        '<div class="window_header">' + this.cfg.title + '</div>' +
        '<div class="window_body">' + this.cfg.content + '</div>' +
        '<div class="window_footer">' + footerContent + '</div>' +
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
      }).on('click', '.window_confirm', function () {
        self.fire('confirm');
        self.destroy();
      }).on('click', '.window_cancel', function () {
        self.fire('cancel');
        self.destroy();
      });

      if (this.cfg.handler4Alert) {
        this.on('alert', this.cfg.handler4Alert);
      }

      if (this.cfg.handler4Close) {
        this.on('close', this.cfg.handler4Close);
      }

       if (this.cfg.handler4ConfirmBtn) {
        this.on('confirm', this.cfg.handler4ConfirmBtn);
      }

      if (this.cfg.handler4CancelBtn) {
        this.on('cancel', this.cfg.handler4CancelBtn);
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
    destructor: function () {
      this._mask && this._mask.remove();
    },
    alert: function (cfg) {
      $.extend(this.cfg, cfg, {
        'wintype': 'alert'
      });
      this.render();
      return this;
    },
    confirm: function (cfg) {
      $.extend(this.cfg, cfg, {
        'wintype': 'confirm'
      });
      this.render();
      return this;
    },
    prompt: function () {

    }
  });

  return {
    Window: Window
  }
})
