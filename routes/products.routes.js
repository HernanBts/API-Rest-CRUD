import {Router} from 'express'
import fileUpload from 'express-fileupload'
import {getProds, getProd, postProd, putProd, deleteProd} from '../controllers/products.controllers.js'

const router = Router()

router.get('/products', getProds)
router.get('/products/:id', getProd)
router.post("/products",fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}), postProd);
router.put('/products/:id', putProd)
router.delete('/products/:id', deleteProd)

export default router