const express = require("express");
const { engine } = require("express-handlebars");
const myConnection = require("express-myconnection");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const userRoutes = require("./routes/user-routes");
const roleRoutes = require("./routes/role-routes");
const userStatusRoutes = require("./routes/userStatus-routes");
const moduleRoutes = require("./routes/module-routes");
const roleModuleRoutes = require("./routes/roleModule-routes");
const loginRoutes = require("./routes/login-routes");

const app = express();
const port = 4000;

//Middleware
app.use(cors());
app.use(express.json());
// app.set('port', 4000);



app.use("/api-v1/user", userRoutes);
app.use("/api-v1/role", roleRoutes);
app.use("/api-v1/userStatus", userStatusRoutes);
app.use("/api-v1/module", moduleRoutes);
app.use("/api-v1/roleModule", roleModuleRoutes);
app.use("/api-v1/login", loginRoutes);


app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'crud-node-app'
}));

app.listen(port, () => {
    console.log(`Listening serve http://localhost:${port}`);
});


