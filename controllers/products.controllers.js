import Product from '../models/product.model.js'
import {uploadImage, deleteImage} from '../utils/cloudinary.js'
import fs from 'fs-extra'

export const getProds = async (req, res) => {
  try {
    const products = await Product.find()
  
    res.json(products)
  } catch (error) {
    return res.status(500).json({ message: error.message})
  }
} 

export const getProd = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) return res.status(404).json({ message: 'Product not found.'})
  
    return res.json(product)
  } catch (error) {
    return res.status(500).json({ message: error.message})
  }
} 

export const postProd = async (req, res) => {
  const { name, description, price } = req.body
  
  try {
    const newProduct = new Product({
      name,
      description,
      price,
    });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath)
      newProduct.image = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      await fs.unlink(req.files.image.tempFilePath)
    }
  
    const savedProduct = await newProduct.save()
    return res.json(savedProduct);
  } catch (error) {
    if (req.files?.image) {
      await fs.unlink(req.files.image.tempFilePath)
    }
    return res.status(500).json({ message: error.message })
  }
}

export const putProd = async (req, res) => {
  const {id} = req.params
  try {
    const newProduct = await Product.findByIdAndUpdate(id, req.body, {new: true})
    if (!newProduct) return res.status(404).json({ message: "Product Not Found" })
    
    if(newProduct.image?.public_id) {
      await deleteImage(newProduct.image.public_id)

      const result = await uploadImage(req.files.image.tempFilePath)
      newProduct.image = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
            console.log(newProduct)

      await fs.unlink(req.files.image.tempFilePath)
    }

    return res.json(newProduct)
  } catch (error) {
    return res.status(500).json({ message: error.message})
  }
}

export const deleteProd = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if(!product) return res.status(404).json({ message: 'Product not found.'})

    if(product.image?.public_id) {
      await deleteImage(product.image.public_id)
    }
    
    return res.json(product)
  } catch (error) {
    return res.status(500).json({ message: error.message})
  }
}

