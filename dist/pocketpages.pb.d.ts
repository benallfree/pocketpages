import { forEach, keys, values, merge } from '@s-libs/micro-dash';
import * as log from 'pocketbase-log';
export { log };
import { stringify } from 'pocketbase-stringify';
export { stringify } from 'pocketbase-stringify';
import URLParse from 'url-parse';

type PagesMethods = 'get' | 'post' | 'put' | 'delete';
type PagesRequest = {
    auth?: core.Record;
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
    header: (name: string, value: string) => void;
    cookie: (name: string, value: string, options: any) => void;
};
type PagesInitializerFunc = () => void;
type PagesNextFunc = () => void;
type PagesMiddlewareFunc = (request: PagesRequest, response: PagesResponse, next: PagesNextFunc) => void;

type Route = {
    relativePath: string;
    absolutePath: string;
    fingerprint: string;
    shouldPreProcess: boolean;
    assetPrefix: string;
    segments: {
        nodeName: string;
        paramName?: string;
    }[];
    middlewares: string[];
    loaders: Partial<{
        load: string;
        get: string;
        post: string;
        put: string;
        delete: string;
    }>;
    isMarkdown: boolean;
    isEjs: boolean;
    layouts: string[];
};
declare const AfterBootstrapHandler: PagesInitializerFunc;

type PageDataLoaderFunc<TData = any> = (api: Omit<PagesApi<TData>, 'data'>) => object;
type MiddlewareLoaderFunc<TData = any> = (api: Omit<PagesApi<TData>, 'data'>) => object;
type PagesParams<T = string> = Record<string, T | null | Array<T | null>>;
type PagesApi<TData = any> = {
    params: PagesParams;
    auth?: core.Record;
    request: PagesRequest;
    response: PagesResponse;
    formData: Record<string, any>;
    asset: (path: string) => string;
    echo: (...args: any[]) => string;
    redirect: (path: string, status?: number) => void;
    data?: TData;
    slot: string;
    slots: Record<string, string>;
    meta: (key: string, value?: string) => string | undefined;
    stringify: typeof stringify;
    url: (path: string) => URLParse<Record<string, string | undefined>>;
    require: (path: string) => any;
    forEach: typeof forEach;
    keys: typeof keys;
    values: typeof values;
    merge: typeof merge;
} & typeof log;
type PagesConfig = {
    preprocessorExts: string[];
};
type Cache = {
    routes: Route[];
    config: PagesConfig;
};

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

export { AfterBootstrapHandler, type Cache, type FilterOptions, MiddlewareHandler, type MiddlewareLoaderFunc, type PageDataLoaderFunc, type PagesApi, type PagesConfig, type PagesParams, findRecordByFilter, findRecordsByFilter, v23MiddlewareWrapper };
