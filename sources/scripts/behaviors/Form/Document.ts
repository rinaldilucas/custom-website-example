import mask from './Masks/Document';
import validate from './Validate/Document';

export default {
    mask: mask.mask,
    validate: {
        cleanOnSerialize: Object.keys(mask.mask.ui).map((item) => mask.mask.ui[item]),
        ...validate.validate
    }
};
