/// <reference types="pocketbase-jsvm" />
type Nil = null | undefined;
type ArrayIteratee<I, O> = (item: I, index: number) => O;
type ObjectIteratee<T, O> = (item: T[keyof T], key: StringifiedKey<T>) => O;
type Cast<I, O> = Exclude<I, O> extends never ? I : O;
type Narrow<I, O> = Extract<I, O> | Extract<O, I>;
type IfCouldBe<T1, T2, If, Else = never> = Narrow<T1, T2> extends never ? Else : If;
type StringifiedKey<T> = Cast<keyof T, string>;

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element. Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 4,526 bytes
 * - Micro-dash: 249 bytes
 */
declare function forEach<T extends Nil | readonly any[]>(array: T, iteratee: ArrayIteratee<NonNullable<T>[number], boolean | void>): T;
declare function forEach<T>(object: T, iteratee: ObjectIteratee<NonNullable<T>, boolean | void>): T;

/**
 * Creates an array of shuffled values, using a version of the [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 4,563 bytes
 * - Micro-dash: 965 bytes
 */
declare function shuffle<T>(array: Nil | readonly T[]): T[];
declare function shuffle<T>(object: Nil | T): Array<T[keyof T]>;

/**
 * Creates an array of the own enumerable property names of object.
 *
 * Differences from lodash:
 * - does not give any special consideration for arguments objects, strings, or prototype objects (e.g. many will have `'length'` in the returned array)
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,866 bytes
 * - Micro-dash: 165 bytes
 */
declare function keys<T>(object: Nil | T): Array<StringifiedKey<T>>;

/**
 * Recursively merges own enumerable string keyed properties of source objects into the destination object. Object properties are merged recursively. Source objects are applied from left to right. Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This function mutates `object`.
 *
 * Differences from lodash:
 * - will overwrite a value with `undefined`
 * - only supports arguments that are objects
 * - cannot handle circular references
 * - when merging an array onto a non-array, the result is a non-array
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 11,996 bytes
 * - Micro-dash: 426 bytes
 */
declare function merge<A extends object, B extends object>(object: A, source: B): A & B;
declare function merge<A extends object, B extends object, C extends object>(object: A, source1: B, source2: C): A & B & C;
declare function merge<A extends object, B extends object, C extends object, D extends object>(object: A, source1: B, source2: C, source3: D): A & B & C & D;
declare function merge<A extends object, B extends object, C extends object, D extends object, E extends object>(object: A, source1: B, source2: C, source3: D, source4: E): A & B & C & D & E;
declare function merge<A extends object, B extends object, C extends object, D extends object, E extends object, F extends object>(object: A, source1: B, source2: C, source3: D, source4: E, source5: F): A & B & C & D & E & F;
declare function merge<T extends object>(object: T, ...sources: Array<Partial<T>>): T;

/**
 * Creates an object composed of the picked `object` properties.
 *
 * Differences from lodash:
 * - `paths` must be direct properties of `object` (they cannot references deep properties)
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 9,083 bytes
 * - Micro-dash: 127 bytes
 */
declare function pick<T, P extends ReadonlyArray<keyof NonNullable<T>>>(object: T, ...paths: P): IfCouldBe<T, Nil, {}> | {
    [K in P[number]]: NonNullable<T>[K];
};

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 4,073 bytes
 * - Micro-dash: 186 bytes
 */
declare function values<T>(object: T): Array<T[keyof T]>;

interface SerializeOptions$1 {
    encode?: (val: string | number | boolean) => string;
    maxAge?: number;
    domain?: string;
    path?: string;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    priority?: string;
    sameSite?: boolean | string;
}
interface ListResult<T> {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: Array<T>;
}
interface BaseModel {
    [key: string]: any;
    id: string;
}
interface LogModel extends BaseModel {
    level: string;
    message: string;
    created: string;
    updated: string;
    data: {
        [key: string]: any;
    };
}
interface RecordModel extends BaseModel {
    collectionId: string;
    collectionName: string;
    expand?: {
        [key: string]: any;
    };
}
// -------------------------------------------------------------------
// Collection types
// -------------------------------------------------------------------
interface CollectionField {
    [key: string]: any;
    id: string;
    name: string;
    type: string;
    system: boolean;
    hidden: boolean;
    presentable: boolean;
}
interface TokenConfig {
    duration: number;
    secret?: string;
}
interface AuthAlertConfig {
    enabled: boolean;
    emailTemplate: EmailTemplate;
}
interface OTPConfig {
    enabled: boolean;
    duration: number;
    length: number;
    emailTemplate: EmailTemplate;
}
interface MFAConfig {
    enabled: boolean;
    duration: number;
    rule: string;
}
interface PasswordAuthConfig {
    enabled: boolean;
    identityFields: Array<string>;
}
interface OAuth2Provider {
    pkce?: boolean;
    clientId: string;
    name: string;
    clientSecret: string;
    authUrl: string;
    tokenUrl: string;
    userApiUrl: string;
    displayName: string;
}
interface OAuth2Config {
    enabled: boolean;
    mappedFields: {
        [key: string]: string;
    };
    providers: Array<OAuth2Provider>;
}
interface EmailTemplate {
    subject: string;
    body: string;
}
interface collection extends BaseModel {
    name: string;
    fields: Array<CollectionField>;
    indexes: Array<string>;
    system: boolean;
    listRule?: string;
    viewRule?: string;
    createRule?: string;
    updateRule?: string;
    deleteRule?: string;
}
interface BaseCollectionModel extends collection {
    type: "base";
}
interface ViewCollectionModel extends collection {
    type: "view";
    viewQuery: string;
}
interface AuthCollectionModel extends collection {
    type: "auth";
    authRule?: string;
    manageRule?: string;
    authAlert: AuthAlertConfig;
    oauth2: OAuth2Config;
    passwordAuth: PasswordAuthConfig;
    mfa: MFAConfig;
    otp: OTPConfig;
    authToken: TokenConfig;
    passwordResetToken: TokenConfig;
    emailChangeToken: TokenConfig;
    verificationToken: TokenConfig;
    fileToken: TokenConfig;
    verificationTemplate: EmailTemplate;
    resetPasswordTemplate: EmailTemplate;
    confirmEmailChangeTemplate: EmailTemplate;
}
type CollectionModel = BaseCollectionModel | ViewCollectionModel | AuthCollectionModel;
type AuthRecord = RecordModel | null; // for backward compatibility
// for backward compatibility
type OnStoreChangeFunc = (token: string, record: AuthRecord) => void;
/**
 * Base AuthStore class that stores the auth state in runtime memory (aka. only for the duration of the store instane).
 *
 * Usually you wouldn't use it directly and instead use the builtin LocalAuthStore, AsyncAuthStore
 * or extend it with your own custom implementation.
 */
