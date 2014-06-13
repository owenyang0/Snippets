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
    alert: function (cfg) {
      var self = this;
      var _cfg = $.extend(this.cfg, cfg);
      var boundingBox = $('<div class="window_boundingbox">' +
        '<div class="window_header">' + _cfg.title + '</div>' +
        '<div class="window_body">' + _cfg.content + '</div>' +
        '<div class="window_footer">' +
        '<button class="window_alert">' + _cfg.text4Alert + '</button>' + '</div>' +
        '</div>');
      var ok = boundingBox.find('button');
      var mask = null;
      if (_cfg.hasMask) {
        mask = $('<div class="window_mask"></div>');
        mask.appendTo('body');
      }

      if (_cfg.isDraggable) {
        if (_cfg.dragHandle) {
          boundingBox.draggable({
            handle: _cfg.dragHandle
          });
        } else {
          boundingBox.draggable();
        }
      }

      boundingBox.appendTo('body');
      ok.appendTo(boundingBox);
      ok.on('click', function () {
        boundingBox.remove();
        mask && mask.remove();
        self.fire('alert');
      });

      boundingBox.css({
        width: _cfg.width,
        height: _cfg.height,
        left: (_cfg.x || (window.innerWidth - _cfg.width) / 2),
        top: (_cfg.y || (window.innerHeight - _cfg.height) / 2),
        // 'margin-left': (-_cfg.width / 2)
      });

      if (_cfg.hasCloseBtn) {
        var closeBtn = $('<span class="window_close">X</span>');
        closeBtn.appendTo(boundingBox);
        closeBtn.on('click', function () {
          boundingBox.remove();
          mask && mask.remove();
          self.fire('close');
        });
      }

      if (_cfg.skinClassName) {
        boundingBox.addClass(_cfg.skinClassName);
      }

      if (_cfg.handler4Alert) {
        this.on('alert', _cfg.handler4Alert);
      }

      if (_cfg.handler4Close) {
        this.on('close', _cfg.handler4Close);
      }

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
