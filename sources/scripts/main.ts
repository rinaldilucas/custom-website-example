import scope from './scope';
import App from './app';
import Main from './views/Init';
import Init from './Routes/Init';

((scope) => {
    ('use strict');

    const base: any = (document.getElementById('base-id') as HTMLAnchorElement).href.split(location.host).pop();

    scope.$ = require('jquery');
    scope.app = App;
    scope.config = {
        urls: {
            base,
            origin: location.protocol + '//' + location.hostname,
            site: location.href.replace('index.html', '')
        },
        localhost: window.location.host.indexOf('localhost') > -1
    };
    scope.app.on('start', Main);
    scope.app.on('start', Init);
    scope.app.start();
})(scope);