declare class BaseAuthStore {
    protected baseToken: string;
    protected baseModel: AuthRecord;
    private _onChangeCallbacks;
    /**
     * Retrieves the stored token (if any).
     */
    get token(): string;
    /**
     * Retrieves the stored model data (if any).
     */
    get record(): AuthRecord;
    /**
     * @deprecated use `record` instead.
     */
    get model(): AuthRecord;
    /**
     * Loosely checks if the store has valid token (aka. existing and unexpired exp claim).
     */
    get isValid(): boolean;
    /**
     * Loosely checks whether the currently loaded store state is for superuser.
     *
     * Alternatively you can also compare directly `pb.authStore.record?.collectionName`.
     */
    get isSuperuser(): boolean;
    /**
     * @deprecated use `isSuperuser` instead or simply check the record.collectionName property.
     */
    get isAdmin(): boolean;
    /**
     * @deprecated use `!isSuperuser` instead or simply check the record.collectionName property.
     */
    get isAuthRecord(): boolean;
    /**
     * Saves the provided new token and model data in the auth store.
     */
    save(token: string, record?: AuthRecord): void;
    /**
     * Removes the stored token and model data form the auth store.
     */
    clear(): void;
    /**
     * Parses the provided cookie string and updates the store state
     * with the cookie's token and model data.
     *
     * NB! This function doesn't validate the token or its data.
     * Usually this isn't a concern if you are interacting only with the
     * PocketBase API because it has the proper server-side security checks in place,
     * but if you are using the store `isValid` state for permission controls
     * in a node server (eg. SSR), then it is recommended to call `authRefresh()`
     * after loading the cookie to ensure an up-to-date token and model state.
     * For example:
     *
     * ```js
     * pb.authStore.loadFromCookie("cookie string...");
     *
     * try {
     *     // get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
     *     pb.authStore.isValid && await pb.collection('users').authRefresh();
     * } catch (_) {
     *     // clear the auth store on failed refresh
     *     pb.authStore.clear();
     * }
     * ```
     */
    loadFromCookie(cookie: string, key?: string): void;
    /**
     * Exports the current store state as cookie string.
     *
     * By default the following optional attributes are added:
     * - Secure
     * - HttpOnly
     * - SameSite=Strict
     * - Path=/
     * - Expires={the token expiration date}
     *
     * NB! If the generated cookie exceeds 4096 bytes, this method will
     * strip the model data to the bare minimum to try to fit within the
     * recommended size in https://www.rfc-editor.org/rfc/rfc6265#section-6.1.
     */
    exportToCookie(options?: SerializeOptions$1, key?: string): string;
    /**
     * Register a callback function that will be called on store change.
     *
     * You can set the `fireImmediately` argument to true in order to invoke
     * the provided callback right after registration.
     *
     * Returns a removal function that you could call to "unsubscribe" from the changes.
     */
    onChange(callback: OnStoreChangeFunc, fireImmediately?: boolean): () => void;
    protected triggerChange(): void;
}
/**
 * BaseService class that should be inherited from all API services.
 */
