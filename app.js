const server = require('./server')();
(async function () {
    server.listen(3000, () => console.log('Server is running'));
})();
