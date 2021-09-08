const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
    console.log('Initialized server on port', app.get('port'))
})