import express  from "express"
import cors from 'cors'
import morgan from "morgan"
// import "path"
import path from 'path';
import { fileURLToPath } from "url";



import uploadRoutes from './routes/uploadRoutes.js'








const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(cors({
	origin: ['*']
}));


app.use(express.json());
// app.use(express.urlencoded());
app.use(morgan("tiny"))


//for testing
app.get("/",(req,res) => {
	res.send("hello")
})

app.use('/api/v1',uploadRoutes);








const PORT = process.env.PORT || 8000;
app.listen(PORT,() => {
	console.log("server is running on " + PORT)
});