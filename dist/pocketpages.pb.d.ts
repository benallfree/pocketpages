import { forEach, keys, values, merge, shuffle } from '@s-libs/micro-dash';
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
    formData: () => Record<string, any>;
    body: () => any;
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
    layouts: string[];
};
declare const AfterBootstrapHandler: PagesInitializerFunc;

type PageDataLoaderFunc<TData = any> = (api: Omit<PagesRequestContext<TData>, 'data'>) => object;
type MiddlewareLoaderFunc<TData = any> = (api: Omit<PagesRequestContext<TData>, 'data'>) => object;
type PagesParams<T = string> = Record<string, T | null | Array<T | null>>;
type PagesGlobalContext = {
    stringify: typeof stringify;
    forEach: typeof forEach;
    keys: typeof keys;
    values: typeof values;
    merge: typeof merge;
    shuffle: typeof shuffle;
    env: (key: string) => string;
} & typeof log;
type ResolveOptions = {
    mode: 'raw' | 'require' | 'script' | 'style';
};
type PagesRequestContext<TData = any> = {
    asset: (path: string) => string;
    auth?: core.Record;
    data?: TData;
    echo: (...args: any[]) => string;
    formData: Record<string, any>;
    meta: (key: string, value?: string) => string | undefined;
    params: PagesParams;
    redirect: (path: string, status?: number) => void;
    request: PagesRequest;
    resolve: (path: string, options?: Partial<ResolveOptions>) => any;
    response: PagesResponse;
    slot: string;
    slots: Record<string, string>;
} & PagesGlobalContext;
type PagesConfig = {
    preprocessorExts: string[];
    debug: boolean;
};
type Cache = {
    routes: Route[];
    config: PagesConfig;
};

declare const globalApi: PagesGlobalContext;

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

export { AfterBootstrapHandler, type Cache, type FilterOptions, MiddlewareHandler, type MiddlewareLoaderFunc, type PageDataLoaderFunc, type PagesConfig, type PagesGlobalContext, type PagesParams, type PagesRequestContext, type ResolveOptions, findRecordByFilter, findRecordsByFilter, globalApi, v23MiddlewareWrapper };
