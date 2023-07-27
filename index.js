require('dotenv').config();

const express=require("express");
const bodyParser = require('body-parser');

const {connectDB}=require('./db/connect');
const postRoute=require("./routes/postRoute");
const PORT=process.env.PORT || 8000;
const app=express();

app.use(bodyParser.json());
app.use('/posts', postRoute);
app.use((err, req, res, next) => {
	const errStatus = err.status || 500;
	const errMessage = err.message || "Something went wrong!!!";
	return res.status(err.status).json({
		success: false,
		status: errStatus,
		message: errMessage
	});
});

connectDB();

app.listen(PORT, ()=>{
    console.log(`Listening to the port ${PORT}`); 
})