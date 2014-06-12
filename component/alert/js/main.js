require.config({
  paths: {
    jquery: '../lib/jquery-1.11.1',
    jqueryUI: '../lib/jquery-ui-1.10.4'
  }
});

require(['jquery', 'window'], function ($, w) {
  $('#a').on('click', function () {
    var win = new w.Window();
    win.alert({
      content: 'welcome body!',
      handler4Alert: function () {
        alert('you clicked the OK button');
      },
      handler4Close: function () {
        alert('you clicked the Close button');
      },
      width: 300,
      height: 150,
      y: 50,
      hasCloseBtn: true,
      skinClassName: 'window_skin_a_obsolete'
    }).on('alert', function() {
      alert('the first OK button');
    }).on('alert', function() {
      alert('the second OK button');
    }).on('close', function() {
      alert('first close handler');
    });
  });
});
