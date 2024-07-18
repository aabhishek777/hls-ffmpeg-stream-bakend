
import {Router} from "express";
import {uploader} from "../services/multer.js";


const router = Router();



const uploadMiddleware = (req,res) => {
	
}

router.get("/",(req,res) => {
	res.status(200).json({"msg":"server is runninng"})
})

router.post('/upload-video',uploader.single("file"),(req,res) => {

	console.log(req);

	res.status(200).json({"msg":"success fully uploaded"})
})


export default router;