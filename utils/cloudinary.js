import {v2 as cloudinary} from 'cloudinary'
import {CLOUDINARYAPI} from '../config.js'

cloudinary.config({ 
  cloud_name: 'hernanbts', 
  api_key: '166495716318566', 
  api_secret: CLOUDINARYAPI,
  secure: true
});

export async function uploadImage(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'replit'
  })
}

export async function deleteImage(publicId) {
  return await cloudinary.uploader.destroy(publicId)
}