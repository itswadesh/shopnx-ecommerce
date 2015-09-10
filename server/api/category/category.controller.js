'use strict';

var _ = require('lodash');
var Category = require('./category.model');

// Get list of categorys
exports.index = function(req, res) {
  Category.find(function (err, categorys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(categorys);
  });
};

// Get list of categorys
exports.parents = function(req, res) {
  // console.log(req.params.id);
  Category.find({'parentId' : parseInt(req.params.id)},function (err, categorys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(categorys);
  });
};

// Get all categories with corresponding sub_categories

exports.all = function(req, res) {
  var async = require("async");
  var p = [];
  Category.find({parentCategory:0}).select({name:1,category:1,parentCategory:1,slug:1}).exec(function(err,parents){
  // Using async library which will enable us to wait until data received from database
  async.each(parents, function(a, callback){
      var a = a.toObject();
      Category.find({parentCategory:parseInt(a.category)}).select({name:1,category:1,parentCategory:1,slug:1}).exec(function(err,c){
        a.sub_categories = c;
        p.push(a);
        callback();
      });
    },
    // 3rd param is the function to call when everything's done
    function(err){
      if( err ) { return res.status(404).send('Not Found'); } else { return res.status(200).json(p); }
    }
  );
});

// var p = [];
// Category.find({parentId:0},{name:1,category:1,parentId:1},function(err,parents){
//     parents.forEach(function(a){
//       // a = JSON.parse(a);
//       // console.log('ach',a);
//         var x = {};
//         Category.find({parentId:a.category}).select({name:1,category:1,parentId:1}).limit(2).exec(function(err,children){
//           x.sub_categories = children;
//         });
//         p.push(x);
//           console.log('chhhhhhhhhhhh',x);
//     });
//         // console.log(p);
// });
};

// Get list of categorys
// exports.all = function(req, res) {
//   // console.log(req.params.id);
//   Category.find({'parentId' : 0},function (err, parents) {
//     var p = [];
//     if(err) { return handleError(res, err); }
//     parents.forEach(function(a){
//       a.children = [];
//       Category.find({'parentId' : a.category},function (err, children) {
//         if(err) { return handleError(res, err); }
//         a.children = children;
//       });
//     console.log(a);
//         p.push(a);
//     });
//     return res.status(200).json(p);
//   });
// };

// Get a single category
exports.show = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Not Found'); }
    return res.json(category);
  });
};

// Creates a new category in the DB.
exports.create = function(req, res) {
  req.body.uid = req.user.email; // id change on every login hence email is used
  req.body.updated = Date.now();
  if(!req.body.slug && req.body.info)
  req.body.slug = req.body.info.toString().toLowerCase()
                      .replace(/\s+/g, '-')        // Replace spaces with -
                      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
                      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
                      .replace(/^-+/, '')          // Trim - from start of text
                      .replace(/-+$/, '');
  Category.create(req.body, function(err, category) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(category);
  });
};

// Updates an existing category in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  req.body.uid = req.user.email; // id change on every login hence email is used
  req.body.updated = Date.now();
  if(!req.body.slug && req.body.info)
  req.body.slug = req.body.info.toString().toLowerCase()
                      .replace(/\s+/g, '-')        // Replace spaces with -
                      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
                      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
                      .replace(/^-+/, '')          // Trim - from start of text
                      .replace(/-+$/, '');

  Category.findById(req.params.id, function (err, category) {
    if (err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Not Found'); }
    var updated = _.merge(category, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(category);
    });
  });
};

// Deletes a category from the DB.
exports.destroy = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Not Found'); }
    category.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
