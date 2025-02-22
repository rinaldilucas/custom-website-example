import scope from '../scope';
import Base from './_BaseView';
import Spacer from '../behaviors/Spacer';
import Form from '../behaviors/Form';

scope.views.Form = Base.extend({
    template: require('templates/pages/form.hbs'),
    name: 'formulario',
    ui: {
        fileUploadButton: '[data-file-upload-button]',
        fileUploadName: '[data-file-upload-name]'
    },
    events: {
        'change @ui.fileUploadButton': 'uploadFile'
    },
    behaviors: {
        Spacer,
        ...Form({
            rules: [require('../behaviors/Form/Commons')]
        })
    },
    uploadFile: function (e) {
        if (e.target.files.length) {
            const file = e.target.files[0].name;

            this.ui.fileUploadName.text(file);
        }
    }
});

export default scope.views.Form;
