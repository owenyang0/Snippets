require.config({
  paths: {
    jquery: '../lib/jquery-1.11.1',
    jqueryUI: '../lib/jquery-ui-1.10.4'
  }
});

require(['jquery', 'Window'], function ($, w) {
  $('#a').on('click', function () {
    new w.Window().alert({
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
    });
  });
});
