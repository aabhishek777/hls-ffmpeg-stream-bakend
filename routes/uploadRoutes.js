
import {Router} from "express";
import {uploader} from "../services/multer.js";
import {v4 as uuidv4} from 'uuid'
import { exec } from "child_process";
import fs from 'fs'
import {stderr, stdout} from "process";

import path from 'path';
import {fileURLToPath} from "url";



const router = Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadMiddleware = (req,res) => {
	
}

router.get("/",(req,res) => {
	res.status(200).json({"msg":"server is runninng"})
})

router.post('/upload-video',uploader.single("file"),(req,res) => {

	console.log(req);

	const filePath = req.file.path;
	const outputDir = path.join(__dirname, 'uploads', uuidv4());
	const outputM3U8 = path.join(outputDir, 'index.m3u8');
	const outputSegments = path.join(outputDir, 'segment%03d.ts');
  
	// Create the directory if it doesn't exist
	fs.mkdirSync(outputDir, { recursive: true });
  
	const command = `ffmpeg -i ${filePath} -c:v libx264 -c:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputSegments}" -start_number 0 ${outputM3U8}`;
  
	exec(command, (error, stdout, stderr) => {
	  if (error) {
		console.error(`FFmpeg error: ${stderr}`);
		return res.status(500).json({ error: 'FFmpeg command failed', details: stderr });
	  }
  
	  console.log('FFmpeg command executed successfully!');
	  res.json({ message: 'Video processed successfully', playlist: outputM3U8 });
	});

	// const vdoId = uuidv4();
	// const vdoPath = req.file.path;
	// const outputPath = `${process.cwd()}/uploads/${vdoId}`;
	// const hlsPath = `${outputPath}/index.m3u8`;

	// console.log(hlsPath);

	// if(!fs.existsSync(outputPath)) {
	// 	fs.mkdirSync(outputPath,{recursive:true})
	// }

	// const ffmpegCommand = `ffmpeg -i ${vdoPath} - codec: v libx264 - codec: aaac - hls_time 10 - hls_playlist_type vod - hls_segment_filename "${outputPath}/segment%03d.ts" - start_number 0 ${hlsPath}`;

	// exec(ffmpegCommand,(error,stdout,stderr) => {
	// 	if(error) {
	// 		console.log(error);
	// 		res.status(400).json({"msg":error})

	// 	}
	// 	res.status(400).json({"msg":stderr,stdout})

	// })


	console.log("ffmpge command executed succesfully!");


	
})


export default router;