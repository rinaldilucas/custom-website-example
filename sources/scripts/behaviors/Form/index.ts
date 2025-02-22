import Form from './Validate/Constructor';
import FormMasks from './Masks/Constructor';

export default (options) => ({
    Form: {
        behaviorClass: Form,
        rules: options.rules
    },
    FormMasks: {
        behaviorClass: FormMasks,
        rules: options.rules
    }
});
