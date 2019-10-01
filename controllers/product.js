const Product = require("../models/Product");
const formidable = require("formidable");
const {
  errorHandler
} = require("../helpers/dbErrorHandler");
const fs = require("fs");
//file system
const _ = require("lodash");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping
    } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All products must contain a name, description, price, category, quantity, and any relevant shipping information"
      });
    }
    let product = new Product(fields);
    if (files.photo) {
      //this should match the name of what's being sent from the client side (photo vs image vs picture etc)
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Pictures must be less than 1mb in size"
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result);
    });
  });
};

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      console
      return res.status(400).json({
        error: "Product not found"
      });
    }
    req.product = product;
    next();
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: "Your product was sucessfully deleted!"
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping
    } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All products must contain a name, description, price, category, quantity, and any relevant shipping information"
      });
    }
    let product = req.product;
    product = _.extend(product, fields);

    if (files.photo) {
      //this should match the name of what's being sent from the client side (photo vs image vs picture etc)
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Pictures must be less than 1mb in size"
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, updatedCategory) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(updatedCategory);
    });
  });
};

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 62;
  console.log(req)
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([
      [sortBy, order]
    ])
    .limit(limit)
    .exec((err, products) => {
      if (err) {

        return res.status(400).json({
          error: "Products not found"
        });
      }
      return res.json(products);
    });
};
//finds product based on the :productId's category
// other products that have the same categoryId will be returned

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Product.find({
      _id: {
        $ne: req.product
      },
      category: req.product.category
    })
    .populate("category", '_id name')
    .exec((err, products) => {
      if (err) {

        return res.status(400).json({
          error: "Products not found"

        });
      }
      return res.json(products)
    });
};

exports.listCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: 'Category not found'
      })
    }
    return res.json(categories)
  })
}



exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  const filterObject = req.body.filters.filters

  console.log(filterObject)

  for (let key in filterObject) {
    if (filterObject[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: filterObject[key][0],
          $lte: filterObject[key][1]
        };
      } else {
        findArgs[key] = filterObject[key];
      }
    }
  }
  console.log('FIND-ARGS', findArgs)
  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([
      [sortBy, order]
    ])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found"
        });
      }
      res.json({
        size: data.length,
        data
      });
    });
};

exports.photo = (req, res, next) => {
  if (req.body) {
    res.set('Content-Type', req.product.photo.contentType)
    return res.send(req.product.photo.data)
  } else {
    console.log('DAFQ')
  }
  next()
}

exports.listSearch = (req, res) => {
  console.log('MOTHERFUCKER',
    req.query)
  const query = {}

  if (req.query.search) {
    query.name = {
      $regex: req.query.search,
      $options: "i"
    }
  }

  if (req.query.category && req.query.category != 'All') {
    query.category =
      req.query.category
  }
  console.log('QUEEROOO', query)

  Product.find(query, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    } else {
      res.json(products)
    }
  }).select("-photo")
}