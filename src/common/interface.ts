export interface ICreateProduct {
    name: string;
    price: number;
}

export interface IUpdateProduct {
    name?: string;
    price?: number;
}

export interface IFindProduct extends IBaseSearch {
    minPrice: number;
    maxPrice: number;
}

export interface IBaseSearch{
    keyword: string;
    sortKey: string;
    sortDirection: SortDirection;
    page: number;
    limit: number;
}


export interface IPaginationMeta {
    hasNext: boolean;
    hasPrev: boolean;
    total: number;
    pageCount: number;
    page: number;
    limit: number;
}

export interface IListResponse<T> {
    meta: IPaginationMeta;
    data: T[];
}

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC'
}