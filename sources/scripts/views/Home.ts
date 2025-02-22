import scope from '../scope';
import Base from './_BaseView';
import CopyToClipboard from '../behaviors/CopyToClipboard';
import Spacer from '../behaviors/Spacer';
import Carousel from '../behaviors/Carousel';
import Parallax from '../behaviors/Parallax';
import Morphext from '../behaviors/Morphext';
import Accordeon from '../behaviors/Accordeon';

scope.views.Home = Base.extend({
    template: require('templates/pages/home.hbs'),
    templateContext: {},
    name: 'home',
    behaviors: {
        CopyToClipboard,
        Spacer,
        Carousel,
        Parallax,
        Morphext,
        Accordeon
    },
    ui: {
        replayButton: '[data-replay-button]',
        introVideo: '[data-video]'
    },
    events: {
        'click @ui.replayButton': 'replayVideo'
    },
    replayVideo: function () {
        this.ui.introVideo.get(0).pause();
        this.ui.introVideo.get(0).currentTime = '0';
        this.ui.introVideo.get(0).play();
    }
});

export default scope.views.Home;
