define(function(require, exports, module) {

    var zoe = require('zoe'),

        $ = require('jquery'),
        _ = require('underscore');



    zoe(function() {
        var gallerySlider1 = zoe('gallery_slider-1'),
            gallerySlider2 = zoe('gallery_slider-2'),
            gallerySlider3 = zoe('gallery_slider-3'),
            gallerySlider4 = zoe('gallery_slider-4');

        zoe.use(['menu', 'panel', 'slider'], function(Menu, Panel, Slider) {
            var galleryTab = new Menu({
                    el   : $('#gallery_tab').get(0),
                    init : 'gallery-1'
                }),

                galleryPanel = new Panel({
                    el    : $('#gallery_panel').get(0),
                    init  : 'gallery-1',
                    speed : 500
                });

            galleryTab.render();
            galleryPanel.render();
            galleryPanel.binding(galleryTab);

            galleryPanel.on('update', function(index) {
                switch (index) {
                    case 0 :
                        gallerySlider1.active(true);
                        gallerySlider2.active(false);
                        gallerySlider3.active(false);
                        gallerySlider4.active(false);

                        break;

                    case 1 :
                        gallerySlider1.active(false);
                        gallerySlider2.active(true);
                        gallerySlider3.active(false);
                        gallerySlider4.active(false);

                        break;

                    case 2 :
                        gallerySlider1.active(false);
                        gallerySlider2.active(false);
                        gallerySlider3.active(true);
                        gallerySlider4.active(false);

                        break;

                    case 3 :
                        gallerySlider1.active(false);
                        gallerySlider2.active(false);
                        gallerySlider3.active(false);
                        gallerySlider4.active(true);

                        break;
                }
            });

            galleryPanel.trigger('update', 'gallery-3');


            var galleryTabHL = new Slider({
                    className : 'gallery_tab-highlight',
                    nav       : false,
                    hover     : false,
                    auto      : false,
                    loop      : false,

                    tmpl      : _.template([
                        '<img src="<%= src %>" />'
                    ].join('')), 

                    data      : [{
                        id  : 'gallery-1',
                        src : 'images/gallery-tab-1.jpg'
                    },{
                        id  : 'gallery-2',
                        src : 'images/gallery-tab-2.jpg'
                    },{
                        id  : 'gallery-3',
                        src : 'images/gallery-tab-3.jpg'
                    },{
                        id  : 'gallery-4',
                        src : 'images/gallery-tab-4.jpg'
                    }]
                });

            galleryTab.$el.after(galleryTabHL.render().$el);
            galleryTabHL.binding(galleryTab);

            galleryTabHL.on('update', function(index) {
                galleryTabHL.$el.animate({'left' : 0 + index * 300}, 500);
            });
        });
    });
    
});