declare abstract class BaseService {
    readonly client: Client;
    constructor(client: Client);
}
interface SendOptions extends RequestInit {
    // for backward compatibility and to minimize the verbosity,
    // any top-level field that doesn't exist in RequestInit or the
    // fields below will be treated as query parameter.
    [key: string]: any;
    /**
     * Optional custom fetch function to use for sending the request.
     */
    fetch?: typeof $http.send;
    /**
     * Custom headers to send with the requests.
     */
    headers?: {
        [key: string]: string;
    };
    /**
     * The body of the request (serialized automatically for json requests).
     */
    body?: any;
    /**
     * Query parameters that will be appended to the request url.
     */
    query?: {
        [key: string]: any;
    };
}
interface CommonOptions extends SendOptions {
    fields?: string;
}
interface ListOptions extends CommonOptions {
    page?: number;
    perPage?: number;
    sort?: string;
    filter?: string;
    skipTotal?: boolean;
}
interface FullListOptions extends ListOptions {
    batch?: number;
}
interface RecordOptions extends CommonOptions {
    expand?: string;
}
interface RecordListOptions extends ListOptions, RecordOptions {
}
interface RecordFullListOptions extends FullListOptions, RecordOptions {
}
interface LogStatsOptions extends CommonOptions {
    filter?: string;
}
interface FileOptions extends CommonOptions {
    thumb?: string;
    download?: boolean;
}
interface appleClientSecret {
    secret: string;
}
declare class SettingsService extends BaseService {
    /**
     * Fetch all available app settings.
     *
     * @throws {ClientResponseError}
     */
    getAll(options?: CommonOptions): {
        [key: string]: any;
    };
    /**
     * Bulk updates app settings.
     *
     * @throws {ClientResponseError}
     */
    update(bodyParams?: {
        [key: string]: any;
    } | FormData, options?: CommonOptions): {
        [key: string]: any;
    };
    /**
     * Performs a S3 filesystem connection test.
     *
     * The currently supported `filesystem` are "storage" and "backups".
     *
     * @throws {ClientResponseError}
     */
    testS3(filesystem?: string, options?: CommonOptions): boolean;
    /**
     * Sends a test email.
     *
     * The possible `emailTemplate` values are:
     * - verification
     * - password-reset
     * - email-change
     *
     * @throws {ClientResponseError}
     */
    testEmail(collectionIdOrName: string, toEmail: string, emailTemplate: string, options?: CommonOptions): boolean;
    /**
     * Generates a new Apple OAuth2 client secret.
     *
     * @throws {ClientResponseError}
     */
    generateAppleClientSecret(clientId: string, teamId: string, keyId: string, privateKey: string, duration: number, options?: CommonOptions): appleClientSecret;
}
declare abstract class CrudService<M> extends BaseService {
    /**
     * Base path for the crud actions (without trailing slash, eg. '/admins').
     */
    abstract get baseCrudPath(): string;
    /**
     * Response data decoder.
     */
    decode<T = M>(data: {
        [key: string]: any;
    }): T;
    /**
     * Returns a promise with all list items batch fetched at once
     * (by default 500 items per request; to change it set the `batch` query param).
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     *
     * @throws {ClientResponseError}
     */
    getFullList<T = M>(options?: FullListOptions): Array<T>;
    /**
     * Legacy version of getFullList with explicitly specified batch size.
     */
    getFullList<T = M>(batch?: number, options?: ListOptions): Array<T>;
    /**
     * Returns paginated items list.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     *
     * @throws {ClientResponseError}
     */
    getList<T = M>(page?: number, perPage?: number, options?: ListOptions): ListResult<T>;
    /**
     * Returns the first found item by the specified filter.
     *
     * Internally it calls `getList(1, 1, { filter, skipTotal })` and
     * returns the first found item.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     *
     * For consistency with `getOne`, this method will throw a 404
     * ClientResponseError if no item was found.
     *
     * @throws {ClientResponseError}
     */
    getFirstListItem<T = M>(filter: string, options?: CommonOptions): T;
    /**
     * Returns single item by its id.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     *
     * If `id` is empty it will throw a 404 error.
     *
     * @throws {ClientResponseError}
     */
    getOne<T = M>(id: string, options?: CommonOptions): T;
    /**
     * Creates a new item.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     *
     * @throws {ClientResponseError}
     */
    create<T = M>(bodyParams?: {
        [key: string]: any;
    } | FormData, options?: CommonOptions): T;
    /**
     * Updates an existing item by its id.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     *
     * @throws {ClientResponseError}
     */
    update<T = M>(id: string, bodyParams?: {
        [key: string]: any;
    } | FormData, options?: CommonOptions): T;
    /**
     * Deletes an existing item by its id.
     *
     * @throws {ClientResponseError}
     */
    delete(id: string, options?: CommonOptions): boolean;
    /**
     * Returns a promise with all list items batch fetched at once.
     */
    protected _getFullList<T = M>(batchSize?: number, options?: ListOptions): Array<T>;
}
interface RecordAuthResponse<T = RecordModel> {
    /**
     * The signed PocketBase auth record.
     */
    record: T;
    /**
     * The PocketBase record auth token.
     *
     * If you are looking for the OAuth2 access and refresh tokens
     * they are available under the `meta.accessToken` and `meta.refreshToken` props.
     */
    token: string;
    /**
     * Auth meta data usually filled when OAuth2 is used.
     */
    meta?: {
        [key: string]: any;
    };
}
interface AuthProviderInfo {
    name: string;
    displayName: string;
    state: string;
    authURL: string;
    codeVerifier: string;
    codeChallenge: string;
    codeChallengeMethod: string;
}
interface AuthMethodsList {
    mfa: {
        enabled: boolean;
        duration: number;
    };
    otp: {
        enabled: boolean;
        duration: number;
    };
    password: {
        enabled: boolean;
        identityFields: Array<string>;
    };
    oauth2: {
        enabled: boolean;
        providers: Array<AuthProviderInfo>;
    };
}
interface OTPResponse {
    otpId: string;
}
declare class RecordService<M = RecordModel> extends CrudService<M> {
    readonly collectionIdOrName: string;
    constructor(client: Client, collectionIdOrName: string);
    /**
     * @inheritdoc
     */
    get baseCrudPath(): string;
    /**
     * Returns the current collection service base path.
     */
    get baseCollectionPath(): string;
    /**
     * Returns whether the current service collection is superusers.
     */
    get isSuperusers(): boolean;
    // ---------------------------------------------------------------
    // Crud handlers
    // ---------------------------------------------------------------
    /**
     * @inheritdoc
     */
    getFullList<T = M>(options?: RecordFullListOptions): Array<T>;
    /**
     * @inheritdoc
     */
    getFullList<T = M>(batch?: number, options?: RecordListOptions): Array<T>;
    /**
     * @inheritdoc
     */
    getList<T = M>(page?: number, perPage?: number, options?: RecordListOptions): ListResult<T>;
    /**
     * @inheritdoc
     */
    getFirstListItem<T = M>(filter: string, options?: RecordListOptions): T;
    /**
     * @inheritdoc
     */
    getOne<T = M>(id: string, options?: RecordOptions): T;
    /**
     * @inheritdoc
     */
    create<T = M>(bodyParams?: {
        [key: string]: any;
    } | FormData, options?: RecordOptions): T;
    /**
     * @inheritdoc
     *
     * If the current `client.authStore.record` matches with the updated id, then
     * on success the `client.authStore.record` will be updated with the new response record fields.
     */
    update<T = M>(id: string, bodyParams?: {
        [key: string]: any;
    } | FormData, options?: RecordOptions): T;
    /**
     * @inheritdoc
     *
     * If the current `client.authStore.record` matches with the deleted id,
     * then on success the `client.authStore` will be cleared.
     */
    delete(id: string, options?: CommonOptions): boolean;
    // ---------------------------------------------------------------
    // Auth handlers
    // ---------------------------------------------------------------
    /**
     * Prepare successful collection authorization response.
     */
    protected authResponse<T = M>(responseData: any): RecordAuthResponse<T>;
    /**
     * Returns all available collection auth methods.
     *
     * @throws {ClientResponseError}
     */
    listAuthMethods(options?: CommonOptions): AuthMethodsList;
    /**
     * Authenticate a single auth collection record via its username/email and password.
     *
     * On success, this method also automatically updates
     * the client's AuthStore data and returns:
     * - the authentication token
     * - the authenticated record model
     *
     * @throws {ClientResponseError}
     */
    authWithPassword<T = M>(usernameOrEmail: string, password: string, options?: RecordOptions): RecordAuthResponse<T>;
    /**
     * Authenticate a single auth collection record with OAuth2 code.
     *
     * If you don't have an OAuth2 code you may also want to check `authWithOAuth2` method.
     *
     * On success, this method also automatically updates
     * the client's AuthStore data and returns:
     * - the authentication token
     * - the authenticated record model
     * - the OAuth2 account data (eg. name, email, avatar, etc.)
     *
     * @throws {ClientResponseError}
     */
    authWithOAuth2Code<T = M>(provider: string, code: string, codeVerifier: string, redirectURL: string, createData?: {
        [key: string]: any;
    }, options?: RecordOptions): RecordAuthResponse<T>;
    /**
     * Refreshes the current authenticated record instance and
     * returns a new token and record data.
     *
     * On success this method also automatically updates the client's AuthStore.
     *
     * @throws {ClientResponseError}
     */
    authRefresh<T = M>(options?: RecordOptions): RecordAuthResponse<T>;
    /**
     * Sends auth record password reset request.
     *
     * @throws {ClientResponseError}
     */
    requestPasswordReset(email: string, options?: CommonOptions): boolean;
    /**
     * Confirms auth record password reset request.
     *
     * @throws {ClientResponseError}
     */
    confirmPasswordReset(passwordResetToken: string, password: string, passwordConfirm: string, options?: CommonOptions): boolean;
    /**
     * Sends auth record verification email request.
     *
     * @throws {ClientResponseError}
     */
    requestVerification(email: string, options?: CommonOptions): boolean;
    /**
     * Confirms auth record email verification request.
     *
     * If the current `client.authStore.record` matches with the auth record from the token,
     * then on success the `client.authStore.record.verified` will be updated to `true`.
     *
     * @throws {ClientResponseError}
     */
    confirmVerification(verificationToken: string, options?: CommonOptions): boolean;
    /**
     * Sends an email change request to the authenticated record model.
     *
     * @throws {ClientResponseError}
     */
    requestEmailChange(newEmail: string, options?: CommonOptions): boolean;
    /**
     * Confirms auth record's new email address.
     *
     * If the current `client.authStore.record` matches with the auth record from the token,
     * then on success the `client.authStore` will be cleared.
     *
     * @throws {ClientResponseError}
     */
    confirmEmailChange(emailChangeToken: string, password: string, options?: CommonOptions): boolean;
    /**
     * Sends auth record OTP to the provided email.
     *
     * @throws {ClientResponseError}
     */
    requestOTP(email: string, options?: CommonOptions): OTPResponse;
    /**
     * Authenticate a single auth collection record via OTP.
     *
     * On success, this method also automatically updates
     * the client's AuthStore data and returns:
     * - the authentication token
     * - the authenticated record model
     *
     * @throws {ClientResponseError}
     */
    authWithOTP<T = M>(otpId: string, password: string, options?: CommonOptions): RecordAuthResponse<T>;
    /**
     * Impersonate authenticates with the specified recordId and
     * returns a new client with the received auth token in a memory store.
     *
     * If `duration` is 0 the generated auth token will fallback
     * to the default collection auth token duration.
     *
     * This action currently requires superusers privileges.
     *
     * @throws {ClientResponseError}
     */
    impersonate(recordId: string, duration: number, options?: CommonOptions): Client;
}
declare class CollectionService extends CrudService<CollectionModel> {
    /**
     * @inheritdoc
     */
    get baseCrudPath(): string;
    /**
     * Imports the provided collections.
     *
     * If `deleteMissing` is `true`, all local collections and their fields,
     * that are not present in the imported configuration, WILL BE DELETED
     * (including their related records data)!
     *
     * @throws {ClientResponseError}
     */
    import(collections: Array<CollectionModel>, deleteMissing?: boolean, options?: CommonOptions): boolean;
    /**
     * Returns type indexed map with scaffolded collection models
     * populated with their default field values.
     *
     * @throws {ClientResponseError}
     */
    getScaffolds(options?: CommonOptions): {
        [key: string]: CollectionModel;
    };
    /**
     * Deletes all records associated with the specified collection.
     *
     * @throws {ClientResponseError}
     */
    truncate(collectionIdOrName: string, options?: CommonOptions): boolean;
}
interface HourlyStats {
    total: number;
    date: string;
}
declare class LogService extends BaseService {
    /**
     * Returns paginated logs list.
     *
     * @throws {ClientResponseError}
     */
    getList(page?: number, perPage?: number, options?: ListOptions): ListResult<LogModel>;
    /**
     * Returns a single log by its id.
     *
     * If `id` is empty it will throw a 404 error.
     *
     * @throws {ClientResponseError}
     */
    getOne(id: string, options?: CommonOptions): LogModel;
    /**
     * Returns logs statistics.
     *
     * @throws {ClientResponseError}
     */
    getStats(options?: LogStatsOptions): Array<HourlyStats>;
}
interface HealthCheckResponse {
    code: number;
    message: string;
    data: {
        [key: string]: any;
    };
}
declare class HealthService extends BaseService {
    /**
     * Checks the health status of the api.
     *
     * @throws {ClientResponseError}
     */
    check(options?: CommonOptions): HealthCheckResponse;
}
declare class FileService extends BaseService {
    /**
     * @deprecated Please replace with `pb.files.getURL()`.
     */
    getUrl(record: {
        [key: string]: any;
    }, filename: string, queryParams?: FileOptions): string;
    /**
     * Builds and returns an absolute record file url for the provided filename.
     */
    getURL(record: {
        [key: string]: any;
    }, filename: string, queryParams?: FileOptions): string;
    /**
     * Requests a new private file access token for the current auth model.
     *
     * @throws {ClientResponseError}
     */
    getToken(options?: CommonOptions): string;
}
interface BackupFileInfo {
    key: string;
    size: number;
    modified: string;
}
declare class BackupService extends BaseService {
    /**
     * Returns list with all available backup files.
     *
     * @throws {ClientResponseError}
     */
    getFullList(options?: CommonOptions): Array<BackupFileInfo>;
    /**
     * Initializes a new backup.
     *
     * @throws {ClientResponseError}
     */
    create(basename: string, options?: CommonOptions): boolean;
    /**
     * Uploads an existing backup file.
     *
     * Example:
     *
     * ```js
     * await pb.backups.upload({
     *     file: new Blob([...]),
     * });
     * ```
     *
     * @throws {ClientResponseError}
     */
    upload(bodyParams: {
        [key: string]: any;
    } | FormData, options?: CommonOptions): boolean;
    /**
     * Deletes a single backup file.
     *
     * @throws {ClientResponseError}
     */
    delete(key: string, options?: CommonOptions): boolean;
    /**
     * Initializes an app data restore from an existing backup.
     *
     * @throws {ClientResponseError}
     */
    restore(key: string, options?: CommonOptions): boolean;
    /**
     * Builds a download url for a single existing backup using a
     * superuser file token and the backup file key.
     *
     * The file token can be generated via `pb.files.getToken()`.
     */
    getDownloadURL(token: string, key: string): string;
}
interface CronJob {
    id: string;
    expression: string;
}
declare class CronService extends BaseService {
    /**
     * Returns list with all registered cron jobs.
     *
     * @throws {ClientResponseError}
     */
    getFullList(options?: CommonOptions): Array<CronJob>;
    /**
     * Runs the specified cron job.
     *
     * @throws {ClientResponseError}
     */
    run(jobId: string, options?: CommonOptions): boolean;
}
interface BatchRequest {
    method: string;
    url: string;
    json?: {
        [key: string]: any;
    };
    files?: {
        [key: string]: Array<any>;
    };
    headers?: {
        [key: string]: string;
    };
}
interface BatchRequestResult {
    status: number;
    body: any;
}
declare class BatchService extends BaseService {
    private requests;
    private subs;
    /**
     * Starts constructing a batch request entry for the specified collection.
     */
    collection(collectionIdOrName: string): SubBatchService;
    /**
     * Sends the batch requests.
     *
     * @throws {ClientResponseError}
     */
    send(options?: SendOptions): Array<BatchRequestResult>;
}
declare class SubBatchService {
    private requests;
    private readonly collectionIdOrName;
    constructor(requests: Array<BatchRequest>, collectionIdOrName: string);
    /**
     * Registers a record upsert request into the current batch queue.
     *
     * The request will be executed as update if `bodyParams` have a valid existing record `id` value, otherwise - create.
     */
    upsert(bodyParams?: {
        [key: string]: any;
    } | FormData, options?: RecordOptions): void;
    /**
     * Registers a record create request into the current batch queue.
     */
    create(bodyParams?: {
        [key: string]: any;
    } | FormData, options?: RecordOptions): void;
    /**
     * Registers a record update request into the current batch queue.
     */
    update(id: string, bodyParams?: {
        [key: string]: any;
    } | FormData, options?: RecordOptions): void;
    /**
     * Registers a record delete request into the current batch queue.
     */
    delete(id: string, options?: SendOptions): void;
    private prepareRequest;
}
type Response = {
    statusCode: number;
    headers: {
        [key: string]: Array<string>;
    };
    cookies: {
        [key: string]: http.Cookie;
    };
    raw: string;
    json: any;
};
interface BeforeSendResult {
    [key: string]: any; // for backward compatibility
    url?: string;
    options?: {
        [key: string]: any;
    };
}
/**
 * PocketBase JS Client.
 */
