define(['jquery', 'jqueryUI'], function ($, $UI) {
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

  Window.prototype = {
    alert: function (cfg) {
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
        _cfg.handler4Alert && _cfg.handler4Alert.call(this);
        handler4Close: null,
        boundingBox.remove();
        mask && mask.remove();
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
          _cfg.handler4Close && _cfg.handler4Close.call(this);
          boundingBox.remove();
          mask && mask.remove();
        });
      }

      if (_cfg.skinClassName) {
        boundingBox.addClass(_cfg.skinClassName);
      }
    },
    confirm: function () {

    },
    prompt: function () {

    }
  }

  return {
    Window: Window
  }
})
