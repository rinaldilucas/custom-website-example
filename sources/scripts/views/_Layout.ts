import scope from '../scope';
import Base from './_BaseView';
import Backbone from 'backbone';

let firstLoop = true;

scope.views.Layout = Base.extend({
    name: 'layout',
    el: '#main',
    partials: {
        content: {
            region: '#site-content'
        },
        header: {
            region: '#site-header',
            partial: require('../partials/Header')
        },
        footer: {
            region: '#site-footer',
            partial: require('../partials/Footer')
        }
    },
    initialize: function () {
        const self = this;
        let last: string;

        self.getRegion('content').on('show', (layout, view) => {
            !firstLoop && $('body').addClass('page-changed');
            $('body')
                .removeClass(last)
                .addClass((last = view.name));

            setTimeout(() => {
                firstLoop = false;
                $('body').removeClass('page-changed').removeClass('on-loading').addClass('on-loaded');
                $('.loading').addClass('loaded');

                $('#preloader').delay(350).fadeOut('slow');
                const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

                if (!isChrome) {
                    (document.getElementsByClassName('infinityChrome')[0] as HTMLElement).style.display = 'none';
                    (document.getElementsByClassName('infinity')[0] as HTMLElement).style.display = 'block';
                }
            }, 500);
        });
    },
    go: function (view, callback) {
        const self = this;

        self.partials.content.instance = view;
        $('body').addClass('on-loading');

        self.load()
            .done((response) => {
                if (response.error) return Backbone.history.navigate('error', { trigger: true });

                self.populate();
                scope.app.started = true;

                callback && callback();
            })
            .catch(() => callback && callback());
    }
});

export default scope.views.Layout;
