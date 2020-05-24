const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const redirectIf404 = require('./middleware/redirect');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();

//set static folder
app.use(express.static(path.join(__dirname, 'dist')));

//Body Parser Middleware
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//Email route
app.use('/api/email', require('./routes/api/email'));

app.use(logger);
app.use(redirectIf404);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
