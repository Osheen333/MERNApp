const  app = require('./app.js');
const {connect} = require('./database/connection.js');

const {port} = require('./utils/config')

connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        });
    } catch (error) {
        console.log("Can't connect to the server");
    }
}).catch((error) => {
    console.log('Invalid Database Connection...!');
});

