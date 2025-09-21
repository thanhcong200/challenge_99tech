import { ICreateProduct, IFindProduct, IUpdateProduct, SortDirection } from "../common/interface";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";
import { Util } from "../common/util";
import { ErrorMessage } from "../common/constant";
import { HttpError } from "../common/http-error";

export class ProductService {
    private static repo = AppDataSource.getRepository(Product);

    static async create(data: ICreateProduct) {
        const { name, price } = data;
        if (!name) {
            throw new HttpError(400, ErrorMessage.INVALID_DATA);
        }
        if (!price || price < 0) {
            throw new HttpError(400, ErrorMessage.INVALID_DATA);
        }
        const product = this.repo.create(data);
        return this.repo.save(product);
    }

    static async list(query: IFindProduct) {
        const { 
            minPrice,
             maxPrice,
            keyword = "", 
            sortKey = 'created_at',
            sortDirection = SortDirection.DESC,
            page = 1, 
            limit = 10} = query;
        const qb = this.repo.createQueryBuilder("product");
        qb.where('product.is_delete = :isDelete', { isDelete: false })
        if (keyword) {
            qb.where("product.name ILIKE :keyword", { keyword: `%${keyword}%` });
        }

        if (minPrice) {
            qb.andWhere("product.price >= :minPrice", { minPrice });
        }
        if (maxPrice) {
            qb.andWhere("product.price <= :maxPrice", { maxPrice });
        }
        qb.orderBy(sortKey, sortDirection)
        qb.skip((page - 1) * limit).take(limit);
        const [items, total] = await qb.getManyAndCount();
        return {
            meta: Util.paginate(total, page, limit),
            data: items
        }
    }

    static async getById(id: number) {

        const product = await this.repo.findOneBy({ id, is_delete: false });
        if (!product) {
            throw new HttpError(404, ErrorMessage.NOT_FOUND);
        }
        return product;
    }

    static async update(id: number, payload: IUpdateProduct) {
        const data = {};
        if(payload.name) {
            data['name'] = payload.name;
        }
        if(payload.price >=0) {
            data['price'] = payload.price;
        }
        if(!Object.keys(data).length) {
            throw new HttpError(400, ErrorMessage.INVALID_DATA);
        }
        const product = await this.getById(id);
        if (!product) {
            throw new HttpError(404, ErrorMessage.NOT_FOUND);
        }
        await this.repo.update(id, data);
        return this.getById(id);
    }

    static async delete(id: number) {
        const product = await this.getById(id);
        if (!product) {
            throw new HttpError(404, ErrorMessage.NOT_FOUND);
        }
        return this.repo.update(id, { is_delete: true });
    }
}
