import scope from '../scope';
import Marionette from 'backbone.marionette/lib/backbone.marionette.min';
import 'slick-carousel';

scope.behaviors.Carousel = Marionette.Behavior.extend({
    ui: {
        carousel: '[data-carousel]'
    },
    onAttach: function () {
        this.build(this.$el);
    },
    onChildviewAttach: function (view) {
        const content = view.$el;

        if (content.find('[data-carousel]').length) {
            this.build(content);
        }
    },
    build: function () {
        $.each(this.ui.carousel, (index, object) => {
            const interval = +$(object).data('carousel-interval') * 1000;
            const autoplay = $(object).data('carousel-autoplay');

            $(object).slick({
                dots: true,
                arrows: false,
                autoplay: autoplay || false,
                autoplaySpeed: interval || 3000,
                adaptiveHeight: true
            });
        });
    }
});

export default scope.behaviors.Carousel;
