import Marionette from 'backbone.marionette/lib/backbone.marionette.min';
import $ from 'jquery';
import 'jquery-validation';
import Toastify from 'toastify-js';

export default Marionette.Behavior.extend({
    ui: {
        form: 'form:not([data-form-bypass])'
    },
    onAttach: function () {
        this.onRender.apply(this);
    },
    onRender: function () {
        this.onBuild.apply(this);
    },
    onBuild: function () {
        const self = this;

        this.ui.form.each(function () {
            const rules = self.getOption('rules');

            if (rules) {
                for (let rule = 0; rule < rules.length; rule++) {
                    const validate = rules[rule].default ? rules[rule].default.validate : rules[rule].validate;

                    if (validate && validate.methods) {
                        validate.methods(jQuery.validator);
                    }
                }
            }

            self.formListener($(this));
        });
    },
    formListener: function (form) {
        const rules = this.getOption('rules');

        if (rules) {
            for (let rule = 0; rule < rules.length; rule++) {
                const validate = rules[rule].default ? rules[rule].default.validate : rules[rule].validate;

                if (validate && validate.listener) {
                    validate.listener(form);
                }
            }
        }

        this.rebuild(form);
    },
    onFormRebuild: function (form) {
        this.rebuild(form);
    },
    rebuild: function (form) {
        const self = this;

        form.validate({
            ignore: '.ignore,:hidden,[readonly]',
            errorElement: 'p',
            errorPlacement: (error, element) => error.insertAfter(element),
            highlight: (element, errorClass, validClass) => {
                if (element && $(element)[0].hasAttribute('data-file-upload-button')) {
                    $(element).parent().find('[data-error-holder]').removeClass(validClass).addClass(errorClass);
                } else {
                    $(element).removeClass(validClass).addClass(errorClass);
                }
            },
            unhighlight: (element, errorClass, validClass) => {
                if (element && $(element)[0].hasAttribute('data-file-upload-button')) {
                    $(element).parent().find('[data-error-holder]').removeClass(errorClass).addClass(validClass);
                } else {
                    $(element).removeClass(errorClass).addClass(validClass);
                }
            },
            submitHandler: () => {
                const executeOnSubmitHandler = () => {
                    form.data('prevent-submit', true);
                    $('[type=submit], [data-prevent-double-click]').prop('disabled', true);
                    $('[data-prevent-double-click] i').removeClass('icon--hide');

                    const serializedFormData = new FormData(form[0]);
                    const action = form.attr('action');
                    const method = form.attr('method');

                    const successProcess = (response) => {
                        Toastify({
                            text: 'Formulário enviado com sucesso. Caso necessário, entraremos em contato.',
                            duration: 9000,
                            gravity: 'bottom',
                            position: 'center',
                            stopOnFocus: true,
                            className: 'toast toast--success'
                        }).showToast();

                        self.clearInputs(form);
                        $('[type=submit], [data-prevent-double-click]').prop('disabled', false);
                        $('[data-prevent-double-click] i').addClass('icon--hide');
                        form.data('prevent-submit', false);
                    };

                    const errorProcess = (error) => {
                        Toastify({
                            text: 'Erro ao enviar mensagem. Se o erro persistir, entre em contato conosco através dos contatos do website.',
                            duration: 9000,
                            gravity: 'bottom',
                            position: 'center',
                            stopOnFocus: true,
                            className: 'toast toast--error'
                        }).showToast();

                        $('[type=submit], [data-prevent-double-click]').prop('disabled', false);
                        $('[data-prevent-double-click] i').addClass('icon--hide');
                        form.data('prevent-submit', false);
                    };

                    const options = {
                        contentType: method === 'POST' ? false : 'application/x-www-form-urlencoded; charset=UTF-8',
                        processData: method !== 'POST',
                        url: form.attr('action'),
                        method: form.attr('method'),
                        mimeType: form.attr('mimeType'),
                        data: serializedFormData,
                        success: (response) => successProcess(response),
                        error: (response) => errorProcess(response.responseJson ? response.responseJson : '')
                    } as any;

                    form.trigger('beforeProcessRequest', [options]);

                    if (action) {
                        $.ajax(options);
                    } else {
                        form.trigger('processRequest', [serializedFormData, successProcess, errorProcess]);
                    }
                };

                executeOnSubmitHandler();

                return false;
            }
        });
    },
    clearInputs: (form) => {
        const fields = form.find(['input'].join(','));

        fields.each((index, element) => {
            const input = $(element);

            input.val('');
        });
    }
});

$.extend($.validator.messages, {
    date: 'Digite uma data válida.',
    digits: 'Este campo só aceita dígitos.',
    email: 'Informe um email válido.',
    equalTo: 'Os valores precisam ser iguais.',
    number: 'Este campo só aceita números.',
    remote: 'O campo inválido.',
    required: 'O campo obrigatório.',
    url: 'O endereço do site deve iniciar com http:// ou https://.',
    maxlength: $.validator.format('O campo deve conter no máximo {0} caracteres.'),
    minlength: $.validator.format('O campo deve conter no mínimo {0} caracteres.'),
    rangelength: $.validator.format('O campo deve conter de {0} até {1} caracteres.'),
    range: $.validator.format('Apenas numeros de {0} até {1}.'),
    max: $.validator.format('Apenas números até {0}.'),
    min: $.validator.format('Apenas números a partir de {0}.')
});

(jQuery.validator as any).methodGroup = (name, rules, message) => {
    message = message || 'Campo com erro';
    const getMessage = () => message;

    jQuery.validator.addMethod(
        name,
        function (value, element) {
            for (let x = 0; x < rules.length; x++) {
                const rule = rules[x];
                const check = jQuery.validator.methods[rule.rule];

                if (check && !check.apply(this, [value, element, rule.param])) {
                    message = jQuery.validator.messages[rule.rule];
                    message = $.isFunction(message) ? message.apply(this, rule.param) : message;

                    return false;
                }
            }

            return true;
        },
        getMessage
    );
};
