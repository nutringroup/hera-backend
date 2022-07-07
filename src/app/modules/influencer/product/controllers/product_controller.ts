import { Request, Response } from "express";
import productService from "../shared/services/product_service";

class ProductController {

    async getAll(req: Request, res: Response): Promise<Response>{

        try {

            const productList = await productService.getAll();
            return res.json(productList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

}

export default ProductController;