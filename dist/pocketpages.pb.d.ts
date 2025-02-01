import { forEach, keys, values, merge, shuffle } from '@s-libs/micro-dash';
import PocketBase from 'pocketbase-js-sdk-jsvm';
import * as log from 'pocketbase-log';
export { log };
import { stringify } from 'pocketbase-stringify';
export { stringify } from 'pocketbase-stringify';
import URLParse from 'url-parse';

type PagesMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type PagesRequest = {
    auth?: core.Record;
    method: PagesMethods;
    url: URLParse<string>;
    formData: () => Record<string, any>;
    body: () => Record<string, any> | string;
    header: (name: string) => string;
    cookies: (name: string) => string | undefined;
};
type PagesResponse = {
    file: (path: string) => void;
    write: (s: string) => void;
    redirect: (path: string, status?: number) => void;
    json: (status: number, data: any) => void;
    html: (status: number, data: string) => void;
    header: (name: string, value?: string) => void;
    cookie: (name: string, value: string, options?: any) => void;
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

type FilterOptions = {
    filter?: string;
    sort?: string;
    limit?: number;
    offset?: number;
    filterParams?: Record<string, string>;
};
declare const findRecordByFilter: (collection: string, options?: Partial<FilterOptions>, dao?: any) => any;
declare const findRecordsByFilter: (collection: string, options?: Partial<FilterOptions>, dao?: any) => any;

type User = {
    avatar: string;
    collectionId: string;
    collectionName: string;
    created: string;
    emailVisibility: boolean;
    email: string;
    id: string;
    name: string;
    updated: string;
    username: string;
    verified: boolean;
};
type AuthData = {
    token: string;
    record: User;
};
type PageDataLoaderFunc<TData = any> = (api: Omit<PagesRequestContext<TData>, 'data'>) => object;
type MiddlewareLoaderFunc<TData = any> = (api: Omit<PagesRequestContext<TData>, 'data'>) => object;
type PagesParams<T = string> = Record<string, T | null | Array<T | null>>;
type AuthOptions = {
    collection: string;
};
type PagesGlobalContext = {
    stringify: typeof stringify;
    forEach: typeof forEach;
    keys: typeof keys;
    values: typeof values;
    merge: typeof merge;
    shuffle: typeof shuffle;
    env: (key: string) => string;
    findRecordByFilter: typeof findRecordByFilter;
    findRecordsByFilter: typeof findRecordsByFilter;
    createUser: (email: string, password: string, options?: AuthOptions) => User;
    createAnonymousUser: (options?: AuthOptions) => {
        user: User;
        email: string;
        password: string;
    };
    pb: () => PocketBase;
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
    body: () => Record<string, any> | string;
    meta: (key: string, value?: string) => string | undefined;
    params: PagesParams;
    redirect: (path: string, status?: number) => void;
    request: PagesRequest;
    resolve: (path: string, options?: Partial<ResolveOptions>) => any;
    response: PagesResponse;
    slot: string;
    slots: Record<string, string>;
    signInWithPassword: (email: string, password: string, options?: AuthOptions) => AuthData;
    registerWithPassword: (email: string, password: string, options?: AuthOptions) => AuthData;
    signInAnonymously: (options?: AuthOptions) => AuthData;
    signOut: () => void;
    signInWithToken: (token: string) => void;
} & PagesGlobalContext;
type PagesConfig = {
    preprocessorExts: string[];
    debug: boolean;
    host: string;
};
type Cache = {
    routes: Route[];
    config: PagesConfig;
};

declare const globalApi: PagesGlobalContext;

declare const MiddlewareHandler: PagesMiddlewareFunc;

declare const v23MiddlewareWrapper: (e: core.RequestEvent) => void;

export { AfterBootstrapHandler, type AuthData, type AuthOptions, type Cache, type FilterOptions, MiddlewareHandler, type MiddlewareLoaderFunc, type PageDataLoaderFunc, type PagesConfig, type PagesGlobalContext, type PagesParams, type PagesRequestContext, type ResolveOptions, type User, findRecordByFilter, findRecordsByFilter, globalApi, v23MiddlewareWrapper };
