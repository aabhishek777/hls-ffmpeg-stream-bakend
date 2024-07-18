

import {uploader} from "../services/multer"

export const upload = (req,res,next) => {

	uploader(req,res,function(err) {
		if(err instanceof multer.MulterError) {
			// A Multer error occurred when uploading.
			console.log(err);
			return res.status(400).json({"msg": err})
		} else if(err) {
			// An unknown error occurred when uploading.
			console.log(err);
			return res.status(400).json({"msg": err})
		}
		// Everything went fine.
		next()

	}
	)
}