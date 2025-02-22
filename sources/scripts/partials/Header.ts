import scope from '../scope';
import Base from './_BasePartial';

scope.partials.Header = Base.extend({
    name: 'header',
    template: require('templates/components/header.hbs'),
    ui: {
        menuButton: '[data-header-toggle]',
        menuNav: '[data-header-nav]',
        menuLink: '[data-header-link]',
        menuLabel: '[data-header-label]',
        menuCopyright: '[data-header-copyright]'
    },
    events: {
        'click @ui.menuButton': 'toggleMenu',
        'click @ui.menuLink': 'closeMenu'
    },
    onAttach: function () {
        const self = this;

        this.ui.menuCopyright.html('© Hub Comercial <br>Todos Direitos Reservados.');

        $(document).on('mouseup', (event: any) => {
            if (!$(self.ui.menuNav).is(event.target) && $(self.ui.menuNav).has(event.target).length === 0 && !$(self.ui.menuLabel).is(event.target) && $(self.ui.menuLabel).has(event.target).length === 0 && !event.target.hasAttribute('data-outer-link')) {
                $('html').removeClass('active-menu');
                $('.header__button input').prop('checked', false);
            }
        });
    },
    toggleMenu: () => {
        $('html').toggleClass('active-menu');
        if (!$('html').hasClass('active-menu')) {
            $('.header__button input').prop('checked', false);
        }
    },
    closeMenu: () => {
        $('html').removeClass('active-menu');
        $('.header__button input').prop('checked', false);
    }
});

export default scope.partials.Header;
