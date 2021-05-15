const db = require("../../models");
const RestaurantPhotos = db.restaurant_photos;
//GCP Cloud Storage
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({ keyFilename: './keys/cloud_storage_service_account.json' });
const cloudStorageBaseURL = 'https://storage.googleapis.com/';

exports.addRestaurantPhoto = (req,res) => {
  const { restoranID } = req.body;
  const filePhoto = req.files.photo;

  if (!restoranID || !filePhoto) {
    return res.status(400).send({ message: "Data incomplete!" });
  }
  
  let oldFileName = filePhoto.name;
  const newFileName = oldFileName.split(' ').join('_');
  const uploadPath = './temp_folder/' + newFileName;

  filePhoto.mv(uploadPath, async function(err) {
    if (err){
      return res.status(500).send(err);
    }
    
    const bucketname = 'zapple_res_photos';
    const res_bucket = await storage.bucket(bucketname).upload(uploadPath);
    const public_link = cloudStorageBaseURL + bucketname + '/' + newFileName;
    
    const new_entry = {
      restoranID: restoranID,
      link: public_link
    };

    fs.unlink(uploadPath, (err) => {
      if (err) console.log(err);
    });

    RestaurantPhotos.create({ new_entry })
    .then(() => {
      res.status(200).send({ message: "Berhasil terinput!"});
    })
    .catch(err => {
      res.status(500).send({ message: "Terjadi kesalahan saat menambahkan gambar restoran." })
    })
  });
}