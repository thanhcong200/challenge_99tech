import { IPaginationMeta } from "./interface";

export class Util {
    static paginate(total: number, page: number, limit: number): IPaginationMeta {
        const pageCount = Math.ceil(total / limit);

        return {
            total,
            pageCount,
            hasNext: page < pageCount,
            hasPrev: page > 1,
            page,
            limit
        };
    }

}