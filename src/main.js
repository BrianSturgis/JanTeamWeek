/* eslint-disable */
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {openWidget} from './js/compressAPI.js';

import {imgCompress, imgEffects,imgBlurFace, imgScaling, vidCompress, vidPreview, vidSloMo, vidToGif} from './js/transform.js'







async function checkFileType(fileInfo){
	if((fileInfo.secure_url.match(/.mov|.mp4|.avi$/))){
		const video = await vidCompress(fileInfo);
		window.open(video);
		$("#compress").hide();
	} else if ((fileInfo.secure_url.match(/.jpe*g|.png|.gif|.svg$/))){
		const photo = await imgCompress(fileInfo);
		window.open(photo);
		$("#compress").hide();
	}
}

// Store HTML File Input in Variable
$(document).ready(function(){
	localStorage.clear();
	$("#widget").append("<script src ='https://widget.cloudinary.com/v2.0/global/all.js' type='text/javascript'></script>");
	$("#open-widget").on('click', async function(){
		await openWidget();
		let fileInfo;
		$("#compress").delay(1000).fadeIn();
		// After widget is opened adds event listener to console log the value of resultInfo in local storage
		$("#compress").on('click', async function(){
			$("#form").show()
			let fileInfo;
			fileInfo = JSON.parse(localStorage.getItem('resultInfo'));
			checkFileType(fileInfo);
			console.log(fileInfo);
		});
		// Add a filter to currently uploaded photo
		$("#test").on('click', async function(){
			fileInfo = JSON.parse(localStorage.getItem('resultInfo'));
			const photo = await imgEffects(fileInfo, $("#test").val());
			window.open(photo);
		});
		// Add scaling to user image
		$("#someBSButton").on('click', async function(){
			fileInfo = JSON.parse(localStorage.getItem('resultInfo'));
			const photo = await imgScaling(fileInfo, $("#bsWidthInput").val(), $("#bsHeightInput").val());
			window.open(photo);
		});

		// Add facial recognition with auto blur effect
    $("#blurred").on('click', async function() {

		

      fileInfo = JSON.parse(localStorage.getItem('resultInfo'));
      const blurredPhoto = await imgBlurFace(fileInfo, $('#blurred').val());
      window.open(blurredPhoto);

    });
		$("#moarBSButton").on('click', async function(){
			fileInfo = JSON.parse(localStorage.getItem('resultInfo'));
			const video = await vidScaling(fileInfo, $("#bsWidthInput").val(), $("#bsHeightInput").val());
			window.open(video);
		});

    })

    // Uses video file in local storage and adds slo motion effect
    $('#slomo').on('click', async function() {
      fileInfo = JSON.parse(localStorage.getItem('resultInfo'));
      const slomoVid = await vidSloMo(fileInfo, $('#slomo').val());
      window.open(slomoVid);
    })


    $('#gif').on('click', async function() {
      fileInfo = JSON.parse(localStorage.getItem('resultInfo'));
      const gif = await vidToGif(fileInfo, $('#gif').val());
      window.open(gif);
    })


	});
});