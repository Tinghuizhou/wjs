/**
 * Created by F on 2017/6/19.
 */
$(function () {
    //获取屏幕的宽度
    function resize() {
        var windowWidth = $(window).width();
        //console.log(windowWidth);
        $('#min_ad > .carousel-inner > .item').each(function (i, item) {
            //item是dom对象要转换成jQuery对象
            var $item = $(item);
            var isSmallscreen = windowWidth < 768;
            //判断屏幕的大小
            var imgSrc = isSmallscreen ? $item.data('img-sm') : $item.data('img-lg');
            $item.css('backgroundImage', 'url(' + imgSrc + ')');
            if (isSmallscreen) {
                $item.html('<img src="' + imgSrc + '"/>');
            } else {
                $item.html("");
            }
        });
    }

    //resize();== $(window).trigger('resize');
    $(window).on("resize", resize).trigger('resize');
    $('[data-toggle="tooltip"]').tooltip();

    //控制标签页样式
    var $ulContainer = $('.nav-tabs');
    //console.log($ulContainer);
    var ulWidth = 0;
    $ulContainer.children().each(function (i, e) {
        //DOM方法
        ulWidth += e.clientWidth;
        //console.log(e.clientWidth);


        //jQuery方法
        //console.log($(e).width());
    });
    if (ulWidth > $(window).width()) {
        $(".ul-wapper").css('width', ulWidth).parent().css('overflow-x', 'scroll');
    }
    var $main_ad = $('#min_ad');
    var startX, endX;
    var offset = 50;
    console.log($main_ad);
    $main_ad.on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    });
    $main_ad.on('touchmove', function (e) {
        endX = e.originalEvent.touches[0].clientX;
        //console.log(endX);
    });
    $main_ad.on('touchend', function (e) {
        var distance = Math.abs(startX - endX);
        if (distance > offset) {
            $(this).carousel(startX > endX ? "next" : "prev");
        }
        //console.log(distance);
    });
});