declare class Client {
    /**
     * The base PocketBase backend url address (eg. 'http://127.0.0.1.8090').
     */
    baseURL: string;
    /**
     * Legacy getter alias for baseURL.
     * @deprecated Please replace with baseURL.
     */
    get baseUrl(): string;
    /**
     * Legacy setter alias for baseURL.
     * @deprecated Please replace with baseURL.
     */
    set baseUrl(v: string);
    /**
     * Hook that get triggered right before sending the fetch request,
     * allowing you to inspect and modify the url and request options.
     *
     * For list of the possible options check https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
     *
     * You can return a non-empty result object `{ url, options }` to replace the url and request options entirely.
     *
     * Example:
     * ```js
     * client.beforeSend = function (url, options) {
     *     options.headers = Object.assign({}, options.headers, {
     *         'X-Custom-Header': 'example',
     *     });
     *
     *     return { url, options }
     * };
     * ```
     */
    beforeSend?: (url: string, options: SendOptions) => BeforeSendResult;
    /**
     * Hook that get triggered after successfully sending the fetch request,
     * allowing you to inspect/modify the response object and its parsed data.
     *
     * Returns the new Promise resolved `data` that will be returned to the client.
     *
     * Example:
     * ```js
     * client.afterSend = function (response, data, options) {
     *     if (response.status != 200) {
     *         throw new ClientResponseError({
     *             url:      response.url,
     *             status:   response.status,
     *             response: { ... },
     *         });
     *     }
     *
     *     return data;
     * };
     * ```
     */
    afterSend?: ((response: Response, data: any) => any) & ((response: Response, data: any, options: SendOptions) => any);
    /**
     * Optional language code (default to `en-US`) that will be sent
     * with the requests to the server as `Accept-Language` header.
     */
    lang: string;
    /**
     * A replaceable instance of the local auth store service.
     */
    authStore: BaseAuthStore;
    /**
     * An instance of the service that handles the **Settings APIs**.
     */
    readonly settings: SettingsService;
    /**
     * An instance of the service that handles the **Collection APIs**.
     */
    readonly collections: CollectionService;
    /**
     * An instance of the service that handles the **File APIs**.
     */
    readonly files: FileService;
    /**
     * An instance of the service that handles the **Log APIs**.
     */
    readonly logs: LogService;
    /**
     * An instance of the service that handles the **Realtime APIs**.
     */
    // readonly realtime: RealtimeService;
    /**
     * An instance of the service that handles the **Health APIs**.
     */
    readonly health: HealthService;
    /**
     * An instance of the service that handles the **Backup APIs**.
     */
    readonly backups: BackupService;
    /**
     * An instance of the service that handles the **Cron APIs**.
     */
    readonly crons: CronService;
    private recordServices;
    constructor(baseURL?: string, authStore?: BaseAuthStore | null, lang?: string);
    /**
     * @deprecated
     * With PocketBase v0.23.0 admins are converted to a regular auth
     * collection named "_superusers", aka. you can use directly collection("_superusers").
     */
    get admins(): RecordService;
    /**
     * Creates a new batch handler for sending multiple transactional
     * create/update/upsert/delete collection requests in one network call.
     *
     * Example:
     * ```js
     * const batch = pb.createBatch();
     *
     * batch.collection("example1").create({ ... })
     * batch.collection("example2").update("RECORD_ID", { ... })
     * batch.collection("example3").delete("RECORD_ID")
     * batch.collection("example4").upsert({ ... })
     *
     * await batch.send()
     * ```
     */
    createBatch(): BatchService;
    /**
     * Returns the RecordService associated to the specified collection.
     */
    collection<M = RecordModel>(idOrName: string): RecordService<M>;
    /**
     * Constructs a filter expression with placeholders populated from a parameters object.
     *
     * Placeholder parameters are defined with the `{:paramName}` notation.
     *
     * The following parameter values are supported:
     *
     * - `string` (_single quotes are autoescaped_)
     * - `number`
     * - `boolean`
     * - `Date` object (_stringified into the PocketBase datetime format_)
     * - `null`
     * - everything else is converted to a string using `JSON.stringify()`
     *
     * Example:
     *
     * ```js
     * pb.collection("example").getFirstListItem(pb.filter(
     *    'title ~ {:title} && created >= {:created}',
     *    { title: "example", created: new Date()}
     * ))
     * ```
     */
    filter(raw: string, params?: {
        [key: string]: any;
    }): string;
    /**
     * @deprecated Please use `pb.files.getURL()`.
     */
    getFileUrl(record: {
        [key: string]: any;
    }, filename: string, queryParams?: FileOptions): string;
    /**
     * @deprecated Please use `pb.buildURL()`.
     */
    buildUrl(path: string): string;
    /**
     * Builds a full client url by safely concatenating the provided path.
     */
    buildURL(path: string): string;
    /**
     * Sends an api http request.
     *
     * @throws {ClientResponseError}
     */
    send<T = any>(path: string, options: SendOptions): T;
    /**
     * Shallow copy the provided object and takes care to initialize
     * any options required to preserve the backward compatability.
     *
     * @param  {SendOptions} options
     * @return {SendOptions}
     */
    // @ts-ignore
    private initSendOptions;
    /**
     * Extracts the header with the provided name in case-insensitive manner.
     * Returns `null` if no header matching the name is found.
     */
    private getHeader;
}

