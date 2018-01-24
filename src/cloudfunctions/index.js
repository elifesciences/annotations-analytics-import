var request = require('request');
const Storage = require('@google-cloud/storage');
const projectId = 'elife-analytics';
const storage = Storage({
  projectId: projectId,
});

exports.fetchAnnotations = function(req, res) {
  request('https://hypothes.is/api/search?group=imRGyeeV&limit=200', function (error, response, body) {

    var annotationsBucket = storage.bucket('elife-annotations-export');
    var file = annotationsBucket.file('annotations-generated.json');
    file.save(body, function(err) {
      if (!err){
        res.send("file written successfully")
      }
    })
  });
};
