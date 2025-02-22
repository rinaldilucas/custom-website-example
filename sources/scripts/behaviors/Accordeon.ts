import scope from '../scope';
import Marionette from 'backbone.marionette/lib/backbone.marionette.min';

scope.behaviors.Accordeon = Marionette.Behavior.extend({
    onAttach: function (view) {
        this.build(view.$el);
    },
    build: function () {
        const contents = $('.faq__accordeon-text');
        const titles = $('.faq__accordeon-title');

        titles.on('click', (event) => {
            const title = $(event.currentTarget);

            contents.filter(':visible').slideUp((event) => $(event).prev('.faq__accordeon-title').removeClass('faq__accordeon-title--open'));
            const content = title.next('.faq__accordeon-text');

            if (!content.is(':visible')) {
                content.slideDown(() => title.addClass('faq__accordeon-title--open'));
            }
        });
    }
});

export default scope.behaviors.Accordeon;
