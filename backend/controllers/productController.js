import Product from "../models/Product.js";

// ✅ Fetch all product history (approved, pending, rejected)
export const getProductHistory = async (req, res) => {
  try {
    const products = await Product.find().sort({ updatedAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching product history:", error);
    res.status(500).json({ message: "Server Error: Failed to load history" });
  }
};

// ✅ (Optional) Fetch related products for a given product
export const getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find related products in same category but exclude itself
    const related = await Product.find({
      category: product.category,
      _id: { $ne: id },
    }).limit(5);

    res.status(200).json(related);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
