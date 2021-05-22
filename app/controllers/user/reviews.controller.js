//libraries
const path = require('path');
const fs = require("fs");

//db
const db = require("../../models");
const Review = db.review;

//GCP Cloud Storage
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({ keyFilename: './keys/cloud_storage_service_account.json' });
const cloudStorageBaseURL = 'https://storage.googleapis.com/';

const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatFileName(date) {
  let day = date.getDate();
  let month = shortMonthNames[date.getMonth()];
  let year = date.getFullYear();

  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;

  let hours = date.getHours();
  let mins = date.getMinutes() + 1;
  let secs = date.getSeconds();

  if (hours < 10) hours = '0' + hours;
  if (mins < 10) mins = '0' + mins;
  if (secs < 10) secs = '0' + secs;
  
  return day + month + year + "_" + hours + mins + secs;
}

function addReviewToDB(res, data){
  Review.create(data)
    .then(() => {
      res.status(200).send({ message: "Input successful!"});
    })
    .catch(err => {
      res.status(500).send({ message: "An error occured while creating review."});
    })
}

exports.addReview = async(req,res) => {
  const { restaurantID, review, score } = req.body;

  let isPhoto = 0;
  let public_link = null;

  const newData = {
    restaurantID: restaurantID,
    userID: req.userID,
    review: review,
    score: score,
    media_link: public_link
  };

  if(req.files != null) {
    isPhoto = 1;
    const filePhoto = req.files.photo;
    const oriFileName = filePhoto.name;
    const fileName = path.parse(oriFileName).name;
    const fileExtension = path.parse(oriFileName).ext;
    const newFileName = formatFileName(new Date()) + '_' + fileName.split(' ').join('_') + fileExtension;
    const uploadPath = './temp_folder/' + newFileName;

    filePhoto.mv(uploadPath, async function(err) {
      if (err){
        return res.status(500).send(err);
      }
      
      try {
        const bucketname = 'zapple_photo_reviews';
        const res_bucket = await storage.bucket(bucketname).upload(uploadPath);
        public_link = cloudStorageBaseURL + bucketname + '/' + newFileName;
      }
      catch(err) {
        return res.status(500).send({ message: "An error occured while uploading picture." });
      }

      fs.unlink(uploadPath, (err) => {
        if (err) console.log(err);
      });

      newData.media_link = public_link;
      addReviewToDB(res, newData);
    });
  }
  else {
    addReviewToDB(res, newData);
  }
}

exports.getReview = (req,res) => {
  const restaurantID = req.params.id;

  Review.findAll({
    where: { restaurantID: restaurantID },
    attributes: ['reviewID', 'restaurantID', 'userID', 'review', 'score', 'media_link']
  })
  .then((data) => {
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(500).send({ message: "An error occured while fetching review."});
  })
}