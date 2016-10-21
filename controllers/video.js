var Video = require('../model/video');
var responses = require('../config/json_response.js')

module.exports = [
  //Video Methods
  {
    method: 'GET',
    path: '/api/v1/videos/{id}',
    config: { auth: 'token' },
    handler: (req, res) => {
      Video.findById(req.params.id, function (err, video) {
        var output;

        if (err) {
          output = responses.failureMessage;
          output.message = err;

          console.log(err);
        } else {
          output = responses.successMessage;
          
          if (!video) {
            output.message = "No video found by that id";
          } else {
            output.message = "Video found";
            output.data = video;
          }  
        }

        return res(output).type('application/json');
      });
    }
  },
  {
    method: 'POST',
    path: '/api/v1/videos/',
    config: { auth: 'token' },
    handler: (req, res) => {
      var request = req.payload;
      
      var locArray = request.location.split(",");
      for(var i = 0; i<locArray.length; i++) {
        locArray[i] = +locArray[i];
      }

      Video.create({
        name: request.name,
        owner: request.owner,
        description: request.description,
        tags: request.tags.split(","),
        location: locArray,
        equipment: request.equipment,
        video_uri: request.video_uri,
        favs: 0
      },
     (err, video) => {
        var output;
        
        if (err) {
          output = responses.failureMessage;
          output.message = err;

          console.log(err);
        } else {
          output = responses.successMessage;
          output.message = "Video successfully created";
          output.data = { id: video._id };

          console.log('Video created: ' + video);
        }

        return res(output).code(201).type('application/json');
      });
    },
  },
  {
    method: 'DELETE',
    path: '/api/v1/videos/{id}',
    config: { auth: 'token' },
    handler: (req, res) => {
      var condition = { _id: req.params.id };

      Video.remove(condition, (err) => {
        var output;

        if (err) {
          output = responses.failureMessage;
          output.message = err;

          console.log(err);
        } else {
          output = responses.successMessage;
          output.message = "Video successfully deleted";
        }

        return res(output).code(202).type('application/json');
      });
      
    }
  },
  {
    method: 'PUT',
    path: '/api/v1/videos/{id}',
    config: { auth: 'token' },
    handler: (req, res) => {
      var request = req.payload;
      var condition = { _id: req.params.id };

      var locArray = request.location.split(",");
      for(var i = 0; i<locArray.length; i++) {
        locArray[i] = +locArray[i];
      }

      Video.update(condition,  
      {
        name: request.name,
        description: request.description,
        tags: request.tags.split(","),
        location: locArray,
        equipment: request.equipment,
        video_uri: request.video_uri 
      },
     (err, video) => {
        var output;
        
        if (err) {
          output = responses.failureMessage;
          output.message = err;

          console.log(err);
        } else {
          output = responses.successMessage;
          output.message = "Video successfully updated";
          output.data = { id: video._id };

          console.log('Video updated: ' + video);
        }

        return res(output).type('application/json');
      });
    }
  },
  // Favorites Methods
  {
    method: 'PUT',
    path: '/api/v1/videos/{id}/favorites/add',
    config: { auth: 'token' },
    handler: (req, res) => {
      Video.findByIdAndUpdate(req.params.id, 
      { $inc: { favs: 1 } },
      function (err, video) {
        var output;

        if (err) {
          output = responses.failureMessage;
          output.message = err;

          console.log(err);
        } else {
          output = responses.successMessage;
          
          if (!video) {
            output.message = "No video found by that id";
          } else {
            output.message = "Video favorited";
            output.data = video;
          }  
        }

        return res(output).type('application/json');
      });
    }
  },
  {
    method: 'PUT',
    path: '/api/v1/videos/{id}/favorites/remove',
    config: { auth: 'token' },
    handler: (req, res) => {
      Video.findByIdAndUpdate(req.params.id, 
      { $inc: { favs: -1 } },
      function (err, video) {
        var output;

        if (err) {
          output = responses.failureMessage;
          output.message = err;

          console.log(err);
        } else {
          output = responses.successMessage;
          
          if (!video) {
            output.message = "No video found by that id";
          } else {
            output.message = "Favorite removed";
            output.data = video;
          }  
        }

        return res(output).type('application/json');
      });
    }
  }
  // Comments Methods
];