import { Category } from "../models/category.models.js";
import { Product } from "../models/product.models.js";

export const getAllProducts = async(ctx) => {
  try {
    const products = await Product.find()
      .populate('category')
      .exec();
    let allProducts = products.filter(prod => prod.category.enable != false)
    ctx.body = allProducts
  } catch (error) {
    ctx.throw(500, error);
  }
}

export const newProduct = async (ctx) => {
    try {
      let categId;
      const { title, price, enable, categ } = ctx.request.body;
      const category = await Category.findOne({ title: categ }).exec();
      if (category) {
        categId = category._id;
      }
      const newProduct = new Product({
        title: title,
        price: price,
        enable: enable,
        category: categId, 
      });
      const savedProduct = await newProduct.save();
      ctx.status = 201;
      ctx.body = savedProduct;
    } catch (error) {
      ctx.throw(500, error);
    }
  };  