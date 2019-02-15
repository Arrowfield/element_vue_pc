const express = require('express');
let app = express();
app.use(express.static("static_v1.1"));
app.listen(3000);