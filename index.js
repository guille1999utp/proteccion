const express = require("express");
const cors = require("cors");
const app = express();
require("./src/database/index");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const { swaggerDocs } = require("./swagger/swagger");

app.use(cors());
app.use(express.json());
//rutas
app.use(require("./routes/clock"));

swaggerDocs(app, PORT);

app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${PORT}`);
});
