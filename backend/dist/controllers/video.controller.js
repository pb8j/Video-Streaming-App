"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideoController = void 0;
// import { processVideoForHLS } from '../services/video.service';
// import fs from 'fs';
const uploadVideoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
        return;
    }
    const videoPath = req.file.path;
    // const outputPath = `output/${Date.now()}`;
    // processVideoForHLS(videoPath, outputPath, (err, _) => {
    //     if(err) {
    //         res.status(500).json({
    //             success: false,
    //             message: 'An error occurred while processing the video'
    //         });
    //         return;
    //     }
    //     // Delete the video file after processing
    //     fs.unlink(videoPath, (err) => {
    //         if(err) {
    //             console.log('An error occurred while deleting the video file:', err);
    //         }
    //     });
    // });
    res.status(200).json({
        success: true,
        message: 'Video processed successfully',
        videoPath
    });
});
exports.uploadVideoController = uploadVideoController;
