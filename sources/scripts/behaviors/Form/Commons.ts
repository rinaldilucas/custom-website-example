import mask from './Masks/Commons';
import validate from './Validate/Commons';

export default {
    mask: mask.mask,
    validate: {
        cleanOnSerialize: Object.keys(mask.mask.ui).map((item) => mask.mask.ui[item]),
        ...validate.validate
    }
};
