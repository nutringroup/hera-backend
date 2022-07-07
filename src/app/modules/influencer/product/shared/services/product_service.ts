import Product from "../models/product";

class ProductService {

    async getAll(){

        try {

            const productList = Product.findAll({ attributes: ['id', 'name'], where:{ status: 1 }, order: ['name'], raw: true});
            return productList;

        } catch (error) {
            throw error;
        }

    }

}

export default new ProductService();