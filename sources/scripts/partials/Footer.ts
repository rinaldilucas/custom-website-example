import scope from '../scope';
import Base from './_BasePartial';

scope.partials.Footer = Base.extend({
    name: 'footer',
    template: require('templates/components/footer.hbs'),
    ui: {
        yearText: '[data-footer-copyright]'
    },
    onAttach: function () {
        this.ui.yearText.html(`© 2021 — ${new Date().getFullYear()} Hub Comercial.`);
    }
});
export default scope.partials.Footer;
