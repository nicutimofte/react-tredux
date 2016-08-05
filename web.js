'use strict';
/**
 * Created by Adrian on 12-Apr-16.
 */
const thorin = require('thorin');

thorin
  .addTransport(require('thorin-transport-http'));

/* Plugin definition */
thorin
  .addPlugin(require('thorin-plugin-render'), 'render');

thorin.on(thorin.EVENT.INIT, () => {
    thorin.dispatcher
        .addAction('home')
        .alias('GET', '*')
        .render('index.html');

});

thorin.run((err) => {

});