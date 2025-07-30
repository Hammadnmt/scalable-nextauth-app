import { Product } from "@/model/Product";
import connectDB from "@/config/connection";

export async function GET(req: Request) {
  try {
    await connectDB();
    const products = await Product.find();
    return Response.json(products);
  } catch (err) {
    return Response.json({
      err: "Failed to fetch products",
    });
  }
}

export async function POST(req: Request) {
  try {
  } catch (error) {
    console.error("Error in POST request:", error);
  }
}
