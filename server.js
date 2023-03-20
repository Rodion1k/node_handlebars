const express = require("express");
const bodyParse = require("express");
const PhoneService = require('./services/crud.service');

const hbs = require("express-handlebars").create({
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
    helpers: {
        refuse: (context) => {
            // teg a with href
            return '<a href="/api/phones">' + 'Отказаться' + '</a>';
        }
    }
});
module.exports = () => {
    const app = express();
    //services
    const phoneService = new PhoneService();
    //controllers
    const apiController = require('./controllers/api.controller')(
        phoneService,
    );
    app.use('/static', express.static('public'));
    app.engine("hbs", hbs.engine);
    app.set("view engine", "hbs");
    app.set("views", [`${__dirname}/views/`, `${__dirname}/views/phone/`]);
    app.use(bodyParse.json());
    app.use('/api', apiController)
    // app.use('/', function (_, response) {
    //     response.render("home.hbs");
    // });
    return app;
}
