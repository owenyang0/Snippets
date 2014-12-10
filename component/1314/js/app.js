window.onload = function () {
  var noticeClose = document.querySelector('.notice-close-button');
  var notice = document.querySelector('.app-notice');
  var joinButton = document.querySelector('.restart-button');

  noticeClose.addEventListener('click', function () {
    notice.style.display = 'none';
  });

  joinButton.addEventListener('click', function () {
    notice.style.display = "block";
  });
}
