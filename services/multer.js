import multer from "multer";
import {v4 as uuidv4} from "uuid"
import path from 'path'
import fs from "fs"



const uploadDir = path.join(process.cwd(),'/uploads');


console.log(uploadDir);
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

//diskStorage and memoryStorage are two types of stoarge engines prpvided by multer,

const storage = multer.diskStorage({
	destination: (req,file,callback) => {
		callback(null,uploadDir);
	},
	filename: (req,file,callback) => {
		const suffix = uuidv4() + path.extname(file.originalname)// we passed originalname whic is used to extract the last characters after .

		console.log(suffix);
		callback(null,suffix);
	}
})

export const uploader = multer({storage})