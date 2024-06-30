const productModel = require("../Models/productModel");
const adminModel = require("../Models/adminModel");


exports.createProduct = async (req, res) => {
  const { adminId } = req.params;
    console.log("adminId", adminId)

  const { description, image, price,review } = req.body;
  try {
    const admin = await adminModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
      
    }
    const createProduct = new productModel({
      description,
      image,
      price,
      review,
      adminId: adminId
    });
    await createProduct.save();
    admin.products.push(createProduct._id);
    
    await admin.save()

    return res
      .status(201)
      .json({
        success: true,
        message: "product created successfully",
        createProduct,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error ", error  });
  }
};


exports.updateProduct = async (req, res) => {
  const { adminId, productId } = req.params;
  const { description, image, price, review } = req.body;

  try {
    const admin = await adminModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (!admin.products.includes(productId)) {
      return res.status(403).json({ message: "Admin not authorized to update this product" });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(productId, {
      description,
      image,
      price,
      review
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found or not authorized to update" });
    }

    return res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};



exports.deleteProduct = async (req, res) => {
  const { adminId, productId } = req.params; 

  try {
    const admin = await adminModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (!admin.products.includes(productId)) {
      return res.status(403).json({ message: "Admin not authorized to delete this product" });
    }

    const deletedProduct = await productModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found or not authorized to delete" });
    }

    admin.products = admin.products.filter(id => id.toString() !== productId);
    await admin.save();

    return res.status(202).json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};



exports.getAllProducts = async (req, res) => {
  try {
      const page = parseInt(req.query.page || 1)
      const limit = parseInt(req.query.limit || 5)
      const skip = (page - 1) * limit

      const products = await productModel.find({}).skip(skip).limit(limit)
      const totalProducts = await productModel.countDocuments()

      console.log(products, totalProducts);
      
      res.status(200).send({products, totalProducts});
  } catch (error) {
      res.status(500).send(error);
  }
};

exports.getProducts = async (req, res) => {
  const { adminId, minPrice, maxPrice } = req.query;

  try {
    const filter = {};
    if (adminId) {
      filter.adminId = adminId;
    }
    if (minPrice) {
      filter.price = { ...filter.price, $gte: minPrice };
    }
    if (maxPrice) {
      filter.price = { ...filter.price, $lte: maxPrice };
    }

    const products = await productModel.find(filter);
    return res.status(200).json(products);
  } catch (error) {
    console.error("Failed to retrieve products:", error);
    return res.status(500).json({ message: "Failed to retrieve products", error: error.message });
  }
};



