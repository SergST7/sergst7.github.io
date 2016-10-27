//= parts/jquery.js
;
//= parts/_RezigTmpl.js
;
//= parts/_owl.carousel.js
;
//= parts/_masonry.pkgd.js
;

$(document).ready(function () {

    if (!window.console) {
        console = {
            log: function () {
            }
        }
    }
    ;

    var flag = 0;

    var APIkey = '3605853-603b3ab86a3757c7d387139d0';

    // var searchStr = $('#search').val().trim();
    function getimage(q) {
        var URL = 'https://pixabay.com/api/?key=' + APIkey + '&q=' + q + '&image_type=photo';

        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var xhr = new XHR();
        xhr.open('GET', URL, true);
        xhr.onload = function () {
            var data = JSON.parse(this.responseText);
            if (parseInt(data.totalHits) > 0) {
                console.log(data);
                render('fotoTmpl', data, '.grid');
                masonryInit();
            } else {
                console.log('No results');
            }
        };
        xhr.onerror = function () {
            alert('Сервер  не отвечает');
            console.log('Ошибка ' + this.status);
        };
        xhr.send();
    }

    function render(id, obj, parent) {
        var $parent = $(parent);
        $parent.html('');
        var result = tmpl(id, obj);
        $parent.append(result);
    }

    var carouselSettings = {
        items: 2,
        singleItem: true,
        itemsScaleUp: true,

        //Basic Speeds
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1000,

        //Autoplay
        autoPlay: false,
        stopOnHover: true,

        //Pagination
        pagination: false,
        paginationNumbers: false,
        navigation: true,

        // Responsive
        responsive: true,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: window
    };

    $(".owl-carousel").owlCarousel(carouselSettings);

    function masonryInit() {
        var $grid = $('.grid');
        if (flag) {
            $grid.masonry('destroy');
        }
        $grid.masonry({
            itemSelector: '.grid__item',
            columnWidth: '.grid__sizer',
            gutter: '.grid__gutter-sizer',
            percentPosition: true
        });
        flag = 1;
    }

    $('.search__btn').on('click', searchQuery);

    function searchQuery(e) {
        e.preventDefault();
        var q = $('.search__input').val();
        q = $.trim(q);
        if (q) {
            getimage(q)
        }
        else return;
    }

    getimage('sport');

});