declare const dbg: (...objs: any[]) => void;
declare const info: (...objs: any[]) => void;
declare const warn: (...objs: any[]) => void;
declare const error: (...objs: any[]) => void;
declare const log: (...objs: any[]) => void;

declare const log$1_dbg: typeof dbg;
declare const log$1_error: typeof error;
declare const log$1_info: typeof info;
declare const log$1_log: typeof log;
declare const log$1_warn: typeof warn;
declare namespace log$1 {
  export { log$1_dbg as dbg, log$1_error as error, log$1_info as info, log$1_log as log, log$1_warn as warn };
}

declare const stringify: (obj: any, replacer?: (k: string, v: any) => any, space?: number) => string;

declare namespace URLParse {
    type URLPart =
        | "auth"
        | "hash"
        | "host"
        | "hostname"
        | "href"
        | "origin"
        | "password"
        | "pathname"
        | "port"
        | "protocol"
        | "query"
        | "slashes"
        | "username";

    type QueryParser<T = Record<string, string | undefined>> = (query: string) => T;

    type StringifyQuery = (query: object) => string;
}

interface URLParse<Query> {
    readonly auth: string;
    readonly hash: string;
    readonly host: string;
    readonly hostname: string;
    readonly href: string;
    readonly origin: string;
    readonly password: string;
    readonly pathname: string;
    readonly port: string;
    readonly protocol: string;
    readonly query: Query;
    readonly slashes: boolean;
    readonly username: string;
    set<Part extends URLParse.URLPart>(
        part: Part,
        value: URLParse<Query>[Part] | undefined,
        fn?: false,
    ): URLParse<Query>;
    set<Part extends URLParse.URLPart, T>(
        part: Part,
        value: URLParse<T>[Part] | undefined,
        fn?: URLParse.QueryParser<T>,
    ): URLParse<T>;
    toString(stringify?: URLParse.StringifyQuery): string;
}

