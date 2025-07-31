import { Product } from "@/model/Product";
import connectDB from "@/config/connection";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function GET(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
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
