$(function() {
  var $headSlideBlock = $("#head-slider-block");
  var sliderBlockPosSource = $("#head-slider-block").css("left");
  var i = 0,
    n = 0;
  $("#head-nav li").each(function() {
    $(this).mouseenter(function() {
      var liWidth = parseInt($(this).width());
      var liLeft = parseInt($(this).offset().left);
      var sliderBlockLeft = parseInt($headSlideBlock.offset().left);
      var sliderBlockCur = parseInt($headSlideBlock.css("left"));

      var sliderBlockPos = sliderBlockCur + (liLeft - sliderBlockLeft) + liWidth / 2 - 26;

      if (parseInt(sliderBlockPosSource) > 0) {
        $headSlideBlock.stop().animate({
          left: sliderBlockPos
        }, 50);
      } else {
        $headSlideBlock.css({
          left: sliderBlockPos
        })
      }
    }).mouseleave(function() {
      console.log(i++);
    })
  })
  $("#head-nav").mouseleave(function() {
    $headSlideBlock.stop().animate({
      left: sliderBlockPosSource
    }, 3)
    console.log(sliderBlockPosSource + "n" + (n++));
  })
});
