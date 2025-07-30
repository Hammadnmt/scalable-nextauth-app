import { Product } from "@/model/Product";

const ProductService = {
  getProducts: async () => {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  },
};
export default ProductService;
