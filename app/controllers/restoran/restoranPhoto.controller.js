const db = require("../../models");
const Photo_Restoran = db.photo_restoran;


exports.addRestaurantPhoto = (req,res) => {
  const { restoranID } = req.body;
  const filePhoto = req.files.photo;
  const uploadPath = './temp_folder/' + filePhoto.name;

  filePhoto.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.status(200).send('File uploaded!');
  });


}