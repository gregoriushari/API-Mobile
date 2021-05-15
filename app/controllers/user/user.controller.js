//libraries
const path = require('path');
const fs = require("fs");

//db
const db = require("../../models")
const User = db.user;

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

exports.addProfilePicture = (req,res) => {
  const userID = req.userID;

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
      const bucketname = 'zapple_profile_picture';
      const res_bucket = await storage.bucket(bucketname).upload(uploadPath);
      public_link = cloudStorageBaseURL + bucketname + '/' + newFileName;
    }
    catch(err) {
      return res.status(500).send({ message: "Terjadi kesalahan saat mengupload gambar." });
    }

    fs.unlink(uploadPath, (err) => {
      if (err) console.log(err);
    });

    User.update({ profile_picture: public_link }, {where: { userID: userID}})
      .then(() => {
        res.status(200).send({ message: "Profile picture berhasil diupdate!"})
      })
      .catch(err => {
        res.status(500).send({ message: "Terjadi kesalahan saat memasukkan gambar ke sistem database" });
      });
  });
}