declare const URLParse: {
    new(address: string, parser?: false): URLParse<string>;
    new(address: string, parser: true): URLParse<Record<string, string | undefined>>;
    new<T>(address: string, parser?: URLParse.QueryParser<T>): URLParse<T>;
    new(address: string, location?: string | object, parser?: false): URLParse<string>;
    new(
        address: string,
        location: string | object | undefined,
        parser: true,
    ): URLParse<Record<string, string | undefined>>;
    new<T>(address: string, location: string | object | undefined, parser: URLParse.QueryParser<T>): URLParse<T>;
    (address: string, parser?: false): URLParse<string>;
    (address: string, parser: true): URLParse<Record<string, string | undefined>>;
    <T>(address: string, parser: URLParse.QueryParser<T>): URLParse<T>;
    (address: string, location?: string | object, parser?: false): URLParse<string>;
    (
        address: string,
        location: string | object | undefined,
        parser: true,
    ): URLParse<Record<string, string | undefined>>;
    <T>(address: string, location: string | object | undefined, parser: URLParse.QueryParser<T>): URLParse<T>;

    extractProtocol(url: string): {
        slashes: boolean;
        protocol: string;
        rest: string;
    };
    location(url: string): object;
    qs: {
        parse: URLParse.QueryParser;
        stringify: URLParse.StringifyQuery;
    };
    trimLeft(url: string): string;
};

