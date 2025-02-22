import scope from '../scope';
import AppRouter from 'marionette.approuter/lib/marionette.approuter.min';

import Home from '../views/Home';
import Form from '../views/Form';

const AppController = {
    index: () => scope.app.go(new Home()),
    form: () => scope.app.go(new Form())
};

scope.routes.Main = AppRouter.extend({
    controller: AppController,
    appRoutes: {
        '(/)(index.html)': 'index',
        'formulario(/)(index.html)': 'form'
    }
});

export default scope.routes.Main;
