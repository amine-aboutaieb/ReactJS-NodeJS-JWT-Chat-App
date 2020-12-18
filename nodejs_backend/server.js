const express = require("express");
const app = express();
const port = process.env.PORT || 5500;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/api/user", require("./routes/user"));



app.listen(port, ()=>{
    console.log(`listening on ${port}`);
});