/**
 * Serialize options.
 */
interface SerializeOptions {
    /**
     * Specifies a function that will be used to encode a [cookie-value](https://datatracker.ietf.org/doc/html/rfc6265#section-4.1.1).
     * Since value of a cookie has a limited character set (and must be a simple string), this function can be used to encode
     * a value into a string suited for a cookie's value, and should mirror `decode` when parsing.
     *
     * @default encodeURIComponent
     */
    encode?: (str: string) => string;
    /**
     * Specifies the `number` (in seconds) to be the value for the [`Max-Age` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.2).
     *
     * The [cookie storage model specification](https://tools.ietf.org/html/rfc6265#section-5.3) states that if both `expires` and
     * `maxAge` are set, then `maxAge` takes precedence, but it is possible not all clients by obey this,
     * so if both are set, they should point to the same date and time.
     */
    maxAge?: number;
    /**
     * Specifies the `Date` object to be the value for the [`Expires` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.1).
     * When no expiration is set clients consider this a "non-persistent cookie" and delete it the current session is over.
     *
     * The [cookie storage model specification](https://tools.ietf.org/html/rfc6265#section-5.3) states that if both `expires` and
     * `maxAge` are set, then `maxAge` takes precedence, but it is possible not all clients by obey this,
     * so if both are set, they should point to the same date and time.
     */
    expires?: Date;
    /**
     * Specifies the value for the [`Domain` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.3).
     * When no domain is set clients consider the cookie to apply to the current domain only.
     */
    domain?: string;
    /**
     * Specifies the value for the [`Path` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.4).
     * When no path is set, the path is considered the ["default path"](https://tools.ietf.org/html/rfc6265#section-5.1.4).
     */
    path?: string;
    /**
     * Enables the [`HttpOnly` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.6).
     * When enabled, clients will not allow client-side JavaScript to see the cookie in `document.cookie`.
     */
    httpOnly?: boolean;
    /**
     * Enables the [`Secure` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.5).
     * When enabled, clients will only send the cookie back if the browser has a HTTPS connection.
     */
    secure?: boolean;
    /**
     * Enables the [`Partitioned` `Set-Cookie` attribute](https://tools.ietf.org/html/draft-cutler-httpbis-partitioned-cookies/).
     * When enabled, clients will only send the cookie back when the current domain _and_ top-level domain matches.
     *
     * This is an attribute that has not yet been fully standardized, and may change in the future.
     * This also means clients may ignore this attribute until they understand it. More information
     * about can be found in [the proposal](https://github.com/privacycg/CHIPS).
     */
    partitioned?: boolean;
    /**
     * Specifies the value for the [`Priority` `Set-Cookie` attribute](https://tools.ietf.org/html/draft-west-cookie-priority-00#section-4.1).
     *
     * - `'low'` will set the `Priority` attribute to `Low`.
     * - `'medium'` will set the `Priority` attribute to `Medium`, the default priority when not set.
     * - `'high'` will set the `Priority` attribute to `High`.
     *
     * More information about priority levels can be found in [the specification](https://tools.ietf.org/html/draft-west-cookie-priority-00#section-4.1).
     */
    priority?: "low" | "medium" | "high";
    /**
     * Specifies the value for the [`SameSite` `Set-Cookie` attribute](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-09#section-5.4.7).
     *
     * - `true` will set the `SameSite` attribute to `Strict` for strict same site enforcement.
     * - `'lax'` will set the `SameSite` attribute to `Lax` for lax same site enforcement.
     * - `'none'` will set the `SameSite` attribute to `None` for an explicit cross-site cookie.
     * - `'strict'` will set the `SameSite` attribute to `Strict` for strict same site enforcement.
     *
     * More information about enforcement levels can be found in [the specification](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-09#section-5.4.7).
     */
    sameSite?: boolean | "lax" | "strict" | "none";
}

type PagesMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type PagesRequest = {
    auth?: core.Record;
    method: PagesMethods;
    url: URLParse<string>;
    formData: () => Record<string, any>;
    body: () => Record<string, any> | string;
    header: (name: string) => string;
    cookies: {
        (): Record<string, string | undefined>;
        <T>(name: string): T | undefined;
    };
};
type PagesResponse = {
    file: (path: string) => void;
    write: (s: string) => void;
    redirect: (path: string, status?: number) => void;
    json: (status: number, data: any) => void;
    html: (status: number, data: string) => void;
    header: (name: string, value?: string) => void;
    cookie: <T>(name: string, value: T, options?: Partial<SerializeOptions>) => void;
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
type OAuth2RequestOptions = {
    cookieName: string;
    redirectPath: string;
    autoRedirect: boolean;
} & AuthOptions;
type OAuth2SignInOptions = {
    cookieName: string;
} & AuthOptions;
type CreateUserOptions = {
    sendVerificationEmail: boolean;
} & AuthOptions;
type PagesGlobalContext = {
    url: (path: string) => ReturnType<typeof URLParse<Record<string, string | undefined>>>;
    stringify: typeof stringify;
    forEach: typeof forEach;
    keys: typeof keys;
    values: typeof values;
    merge: typeof merge;
    shuffle: typeof shuffle;
    pick: typeof pick;
    env: (key: string) => string;
    findRecordByFilter: typeof findRecordByFilter;
    findRecordsByFilter: typeof findRecordsByFilter;
    createUser: (email: string, password: string, options?: Partial<CreateUserOptions>) => User;
    createAnonymousUser: (options?: Partial<AuthOptions>) => {
        user: User;
        email: string;
        password: string;
    };
    createPaswordlessUser: (email: string, options?: Partial<CreateUserOptions>) => {
        user: User;
        password: string;
    };
    requestVerification: (email: string, options?: Partial<AuthOptions>) => void;
    confirmVerification: (token: string, options?: Partial<AuthOptions>) => void;
    requestOTP: (email: string, options?: Partial<AuthOptions>) => OTPResponse;
    pb: () => Client;
} & typeof log$1;
type ResolveOptions = {
    mode: 'raw' | 'require' | 'script' | 'style';
};
type RedirectOptions = {
    status: number;
    message: string;
};
type OAuth2ProviderInfo = {
    name: string;
    state: string;
    codeChallenge: string;
    codeVerifier: string;
    redirectUrl: string;
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
    redirect: (path: string, options?: Partial<RedirectOptions>) => void;
    request: PagesRequest;
    resolve: (path: string, options?: Partial<ResolveOptions>) => any;
    response: PagesResponse;
    slot: string;
    slots: Record<string, string>;
    signInWithPassword: (email: string, password: string, options?: Partial<AuthOptions>) => AuthData;
    registerWithPassword: (email: string, password: string, options?: Partial<CreateUserOptions>) => AuthData;
    signInAnonymously: (options?: Partial<AuthOptions>) => AuthData;
    signInWithOTP: (otpId: string, password: string, options?: Partial<AuthOptions>) => AuthData;
    requestOAuth2Login: (providerName: string, options?: Partial<OAuth2RequestOptions>) => string;
    signInWithOAuth2: (state: string, code: string, options?: Partial<OAuth2SignInOptions>, storedProviderInfo?: OAuth2ProviderInfo) => AuthData;
    signOut: () => void;
    signInWithToken: (token: string) => void;
} & PagesGlobalContext;
type PagesConfig = {
    preprocessorExts: string[];
    debug: boolean;
    host: string;
    boot: (globalApi: PagesGlobalContext) => void;
};
type Cache = {
    routes: Route[];
    config: PagesConfig;
};

declare const globalApi: PagesGlobalContext;

declare const moduleExists: (path: string) => boolean;

declare const MiddlewareHandler: PagesMiddlewareFunc;

declare const v23MiddlewareWrapper: (e: core.RequestEvent) => void;

export { AfterBootstrapHandler, type AuthData, type AuthOptions, type Cache, type CreateUserOptions, type FilterOptions, MiddlewareHandler, type MiddlewareLoaderFunc, type OAuth2ProviderInfo, type OAuth2RequestOptions, type OAuth2SignInOptions, type PageDataLoaderFunc, type PagesConfig, type PagesGlobalContext, type PagesParams, type PagesRequestContext, type RedirectOptions, type ResolveOptions, type User, findRecordByFilter, findRecordsByFilter, globalApi, log$1 as log, moduleExists, stringify, v23MiddlewareWrapper };
