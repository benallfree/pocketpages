import * as pocketbaseLog from 'pocketbase-log';
export { pocketbaseLog as log };
export { stringify } from 'pocketbase-stringify';
import URLParse from 'url-parse';

type PagesMethods = 'get' | 'post' | 'put' | 'delete';
type PagesRequest = {
    method: PagesMethods;
    url: URLParse<string>;
    formData: Record<string, any>;
};
type PagesResponse = {
    file: (path: string) => void;
    write: (s: string) => void;
    redirect: (path: string, status?: number) => void;
    json: (status: number, data: any) => void;
    html: (status: number, data: string) => void;
};
type PagesInitializerFunc = () => void;
type PagesNextFunc = () => void;
type PagesMiddlewareFunc = (request: PagesRequest, response: PagesResponse, next: PagesNextFunc) => void;

declare const AfterBootstrapHandler: PagesInitializerFunc;

type FilterOptions = {
    filter?: string;
    sort?: string;
    limit?: number;
    offset?: number;
    filterParams?: Record<string, string>;
};
declare const findRecordByFilter: (collection: string, options?: Partial<FilterOptions>, dao?: any) => any;
declare const findRecordsByFilter: (collection: string, options?: Partial<FilterOptions>, dao?: any) => any;

declare const MiddlewareHandler: PagesMiddlewareFunc;

declare const v23MiddlewareWrapper: (e: core.RequestEvent) => void;

export { AfterBootstrapHandler, type FilterOptions, MiddlewareHandler, findRecordByFilter, findRecordsByFilter, v23MiddlewareWrapper };
