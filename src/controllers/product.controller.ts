import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { ICreateProduct, IFindProduct } from "src/common/interface";

export class ProductController {
    static async create(req: Request, res: Response, next: NextFunction) {

        try {
            const body = { ...req.body } as ICreateProduct;
            const result = await ProductService.create(body);
            res.status(201).send({
                data: result.transform()
            });
        } catch (error) {
            next(error);
        }
    }

    static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await ProductService.list(req.query as unknown as IFindProduct);
            res.status(200).send({
                data: result.data.map(e => e.transform()),
                meta: result.meta,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await ProductService.getById(Number(req.params.id));
            res.status(200).json({
                data: product.transform()
            });
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await ProductService.update(Number(req.params.id), req.body);
            res.status(200).json({data: product.transform()});
        } catch (error) { next(error) }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await ProductService.delete(Number(req.params.id));
            res.status(200).send({
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
}
