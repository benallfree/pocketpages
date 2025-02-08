if (typeof module === 'undefined') { module = { exports: {} } };
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
  "node_modules/tsup/assets/cjs_shims.js"() {
    "use strict";
  }
});

// node_modules/pocketbase-stringify/dist/index.js
var require_dist = __commonJS({
  "node_modules/pocketbase-stringify/dist/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports2 = {};
    __export2(src_exports2, {
      defaultReplacer: () => defaultReplacer,
      stringify: () => stringify8
    });
    module2.exports = __toCommonJS2(src_exports2);
    var defaultReplacer = (k, v) => {
      if (v instanceof Error) {
        return v.stack;
      }
      if (v instanceof RegExp) {
        return v.toString();
      }
      if (v instanceof Function) {
        return v.toString();
      }
      return v;
    };
    var stringify8 = (obj, replacer = defaultReplacer, space = 0) => {
      const seen = /* @__PURE__ */ new WeakSet();
      return JSON.stringify(
        obj,
        (k, v) => {
          if (typeof v === "object" && v !== null) {
            if (seen.has(v)) {
              return replacer ? replacer(k, `[Circular]`) : `[Circular]`;
            }
            seen.add(v);
          }
          return replacer ? replacer(k, v) : v;
        },
        space
      );
    };
  }
});

// node_modules/pocketbase-log/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/pocketbase-log/dist/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports2 = {};
    __export2(src_exports2, {
      dbg: () => dbg3,
      error: () => error2,
      info: () => info2,
      log: () => log4,
      warn: () => warn
    });
    module2.exports = __toCommonJS2(src_exports2);
    var import_pocketbase_stringify7 = require_dist();
    var replacer = (k, v) => {
      if (v instanceof Error) {
        return `${v}
${v.stack}`;
      }
      if (v instanceof RegExp) {
        return v.toString();
      }
      if (v instanceof Function) {
        return v.toString();
      }
      return v;
    };
    var prepare = (objs) => {
      const parts = objs.map((o) => {
        if (o instanceof Error) {
          return o.stack;
        }
        if (o instanceof RegExp) {
          return o.toString();
        }
        if (o instanceof Function) {
          return o.toString();
        }
        if (typeof o === "object") {
          return (0, import_pocketbase_stringify7.stringify)(o, replacer, 2);
        }
        return o;
      });
      return parts.join(` `);
    };
    var dbg3 = (...objs) => {
      const s = prepare(objs);
      $app.logger().debug(s);
    };
    var info2 = (...objs) => {
      const s = prepare(objs);
      $app.logger().info(s);
    };
    var warn = (...objs) => {
      const s = prepare(objs);
      $app.logger().warn(s);
    };
    var error2 = (...objs) => {
      const s = prepare(objs);
      $app.logger().error(s);
    };
    var log4 = (...objs) => {
      const s = prepare(objs);
      console.log(s);
    };
  }
});

// node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  "node_modules/requires-port/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    module2.exports = function required(port, protocol) {
      protocol = protocol.split(":")[0];
      port = +port;
      if (!port) return false;
      switch (protocol) {
        case "http":
        case "ws":
          return port !== 80;
        case "https":
        case "wss":
          return port !== 443;
        case "ftp":
          return port !== 21;
        case "gopher":
          return port !== 70;
        case "file":
          return false;
      }
      return port !== 0;
    };
  }
});

// node_modules/querystringify/index.js
var require_querystringify = __commonJS({
  "node_modules/querystringify/index.js"(exports2) {
    "use strict";
    init_cjs_shims();
    var has = Object.prototype.hasOwnProperty;
    var undef;
    function decode3(input) {
      try {
        return decodeURIComponent(input.replace(/\+/g, " "));
      } catch (e) {
        return null;
      }
    }
    function encode2(input) {
      try {
        return encodeURIComponent(input);
      } catch (e) {
        return null;
      }
    }
    function querystring(query) {
      var parser2 = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
      while (part = parser2.exec(query)) {
        var key = decode3(part[1]), value = decode3(part[2]);
        if (key === null || value === null || key in result) continue;
        result[key] = value;
      }
      return result;
    }
    function querystringify(obj, prefix) {
      prefix = prefix || "";
      var pairs = [], value, key;
      if ("string" !== typeof prefix) prefix = "?";
      for (key in obj) {
        if (has.call(obj, key)) {
          value = obj[key];
          if (!value && (value === null || value === undef || isNaN(value))) {
            value = "";
          }
          key = encode2(key);
          value = encode2(value);
          if (key === null || value === null) continue;
          pairs.push(key + "=" + value);
        }
      }
      return pairs.length ? prefix + pairs.join("&") : "";
    }
    exports2.stringify = querystringify;
    exports2.parse = querystring;
  }
});

// node_modules/url-parse/index.js
var require_url_parse = __commonJS({
  "node_modules/url-parse/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var required = require_requires_port();
    var qs = require_querystringify();
    var controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
    var CRHTLF = /[\n\r\t]/g;
    var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
    var port = /:\d+$/;
    var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
    var windowsDriveLetter = /^[a-zA-Z]:/;
    function trimLeft(str) {
      return (str ? str : "").toString().replace(controlOrWhitespace, "");
    }
    var rules = [
      ["#", "hash"],
      // Extract from the back.
      ["?", "query"],
      // Extract from the back.
      function sanitize(address, url) {
        return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
      },
      ["/", "pathname"],
      // Extract from the back.
      ["@", "auth", 1],
      // Extract from the front.
      [NaN, "host", void 0, 1, 1],
      // Set left over value.
      [/:(\d*)$/, "port", void 0, 1],
      // RegExp the back.
      [NaN, "hostname", void 0, 1, 1]
      // Set left over.
    ];
    var ignore = { hash: 1, query: 1 };
    function lolcation(loc) {
      var globalVar;
      if (typeof window !== "undefined") globalVar = window;
      else if (typeof global !== "undefined") globalVar = global;
      else if (typeof self !== "undefined") globalVar = self;
      else globalVar = {};
      var location = globalVar.location || {};
      loc = loc || location;
      var finaldestination = {}, type = typeof loc, key;
      if ("blob:" === loc.protocol) {
        finaldestination = new Url(unescape(loc.pathname), {});
      } else if ("string" === type) {
        finaldestination = new Url(loc, {});
        for (key in ignore) delete finaldestination[key];
      } else if ("object" === type) {
        for (key in loc) {
          if (key in ignore) continue;
          finaldestination[key] = loc[key];
        }
        if (finaldestination.slashes === void 0) {
          finaldestination.slashes = slashes.test(loc.href);
        }
      }
      return finaldestination;
    }
    function isSpecial(scheme) {
      return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
    }
    function extractProtocol(address, location) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      location = location || {};
      var match = protocolre.exec(address);
      var protocol = match[1] ? match[1].toLowerCase() : "";
      var forwardSlashes = !!match[2];
      var otherSlashes = !!match[3];
      var slashesCount = 0;
      var rest;
      if (forwardSlashes) {
        if (otherSlashes) {
          rest = match[2] + match[3] + match[4];
          slashesCount = match[2].length + match[3].length;
        } else {
          rest = match[2] + match[4];
          slashesCount = match[2].length;
        }
      } else {
        if (otherSlashes) {
          rest = match[3] + match[4];
          slashesCount = match[3].length;
        } else {
          rest = match[4];
        }
      }
      if (protocol === "file:") {
        if (slashesCount >= 2) {
          rest = rest.slice(2);
        }
      } else if (isSpecial(protocol)) {
        rest = match[4];
      } else if (protocol) {
        if (forwardSlashes) {
          rest = rest.slice(2);
        }
      } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
        rest = match[4];
      }
      return {
        protocol,
        slashes: forwardSlashes || isSpecial(protocol),
        slashesCount,
        rest
      };
    }
    function resolve(relative, base) {
      if (relative === "") return base;
      var path3 = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path3.length, last = path3[i - 1], unshift = false, up = 0;
      while (i--) {
        if (path3[i] === ".") {
          path3.splice(i, 1);
        } else if (path3[i] === "..") {
          path3.splice(i, 1);
          up++;
        } else if (up) {
          if (i === 0) unshift = true;
          path3.splice(i, 1);
          up--;
        }
      }
      if (unshift) path3.unshift("");
      if (last === "." || last === "..") path3.push("");
      return path3.join("/");
    }
    function Url(address, location, parser2) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      if (!(this instanceof Url)) {
        return new Url(address, location, parser2);
      }
      var relative, extracted, parse5, instruction, index, key, instructions = rules.slice(), type = typeof location, url = this, i = 0;
      if ("object" !== type && "string" !== type) {
        parser2 = location;
        location = null;
      }
      if (parser2 && "function" !== typeof parser2) parser2 = qs.parse;
      location = lolcation(location);
      extracted = extractProtocol(address || "", location);
      relative = !extracted.protocol && !extracted.slashes;
      url.slashes = extracted.slashes || relative && location.slashes;
      url.protocol = extracted.protocol || location.protocol || "";
      address = extracted.rest;
      if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
        instructions[3] = [/(.*)/, "pathname"];
      }
      for (; i < instructions.length; i++) {
        instruction = instructions[i];
        if (typeof instruction === "function") {
          address = instruction(address, url);
          continue;
        }
        parse5 = instruction[0];
        key = instruction[1];
        if (parse5 !== parse5) {
          url[key] = address;
        } else if ("string" === typeof parse5) {
          index = parse5 === "@" ? address.lastIndexOf(parse5) : address.indexOf(parse5);
          if (~index) {
            if ("number" === typeof instruction[2]) {
              url[key] = address.slice(0, index);
              address = address.slice(index + instruction[2]);
            } else {
              url[key] = address.slice(index);
              address = address.slice(0, index);
            }
          }
        } else if (index = parse5.exec(address)) {
          url[key] = index[1];
          address = address.slice(0, index.index);
        }
        url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
        if (instruction[4]) url[key] = url[key].toLowerCase();
      }
      if (parser2) url.query = parser2(url.query);
      if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) {
        url.pathname = resolve(url.pathname, location.pathname);
      }
      if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
        url.pathname = "/" + url.pathname;
      }
      if (!required(url.port, url.protocol)) {
        url.host = url.hostname;
        url.port = "";
      }
      url.username = url.password = "";
      if (url.auth) {
        index = url.auth.indexOf(":");
        if (~index) {
          url.username = url.auth.slice(0, index);
          url.username = encodeURIComponent(decodeURIComponent(url.username));
          url.password = url.auth.slice(index + 1);
          url.password = encodeURIComponent(decodeURIComponent(url.password));
        } else {
          url.username = encodeURIComponent(decodeURIComponent(url.auth));
        }
        url.auth = url.password ? url.username + ":" + url.password : url.username;
      }
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
    }
    function set(part, value, fn) {
      var url = this;
      switch (part) {
        case "query":
          if ("string" === typeof value && value.length) {
            value = (fn || qs.parse)(value);
          }
          url[part] = value;
          break;
        case "port":
          url[part] = value;
          if (!required(value, url.protocol)) {
            url.host = url.hostname;
            url[part] = "";
          } else if (value) {
            url.host = url.hostname + ":" + value;
          }
          break;
        case "hostname":
          url[part] = value;
          if (url.port) value += ":" + url.port;
          url.host = value;
          break;
        case "host":
          url[part] = value;
          if (port.test(value)) {
            value = value.split(":");
            url.port = value.pop();
            url.hostname = value.join(":");
          } else {
            url.hostname = value;
            url.port = "";
          }
          break;
        case "protocol":
          url.protocol = value.toLowerCase();
          url.slashes = !fn;
          break;
        case "pathname":
        case "hash":
          if (value) {
            var char = part === "pathname" ? "/" : "#";
            url[part] = value.charAt(0) !== char ? char + value : value;
          } else {
            url[part] = value;
          }
          break;
        case "username":
        case "password":
          url[part] = encodeURIComponent(value);
          break;
        case "auth":
          var index = value.indexOf(":");
          if (~index) {
            url.username = value.slice(0, index);
            url.username = encodeURIComponent(decodeURIComponent(url.username));
            url.password = value.slice(index + 1);
            url.password = encodeURIComponent(decodeURIComponent(url.password));
          } else {
            url.username = encodeURIComponent(decodeURIComponent(value));
          }
      }
      for (var i = 0; i < rules.length; i++) {
        var ins = rules[i];
        if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
      }
      url.auth = url.password ? url.username + ":" + url.password : url.username;
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
      return url;
    }
    function toString2(stringify8) {
      if (!stringify8 || "function" !== typeof stringify8) stringify8 = qs.stringify;
      var query, url = this, host = url.host, protocol = url.protocol;
      if (protocol && protocol.charAt(protocol.length - 1) !== ":") protocol += ":";
      var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
      if (url.username) {
        result += url.username;
        if (url.password) result += ":" + url.password;
        result += "@";
      } else if (url.password) {
        result += ":" + url.password;
        result += "@";
      } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") {
        result += "@";
      }
      if (host[host.length - 1] === ":" || port.test(url.hostname) && !url.port) {
        host += ":";
      }
      result += host + url.pathname;
      query = "object" === typeof url.query ? stringify8(url.query) : url.query;
      if (query) result += "?" !== query.charAt(0) ? "?" + query : query;
      if (url.hash) result += url.hash;
      return result;
    }
    Url.prototype = { set, toString: toString2 };
    Url.extractProtocol = extractProtocol;
    Url.location = lolcation;
    Url.trimLeft = trimLeft;
    Url.qs = qs;
    module2.exports = Url;
  }
});

// node_modules/pocketbase-node/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/pocketbase-node/dist/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports2 = {};
    __export2(src_exports2, {
      child_process: () => child_process_exports,
      fs: () => fs_exports,
      path: () => path_exports,
      process: () => process_exports
    });
    module2.exports = __toCommonJS2(src_exports2);
    var fs_exports = {};
    __export2(fs_exports, {
      existsSync: () => existsSync,
      mkdirSync: () => mkdirSync,
      readFileSync: () => readFileSync,
      writeFileSync: () => writeFileSync
    });
    function byteArrayToUtf8(byteArray) {
      let utf8String = "";
      for (let i = 0; i < byteArray.length; i++) {
        utf8String += String.fromCharCode(byteArray[i]);
      }
      return decodeURIComponent(escape(utf8String));
    }
    var readFileSync = (path3, options2) => {
      if (typeof path3 !== "string") {
        throw new Error("path must be a string");
      }
      const res = $os.readFile(path3);
      if (typeof res === "string") {
        return res;
      }
      const s = byteArrayToUtf8(res);
      return s;
    };
    var existsSync = (pathLike, fileType = "both") => {
      const isDir = (() => {
        try {
          $os.readDir(pathLike);
          return true;
        } catch {
          return false;
        }
      })();
      const isFile2 = (() => {
        if (isDir) {
          return false;
        }
        try {
          return $filesystem.fileFromPath(pathLike) !== null;
        } catch {
          return false;
        }
      })();
      return fileType === "file" ? isFile2 : fileType === "dir" ? isDir : isFile2 || isDir;
    };
    var writeFileSync = (path3, data, options2) => {
      if (typeof path3 !== "string") {
        throw new Error("path must be a string");
      }
      if (typeof data !== "string") {
        throw new Error("data must be a string");
      }
      const mode = (() => {
        if (options2 && typeof options2 === "object" && "mode" in options2) {
          return options2.mode;
        }
        return 420;
      })();
      $os.writeFile(path3, data, mode);
    };
    function mkdirSync(path3, options2) {
      const mode = (() => {
        if (options2 && typeof options2 === "object" && "mode" in options2) {
          return options2.mode;
        }
        return 493;
      })();
      $os.mkdirAll(path3.toString(), mode);
      return;
    }
    var path_exports = {};
    __export2(path_exports, {
      basename: () => basename,
      delimiter: () => delimiter,
      dirname: () => dirname,
      extname: () => extname,
      format: () => format,
      isAbsolute: () => isAbsolute,
      join: () => join,
      normalize: () => normalize,
      parse: () => parse5,
      relative: () => relative,
      resolve: () => resolve,
      sep: () => sep,
      win32: () => win32
    });
    function assertPath(path3) {
      if (typeof path3 !== "string") {
        throw new TypeError(
          "Path must be a string. Received " + JSON.stringify(path3)
        );
      }
    }
    function normalizeStringPosix(path3, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path3.length; ++i) {
        if (i < path3.length) code = path3.charCodeAt(i);
        else if (code === 47) break;
        else code = 47;
        if (code === 47) {
          if (lastSlash === i - 1 || dots === 1) {
          } else if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0) res += "/..";
              else res = "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0) res += "/" + path3.slice(lastSlash + 1, i);
            else res = path3.slice(lastSlash + 1, i);
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === 46 && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    function _format(sep2, pathObject) {
      var dir = pathObject.dir || pathObject.root;
      var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep2 + base;
    }
    function resolve(...args) {
      var resolvedPath = "";
      var resolvedAbsolute = false;
      var cwd2;
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path3;
        if (i >= 0) path3 = arguments[i];
        else {
          if (cwd2 === void 0) cwd2 = $os.getwd();
          path3 = cwd2;
        }
        assertPath(path3);
        if (path3.length === 0) {
          continue;
        }
        resolvedPath = path3 + "/" + resolvedPath;
        resolvedAbsolute = path3.charCodeAt(0) === 47;
      }
      resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
      if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return "/" + resolvedPath;
        else return "/";
      } else if (resolvedPath.length > 0) {
        return resolvedPath;
      } else {
        return ".";
      }
    }
    function normalize(path3) {
      assertPath(path3);
      if (path3.length === 0) return ".";
      var isAbsolute2 = path3.charCodeAt(0) === 47;
      var trailingSeparator = path3.charCodeAt(path3.length - 1) === 47;
      path3 = normalizeStringPosix(path3, !isAbsolute2);
      if (path3.length === 0 && !isAbsolute2) path3 = ".";
      if (path3.length > 0 && trailingSeparator) path3 += "/";
      if (isAbsolute2) return "/" + path3;
      return path3;
    }
    function isAbsolute(path3) {
      assertPath(path3);
      return path3.length > 0 && path3.charCodeAt(0) === 47;
    }
    function join(...paths) {
      if (arguments.length === 0) return ".";
      var joined;
      for (var i = 0; i < arguments.length; ++i) {
        var arg = arguments[i];
        assertPath(arg);
        if (arg.length > 0) {
          if (joined === void 0) joined = arg;
          else joined += "/" + arg;
        }
      }
      if (joined === void 0) return ".";
      return normalize(joined);
    }
    function relative(from, to) {
      assertPath(from);
      assertPath(to);
      if (from === to) return "";
      from = resolve(from);
      to = resolve(to);
      if (from === to) return "";
      var fromStart = 1;
      for (; fromStart < from.length; ++fromStart) {
        if (from.charCodeAt(fromStart) !== 47) break;
      }
      var fromEnd = from.length;
      var fromLen = fromEnd - fromStart;
      var toStart = 1;
      for (; toStart < to.length; ++toStart) {
        if (to.charCodeAt(toStart) !== 47) break;
      }
      var toEnd = to.length;
      var toLen = toEnd - toStart;
      var length = fromLen < toLen ? fromLen : toLen;
      var lastCommonSep = -1;
      var i = 0;
      for (; i <= length; ++i) {
        if (i === length) {
          if (toLen > length) {
            if (to.charCodeAt(toStart + i) === 47) {
              return to.slice(toStart + i + 1);
            } else if (i === 0) {
              return to.slice(toStart + i);
            }
          } else if (fromLen > length) {
            if (from.charCodeAt(fromStart + i) === 47) {
              lastCommonSep = i;
            } else if (i === 0) {
              lastCommonSep = 0;
            }
          }
          break;
        }
        var fromCode = from.charCodeAt(fromStart + i);
        var toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 47) lastCommonSep = i;
      }
      var out = "";
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === 47) {
          if (out.length === 0) out += "..";
          else out += "/..";
        }
      }
      if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
      else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) ++toStart;
        return to.slice(toStart);
      }
    }
    function dirname(path3) {
      assertPath(path3);
      if (path3.length === 0) return ".";
      var code = path3.charCodeAt(0);
      var hasRoot = code === 47;
      var end = -1;
      var matchedSlash = true;
      for (var i = path3.length - 1; i >= 1; --i) {
        code = path3.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          matchedSlash = false;
        }
      }
      if (end === -1) return hasRoot ? "/" : ".";
      if (hasRoot && end === 1) return "//";
      return path3.slice(0, end);
    }
    function basename(path3, ext) {
      if (ext !== void 0 && typeof ext !== "string")
        throw new TypeError('"ext" argument must be a string');
      assertPath(path3);
      var start = 0;
      var end = -1;
      var matchedSlash = true;
      var i;
      if (ext !== void 0 && ext.length > 0 && ext.length <= path3.length) {
        if (ext.length === path3.length && ext === path3) return "";
        var extIdx = ext.length - 1;
        var firstNonSlashEnd = -1;
        for (i = path3.length - 1; i >= 0; --i) {
          var code = path3.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              if (code === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  end = i;
                }
              } else {
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path3.length;
        return path3.slice(start, end);
      } else {
        for (i = path3.length - 1; i >= 0; --i) {
          if (path3.charCodeAt(i) === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
        }
        if (end === -1) return "";
        return path3.slice(start, end);
      }
    }
    function extname(path3) {
      assertPath(path3);
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var preDotState = 0;
      for (var i = path3.length - 1; i >= 0; --i) {
        var code = path3.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1) startDot = i;
          else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
      }
      return path3.slice(startDot, end);
    }
    function format(pathObject) {
      if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(
          'The "pathObject" argument must be of type Object. Received type ' + typeof pathObject
        );
      }
      return _format("/", pathObject);
    }
    function parse5(path3) {
      assertPath(path3);
      var ret = { root: "", dir: "", base: "", ext: "", name: "" };
      if (path3.length === 0) return ret;
      var code = path3.charCodeAt(0);
      var isAbsolute2 = code === 47;
      var start;
      if (isAbsolute2) {
        ret.root = "/";
        start = 1;
      } else {
        start = 0;
      }
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var i = path3.length - 1;
      var preDotState = 0;
      for (; i >= start; --i) {
        code = path3.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1) startDot = i;
          else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
          if (startPart === 0 && isAbsolute2)
            ret.base = ret.name = path3.slice(1, end);
          else ret.base = ret.name = path3.slice(startPart, end);
        }
      } else {
        if (startPart === 0 && isAbsolute2) {
          ret.name = path3.slice(1, startDot);
          ret.base = path3.slice(1, end);
        } else {
          ret.name = path3.slice(startPart, startDot);
          ret.base = path3.slice(startPart, end);
        }
        ret.ext = path3.slice(startDot, end);
      }
      if (startPart > 0) ret.dir = path3.slice(0, startPart - 1);
      else if (isAbsolute2) ret.dir = "/";
      return ret;
    }
    var sep = "/";
    var delimiter = ":";
    var win32 = null;
    var child_process_exports = {};
    __export2(child_process_exports, {
      execSync: () => execSync
    });
    var execSync = (cmdArr) => {
      const [cmd, ...args] = cmdArr;
      const _cmd = $os.cmd(cmd, ...args);
      const charOut = _cmd.output();
      const output = String.fromCharCode(...charOut);
      return output;
    };
    var process_exports = {};
    __export2(process_exports, {
      cwd: () => cwd,
      env: () => env
    });
    var cwd = () => $os.getwd();
    var { env } = process;
  }
});

// ../pocketbase-ejs/node_modules/pocketbase-node/dist/index.js
var require_dist4 = __commonJS({
  "../pocketbase-ejs/node_modules/pocketbase-node/dist/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports2 = {};
    __export2(src_exports2, {
      child_process: () => child_process_exports,
      fs: () => fs_exports,
      path: () => path_exports,
      process: () => process_exports
    });
    module2.exports = __toCommonJS2(src_exports2);
    var fs_exports = {};
    __export2(fs_exports, {
      existsSync: () => existsSync,
      mkdirSync: () => mkdirSync,
      readFileSync: () => readFileSync,
      writeFileSync: () => writeFileSync
    });
    function byteArrayToUtf8(byteArray) {
      let utf8String = "";
      for (let i = 0; i < byteArray.length; i++) {
        utf8String += String.fromCharCode(byteArray[i]);
      }
      return decodeURIComponent(escape(utf8String));
    }
    var readFileSync = (path3, options2) => {
      const res = $os.readFile(path3);
      if (typeof res === "string") {
        return res;
      }
      const s = byteArrayToUtf8(res);
      return s;
    };
    var existsSync = (path3, fileType = `file`) => {
      const isDir = (() => {
        try {
          $os.readDir(path3);
          return true;
        } catch {
          return false;
        }
      })();
      const isFile2 = (() => {
        if (isDir) {
          return false;
        }
        try {
          return $filesystem.fileFromPath(path3) !== null;
        } catch {
          return false;
        }
      })();
      return fileType === "file" ? isFile2 : fileType === "dir" ? isDir : isFile2 || isDir;
    };
    var writeFileSync = (path3, data, options2) => {
      if (typeof path3 !== "string") {
        throw new Error("path must be a string");
      }
      if (typeof data !== "string") {
        throw new Error("data must be a string");
      }
      const mode = (() => {
        if (typeof options2 === "object" && "mode" in options2) {
          return options2.mode;
        }
        return 420;
      })();
      $os.writeFile(path3, data, mode);
    };
    function mkdirSync(path3, options2) {
      const mode = (() => {
        if (typeof options2 === "object" && "mode" in options2) {
          return options2.mode;
        }
        return 493;
      })();
      $os.mkdirAll(path3.toString(), mode);
      return;
    }
    var path_exports = {};
    __export2(path_exports, {
      basename: () => basename,
      delimiter: () => delimiter,
      dirname: () => dirname,
      extname: () => extname,
      format: () => format,
      isAbsolute: () => isAbsolute,
      join: () => join,
      normalize: () => normalize,
      parse: () => parse5,
      relative: () => relative,
      resolve: () => resolve,
      sep: () => sep,
      win32: () => win32
    });
    function assertPath(path3) {
      if (typeof path3 !== "string") {
        throw new TypeError(
          "Path must be a string. Received " + JSON.stringify(path3)
        );
      }
    }
    function normalizeStringPosix(path3, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path3.length; ++i) {
        if (i < path3.length) code = path3.charCodeAt(i);
        else if (code === 47) break;
        else code = 47;
        if (code === 47) {
          if (lastSlash === i - 1 || dots === 1) {
          } else if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0) res += "/..";
              else res = "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0) res += "/" + path3.slice(lastSlash + 1, i);
            else res = path3.slice(lastSlash + 1, i);
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === 46 && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    function _format(sep2, pathObject) {
      var dir = pathObject.dir || pathObject.root;
      var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep2 + base;
    }
    function resolve(...args) {
      var resolvedPath = "";
      var resolvedAbsolute = false;
      var cwd2;
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path3;
        if (i >= 0) path3 = arguments[i];
        else {
          if (cwd2 === void 0) cwd2 = $os.getwd();
          path3 = cwd2;
        }
        assertPath(path3);
        if (path3.length === 0) {
          continue;
        }
        resolvedPath = path3 + "/" + resolvedPath;
        resolvedAbsolute = path3.charCodeAt(0) === 47;
      }
      resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
      if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return "/" + resolvedPath;
        else return "/";
      } else if (resolvedPath.length > 0) {
        return resolvedPath;
      } else {
        return ".";
      }
    }
    function normalize(path3) {
      assertPath(path3);
      if (path3.length === 0) return ".";
      var isAbsolute2 = path3.charCodeAt(0) === 47;
      var trailingSeparator = path3.charCodeAt(path3.length - 1) === 47;
      path3 = normalizeStringPosix(path3, !isAbsolute2);
      if (path3.length === 0 && !isAbsolute2) path3 = ".";
      if (path3.length > 0 && trailingSeparator) path3 += "/";
      if (isAbsolute2) return "/" + path3;
      return path3;
    }
    function isAbsolute(path3) {
      assertPath(path3);
      return path3.length > 0 && path3.charCodeAt(0) === 47;
    }
    function join(...paths) {
      if (arguments.length === 0) return ".";
      var joined;
      for (var i = 0; i < arguments.length; ++i) {
        var arg = arguments[i];
        assertPath(arg);
        if (arg.length > 0) {
          if (joined === void 0) joined = arg;
          else joined += "/" + arg;
        }
      }
      if (joined === void 0) return ".";
      return normalize(joined);
    }
    function relative(from, to) {
      assertPath(from);
      assertPath(to);
      if (from === to) return "";
      from = resolve(from);
      to = resolve(to);
      if (from === to) return "";
      var fromStart = 1;
      for (; fromStart < from.length; ++fromStart) {
        if (from.charCodeAt(fromStart) !== 47) break;
      }
      var fromEnd = from.length;
      var fromLen = fromEnd - fromStart;
      var toStart = 1;
      for (; toStart < to.length; ++toStart) {
        if (to.charCodeAt(toStart) !== 47) break;
      }
      var toEnd = to.length;
      var toLen = toEnd - toStart;
      var length = fromLen < toLen ? fromLen : toLen;
      var lastCommonSep = -1;
      var i = 0;
      for (; i <= length; ++i) {
        if (i === length) {
          if (toLen > length) {
            if (to.charCodeAt(toStart + i) === 47) {
              return to.slice(toStart + i + 1);
            } else if (i === 0) {
              return to.slice(toStart + i);
            }
          } else if (fromLen > length) {
            if (from.charCodeAt(fromStart + i) === 47) {
              lastCommonSep = i;
            } else if (i === 0) {
              lastCommonSep = 0;
            }
          }
          break;
        }
        var fromCode = from.charCodeAt(fromStart + i);
        var toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 47) lastCommonSep = i;
      }
      var out = "";
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === 47) {
          if (out.length === 0) out += "..";
          else out += "/..";
        }
      }
      if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
      else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) ++toStart;
        return to.slice(toStart);
      }
    }
    function dirname(path3) {
      assertPath(path3);
      if (path3.length === 0) return ".";
      var code = path3.charCodeAt(0);
      var hasRoot = code === 47;
      var end = -1;
      var matchedSlash = true;
      for (var i = path3.length - 1; i >= 1; --i) {
        code = path3.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          matchedSlash = false;
        }
      }
      if (end === -1) return hasRoot ? "/" : ".";
      if (hasRoot && end === 1) return "//";
      return path3.slice(0, end);
    }
    function basename(path3, ext) {
      if (ext !== void 0 && typeof ext !== "string")
        throw new TypeError('"ext" argument must be a string');
      assertPath(path3);
      var start = 0;
      var end = -1;
      var matchedSlash = true;
      var i;
      if (ext !== void 0 && ext.length > 0 && ext.length <= path3.length) {
        if (ext.length === path3.length && ext === path3) return "";
        var extIdx = ext.length - 1;
        var firstNonSlashEnd = -1;
        for (i = path3.length - 1; i >= 0; --i) {
          var code = path3.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              if (code === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  end = i;
                }
              } else {
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path3.length;
        return path3.slice(start, end);
      } else {
        for (i = path3.length - 1; i >= 0; --i) {
          if (path3.charCodeAt(i) === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
        }
        if (end === -1) return "";
        return path3.slice(start, end);
      }
    }
    function extname(path3) {
      assertPath(path3);
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var preDotState = 0;
      for (var i = path3.length - 1; i >= 0; --i) {
        var code = path3.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1) startDot = i;
          else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
      }
      return path3.slice(startDot, end);
    }
    function format(pathObject) {
      if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(
          'The "pathObject" argument must be of type Object. Received type ' + typeof pathObject
        );
      }
      return _format("/", pathObject);
    }
    function parse5(path3) {
      assertPath(path3);
      var ret = { root: "", dir: "", base: "", ext: "", name: "" };
      if (path3.length === 0) return ret;
      var code = path3.charCodeAt(0);
      var isAbsolute2 = code === 47;
      var start;
      if (isAbsolute2) {
        ret.root = "/";
        start = 1;
      } else {
        start = 0;
      }
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var i = path3.length - 1;
      var preDotState = 0;
      for (; i >= start; --i) {
        code = path3.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1) startDot = i;
          else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
          if (startPart === 0 && isAbsolute2)
            ret.base = ret.name = path3.slice(1, end);
          else ret.base = ret.name = path3.slice(startPart, end);
        }
      } else {
        if (startPart === 0 && isAbsolute2) {
          ret.name = path3.slice(1, startDot);
          ret.base = path3.slice(1, end);
        } else {
          ret.name = path3.slice(startPart, startDot);
          ret.base = path3.slice(startPart, end);
        }
        ret.ext = path3.slice(startDot, end);
      }
      if (startPart > 0) ret.dir = path3.slice(0, startPart - 1);
      else if (isAbsolute2) ret.dir = "/";
      return ret;
    }
    var sep = "/";
    var delimiter = ":";
    var win32 = null;
    var child_process_exports = {};
    __export2(child_process_exports, {
      execSync: () => execSync
    });
    var execSync = (cmdArr) => {
      const [cmd, ...args] = cmdArr;
      const _cmd = $os.cmd(cmd, ...args);
      const charOut = _cmd.output();
      const output = String.fromCharCode(...charOut);
      return output;
    };
    var process_exports = {};
    __export2(process_exports, {
      cwd: () => cwd,
      env: () => env
    });
    var cwd = () => $os.getwd();
    var { env } = process;
  }
});

// ../pocketbase-ejs/lib/utils.js
var require_utils = __commonJS({
  "../pocketbase-ejs/lib/utils.js"(exports2) {
    "use strict";
    init_cjs_shims();
    var regExpChars = /[|\\{}()[\]^$+*?.]/g;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasOwn = function(obj, key) {
      return hasOwnProperty.apply(obj, [key]);
    };
    exports2.escapeRegExpChars = function(string) {
      if (!string) {
        return "";
      }
      return String(string).replace(regExpChars, "\\$&");
    };
    var _ENCODE_HTML_RULES = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&#34;",
      "'": "&#39;"
    };
    var _MATCH_HTML = /[&<>'"]/g;
    function encode_char(c) {
      return _ENCODE_HTML_RULES[c] || c;
    }
    var escapeFuncStr = `var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
`;
    exports2.escapeXML = function(markup) {
      return markup == void 0 ? "" : String(markup).replace(_MATCH_HTML, encode_char);
    };
    function escapeXMLToString() {
      return Function.prototype.toString.call(this) + ";\n" + escapeFuncStr;
    }
    try {
      if (typeof Object.defineProperty === "function") {
        Object.defineProperty(exports2.escapeXML, "toString", { value: escapeXMLToString });
      } else {
        exports2.escapeXML.toString = escapeXMLToString;
      }
    } catch (err) {
      console.warn("Unable to set escapeXML.toString (is the Function prototype frozen?)");
    }
    exports2.shallowCopy = function(to, from) {
      from = from || {};
      if (to !== null && to !== void 0) {
        for (var p in from) {
          if (!hasOwn(from, p)) {
            continue;
          }
          if (p === "__proto__" || p === "constructor") {
            continue;
          }
          to[p] = from[p];
        }
      }
      return to;
    };
    exports2.shallowCopyFromList = function(to, from, list2) {
      list2 = list2 || [];
      from = from || {};
      if (to !== null && to !== void 0) {
        for (var i = 0; i < list2.length; i++) {
          var p = list2[i];
          if (typeof from[p] != "undefined") {
            if (!hasOwn(from, p)) {
              continue;
            }
            if (p === "__proto__" || p === "constructor") {
              continue;
            }
            to[p] = from[p];
          }
        }
      }
      return to;
    };
    exports2.cache = {
      _data: {},
      set: function(key, val) {
        this._data[key] = val;
      },
      get: function(key) {
        return this._data[key];
      },
      remove: function(key) {
        delete this._data[key];
      },
      reset: function() {
        this._data = {};
      }
    };
    exports2.hyphenToCamel = function(str) {
      return str.replace(/-[a-z]/g, function(match) {
        return match[1].toUpperCase();
      });
    };
    exports2.createNullProtoObjWherePossible = function() {
      if (typeof Object.create == "function") {
        return function() {
          return /* @__PURE__ */ Object.create(null);
        };
      }
      if (!({ __proto__: null } instanceof Object)) {
        return function() {
          return { __proto__: null };
        };
      }
      return function() {
        return {};
      };
    }();
    exports2.hasOwnOnlyObject = function(obj) {
      var o = exports2.createNullProtoObjWherePossible();
      for (var p in obj) {
        if (hasOwn(obj, p)) {
          o[p] = obj[p];
        }
      }
      return o;
    };
  }
});

// ../pocketbase-ejs/package.json
var require_package = __commonJS({
  "../pocketbase-ejs/package.json"(exports2, module2) {
    module2.exports = {
      name: "pocketbase-ejs",
      description: "Embedded JavaScript templates",
      keywords: [
        "template",
        "engine",
        "ejs"
      ],
      version: "3.1.10006",
      author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
      license: "Apache-2.0",
      main: "./lib/ejs.js",
      types: "./lib/ejs.d.ts",
      repository: {
        type: "git",
        url: "git://github.com/benallfree/pocketbase-ejs.git"
      },
      bugs: "https://github.com/benallfree/pocketbase-ejs/issues",
      homepage: "https://github.com/benallfree/pocketbase-ejs",
      devDependencies: {
        "@changesets/cli": "^2.27.11",
        browserify: "^16.5.1",
        eslint: "^6.8.0",
        "git-directory-deploy": "^1.5.1",
        jsdoc: "^4.0.2",
        "lru-cache": "^4.0.1",
        mocha: "^10.2.0",
        "uglify-js": "^3.3.16",
        jake: "^10.8.5"
      },
      engines: {
        node: ">=0.10.0"
      },
      scripts: {
        test: "npx jake test"
      },
      files: [
        "lib"
      ],
      dependencies: {
        "pocketbase-node": "^0.0.2"
      }
    };
  }
});

// ../pocketbase-ejs/lib/ejs.js
var require_ejs = __commonJS({
  "../pocketbase-ejs/lib/ejs.js"(exports2) {
    "use strict";
    init_cjs_shims();
    var { fs: fs5, path: path3 } = require_dist4();
    var utils = require_utils();
    var scopeOptionWarned = false;
    var _VERSION_STRING = require_package().version;
    var _DEFAULT_OPEN_DELIMITER = "<";
    var _DEFAULT_CLOSE_DELIMITER = ">";
    var _DEFAULT_DELIMITER = "%";
    var _DEFAULT_LOCALS_NAME = "locals";
    var _NAME = "ejs";
    var _REGEX_STRING = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";
    var _OPTS_PASSABLE_WITH_DATA = [
      "delimiter",
      "scope",
      "context",
      "debug",
      "compileDebug",
      "client",
      "_with",
      "rmWhitespace",
      "strict",
      "filename",
      "async"
    ];
    var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat("cache");
    var _BOM = /^\uFEFF/;
    var _JS_IDENTIFIER = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
    exports2.cache = utils.cache;
    exports2.fileLoader = fs5.readFileSync;
    exports2.localsName = _DEFAULT_LOCALS_NAME;
    exports2.promiseImpl = new Function("return this;")().Promise;
    exports2.resolveInclude = function(name, filename, isDir) {
      var dirname = path3.dirname;
      var extname = path3.extname;
      var resolve = path3.resolve;
      var includePath = resolve(isDir ? filename : dirname(filename), name);
      var ext = extname(name);
      if (!ext) {
        includePath += ".ejs";
      }
      return includePath;
    };
    function resolvePaths(name, paths) {
      var filePath;
      if (paths.some(function(v) {
        filePath = exports2.resolveInclude(name, v, true);
        return fs5.existsSync(filePath);
      })) {
        return filePath;
      }
    }
    function getIncludePath(path4, options2) {
      var includePath;
      var filePath;
      var views = options2.views;
      var match = /^[A-Za-z]+:\\|^\//.exec(path4);
      if (match && match.length) {
        path4 = path4.replace(/^\/*/, "");
        if (Array.isArray(options2.root)) {
          includePath = resolvePaths(path4, options2.root);
        } else {
          includePath = exports2.resolveInclude(path4, options2.root || "/", true);
        }
      } else {
        if (options2.filename) {
          filePath = exports2.resolveInclude(path4, options2.filename);
          if (fs5.existsSync(filePath)) {
            includePath = filePath;
          }
        }
        if (!includePath && Array.isArray(views)) {
          includePath = resolvePaths(path4, views);
        }
        if (!includePath && typeof options2.includer !== "function") {
          throw new Error('Could not find the include file "' + options2.escapeFunction(path4) + '"');
        }
      }
      return includePath;
    }
    function handleCache(options2, template) {
      var func;
      var filename = options2.filename;
      var hasTemplate = arguments.length > 1;
      if (options2.cache) {
        if (!filename) {
          throw new Error("cache option requires a filename");
        }
        func = exports2.cache.get(filename);
        if (func) {
          return func;
        }
        if (!hasTemplate) {
          template = fileLoader(filename).toString().replace(_BOM, "");
        }
      } else if (!hasTemplate) {
        if (!filename) {
          throw new Error("Internal EJS error: no file name or template provided");
        }
        template = fileLoader(filename).toString().replace(_BOM, "");
      }
      func = exports2.compile(template, options2);
      if (options2.cache) {
        exports2.cache.set(filename, func);
      }
      return func;
    }
    function fileLoader(filePath) {
      return exports2.fileLoader(filePath);
    }
    exports2.includeFile = function includeFile(path4, options2) {
      var opts = utils.shallowCopy(utils.createNullProtoObjWherePossible(), options2);
      opts.filename = getIncludePath(path4, opts);
      if (typeof options2.includer === "function") {
        var includerResult = options2.includer(path4, opts.filename);
        if (includerResult) {
          if (includerResult.filename) {
            opts.filename = includerResult.filename;
          }
          if (includerResult.template) {
            return handleCache(opts, includerResult.template);
          }
        }
      }
      return handleCache(opts);
    };
    function extractLineAndCol(stack) {
      const match = stack.match(/anonymous \(<eval>:(\d+):(\d+)/);
      if (match) {
        return {
          line: parseInt(match[1]),
          col: parseInt(match[2])
        };
      }
      return null;
    }
    function rethrow(err, str, flnm, lineno, esc, prependLines) {
      if (err instanceof BadRequestError) {
        throw err;
      }
      const { line, col } = extractLineAndCol(err.stack);
      const realLineNo = line - prependLines - lineno + 1;
      console.log(`lineno`, lineno, `prependLines`, prependLines, `line`, line, `realLineNo`, realLineNo);
      console.log(err.stack);
      var lines = str.split("\n");
      var start = Math.max(realLineNo - 30, 0);
      var end = Math.min(lines.length, realLineNo + 3);
      var filename = esc(flnm);
      var context = lines.slice(start, end).map(function(line2, i) {
        var curr = i + start + 1;
        return (curr == realLineNo ? " >> " : "    ") + curr + "| " + line2;
      }).join("\n");
      err.message = (filename || "ejs") + ":" + realLineNo + "\n" + context + "\n\n" + err.message;
      err.path = filename;
      err.originalError = err;
      throw err;
    }
    function stripSemi(str) {
      return str.replace(/;(\s*$)/, "$1");
    }
    exports2.compile = function compile(template, opts) {
      var templ;
      if (opts && opts.scope) {
        if (!scopeOptionWarned) {
          console.warn("`scope` option is deprecated and will be removed in EJS 3");
          scopeOptionWarned = true;
        }
        if (!opts.context) {
          opts.context = opts.scope;
        }
        delete opts.scope;
      }
      templ = new Template(template, opts);
      return templ.compile();
    };
    exports2.render = function(template, d, o) {
      var data = d || utils.createNullProtoObjWherePossible();
      var opts = o || utils.createNullProtoObjWherePossible();
      if (arguments.length == 2) {
        utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
      }
      return handleCache(opts, template)(data);
    };
    exports2.renderFile = function() {
      var args = Array.prototype.slice.call(arguments);
      var filename = args.shift();
      var cb;
      var opts = { filename };
      var data;
      var viewOpts;
      if (typeof arguments[arguments.length - 1] == "function") {
        cb = args.pop();
      }
      if (args.length) {
        data = args.shift();
        if (args.length) {
          utils.shallowCopy(opts, args.pop());
        } else {
          if (data.settings) {
            if (data.settings.views) {
              opts.views = data.settings.views;
            }
            if (data.settings["view cache"]) {
              opts.cache = true;
            }
            viewOpts = data.settings["view options"];
            if (viewOpts) {
              utils.shallowCopy(opts, viewOpts);
            }
          }
          utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
        }
        opts.filename = filename;
      } else {
        data = utils.createNullProtoObjWherePossible();
      }
      return handleCache(opts)(data);
    };
    exports2.Template = Template;
    exports2.clearCache = function() {
      exports2.cache.reset();
    };
    function Template(text, optsParam) {
      var opts = utils.hasOwnOnlyObject(optsParam);
      var options2 = utils.createNullProtoObjWherePossible();
      this.templateText = text;
      this.mode = null;
      this.truncate = false;
      this.currentLine = 1;
      this.source = "";
      options2.includeFile = opts.includeFile || exports2.includeFile;
      options2.prepend = opts.prepend || "";
      options2.client = opts.client || false;
      options2.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
      options2.compileDebug = opts.compileDebug !== false;
      options2.debug = !!opts.debug;
      options2.filename = opts.filename;
      options2.openDelimiter = opts.openDelimiter || exports2.openDelimiter || _DEFAULT_OPEN_DELIMITER;
      options2.closeDelimiter = opts.closeDelimiter || exports2.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
      options2.delimiter = opts.delimiter || exports2.delimiter || _DEFAULT_DELIMITER;
      options2.strict = opts.strict || false;
      options2.context = opts.context;
      options2.cache = opts.cache || false;
      options2.rmWhitespace = opts.rmWhitespace;
      options2.root = opts.root;
      options2.includer = opts.includer;
      options2.outputFunctionName = opts.outputFunctionName;
      options2.localsName = opts.localsName || exports2.localsName || _DEFAULT_LOCALS_NAME;
      options2.views = opts.views;
      options2.async = opts.async;
      options2.destructuredLocals = opts.destructuredLocals;
      options2.legacyInclude = typeof opts.legacyInclude != "undefined" ? !!opts.legacyInclude : true;
      if (options2.strict) {
        options2._with = false;
      } else {
        options2._with = typeof opts._with != "undefined" ? opts._with : true;
      }
      this.opts = options2;
      this.regex = this.createRegex();
    }
    Template.modes = {
      EVAL: "eval",
      ESCAPED: "escaped",
      RAW: "raw",
      COMMENT: "comment",
      LITERAL: "literal"
    };
    Template.prototype = {
      createRegex: function() {
        var str = _REGEX_STRING;
        var delim = utils.escapeRegExpChars(this.opts.delimiter);
        var open = utils.escapeRegExpChars(this.opts.openDelimiter);
        var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
        str = str.replace(/%/g, delim).replace(/</g, open).replace(/>/g, close);
        return new RegExp(str);
      },
      compile: function() {
        var src;
        var fn;
        var opts = this.opts;
        var prepended = opts.prepend;
        var appended = "";
        var escapeFn = opts.escapeFunction;
        var ctor;
        var sanitizedFilename = opts.filename ? JSON.stringify(opts.filename) : "undefined";
        if (!this.source) {
          this.generateSource();
          prepended += '  var __output = "";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n';
          if (opts.outputFunctionName) {
            if (!_JS_IDENTIFIER.test(opts.outputFunctionName)) {
              throw new Error("outputFunctionName is not a valid JS identifier.");
            }
            prepended += "  var " + opts.outputFunctionName + " = __append;\n";
          }
          if (opts.localsName && !_JS_IDENTIFIER.test(opts.localsName)) {
            throw new Error("localsName is not a valid JS identifier.");
          }
          if (opts.destructuredLocals && opts.destructuredLocals.length) {
            var destructuring = "  var __locals = (" + opts.localsName + " || {}),\n";
            for (var i = 0; i < opts.destructuredLocals.length; i++) {
              var name = opts.destructuredLocals[i];
              if (!_JS_IDENTIFIER.test(name)) {
                throw new Error("destructuredLocals[" + i + "] is not a valid JS identifier.");
              }
              if (i > 0) {
                destructuring += ",\n  ";
              }
              destructuring += name + " = __locals." + name;
            }
            prepended += destructuring + ";\n";
          }
          if (opts._with !== false) {
            prepended += "  with (" + opts.localsName + " || {}) {\n";
            appended += "  }\n";
          }
          appended += "  return __output;\n";
          this.source = prepended + this.source + appended;
        }
        if (opts.compileDebug) {
          src = "var __line = 1\n  , __lines = " + JSON.stringify(this.templateText) + "\n  , __filename = " + sanitizedFilename + ";\ntry {\n" + this.source + `} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn, ${prepended.split("\n").length + 4});
}
`;
        } else {
          src = this.source;
        }
        if (opts.client) {
          src = "escapeFn = escapeFn || " + escapeFn.toString() + ";\n" + src;
          if (opts.compileDebug) {
            src = "rethrow = rethrow || " + rethrow.toString() + ";\n" + src;
          }
        }
        if (opts.strict) {
          src = '"use strict";\n' + src;
        }
        if (opts.debug) {
          console.log(src);
        }
        if (opts.compileDebug && opts.filename) {
          src = src + "\n//# sourceURL=" + sanitizedFilename + "\n";
        }
        try {
          if (opts.async) {
            try {
              ctor = new Function("return (async function(){}).constructor;")();
            } catch (e) {
              if (e instanceof SyntaxError) {
                throw new Error("This environment does not support async/await");
              } else {
                throw e;
              }
            }
          } else {
            ctor = Function;
          }
          fn = new ctor(opts.localsName + ", escapeFn, include, rethrow", src);
        } catch (e) {
          if (e instanceof SyntaxError) {
            if (opts.filename) {
              e.message += " in " + opts.filename;
            }
            e.message += " while compiling ejs\n\n";
            e.message += "If the above error is not helpful, you may want to try EJS-Lint:\n";
            e.message += "https://github.com/RyanZim/EJS-Lint";
            if (!opts.async) {
              e.message += "\n";
              e.message += "Or, if you meant to create an async function, pass `async: true` as an option.";
            }
          }
          throw e;
        }
        var returnedFn = opts.client ? fn : function anonymous(data) {
          var include = function(path4, includeData) {
            var d = utils.shallowCopy(utils.createNullProtoObjWherePossible(), data);
            if (includeData) {
              d = utils.shallowCopy(d, includeData);
            }
            return opts.includeFile(path4, opts)(d);
          };
          return fn.apply(
            opts.context,
            [data || utils.createNullProtoObjWherePossible(), escapeFn, include, rethrow]
          );
        };
        if (opts.filename && typeof Object.defineProperty === "function") {
          var filename = opts.filename;
          var basename = path3.basename(filename, path3.extname(filename));
          try {
            Object.defineProperty(returnedFn, "name", {
              value: basename,
              writable: false,
              enumerable: false,
              configurable: true
            });
          } catch (e) {
          }
        }
        return returnedFn;
      },
      generateSource: function() {
        var opts = this.opts;
        if (opts.rmWhitespace) {
          this.templateText = this.templateText.replace(/[\r\n]+/g, "\n").replace(/^\s+|\s+$/gm, "");
        }
        this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
        var self2 = this;
        var matches = this.parseTemplateText();
        var d = this.opts.delimiter;
        var o = this.opts.openDelimiter;
        var c = this.opts.closeDelimiter;
        if (matches && matches.length) {
          matches.forEach(function(line, index) {
            var closing;
            if (line.indexOf(o + d) === 0 && line.indexOf(o + d + d) !== 0) {
              closing = matches[index + 2];
              if (!(closing == d + c || closing == "-" + d + c || closing == "_" + d + c)) {
                throw new Error('Could not find matching close tag for "' + line + '".');
              }
            }
            self2.scanLine(line);
          });
        }
      },
      parseTemplateText: function() {
        var str = this.templateText;
        var pat = this.regex;
        var result = pat.exec(str);
        var arr = [];
        var firstPos;
        while (result) {
          firstPos = result.index;
          if (firstPos !== 0) {
            arr.push(str.substring(0, firstPos));
            str = str.slice(firstPos);
          }
          arr.push(result[0]);
          str = str.slice(result[0].length);
          result = pat.exec(str);
        }
        if (str) {
          arr.push(str);
        }
        return arr;
      },
      _addOutput: function(line) {
        if (this.truncate) {
          line = line.replace(/^(?:\r\n|\r|\n)/, "");
          this.truncate = false;
        }
        if (!line) {
          return line;
        }
        line = line.replace(/\\/g, "\\\\");
        line = line.replace(/\n/g, "\\n");
        line = line.replace(/\r/g, "\\r");
        line = line.replace(/"/g, '\\"');
        this.source += '    ; __append("' + line + '")\n';
      },
      scanLine: function(line) {
        var self2 = this;
        var d = this.opts.delimiter;
        var o = this.opts.openDelimiter;
        var c = this.opts.closeDelimiter;
        var newLineCount = 0;
        newLineCount = line.split("\n").length - 1;
        switch (line) {
          case o + d:
          case o + d + "_":
            this.mode = Template.modes.EVAL;
            break;
          case o + d + "=":
            this.mode = Template.modes.ESCAPED;
            break;
          case o + d + "-":
            this.mode = Template.modes.RAW;
            break;
          case o + d + "#":
            this.mode = Template.modes.COMMENT;
            break;
          case o + d + d:
            this.mode = Template.modes.LITERAL;
            this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")\n';
            break;
          case d + d + c:
            this.mode = Template.modes.LITERAL;
            this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")\n';
            break;
          case d + c:
          case "-" + d + c:
          case "_" + d + c:
            if (this.mode == Template.modes.LITERAL) {
              this._addOutput(line);
            }
            this.mode = null;
            this.truncate = line.indexOf("-") === 0 || line.indexOf("_") === 0;
            break;
          default:
            if (this.mode) {
              switch (this.mode) {
                case Template.modes.EVAL:
                case Template.modes.ESCAPED:
                case Template.modes.RAW:
                  if (line.lastIndexOf("//") > line.lastIndexOf("\n")) {
                    line += "\n";
                  }
              }
              switch (this.mode) {
                // Just executing code
                case Template.modes.EVAL:
                  this.source += "    ; " + line + "\n";
                  break;
                // Exec, esc, and output
                case Template.modes.ESCAPED:
                  this.source += "    ; __append(escapeFn(" + stripSemi(line) + "))\n";
                  break;
                // Exec and output
                case Template.modes.RAW:
                  this.source += "    ; __append(" + stripSemi(line) + ")\n";
                  break;
                case Template.modes.COMMENT:
                  break;
                // Literal <%% mode, append as raw output
                case Template.modes.LITERAL:
                  this._addOutput(line);
                  break;
              }
            } else {
              this._addOutput(line);
            }
        }
        if (self2.opts.compileDebug && newLineCount) {
          this.currentLine += newLineCount;
          this.source += "    ; __line = " + this.currentLine + "\n";
        }
      }
    };
    exports2.escapeXML = utils.escapeXML;
    exports2.__express = exports2.renderFile;
    exports2.VERSION = _VERSION_STRING;
    exports2.name = _NAME;
    if (typeof window != "undefined") {
      window.ejs = exports2;
    }
  }
});

// node_modules/js-yaml/lib/js-yaml/common.js
var require_common = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/common.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    function isNothing(subject) {
      return typeof subject === "undefined" || subject === null;
    }
    function isObject(subject) {
      return typeof subject === "object" && subject !== null;
    }
    function toArray(sequence) {
      if (Array.isArray(sequence)) return sequence;
      else if (isNothing(sequence)) return [];
      return [sequence];
    }
    function extend(target, source) {
      var index, length, key, sourceKeys;
      if (source) {
        sourceKeys = Object.keys(source);
        for (index = 0, length = sourceKeys.length; index < length; index += 1) {
          key = sourceKeys[index];
          target[key] = source[key];
        }
      }
      return target;
    }
    function repeat(string, count) {
      var result = "", cycle;
      for (cycle = 0; cycle < count; cycle += 1) {
        result += string;
      }
      return result;
    }
    function isNegativeZero(number) {
      return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
    }
    module2.exports.isNothing = isNothing;
    module2.exports.isObject = isObject;
    module2.exports.toArray = toArray;
    module2.exports.repeat = repeat;
    module2.exports.isNegativeZero = isNegativeZero;
    module2.exports.extend = extend;
  }
});

// node_modules/js-yaml/lib/js-yaml/exception.js
var require_exception = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/exception.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    function YAMLException(reason, mark) {
      Error.call(this);
      this.name = "YAMLException";
      this.reason = reason;
      this.mark = mark;
      this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : "");
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack || "";
      }
    }
    YAMLException.prototype = Object.create(Error.prototype);
    YAMLException.prototype.constructor = YAMLException;
    YAMLException.prototype.toString = function toString2(compact) {
      var result = this.name + ": ";
      result += this.reason || "(unknown reason)";
      if (!compact && this.mark) {
        result += " " + this.mark.toString();
      }
      return result;
    };
    module2.exports = YAMLException;
  }
});

// node_modules/js-yaml/lib/js-yaml/mark.js
var require_mark = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/mark.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var common = require_common();
    function Mark(name, buffer, position, line, column) {
      this.name = name;
      this.buffer = buffer;
      this.position = position;
      this.line = line;
      this.column = column;
    }
    Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
      var head, start, tail, end, snippet;
      if (!this.buffer) return null;
      indent = indent || 4;
      maxLength = maxLength || 75;
      head = "";
      start = this.position;
      while (start > 0 && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1) {
        start -= 1;
        if (this.position - start > maxLength / 2 - 1) {
          head = " ... ";
          start += 5;
          break;
        }
      }
      tail = "";
      end = this.position;
      while (end < this.buffer.length && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1) {
        end += 1;
        if (end - this.position > maxLength / 2 - 1) {
          tail = " ... ";
          end -= 5;
          break;
        }
      }
      snippet = this.buffer.slice(start, end);
      return common.repeat(" ", indent) + head + snippet + tail + "\n" + common.repeat(" ", indent + this.position - start + head.length) + "^";
    };
    Mark.prototype.toString = function toString2(compact) {
      var snippet, where = "";
      if (this.name) {
        where += 'in "' + this.name + '" ';
      }
      where += "at line " + (this.line + 1) + ", column " + (this.column + 1);
      if (!compact) {
        snippet = this.getSnippet();
        if (snippet) {
          where += ":\n" + snippet;
        }
      }
      return where;
    };
    module2.exports = Mark;
  }
});

// node_modules/js-yaml/lib/js-yaml/type.js
var require_type = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var YAMLException = require_exception();
    var TYPE_CONSTRUCTOR_OPTIONS = [
      "kind",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "defaultStyle",
      "styleAliases"
    ];
    var YAML_NODE_KINDS = [
      "scalar",
      "sequence",
      "mapping"
    ];
    function compileStyleAliases(map2) {
      var result = {};
      if (map2 !== null) {
        Object.keys(map2).forEach(function(style) {
          map2[style].forEach(function(alias) {
            result[String(alias)] = style;
          });
        });
      }
      return result;
    }
    function Type(tag2, options2) {
      options2 = options2 || {};
      Object.keys(options2).forEach(function(name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
          throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag2 + '" YAML type.');
        }
      });
      this.tag = tag2;
      this.kind = options2["kind"] || null;
      this.resolve = options2["resolve"] || function() {
        return true;
      };
      this.construct = options2["construct"] || function(data) {
        return data;
      };
      this.instanceOf = options2["instanceOf"] || null;
      this.predicate = options2["predicate"] || null;
      this.represent = options2["represent"] || null;
      this.defaultStyle = options2["defaultStyle"] || null;
      this.styleAliases = compileStyleAliases(options2["styleAliases"] || null);
      if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag2 + '" YAML type.');
      }
    }
    module2.exports = Type;
  }
});

// node_modules/js-yaml/lib/js-yaml/schema.js
var require_schema = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var common = require_common();
    var YAMLException = require_exception();
    var Type = require_type();
    function compileList(schema, name, result) {
      var exclude2 = [];
      schema.include.forEach(function(includedSchema) {
        result = compileList(includedSchema, name, result);
      });
      schema[name].forEach(function(currentType) {
        result.forEach(function(previousType, previousIndex) {
          if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
            exclude2.push(previousIndex);
          }
        });
        result.push(currentType);
      });
      return result.filter(function(type, index) {
        return exclude2.indexOf(index) === -1;
      });
    }
    function compileMap() {
      var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {}
      }, index, length;
      function collectType(type) {
        result[type.kind][type.tag] = result["fallback"][type.tag] = type;
      }
      for (index = 0, length = arguments.length; index < length; index += 1) {
        arguments[index].forEach(collectType);
      }
      return result;
    }
    function Schema(definition) {
      this.include = definition.include || [];
      this.implicit = definition.implicit || [];
      this.explicit = definition.explicit || [];
      this.implicit.forEach(function(type) {
        if (type.loadKind && type.loadKind !== "scalar") {
          throw new YAMLException("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
        }
      });
      this.compiledImplicit = compileList(this, "implicit", []);
      this.compiledExplicit = compileList(this, "explicit", []);
      this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }
    Schema.DEFAULT = null;
    Schema.create = function createSchema() {
      var schemas, types;
      switch (arguments.length) {
        case 1:
          schemas = Schema.DEFAULT;
          types = arguments[0];
          break;
        case 2:
          schemas = arguments[0];
          types = arguments[1];
          break;
        default:
          throw new YAMLException("Wrong number of arguments for Schema.create function");
      }
      schemas = common.toArray(schemas);
      types = common.toArray(types);
      if (!schemas.every(function(schema) {
        return schema instanceof Schema;
      })) {
        throw new YAMLException("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
      }
      if (!types.every(function(type) {
        return type instanceof Type;
      })) {
        throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
      return new Schema({
        include: schemas,
        explicit: types
      });
    };
    module2.exports = Schema;
  }
});

// node_modules/js-yaml/lib/js-yaml/type/str.js
var require_str = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/str.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:str", {
      kind: "scalar",
      construct: function(data) {
        return data !== null ? data : "";
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/seq.js
var require_seq = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/seq.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:seq", {
      kind: "sequence",
      construct: function(data) {
        return data !== null ? data : [];
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/map.js
var require_map = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/map.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:map", {
      kind: "mapping",
      construct: function(data) {
        return data !== null ? data : {};
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/failsafe.js
var require_failsafe = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/failsafe.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Schema = require_schema();
    module2.exports = new Schema({
      explicit: [
        require_str(),
        require_seq(),
        require_map()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/null.js
var require_null = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/null.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Type = require_type();
    function resolveYamlNull(data) {
      if (data === null) return true;
      var max = data.length;
      return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
    }
    function constructYamlNull() {
      return null;
    }
    function isNull(object) {
      return object === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:null", {
      kind: "scalar",
      resolve: resolveYamlNull,
      construct: constructYamlNull,
      predicate: isNull,
      represent: {
        canonical: function() {
          return "~";
        },
        lowercase: function() {
          return "null";
        },
        uppercase: function() {
          return "NULL";
        },
        camelcase: function() {
          return "Null";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/bool.js
var require_bool = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/bool.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Type = require_type();
    function resolveYamlBoolean(data) {
      if (data === null) return false;
      var max = data.length;
      return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
    }
    function constructYamlBoolean(data) {
      return data === "true" || data === "True" || data === "TRUE";
    }
    function isBoolean(object) {
      return Object.prototype.toString.call(object) === "[object Boolean]";
    }
    module2.exports = new Type("tag:yaml.org,2002:bool", {
      kind: "scalar",
      resolve: resolveYamlBoolean,
      construct: constructYamlBoolean,
      predicate: isBoolean,
      represent: {
        lowercase: function(object) {
          return object ? "true" : "false";
        },
        uppercase: function(object) {
          return object ? "TRUE" : "FALSE";
        },
        camelcase: function(object) {
          return object ? "True" : "False";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/int.js
var require_int = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/int.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var common = require_common();
    var Type = require_type();
    function isHexCode(c) {
      return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
    }
    function isOctCode(c) {
      return 48 <= c && c <= 55;
    }
    function isDecCode(c) {
      return 48 <= c && c <= 57;
    }
    function resolveYamlInteger(data) {
      if (data === null) return false;
      var max = data.length, index = 0, hasDigits = false, ch;
      if (!max) return false;
      ch = data[index];
      if (ch === "-" || ch === "+") {
        ch = data[++index];
      }
      if (ch === "0") {
        if (index + 1 === max) return true;
        ch = data[++index];
        if (ch === "b") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (ch !== "0" && ch !== "1") return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        if (ch === "x") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (!isHexCode(data.charCodeAt(index))) return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_") continue;
          if (!isOctCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "_") return false;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (ch === ":") break;
        if (!isDecCode(data.charCodeAt(index))) {
          return false;
        }
        hasDigits = true;
      }
      if (!hasDigits || ch === "_") return false;
      if (ch !== ":") return true;
      return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
    }
    function constructYamlInteger(data) {
      var value = data, sign = 1, ch, base, digits = [];
      if (value.indexOf("_") !== -1) {
        value = value.replace(/_/g, "");
      }
      ch = value[0];
      if (ch === "-" || ch === "+") {
        if (ch === "-") sign = -1;
        value = value.slice(1);
        ch = value[0];
      }
      if (value === "0") return 0;
      if (ch === "0") {
        if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x") return sign * parseInt(value, 16);
        return sign * parseInt(value, 8);
      }
      if (value.indexOf(":") !== -1) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseInt(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
          value += d * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseInt(value, 10);
    }
    function isInteger(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:int", {
      kind: "scalar",
      resolve: resolveYamlInteger,
      construct: constructYamlInteger,
      predicate: isInteger,
      represent: {
        binary: function(obj) {
          return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
        },
        octal: function(obj) {
          return obj >= 0 ? "0" + obj.toString(8) : "-0" + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
          return obj.toString(10);
        },
        /* eslint-disable max-len */
        hexadecimal: function(obj) {
          return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
        }
      },
      defaultStyle: "decimal",
      styleAliases: {
        binary: [2, "bin"],
        octal: [8, "oct"],
        decimal: [10, "dec"],
        hexadecimal: [16, "hex"]
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/float.js
var require_float = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/float.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var common = require_common();
    var Type = require_type();
    var YAML_FLOAT_PATTERN = new RegExp(
      // 2.5e4, 2.5 and integers
      "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
    );
    function resolveYamlFloat(data) {
      if (data === null) return false;
      if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === "_") {
        return false;
      }
      return true;
    }
    function constructYamlFloat(data) {
      var value, sign, base, digits;
      value = data.replace(/_/g, "").toLowerCase();
      sign = value[0] === "-" ? -1 : 1;
      digits = [];
      if ("+-".indexOf(value[0]) >= 0) {
        value = value.slice(1);
      }
      if (value === ".inf") {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
      } else if (value === ".nan") {
        return NaN;
      } else if (value.indexOf(":") >= 0) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseFloat(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
          value += d * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseFloat(value, 10);
    }
    var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
    function representYamlFloat(object, style) {
      var res;
      if (isNaN(object)) {
        switch (style) {
          case "lowercase":
            return ".nan";
          case "uppercase":
            return ".NAN";
          case "camelcase":
            return ".NaN";
        }
      } else if (Number.POSITIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return ".inf";
          case "uppercase":
            return ".INF";
          case "camelcase":
            return ".Inf";
        }
      } else if (Number.NEGATIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return "-.inf";
          case "uppercase":
            return "-.INF";
          case "camelcase":
            return "-.Inf";
        }
      } else if (common.isNegativeZero(object)) {
        return "-0.0";
      }
      res = object.toString(10);
      return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
    }
    function isFloat(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:float", {
      kind: "scalar",
      resolve: resolveYamlFloat,
      construct: constructYamlFloat,
      predicate: isFloat,
      represent: representYamlFloat,
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/json.js
var require_json = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/json.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_failsafe()
      ],
      implicit: [
        require_null(),
        require_bool(),
        require_int(),
        require_float()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/core.js
var require_core = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/core.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_json()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/timestamp.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Type = require_type();
    var YAML_DATE_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
    );
    var YAML_TIMESTAMP_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
    );
    function resolveYamlTimestamp(data) {
      if (data === null) return false;
      if (YAML_DATE_REGEXP.exec(data) !== null) return true;
      if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
      return false;
    }
    function constructYamlTimestamp(data) {
      var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
      match = YAML_DATE_REGEXP.exec(data);
      if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
      if (match === null) throw new Error("Date resolve error");
      year = +match[1];
      month = +match[2] - 1;
      day = +match[3];
      if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
      }
      hour = +match[4];
      minute = +match[5];
      second = +match[6];
      if (match[7]) {
        fraction = match[7].slice(0, 3);
        while (fraction.length < 3) {
          fraction += "0";
        }
        fraction = +fraction;
      }
      if (match[9]) {
        tz_hour = +match[10];
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 6e4;
        if (match[9] === "-") delta = -delta;
      }
      date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
      if (delta) date.setTime(date.getTime() - delta);
      return date;
    }
    function representYamlTimestamp(object) {
      return object.toISOString();
    }
    module2.exports = new Type("tag:yaml.org,2002:timestamp", {
      kind: "scalar",
      resolve: resolveYamlTimestamp,
      construct: constructYamlTimestamp,
      instanceOf: Date,
      represent: representYamlTimestamp
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/merge.js
var require_merge = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/merge.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Type = require_type();
    function resolveYamlMerge(data) {
      return data === "<<" || data === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:merge", {
      kind: "scalar",
      resolve: resolveYamlMerge
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/binary.js
var require_binary = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/binary.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var NodeBuffer;
    try {
      _require = require;
      NodeBuffer = _require("buffer").Buffer;
    } catch (__) {
    }
    var _require;
    var Type = require_type();
    var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function resolveYamlBinary(data) {
      if (data === null) return false;
      var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        code = map2.indexOf(data.charAt(idx));
        if (code > 64) continue;
        if (code < 0) return false;
        bitlen += 6;
      }
      return bitlen % 8 === 0;
    }
    function constructYamlBinary(data) {
      var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
      for (idx = 0; idx < max; idx++) {
        if (idx % 4 === 0 && idx) {
          result.push(bits >> 16 & 255);
          result.push(bits >> 8 & 255);
          result.push(bits & 255);
        }
        bits = bits << 6 | map2.indexOf(input.charAt(idx));
      }
      tailbits = max % 4 * 6;
      if (tailbits === 0) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      } else if (tailbits === 18) {
        result.push(bits >> 10 & 255);
        result.push(bits >> 2 & 255);
      } else if (tailbits === 12) {
        result.push(bits >> 4 & 255);
      }
      if (NodeBuffer) {
        return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
      }
      return result;
    }
    function representYamlBinary(object) {
      var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        if (idx % 3 === 0 && idx) {
          result += map2[bits >> 18 & 63];
          result += map2[bits >> 12 & 63];
          result += map2[bits >> 6 & 63];
          result += map2[bits & 63];
        }
        bits = (bits << 8) + object[idx];
      }
      tail = max % 3;
      if (tail === 0) {
        result += map2[bits >> 18 & 63];
        result += map2[bits >> 12 & 63];
        result += map2[bits >> 6 & 63];
        result += map2[bits & 63];
      } else if (tail === 2) {
        result += map2[bits >> 10 & 63];
        result += map2[bits >> 4 & 63];
        result += map2[bits << 2 & 63];
        result += map2[64];
      } else if (tail === 1) {
        result += map2[bits >> 2 & 63];
        result += map2[bits << 4 & 63];
        result += map2[64];
        result += map2[64];
      }
      return result;
    }
    function isBinary(object) {
      return NodeBuffer && NodeBuffer.isBuffer(object);
    }
    module2.exports = new Type("tag:yaml.org,2002:binary", {
      kind: "scalar",
      resolve: resolveYamlBinary,
      construct: constructYamlBinary,
      predicate: isBinary,
      represent: representYamlBinary
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/omap.js
var require_omap = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/omap.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var _toString = Object.prototype.toString;
    function resolveYamlOmap(data) {
      if (data === null) return true;
      var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        pairHasKey = false;
        if (_toString.call(pair) !== "[object Object]") return false;
        for (pairKey in pair) {
          if (_hasOwnProperty.call(pair, pairKey)) {
            if (!pairHasKey) pairHasKey = true;
            else return false;
          }
        }
        if (!pairHasKey) return false;
        if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
        else return false;
      }
      return true;
    }
    function constructYamlOmap(data) {
      return data !== null ? data : [];
    }
    module2.exports = new Type("tag:yaml.org,2002:omap", {
      kind: "sequence",
      resolve: resolveYamlOmap,
      construct: constructYamlOmap
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/pairs.js
var require_pairs = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/pairs.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Type = require_type();
    var _toString = Object.prototype.toString;
    function resolveYamlPairs(data) {
      if (data === null) return true;
      var index, length, pair, keys2, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        if (_toString.call(pair) !== "[object Object]") return false;
        keys2 = Object.keys(pair);
        if (keys2.length !== 1) return false;
        result[index] = [keys2[0], pair[keys2[0]]];
      }
      return true;
    }
    function constructYamlPairs(data) {
      if (data === null) return [];
      var index, length, pair, keys2, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        keys2 = Object.keys(pair);
        result[index] = [keys2[0], pair[keys2[0]]];
      }
      return result;
    }
    module2.exports = new Type("tag:yaml.org,2002:pairs", {
      kind: "sequence",
      resolve: resolveYamlPairs,
      construct: constructYamlPairs
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/set.js
var require_set = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/set.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function resolveYamlSet(data) {
      if (data === null) return true;
      var key, object = data;
      for (key in object) {
        if (_hasOwnProperty.call(object, key)) {
          if (object[key] !== null) return false;
        }
      }
      return true;
    }
    function constructYamlSet(data) {
      return data !== null ? data : {};
    }
    module2.exports = new Type("tag:yaml.org,2002:set", {
      kind: "mapping",
      resolve: resolveYamlSet,
      construct: constructYamlSet
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/default_safe.js
var require_default_safe = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/default_safe.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_core()
      ],
      implicit: [
        require_timestamp(),
        require_merge()
      ],
      explicit: [
        require_binary(),
        require_omap(),
        require_pairs(),
        require_set()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/js/undefined.js
var require_undefined = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/undefined.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Type = require_type();
    function resolveJavascriptUndefined() {
      return true;
    }
    function constructJavascriptUndefined() {
      return void 0;
    }
    function representJavascriptUndefined() {
      return "";
    }
    function isUndefined(object) {
      return typeof object === "undefined";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/undefined", {
      kind: "scalar",
      resolve: resolveJavascriptUndefined,
      construct: constructJavascriptUndefined,
      predicate: isUndefined,
      represent: representJavascriptUndefined
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/js/regexp.js
var require_regexp = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/regexp.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Type = require_type();
    function resolveJavascriptRegExp(data) {
      if (data === null) return false;
      if (data.length === 0) return false;
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail) modifiers = tail[1];
        if (modifiers.length > 3) return false;
        if (regexp[regexp.length - modifiers.length - 1] !== "/") return false;
      }
      return true;
    }
    function constructJavascriptRegExp(data) {
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail) modifiers = tail[1];
        regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
      }
      return new RegExp(regexp, modifiers);
    }
    function representJavascriptRegExp(object) {
      var result = "/" + object.source + "/";
      if (object.global) result += "g";
      if (object.multiline) result += "m";
      if (object.ignoreCase) result += "i";
      return result;
    }
    function isRegExp(object) {
      return Object.prototype.toString.call(object) === "[object RegExp]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/regexp", {
      kind: "scalar",
      resolve: resolveJavascriptRegExp,
      construct: constructJavascriptRegExp,
      predicate: isRegExp,
      represent: representJavascriptRegExp
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/js/function.js
var require_function = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/function.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var esprima;
    try {
      _require = require;
      esprima = _require("esprima");
    } catch (_) {
      if (typeof window !== "undefined") esprima = window.esprima;
    }
    var _require;
    var Type = require_type();
    function resolveJavascriptFunction(data) {
      if (data === null) return false;
      try {
        var source = "(" + data + ")", ast = esprima.parse(source, { range: true });
        if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    function constructJavascriptFunction(data) {
      var source = "(" + data + ")", ast = esprima.parse(source, { range: true }), params = [], body;
      if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
        throw new Error("Failed to resolve function");
      }
      ast.body[0].expression.params.forEach(function(param) {
        params.push(param.name);
      });
      body = ast.body[0].expression.body.range;
      if (ast.body[0].expression.body.type === "BlockStatement") {
        return new Function(params, source.slice(body[0] + 1, body[1] - 1));
      }
      return new Function(params, "return " + source.slice(body[0], body[1]));
    }
    function representJavascriptFunction(object) {
      return object.toString();
    }
    function isFunction(object) {
      return Object.prototype.toString.call(object) === "[object Function]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/function", {
      kind: "scalar",
      resolve: resolveJavascriptFunction,
      construct: constructJavascriptFunction,
      predicate: isFunction,
      represent: representJavascriptFunction
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/default_full.js
var require_default_full = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/default_full.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var Schema = require_schema();
    module2.exports = Schema.DEFAULT = new Schema({
      include: [
        require_default_safe()
      ],
      explicit: [
        require_undefined(),
        require_regexp(),
        require_function()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/loader.js
var require_loader = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/loader.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var common = require_common();
    var YAMLException = require_exception();
    var Mark = require_mark();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CONTEXT_FLOW_IN = 1;
    var CONTEXT_FLOW_OUT = 2;
    var CONTEXT_BLOCK_IN = 3;
    var CONTEXT_BLOCK_OUT = 4;
    var CHOMPING_CLIP = 1;
    var CHOMPING_STRIP = 2;
    var CHOMPING_KEEP = 3;
    var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
    var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
    var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function is_EOL(c) {
      return c === 10 || c === 13;
    }
    function is_WHITE_SPACE(c) {
      return c === 9 || c === 32;
    }
    function is_WS_OR_EOL(c) {
      return c === 9 || c === 32 || c === 10 || c === 13;
    }
    function is_FLOW_INDICATOR(c) {
      return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
    }
    function fromHexCode(c) {
      var lc;
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      lc = c | 32;
      if (97 <= lc && lc <= 102) {
        return lc - 97 + 10;
      }
      return -1;
    }
    function escapedHexLen(c) {
      if (c === 120) {
        return 2;
      }
      if (c === 117) {
        return 4;
      }
      if (c === 85) {
        return 8;
      }
      return 0;
    }
    function fromDecimalCode(c) {
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      return -1;
    }
    function simpleEscapeSequence(c) {
      return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
    }
    function charFromCodepoint(c) {
      if (c <= 65535) {
        return String.fromCharCode(c);
      }
      return String.fromCharCode(
        (c - 65536 >> 10) + 55296,
        (c - 65536 & 1023) + 56320
      );
    }
    var simpleEscapeCheck = new Array(256);
    var simpleEscapeMap = new Array(256);
    for (i = 0; i < 256; i++) {
      simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
      simpleEscapeMap[i] = simpleEscapeSequence(i);
    }
    var i;
    function State(input, options2) {
      this.input = input;
      this.filename = options2["filename"] || null;
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.onWarning = options2["onWarning"] || null;
      this.legacy = options2["legacy"] || false;
      this.json = options2["json"] || false;
      this.listener = options2["listener"] || null;
      this.implicitTypes = this.schema.compiledImplicit;
      this.typeMap = this.schema.compiledTypeMap;
      this.length = input.length;
      this.position = 0;
      this.line = 0;
      this.lineStart = 0;
      this.lineIndent = 0;
      this.documents = [];
    }
    function generateError(state, message) {
      return new YAMLException(
        message,
        new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart)
      );
    }
    function throwError(state, message) {
      throw generateError(state, message);
    }
    function throwWarning(state, message) {
      if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
      }
    }
    var directiveHandlers = {
      YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) {
          throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
          throwError(state, "YAML directive accepts exactly one argument");
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
          throwError(state, "ill-formed argument of the YAML directive");
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) {
          throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
          throwWarning(state, "unsupported YAML version of the document");
        }
      },
      TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
          throwError(state, "TAG directive accepts exactly two arguments");
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
          throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        }
        if (_hasOwnProperty.call(state.tagMap, handle)) {
          throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
          throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        }
        state.tagMap[handle] = prefix;
      }
    };
    function captureSegment(state, start, end, checkJson) {
      var _position, _length, _character, _result;
      if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
          for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
            _character = _result.charCodeAt(_position);
            if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
              throwError(state, "expected valid JSON character");
            }
          }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
          throwError(state, "the stream contains non-printable characters");
        }
        state.result += _result;
      }
    }
    function mergeMappings(state, destination, source, overridableKeys) {
      var sourceKeys, key, index, quantity;
      if (!common.isObject(source)) {
        throwError(state, "cannot merge mappings; the provided source object is unacceptable");
      }
      sourceKeys = Object.keys(source);
      for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
        key = sourceKeys[index];
        if (!_hasOwnProperty.call(destination, key)) {
          destination[key] = source[key];
          overridableKeys[key] = true;
        }
      }
    }
    function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
      var index, quantity;
      if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
          if (Array.isArray(keyNode[index])) {
            throwError(state, "nested arrays are not supported inside keys");
          }
          if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
            keyNode[index] = "[object Object]";
          }
        }
      }
      if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
        keyNode = "[object Object]";
      }
      keyNode = String(keyNode);
      if (_result === null) {
        _result = {};
      }
      if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) {
          for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
            mergeMappings(state, _result, valueNode[index], overridableKeys);
          }
        } else {
          mergeMappings(state, _result, valueNode, overridableKeys);
        }
      } else {
        if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
          state.line = startLine || state.line;
          state.position = startPos || state.position;
          throwError(state, "duplicated mapping key");
        }
        _result[keyNode] = valueNode;
        delete overridableKeys[keyNode];
      }
      return _result;
    }
    function readLineBreak(state) {
      var ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 10) {
        state.position++;
      } else if (ch === 13) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 10) {
          state.position++;
        }
      } else {
        throwError(state, "a line break is expected");
      }
      state.line += 1;
      state.lineStart = state.position;
    }
    function skipSeparationSpace(state, allowComments, checkIndent) {
      var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 10 && ch !== 13 && ch !== 0);
        }
        if (is_EOL(ch)) {
          readLineBreak(state);
          ch = state.input.charCodeAt(state.position);
          lineBreaks++;
          state.lineIndent = 0;
          while (ch === 32) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
          }
        } else {
          break;
        }
      }
      if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, "deficient indentation");
      }
      return lineBreaks;
    }
    function testDocumentSeparator(state) {
      var _position = state.position, ch;
      ch = state.input.charCodeAt(_position);
      if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
          return true;
        }
      }
      return false;
    }
    function writeFoldedLines(state, count) {
      if (count === 1) {
        state.result += " ";
      } else if (count > 1) {
        state.result += common.repeat("\n", count - 1);
      }
    }
    function readPlainScalar(state, nodeIndent, withinFlowCollection) {
      var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
      ch = state.input.charCodeAt(state.position);
      if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
        return false;
      }
      if (ch === 63 || ch === 45) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          return false;
        }
      }
      state.kind = "scalar";
      state.result = "";
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
      while (ch !== 0) {
        if (ch === 58) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            break;
          }
        } else if (ch === 35) {
          preceding = state.input.charCodeAt(state.position - 1);
          if (is_WS_OR_EOL(preceding)) {
            break;
          }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
          break;
        } else if (is_EOL(ch)) {
          _line = state.line;
          _lineStart = state.lineStart;
          _lineIndent = state.lineIndent;
          skipSeparationSpace(state, false, -1);
          if (state.lineIndent >= nodeIndent) {
            hasPendingContent = true;
            ch = state.input.charCodeAt(state.position);
            continue;
          } else {
            state.position = captureEnd;
            state.line = _line;
            state.lineStart = _lineStart;
            state.lineIndent = _lineIndent;
            break;
          }
        }
        if (hasPendingContent) {
          captureSegment(state, captureStart, captureEnd, false);
          writeFoldedLines(state, state.line - _line);
          captureStart = captureEnd = state.position;
          hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
          captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, captureEnd, false);
      if (state.result) {
        return true;
      }
      state.kind = _kind;
      state.result = _result;
      return false;
    }
    function readSingleQuotedScalar(state, nodeIndent) {
      var ch, captureStart, captureEnd;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 39) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 39) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (ch === 39) {
            captureStart = state.position;
            state.position++;
            captureEnd = state.position;
          } else {
            return true;
          }
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a single quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a single quoted scalar");
    }
    function readDoubleQuotedScalar(state, nodeIndent) {
      var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 34) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 34) {
          captureSegment(state, captureStart, state.position, true);
          state.position++;
          return true;
        } else if (ch === 92) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (is_EOL(ch)) {
            skipSeparationSpace(state, false, nodeIndent);
          } else if (ch < 256 && simpleEscapeCheck[ch]) {
            state.result += simpleEscapeMap[ch];
            state.position++;
          } else if ((tmp = escapedHexLen(ch)) > 0) {
            hexLength = tmp;
            hexResult = 0;
            for (; hexLength > 0; hexLength--) {
              ch = state.input.charCodeAt(++state.position);
              if ((tmp = fromHexCode(ch)) >= 0) {
                hexResult = (hexResult << 4) + tmp;
              } else {
                throwError(state, "expected hexadecimal character");
              }
            }
            state.result += charFromCodepoint(hexResult);
            state.position++;
          } else {
            throwError(state, "unknown escape sequence");
          }
          captureStart = captureEnd = state.position;
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a double quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a double quoted scalar");
    }
    function readFlowCollection(state, nodeIndent) {
      var readNext = true, _line, _tag2 = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 91) {
        terminator = 93;
        isMapping = false;
        _result = [];
      } else if (ch === 123) {
        terminator = 125;
        isMapping = true;
        _result = {};
      } else {
        return false;
      }
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(++state.position);
      while (ch !== 0) {
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
          state.position++;
          state.tag = _tag2;
          state.anchor = _anchor;
          state.kind = isMapping ? "mapping" : "sequence";
          state.result = _result;
          return true;
        } else if (!readNext) {
          throwError(state, "missed comma between flow collection entries");
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 63) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following)) {
            isPair = isExplicitPair = true;
            state.position++;
            skipSeparationSpace(state, true, nodeIndent);
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 58) {
          isPair = true;
          ch = state.input.charCodeAt(++state.position);
          skipSeparationSpace(state, true, nodeIndent);
          composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
          valueNode = state.result;
        }
        if (isMapping) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
        } else if (isPair) {
          _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
        } else {
          _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 44) {
          readNext = true;
          ch = state.input.charCodeAt(++state.position);
        } else {
          readNext = false;
        }
      }
      throwError(state, "unexpected end of the stream within a flow collection");
    }
    function readBlockScalar(state, nodeIndent) {
      var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 124) {
        folding = false;
      } else if (ch === 62) {
        folding = true;
      } else {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      while (ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
        if (ch === 43 || ch === 45) {
          if (CHOMPING_CLIP === chomping) {
            chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
          } else {
            throwError(state, "repeat of a chomping mode identifier");
          }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
          if (tmp === 0) {
            throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
          } else if (!detectedIndent) {
            textIndent = nodeIndent + tmp - 1;
            detectedIndent = true;
          } else {
            throwError(state, "repeat of an indentation width identifier");
          }
        } else {
          break;
        }
      }
      if (is_WHITE_SPACE(ch)) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (is_WHITE_SPACE(ch));
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (!is_EOL(ch) && ch !== 0);
        }
      }
      while (ch !== 0) {
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
          textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
          emptyLines++;
          continue;
        }
        if (state.lineIndent < textIndent) {
          if (chomping === CHOMPING_KEEP) {
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (chomping === CHOMPING_CLIP) {
            if (didReadContent) {
              state.result += "\n";
            }
          }
          break;
        }
        if (folding) {
          if (is_WHITE_SPACE(ch)) {
            atMoreIndented = true;
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (atMoreIndented) {
            atMoreIndented = false;
            state.result += common.repeat("\n", emptyLines + 1);
          } else if (emptyLines === 0) {
            if (didReadContent) {
              state.result += " ";
            }
          } else {
            state.result += common.repeat("\n", emptyLines);
          }
        } else {
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while (!is_EOL(ch) && ch !== 0) {
          ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
      }
      return true;
    }
    function readBlockSequence(state, nodeIndent) {
      var _line, _tag2 = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        if (ch !== 45) {
          break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
          break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
          if (state.lineIndent <= nodeIndent) {
            _result.push(null);
            ch = state.input.charCodeAt(state.position);
            continue;
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
          throwError(state, "bad indentation of a sequence entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (detected) {
        state.tag = _tag2;
        state.anchor = _anchor;
        state.kind = "sequence";
        state.result = _result;
        return true;
      }
      return false;
    }
    function readBlockMapping(state, nodeIndent, flowIndent) {
      var following, allowCompact, _line, _pos, _tag2 = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line;
        _pos = state.position;
        if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
          if (ch === 63) {
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = true;
            allowCompact = true;
          } else if (atExplicitKey) {
            atExplicitKey = false;
            allowCompact = true;
          } else {
            throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
          }
          state.position += 1;
          ch = following;
        } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          if (state.line === _line) {
            ch = state.input.charCodeAt(state.position);
            while (is_WHITE_SPACE(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 58) {
              ch = state.input.charCodeAt(++state.position);
              if (!is_WS_OR_EOL(ch)) {
                throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
              }
              if (atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                keyTag = keyNode = valueNode = null;
              }
              detected = true;
              atExplicitKey = false;
              allowCompact = false;
              keyTag = state.tag;
              keyNode = state.result;
            } else if (detected) {
              throwError(state, "can not read an implicit mapping pair; a colon is missed");
            } else {
              state.tag = _tag2;
              state.anchor = _anchor;
              return true;
            }
          } else if (detected) {
            throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
          } else {
            state.tag = _tag2;
            state.anchor = _anchor;
            return true;
          }
        } else {
          break;
        }
        if (state.line === _line || state.lineIndent > nodeIndent) {
          if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
            if (atExplicitKey) {
              keyNode = state.result;
            } else {
              valueNode = state.result;
            }
          }
          if (!atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
            keyTag = keyNode = valueNode = null;
          }
          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
        }
        if (state.lineIndent > nodeIndent && ch !== 0) {
          throwError(state, "bad indentation of a mapping entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
      }
      if (detected) {
        state.tag = _tag2;
        state.anchor = _anchor;
        state.kind = "mapping";
        state.result = _result;
      }
      return detected;
    }
    function readTagProperty(state) {
      var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 33) return false;
      if (state.tag !== null) {
        throwError(state, "duplication of a tag property");
      }
      ch = state.input.charCodeAt(++state.position);
      if (ch === 60) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
      } else if (ch === 33) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
      } else {
        tagHandle = "!";
      }
      _position = state.position;
      if (isVerbatim) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && ch !== 62);
        if (state.position < state.length) {
          tagName = state.input.slice(_position, state.position);
          ch = state.input.charCodeAt(++state.position);
        } else {
          throwError(state, "unexpected end of the stream within a verbatim tag");
        }
      } else {
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          if (ch === 33) {
            if (!isNamed) {
              tagHandle = state.input.slice(_position - 1, state.position + 1);
              if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                throwError(state, "named tag handle cannot contain such characters");
              }
              isNamed = true;
              _position = state.position + 1;
            } else {
              throwError(state, "tag suffix cannot contain exclamation marks");
            }
          }
          ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
          throwError(state, "tag suffix cannot contain flow indicator characters");
        }
      }
      if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, "tag name cannot contain such characters: " + tagName);
      }
      if (isVerbatim) {
        state.tag = tagName;
      } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
      } else if (tagHandle === "!") {
        state.tag = "!" + tagName;
      } else if (tagHandle === "!!") {
        state.tag = "tag:yaml.org,2002:" + tagName;
      } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
      }
      return true;
    }
    function readAnchorProperty(state) {
      var _position, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 38) return false;
      if (state.anchor !== null) {
        throwError(state, "duplication of an anchor property");
      }
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an anchor node must contain at least one character");
      }
      state.anchor = state.input.slice(_position, state.position);
      return true;
    }
    function readAlias(state) {
      var _position, alias, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 42) return false;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an alias node must contain at least one character");
      }
      alias = state.input.slice(_position, state.position);
      if (!_hasOwnProperty.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
      }
      state.result = state.anchorMap[alias];
      skipSeparationSpace(state, true, -1);
      return true;
    }
    function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
      var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type, flowIndent, blockIndent;
      if (state.listener !== null) {
        state.listener("open", state);
      }
      state.tag = null;
      state.anchor = null;
      state.kind = null;
      state.result = null;
      allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
      if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        }
      }
      if (indentStatus === 1) {
        while (readTagProperty(state) || readAnchorProperty(state)) {
          if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            allowBlockCollections = allowBlockStyles;
            if (state.lineIndent > parentIndent) {
              indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
              indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
              indentStatus = -1;
            }
          } else {
            allowBlockCollections = false;
          }
        }
      }
      if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
      }
      if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
          flowIndent = parentIndent;
        } else {
          flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
          if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
            hasContent = true;
          } else {
            if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
              hasContent = true;
            } else if (readAlias(state)) {
              hasContent = true;
              if (state.tag !== null || state.anchor !== null) {
                throwError(state, "alias node should not have any properties");
              }
            } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
              hasContent = true;
              if (state.tag === null) {
                state.tag = "?";
              }
            }
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else if (indentStatus === 0) {
          hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
      }
      if (state.tag !== null && state.tag !== "!") {
        if (state.tag === "?") {
          if (state.result !== null && state.kind !== "scalar") {
            throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
          }
          for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
            type = state.implicitTypes[typeIndex];
            if (type.resolve(state.result)) {
              state.result = type.construct(state.result);
              state.tag = type.tag;
              if (state.anchor !== null) {
                state.anchorMap[state.anchor] = state.result;
              }
              break;
            }
          }
        } else if (_hasOwnProperty.call(state.typeMap[state.kind || "fallback"], state.tag)) {
          type = state.typeMap[state.kind || "fallback"][state.tag];
          if (state.result !== null && type.kind !== state.kind) {
            throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
          }
          if (!type.resolve(state.result)) {
            throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
          } else {
            state.result = type.construct(state.result);
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else {
          throwError(state, "unknown tag !<" + state.tag + ">");
        }
      }
      if (state.listener !== null) {
        state.listener("close", state);
      }
      return state.tag !== null || state.anchor !== null || hasContent;
    }
    function readDocument(state) {
      var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
      state.version = null;
      state.checkLineBreaks = state.legacy;
      state.tagMap = {};
      state.anchorMap = {};
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 37) {
          break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
          throwError(state, "directive name must not be less than one character in length");
        }
        while (ch !== 0) {
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 35) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (ch !== 0 && !is_EOL(ch));
            break;
          }
          if (is_EOL(ch)) break;
          _position = state.position;
          while (ch !== 0 && !is_WS_OR_EOL(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0) readLineBreak(state);
        if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
          directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
          throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
      }
      skipSeparationSpace(state, true, -1);
      if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      } else if (hasDirectives) {
        throwError(state, "directives end mark is expected");
      }
      composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
      skipSeparationSpace(state, true, -1);
      if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, "non-ASCII line breaks are interpreted as content");
      }
      state.documents.push(state.result);
      if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 46) {
          state.position += 3;
          skipSeparationSpace(state, true, -1);
        }
        return;
      }
      if (state.position < state.length - 1) {
        throwError(state, "end of the stream or a document separator is expected");
      } else {
        return;
      }
    }
    function loadDocuments(input, options2) {
      input = String(input);
      options2 = options2 || {};
      if (input.length !== 0) {
        if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
          input += "\n";
        }
        if (input.charCodeAt(0) === 65279) {
          input = input.slice(1);
        }
      }
      var state = new State(input, options2);
      var nullpos = input.indexOf("\0");
      if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, "null byte is not allowed in input");
      }
      state.input += "\0";
      while (state.input.charCodeAt(state.position) === 32) {
        state.lineIndent += 1;
        state.position += 1;
      }
      while (state.position < state.length - 1) {
        readDocument(state);
      }
      return state.documents;
    }
    function loadAll(input, iterator, options2) {
      if (iterator !== null && typeof iterator === "object" && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      var documents = loadDocuments(input, options2);
      if (typeof iterator !== "function") {
        return documents;
      }
      for (var index = 0, length = documents.length; index < length; index += 1) {
        iterator(documents[index]);
      }
    }
    function load(input, options2) {
      var documents = loadDocuments(input, options2);
      if (documents.length === 0) {
        return void 0;
      } else if (documents.length === 1) {
        return documents[0];
      }
      throw new YAMLException("expected a single document in the stream, but found more");
    }
    function safeLoadAll(input, iterator, options2) {
      if (typeof iterator === "object" && iterator !== null && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      return loadAll(input, iterator, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    function safeLoad(input, options2) {
      return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.loadAll = loadAll;
    module2.exports.load = load;
    module2.exports.safeLoadAll = safeLoadAll;
    module2.exports.safeLoad = safeLoad;
  }
});

// node_modules/js-yaml/lib/js-yaml/dumper.js
var require_dumper = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/dumper.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var common = require_common();
    var YAMLException = require_exception();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var _toString = Object.prototype.toString;
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CHAR_TAB = 9;
    var CHAR_LINE_FEED = 10;
    var CHAR_CARRIAGE_RETURN = 13;
    var CHAR_SPACE = 32;
    var CHAR_EXCLAMATION = 33;
    var CHAR_DOUBLE_QUOTE = 34;
    var CHAR_SHARP = 35;
    var CHAR_PERCENT = 37;
    var CHAR_AMPERSAND = 38;
    var CHAR_SINGLE_QUOTE = 39;
    var CHAR_ASTERISK = 42;
    var CHAR_COMMA = 44;
    var CHAR_MINUS = 45;
    var CHAR_COLON = 58;
    var CHAR_EQUALS = 61;
    var CHAR_GREATER_THAN = 62;
    var CHAR_QUESTION = 63;
    var CHAR_COMMERCIAL_AT = 64;
    var CHAR_LEFT_SQUARE_BRACKET = 91;
    var CHAR_RIGHT_SQUARE_BRACKET = 93;
    var CHAR_GRAVE_ACCENT = 96;
    var CHAR_LEFT_CURLY_BRACKET = 123;
    var CHAR_VERTICAL_LINE = 124;
    var CHAR_RIGHT_CURLY_BRACKET = 125;
    var ESCAPE_SEQUENCES = {};
    ESCAPE_SEQUENCES[0] = "\\0";
    ESCAPE_SEQUENCES[7] = "\\a";
    ESCAPE_SEQUENCES[8] = "\\b";
    ESCAPE_SEQUENCES[9] = "\\t";
    ESCAPE_SEQUENCES[10] = "\\n";
    ESCAPE_SEQUENCES[11] = "\\v";
    ESCAPE_SEQUENCES[12] = "\\f";
    ESCAPE_SEQUENCES[13] = "\\r";
    ESCAPE_SEQUENCES[27] = "\\e";
    ESCAPE_SEQUENCES[34] = '\\"';
    ESCAPE_SEQUENCES[92] = "\\\\";
    ESCAPE_SEQUENCES[133] = "\\N";
    ESCAPE_SEQUENCES[160] = "\\_";
    ESCAPE_SEQUENCES[8232] = "\\L";
    ESCAPE_SEQUENCES[8233] = "\\P";
    var DEPRECATED_BOOLEANS_SYNTAX = [
      "y",
      "Y",
      "yes",
      "Yes",
      "YES",
      "on",
      "On",
      "ON",
      "n",
      "N",
      "no",
      "No",
      "NO",
      "off",
      "Off",
      "OFF"
    ];
    function compileStyleMap(schema, map2) {
      var result, keys2, index, length, tag2, style, type;
      if (map2 === null) return {};
      result = {};
      keys2 = Object.keys(map2);
      for (index = 0, length = keys2.length; index < length; index += 1) {
        tag2 = keys2[index];
        style = String(map2[tag2]);
        if (tag2.slice(0, 2) === "!!") {
          tag2 = "tag:yaml.org,2002:" + tag2.slice(2);
        }
        type = schema.compiledTypeMap["fallback"][tag2];
        if (type && _hasOwnProperty.call(type.styleAliases, style)) {
          style = type.styleAliases[style];
        }
        result[tag2] = style;
      }
      return result;
    }
    function encodeHex(character) {
      var string, handle, length;
      string = character.toString(16).toUpperCase();
      if (character <= 255) {
        handle = "x";
        length = 2;
      } else if (character <= 65535) {
        handle = "u";
        length = 4;
      } else if (character <= 4294967295) {
        handle = "U";
        length = 8;
      } else {
        throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
      }
      return "\\" + handle + common.repeat("0", length - string.length) + string;
    }
    function State(options2) {
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.indent = Math.max(1, options2["indent"] || 2);
      this.noArrayIndent = options2["noArrayIndent"] || false;
      this.skipInvalid = options2["skipInvalid"] || false;
      this.flowLevel = common.isNothing(options2["flowLevel"]) ? -1 : options2["flowLevel"];
      this.styleMap = compileStyleMap(this.schema, options2["styles"] || null);
      this.sortKeys = options2["sortKeys"] || false;
      this.lineWidth = options2["lineWidth"] || 80;
      this.noRefs = options2["noRefs"] || false;
      this.noCompatMode = options2["noCompatMode"] || false;
      this.condenseFlow = options2["condenseFlow"] || false;
      this.implicitTypes = this.schema.compiledImplicit;
      this.explicitTypes = this.schema.compiledExplicit;
      this.tag = null;
      this.result = "";
      this.duplicates = [];
      this.usedDuplicates = null;
    }
    function indentString(string, spaces) {
      var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
      while (position < length) {
        next = string.indexOf("\n", position);
        if (next === -1) {
          line = string.slice(position);
          position = length;
        } else {
          line = string.slice(position, next + 1);
          position = next + 1;
        }
        if (line.length && line !== "\n") result += ind;
        result += line;
      }
      return result;
    }
    function generateNextLine(state, level) {
      return "\n" + common.repeat(" ", state.indent * level);
    }
    function testImplicitResolving(state, str) {
      var index, length, type;
      for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
        type = state.implicitTypes[index];
        if (type.resolve(str)) {
          return true;
        }
      }
      return false;
    }
    function isWhitespace(c) {
      return c === CHAR_SPACE || c === CHAR_TAB;
    }
    function isPrintable(c) {
      return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== 65279 || 65536 <= c && c <= 1114111;
    }
    function isNsChar(c) {
      return isPrintable(c) && !isWhitespace(c) && c !== 65279 && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
    }
    function isPlainSafe(c, prev) {
      return isPrintable(c) && c !== 65279 && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_COLON && (c !== CHAR_SHARP || prev && isNsChar(prev));
    }
    function isPlainSafeFirst(c) {
      return isPrintable(c) && c !== 65279 && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
    }
    function needIndentIndicator(string) {
      var leadingSpaceRe = /^\n* /;
      return leadingSpaceRe.test(string);
    }
    var STYLE_PLAIN = 1;
    var STYLE_SINGLE = 2;
    var STYLE_LITERAL = 3;
    var STYLE_FOLDED = 4;
    var STYLE_DOUBLE = 5;
    function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
      var i;
      var char, prev_char;
      var hasLineBreak = false;
      var hasFoldableLine = false;
      var shouldTrackWidth = lineWidth !== -1;
      var previousLineBreak = -1;
      var plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));
      if (singleLineOnly) {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
      } else {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (char === CHAR_LINE_FEED) {
            hasLineBreak = true;
            if (shouldTrackWidth) {
              hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
              i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
              previousLineBreak = i;
            }
          } else if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
      }
      if (!hasLineBreak && !hasFoldableLine) {
        return plain && !testAmbiguousType(string) ? STYLE_PLAIN : STYLE_SINGLE;
      }
      if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
      }
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    function writeScalar(state, string, level, iskey) {
      state.dump = function() {
        if (string.length === 0) {
          return "''";
        }
        if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
          return "'" + string + "'";
        }
        var indent = state.indent * Math.max(1, level);
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string2) {
          return testImplicitResolving(state, string2);
        }
        switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
          case STYLE_PLAIN:
            return string;
          case STYLE_SINGLE:
            return "'" + string.replace(/'/g, "''") + "'";
          case STYLE_LITERAL:
            return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
          case STYLE_FOLDED:
            return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
          case STYLE_DOUBLE:
            return '"' + escapeString(string, lineWidth) + '"';
          default:
            throw new YAMLException("impossible error: invalid scalar style");
        }
      }();
    }
    function blockHeader(string, indentPerLevel) {
      var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
      var clip = string[string.length - 1] === "\n";
      var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
      var chomp = keep ? "+" : clip ? "" : "-";
      return indentIndicator + chomp + "\n";
    }
    function dropEndingNewline(string) {
      return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
    }
    function foldString(string, width) {
      var lineRe = /(\n+)([^\n]*)/g;
      var result = function() {
        var nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
      }();
      var prevMoreIndented = string[0] === "\n" || string[0] === " ";
      var moreIndented;
      var match;
      while (match = lineRe.exec(string)) {
        var prefix = match[1], line = match[2];
        moreIndented = line[0] === " ";
        result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
        prevMoreIndented = moreIndented;
      }
      return result;
    }
    function foldLine(line, width) {
      if (line === "" || line[0] === " ") return line;
      var breakRe = / [^ ]/g;
      var match;
      var start = 0, end, curr = 0, next = 0;
      var result = "";
      while (match = breakRe.exec(line)) {
        next = match.index;
        if (next - start > width) {
          end = curr > start ? curr : next;
          result += "\n" + line.slice(start, end);
          start = end + 1;
        }
        curr = next;
      }
      result += "\n";
      if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
      } else {
        result += line.slice(start);
      }
      return result.slice(1);
    }
    function escapeString(string) {
      var result = "";
      var char, nextChar;
      var escapeSeq;
      for (var i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        if (char >= 55296 && char <= 56319) {
          nextChar = string.charCodeAt(i + 1);
          if (nextChar >= 56320 && nextChar <= 57343) {
            result += encodeHex((char - 55296) * 1024 + nextChar - 56320 + 65536);
            i++;
            continue;
          }
        }
        escapeSeq = ESCAPE_SEQUENCES[char];
        result += !escapeSeq && isPrintable(char) ? string[i] : escapeSeq || encodeHex(char);
      }
      return result;
    }
    function writeFlowSequence(state, level, object) {
      var _result = "", _tag2 = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level, object[index], false, false)) {
          if (index !== 0) _result += "," + (!state.condenseFlow ? " " : "");
          _result += state.dump;
        }
      }
      state.tag = _tag2;
      state.dump = "[" + _result + "]";
    }
    function writeBlockSequence(state, level, object, compact) {
      var _result = "", _tag2 = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level + 1, object[index], true, true)) {
          if (!compact || index !== 0) {
            _result += generateNextLine(state, level);
          }
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            _result += "-";
          } else {
            _result += "- ";
          }
          _result += state.dump;
        }
      }
      state.tag = _tag2;
      state.dump = _result || "[]";
    }
    function writeFlowMapping(state, level, object) {
      var _result = "", _tag2 = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (index !== 0) pairBuffer += ", ";
        if (state.condenseFlow) pairBuffer += '"';
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level, objectKey, false, false)) {
          continue;
        }
        if (state.dump.length > 1024) pairBuffer += "? ";
        pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
        if (!writeNode(state, level, objectValue, false, false)) {
          continue;
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag2;
      state.dump = "{" + _result + "}";
    }
    function writeBlockMapping(state, level, object, compact) {
      var _result = "", _tag2 = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
      if (state.sortKeys === true) {
        objectKeyList.sort();
      } else if (typeof state.sortKeys === "function") {
        objectKeyList.sort(state.sortKeys);
      } else if (state.sortKeys) {
        throw new YAMLException("sortKeys must be a boolean or a function");
      }
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (!compact || index !== 0) {
          pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
          continue;
        }
        explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
        if (explicitPair) {
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += "?";
          } else {
            pairBuffer += "? ";
          }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
          pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
          continue;
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += ":";
        } else {
          pairBuffer += ": ";
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag2;
      state.dump = _result || "{}";
    }
    function detectType(state, object, explicit) {
      var _result, typeList, index, length, type, style;
      typeList = explicit ? state.explicitTypes : state.implicitTypes;
      for (index = 0, length = typeList.length; index < length; index += 1) {
        type = typeList[index];
        if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === "object" && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
          state.tag = explicit ? type.tag : "?";
          if (type.represent) {
            style = state.styleMap[type.tag] || type.defaultStyle;
            if (_toString.call(type.represent) === "[object Function]") {
              _result = type.represent(object, style);
            } else if (_hasOwnProperty.call(type.represent, style)) {
              _result = type.represent[style](object, style);
            } else {
              throw new YAMLException("!<" + type.tag + '> tag resolver accepts not "' + style + '" style');
            }
            state.dump = _result;
          }
          return true;
        }
      }
      return false;
    }
    function writeNode(state, level, object, block2, compact, iskey) {
      state.tag = null;
      state.dump = object;
      if (!detectType(state, object, false)) {
        detectType(state, object, true);
      }
      var type = _toString.call(state.dump);
      if (block2) {
        block2 = state.flowLevel < 0 || state.flowLevel > level;
      }
      var objectOrArray = type === "[object Object]" || type === "[object Array]", duplicateIndex, duplicate;
      if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
      }
      if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
      }
      if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = "*ref_" + duplicateIndex;
      } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
          state.usedDuplicates[duplicateIndex] = true;
        }
        if (type === "[object Object]") {
          if (block2 && Object.keys(state.dump).length !== 0) {
            writeBlockMapping(state, level, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowMapping(state, level, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object Array]") {
          var arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
          if (block2 && state.dump.length !== 0) {
            writeBlockSequence(state, arrayLevel, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowSequence(state, arrayLevel, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object String]") {
          if (state.tag !== "?") {
            writeScalar(state, state.dump, level, iskey);
          }
        } else {
          if (state.skipInvalid) return false;
          throw new YAMLException("unacceptable kind of an object to dump " + type);
        }
        if (state.tag !== null && state.tag !== "?") {
          state.dump = "!<" + state.tag + "> " + state.dump;
        }
      }
      return true;
    }
    function getDuplicateReferences(object, state) {
      var objects = [], duplicatesIndexes = [], index, length;
      inspectNode(object, objects, duplicatesIndexes);
      for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
        state.duplicates.push(objects[duplicatesIndexes[index]]);
      }
      state.usedDuplicates = new Array(length);
    }
    function inspectNode(object, objects, duplicatesIndexes) {
      var objectKeyList, index, length;
      if (object !== null && typeof object === "object") {
        index = objects.indexOf(object);
        if (index !== -1) {
          if (duplicatesIndexes.indexOf(index) === -1) {
            duplicatesIndexes.push(index);
          }
        } else {
          objects.push(object);
          if (Array.isArray(object)) {
            for (index = 0, length = object.length; index < length; index += 1) {
              inspectNode(object[index], objects, duplicatesIndexes);
            }
          } else {
            objectKeyList = Object.keys(object);
            for (index = 0, length = objectKeyList.length; index < length; index += 1) {
              inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
            }
          }
        }
      }
    }
    function dump(input, options2) {
      options2 = options2 || {};
      var state = new State(options2);
      if (!state.noRefs) getDuplicateReferences(input, state);
      if (writeNode(state, 0, input, true, true)) return state.dump + "\n";
      return "";
    }
    function safeDump(input, options2) {
      return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.dump = dump;
    module2.exports.safeDump = safeDump;
  }
});

// node_modules/js-yaml/lib/js-yaml.js
var require_js_yaml = __commonJS({
  "node_modules/js-yaml/lib/js-yaml.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var loader = require_loader();
    var dumper = require_dumper();
    function deprecated(name) {
      return function() {
        throw new Error("Function " + name + " is deprecated and cannot be used.");
      };
    }
    module2.exports.Type = require_type();
    module2.exports.Schema = require_schema();
    module2.exports.FAILSAFE_SCHEMA = require_failsafe();
    module2.exports.JSON_SCHEMA = require_json();
    module2.exports.CORE_SCHEMA = require_core();
    module2.exports.DEFAULT_SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_FULL_SCHEMA = require_default_full();
    module2.exports.load = loader.load;
    module2.exports.loadAll = loader.loadAll;
    module2.exports.safeLoad = loader.safeLoad;
    module2.exports.safeLoadAll = loader.safeLoadAll;
    module2.exports.dump = dumper.dump;
    module2.exports.safeDump = dumper.safeDump;
    module2.exports.YAMLException = require_exception();
    module2.exports.MINIMAL_SCHEMA = require_failsafe();
    module2.exports.SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_SCHEMA = require_default_full();
    module2.exports.scan = deprecated("scan");
    module2.exports.parse = deprecated("parse");
    module2.exports.compose = deprecated("compose");
    module2.exports.addConstructor = deprecated("addConstructor");
  }
});

// node_modules/js-yaml/index.js
var require_js_yaml2 = __commonJS({
  "node_modules/js-yaml/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var yaml = require_js_yaml();
    module2.exports = yaml;
  }
});

// node_modules/front-matter/index.js
var require_front_matter = __commonJS({
  "node_modules/front-matter/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var parser2 = require_js_yaml2();
    var optionalByteOrderMark = "\\ufeff?";
    var platform = typeof process !== "undefined" ? process.platform : "";
    var pattern = "^(" + optionalByteOrderMark + "(= yaml =|---)$([\\s\\S]*?)^(?:\\2|\\.\\.\\.)\\s*$" + (platform === "win32" ? "\\r?" : "") + "(?:\\n)?)";
    var regex = new RegExp(pattern, "m");
    module2.exports = extractor;
    module2.exports.test = test;
    function extractor(string, options2) {
      string = string || "";
      var defaultOptions = { allowUnsafe: false };
      options2 = options2 instanceof Object ? { ...defaultOptions, ...options2 } : defaultOptions;
      options2.allowUnsafe = Boolean(options2.allowUnsafe);
      var lines = string.split(/(\r?\n)/);
      if (lines[0] && /= yaml =|---/.test(lines[0])) {
        return parse5(string, options2.allowUnsafe);
      } else {
        return {
          attributes: {},
          body: string,
          bodyBegin: 1
        };
      }
    }
    function computeLocation(match, body) {
      var line = 1;
      var pos = body.indexOf("\n");
      var offset = match.index + match[0].length;
      while (pos !== -1) {
        if (pos >= offset) {
          return line;
        }
        line++;
        pos = body.indexOf("\n", pos + 1);
      }
      return line;
    }
    function parse5(string, allowUnsafe) {
      var match = regex.exec(string);
      if (!match) {
        return {
          attributes: {},
          body: string,
          bodyBegin: 1
        };
      }
      var loader = allowUnsafe ? parser2.load : parser2.safeLoad;
      var yaml = match[match.length - 1].replace(/^\s+|\s+$/g, "");
      var attributes = loader(yaml) || {};
      var body = string.replace(match[0], "");
      var line = computeLocation(match, string);
      return {
        attributes,
        body,
        bodyBegin: line,
        frontmatter: yaml
      };
    }
    function test(string) {
      string = string || "";
      return regex.test(string);
    }
  }
});

// node_modules/cookie/dist/index.js
var require_dist5 = __commonJS({
  "node_modules/cookie/dist/index.js"(exports2) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parse = parse5;
    exports2.serialize = serialize2;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse5(str, options2) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options2?.decode || decode3;
      let index = 0;
      do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
          break;
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        if (obj[key] === void 0) {
          let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          let valEndIdx = endIndex(str, endIdx, valStartIdx);
          const value = dec(str.slice(valStartIdx, valEndIdx));
          obj[key] = value;
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        const code = str.charCodeAt(index);
        if (code !== 32 && code !== 9)
          return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9)
          return index + 1;
      }
      return min;
    }
    function serialize2(name, val, options2) {
      const enc = options2?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
      }
      let str = name + "=" + value;
      if (!options2)
        return str;
      if (options2.maxAge !== void 0) {
        if (!Number.isInteger(options2.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${options2.maxAge}`);
        }
        str += "; Max-Age=" + options2.maxAge;
      }
      if (options2.domain) {
        if (!domainValueRegExp.test(options2.domain)) {
          throw new TypeError(`option domain is invalid: ${options2.domain}`);
        }
        str += "; Domain=" + options2.domain;
      }
      if (options2.path) {
        if (!pathValueRegExp.test(options2.path)) {
          throw new TypeError(`option path is invalid: ${options2.path}`);
        }
        str += "; Path=" + options2.path;
      }
      if (options2.expires) {
        if (!isDate2(options2.expires) || !Number.isFinite(options2.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${options2.expires}`);
        }
        str += "; Expires=" + options2.expires.toUTCString();
      }
      if (options2.httpOnly) {
        str += "; HttpOnly";
      }
      if (options2.secure) {
        str += "; Secure";
      }
      if (options2.partitioned) {
        str += "; Partitioned";
      }
      if (options2.priority) {
        const priority = typeof options2.priority === "string" ? options2.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${options2.priority}`);
        }
      }
      if (options2.sameSite) {
        const sameSite = typeof options2.sameSite === "string" ? options2.sameSite.toLowerCase() : options2.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${options2.sameSite}`);
        }
      }
      return str;
    }
    function decode3(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate2(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AfterBootstrapHandler: () => AfterBootstrapHandler,
  MiddlewareHandler: () => MiddlewareHandler,
  findRecordByFilter: () => findRecordByFilter,
  findRecordsByFilter: () => findRecordsByFilter,
  globalApi: () => globalApi,
  log: () => log3,
  moduleExists: () => moduleExists,
  stringify: () => import_pocketbase_stringify6.stringify,
  v23MiddlewareWrapper: () => v23MiddlewareWrapper
});
module.exports = __toCommonJS(src_exports);
init_cjs_shims();

// src/lib/pages/index.ts
init_cjs_shims();

// src/lib/pages/providers/v23Provider/index.ts
init_cjs_shims();
var v23Provider = () => ({
  boot: () => {
    onBootstrap((e) => {
      e.next();
      if (!require.isOverridden) {
        const oldRequire = require;
        const { globalApi: globalApi2, moduleExists: moduleExists2 } = oldRequire(
          `${__hooks}/pocketpages.pb`
        );
        require = (path3) => {
          if (path3 === "pocketpages") {
            return globalApi2;
          }
          if (!moduleExists2(path3)) {
            throw new Error(`Module ${path3} not found. Did you mean resolve()?`);
          }
          return oldRequire(path3);
        };
        require.isOverridden = true;
      }
      require(`${__hooks}/pocketpages.pb`).AfterBootstrapHandler();
    });
    routerUse((e) => {
      if (!require.isOverridden) {
        const oldRequire = require;
        const { globalApi: globalApi2, moduleExists: moduleExists2 } = oldRequire(
          `${__hooks}/pocketpages.pb`
        );
        require = (path3) => {
          if (path3 === "pocketpages") {
            return globalApi2;
          }
          if (!moduleExists2(path3)) {
            throw new Error(`Module ${path3} not found. Did you mean resolve()?`);
          }
          return oldRequire(path3);
        };
        require.isOverridden = true;
      }
      return require(`${__hooks}/pocketpages.pb`).v23MiddlewareWrapper(e);
    });
  }
});

// src/lib/pages/index.ts
var getPagesProvider = () => v23Provider();

// src/lib/types.ts
init_cjs_shims();

// src/main.ts
init_cjs_shims();
var log3 = __toESM(require_dist2());
var import_pocketbase_stringify6 = __toESM(require_dist());

// src/globalApi.ts
init_cjs_shims();

// node_modules/@s-libs/micro-dash/fesm2022/micro-dash.mjs
init_cjs_shims();
function identity(value) {
  return value;
}
function clone(value) {
  if (Array.isArray(value)) {
    return value.slice();
  } else if (value instanceof Object) {
    return { ...value };
  } else {
    return value;
  }
}
function keys(object) {
  let val = keysOfNonArray(object);
  if (Array.isArray(object)) {
    val = val.filter((item) => item !== "length");
  }
  return val;
}
function keysOfNonArray(object) {
  return object ? Object.getOwnPropertyNames(object) : [];
}
function forOwnOfNonArray(object, iteratee) {
  forEachOfArray(keysOfNonArray(object), (key) => iteratee(object[key], key));
  return object;
}
function forEach(collection, iteratee) {
  if (Array.isArray(collection)) {
    forEachOfArray(collection, iteratee);
  } else {
    forOwnOfNonArray(collection, iteratee);
  }
  return collection;
}
function forEachOfArray(array, iteratee) {
  for (let i = 0, len = array.length; i < len; ++i) {
    if (iteratee(array[i], i) === false) {
      break;
    }
  }
}
function values(object) {
  return keys(object).map((key) => object[key]);
}
function times(n, iteratee) {
  const result = [];
  for (let i = 0; i < n; ++i) {
    result[i] = iteratee(i);
  }
  return result;
}
function flatten(array) {
  const result = [];
  for (const element of array) {
    if (Array.isArray(element)) {
      for (const inner of element) {
        result.push(inner);
      }
    } else {
      result.push(element);
    }
  }
  return result;
}
function pullAt(array, ...indexes) {
  const flattenedIndexes = flatten(indexes);
  const result = flattenedIndexes.map((i) => array[i]);
  let lastI;
  for (const i of flattenedIndexes.sort((a, b) => b - a)) {
    if (i !== lastI) {
      array.splice(i, 1);
    }
    lastI = i;
  }
  return result;
}
function map(collection, iteratee) {
  const mapped = [];
  forEach(collection, (value, keyOrIndex) => {
    mapped.push(iteratee(value, keyOrIndex));
  });
  return mapped;
}
function merge(object, ...sources) {
  for (const source of sources) {
    forEach(source, (value, key) => {
      const myValue = object[key];
      if (myValue instanceof Object) {
        value = merge(clone(myValue), value);
      }
      object[key] = value;
    });
  }
  return object;
}
function pick(object, ...paths) {
  const result = {};
  if (object != null) {
    for (const path3 of paths) {
      result[path3] = object[path3];
    }
  }
  return result;
}
var randomInt = (lower, upper, floating) => {
  let range = upper - lower;
  if (!floating) {
    ++range;
  }
  let result = Math.random() * range + lower;
  if (!floating) {
    result = Math.floor(result);
  }
  return result;
};
function sampleSize(collection, n = 1) {
  const values2 = map(collection, identity);
  return times(Math.min(n, values2.length), () => pullAt(values2, randomInt(0, values2.length - 1, false))[0]);
}
function size(collection) {
  return keys(collection).length;
}
function shuffle(collection) {
  return sampleSize(collection, size(collection));
}

// ../pocketbase-js-sdk/dist/pocketbase.es.mjs
init_cjs_shims();
var ClientResponseError = class _ClientResponseError extends Error {
  constructor(errData) {
    super("ClientResponseError");
    this.url = "";
    this.status = 0;
    this.response = {};
    this.isAbort = false;
    this.originalError = null;
    Object.setPrototypeOf(this, _ClientResponseError.prototype);
    if (errData !== null && typeof errData === "object") {
      this.url = typeof errData.url === "string" ? errData.url : "";
      this.status = typeof errData.status === "number" ? errData.status : 0;
      this.isAbort = !!errData.isAbort;
      this.originalError = errData.originalError;
      if (errData.response !== null && typeof errData.response === "object") {
        this.response = errData.response;
      } else if (errData.data !== null && typeof errData.data === "object") {
        this.response = errData.data;
      } else {
        this.response = {};
      }
    }
    if (!this.originalError && !(errData instanceof _ClientResponseError)) {
      this.originalError = errData;
    }
    if (typeof DOMException !== "undefined" && errData instanceof DOMException) {
      this.isAbort = true;
    }
    this.name = "ClientResponseError " + this.status;
    this.message = this.response?.message;
    if (!this.message) {
      if (this.originalError?.cause?.message?.includes("ECONNREFUSED ::1")) {
        this.message = "Failed to connect to the PocketBase server. Try changing the SDK URL from localhost to 127.0.0.1 (https://github.com/pocketbase/js-sdk/issues/21).";
      } else {
        this.message = "Something went wrong while processing your request.";
      }
    }
  }
  /**
   * Alias for `this.response` for backward compatibility.
   */
  get data() {
    return this.response;
  }
  /**
   * Make a POJO's copy of the current error class instance.
   * @see https://github.com/vuex-orm/vuex-orm/issues/255
   */
  toJSON() {
    return { ...this };
  }
};
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function cookieParse(str, options2) {
  const result = {};
  if (typeof str !== "string") {
    return result;
  }
  const opt = Object.assign({}, options2 || {});
  const decode3 = opt.decode || defaultDecode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (void 0 === result[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      try {
        result[key] = decode3(val);
      } catch (_) {
        result[key] = val;
      }
    }
    index = endIdx + 1;
  }
  return result;
}
function cookieSerialize(name, val, options2) {
  const opt = Object.assign({}, options2 || {});
  const encode2 = opt.encode || defaultEncode;
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const value = encode2(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  let result = name + "=" + value;
  if (opt.maxAge != null) {
    const maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    result += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    result += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    result += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    result += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    result += "; HttpOnly";
  }
  if (opt.secure) {
    result += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        result += "; Priority=Low";
        break;
      case "medium":
        result += "; Priority=Medium";
        break;
      case "high":
        result += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        result += "; SameSite=Strict";
        break;
      case "lax":
        result += "; SameSite=Lax";
        break;
      case "strict":
        result += "; SameSite=Strict";
        break;
      case "none":
        result += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return result;
}
function defaultDecode(val) {
  return val.indexOf("%") !== -1 ? decodeURIComponent(val) : val;
}
function defaultEncode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}
var atobPolyfill;
if (typeof atob === "function") {
  atobPolyfill = atob;
} else {
  atobPolyfill = (input) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let str = String(input).replace(/=+$/, "");
    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      var bc = 0, bs, buffer, idx = 0, output = "";
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }
    return output;
  };
}
function getTokenPayload(token2) {
  if (token2) {
    try {
      const encodedPayload = decodeURIComponent(atobPolyfill(token2.split(".")[1]).split("").map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(""));
      return JSON.parse(encodedPayload) || {};
    } catch (e) {
    }
  }
  return {};
}
function isTokenExpired(token2, expirationThreshold = 0) {
  let payload = getTokenPayload(token2);
  if (Object.keys(payload).length > 0 && (!payload.exp || payload.exp - expirationThreshold > Date.now() / 1e3)) {
    return false;
  }
  return true;
}
var defaultCookieKey = "pb_auth";
var BaseAuthStore = class {
  constructor() {
    this.baseToken = "";
    this.baseModel = null;
    this._onChangeCallbacks = [];
  }
  /**
   * Retrieves the stored token (if any).
   */
  get token() {
    return this.baseToken;
  }
  /**
   * Retrieves the stored model data (if any).
   */
  get record() {
    return this.baseModel;
  }
  /**
   * @deprecated use `record` instead.
   */
  get model() {
    return this.baseModel;
  }
  /**
   * Loosely checks if the store has valid token (aka. existing and unexpired exp claim).
   */
  get isValid() {
    return !isTokenExpired(this.token);
  }
  /**
   * Loosely checks whether the currently loaded store state is for superuser.
   *
   * Alternatively you can also compare directly `pb.authStore.record?.collectionName`.
   */
  get isSuperuser() {
    let payload = getTokenPayload(this.token);
    return payload.type == "auth" && (this.record?.collectionName == "_superusers" || // fallback in case the record field is not populated and assuming
    // that the collection crc32 checksum id wasn't manually changed
    !this.record?.collectionName && payload.collectionId == "pbc_3142635823");
  }
  /**
   * @deprecated use `isSuperuser` instead or simply check the record.collectionName property.
   */
  get isAdmin() {
    console.warn("Please replace pb.authStore.isAdmin with pb.authStore.isSuperuser OR simply check the value of pb.authStore.record?.collectionName");
    return this.isSuperuser;
  }
  /**
   * @deprecated use `!isSuperuser` instead or simply check the record.collectionName property.
   */
  get isAuthRecord() {
    console.warn("Please replace pb.authStore.isAuthRecord with !pb.authStore.isSuperuser OR simply check the value of pb.authStore.record?.collectionName");
    return getTokenPayload(this.token).type == "auth" && !this.isSuperuser;
  }
  /**
   * Saves the provided new token and model data in the auth store.
   */
  save(token2, record) {
    this.baseToken = token2 || "";
    this.baseModel = record || null;
    this.triggerChange();
  }
  /**
   * Removes the stored token and model data form the auth store.
   */
  clear() {
    this.baseToken = "";
    this.baseModel = null;
    this.triggerChange();
  }
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
  loadFromCookie(cookie2, key = defaultCookieKey) {
    const rawData = cookieParse(cookie2 || "")[key] || "";
    let data = {};
    try {
      data = JSON.parse(rawData);
      if (typeof data === null || typeof data !== "object" || Array.isArray(data)) {
        data = {};
      }
    } catch (_) {
    }
    this.save(data.token || "", data.record || data.model || null);
  }
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
  exportToCookie(options2, key = defaultCookieKey) {
    const defaultOptions = {
      secure: true,
      sameSite: true,
      httpOnly: true,
      path: "/"
    };
    const payload = getTokenPayload(this.token);
    if (payload?.exp) {
      defaultOptions.expires = new Date(payload.exp * 1e3);
    } else {
      defaultOptions.expires = /* @__PURE__ */ new Date("1970-01-01");
    }
    options2 = Object.assign({}, defaultOptions, options2);
    const rawData = {
      token: this.token,
      record: this.record ? JSON.parse(JSON.stringify(this.record)) : null
    };
    let result = cookieSerialize(key, JSON.stringify(rawData), options2);
    const resultLength = typeof Blob !== "undefined" ? new Blob([result]).size : result.length;
    if (rawData.record && resultLength > 4096) {
      rawData.record = { id: rawData.record?.id, email: rawData.record?.email };
      const extraProps = ["collectionId", "collectionName", "verified"];
      for (const prop in this.record) {
        if (extraProps.includes(prop)) {
          rawData.record[prop] = this.record[prop];
        }
      }
      result = cookieSerialize(key, JSON.stringify(rawData), options2);
    }
    return result;
  }
  /**
   * Register a callback function that will be called on store change.
   *
   * You can set the `fireImmediately` argument to true in order to invoke
   * the provided callback right after registration.
   *
   * Returns a removal function that you could call to "unsubscribe" from the changes.
   */
  onChange(callback, fireImmediately = false) {
    this._onChangeCallbacks.push(callback);
    if (fireImmediately) {
      callback(this.token, this.record);
    }
    return () => {
      for (let i = this._onChangeCallbacks.length - 1; i >= 0; i--) {
        if (this._onChangeCallbacks[i] == callback) {
          delete this._onChangeCallbacks[i];
          this._onChangeCallbacks.splice(i, 1);
          return;
        }
      }
    };
  }
  triggerChange() {
    for (const callback of this._onChangeCallbacks) {
      callback && callback(this.token, this.record);
    }
  }
};
var LocalAuthStore = class extends BaseAuthStore {
  constructor(storageKey = "pocketbase_auth") {
    super();
    this.storageFallback = {};
    this.storageKey = storageKey;
    this._bindStorageEvent();
  }
  /**
   * @inheritdoc
   */
  get token() {
    const data = this._storageGet(this.storageKey) || {};
    return data.token || "";
  }
  /**
   * @inheritdoc
   */
  get record() {
    const data = this._storageGet(this.storageKey) || {};
    return data.record || data.model || null;
  }
  /**
   * @deprecated use `record` instead.
   */
  get model() {
    return this.record;
  }
  /**
   * @inheritdoc
   */
  save(token2, record) {
    this._storageSet(this.storageKey, {
      token: token2,
      record
    });
    super.save(token2, record);
  }
  /**
   * @inheritdoc
   */
  clear() {
    this._storageRemove(this.storageKey);
    super.clear();
  }
  // ---------------------------------------------------------------
  // Internal helpers:
  // ---------------------------------------------------------------
  /**
   * Retrieves `key` from the browser's local storage
   * (or runtime/memory if local storage is undefined).
   */
  _storageGet(key) {
    if (typeof window !== "undefined" && window?.localStorage) {
      const rawValue = window.localStorage.getItem(key) || "";
      try {
        return JSON.parse(rawValue);
      } catch (e) {
        return rawValue;
      }
    }
    return this.storageFallback[key];
  }
  /**
   * Stores a new data in the browser's local storage
   * (or runtime/memory if local storage is undefined).
   */
  _storageSet(key, value) {
    if (typeof window !== "undefined" && window?.localStorage) {
      let normalizedVal = value;
      if (typeof value !== "string") {
        normalizedVal = JSON.stringify(value);
      }
      window.localStorage.setItem(key, normalizedVal);
    } else {
      this.storageFallback[key] = value;
    }
  }
  /**
   * Removes `key` from the browser's local storage and the runtime/memory.
   */
  _storageRemove(key) {
    if (typeof window !== "undefined" && window?.localStorage) {
      window.localStorage?.removeItem(key);
    }
    delete this.storageFallback[key];
  }
  /**
   * Updates the current store state on localStorage change.
   */
  _bindStorageEvent() {
    if (typeof window === "undefined" || !window?.localStorage || !window.addEventListener) {
      return;
    }
    window.addEventListener("storage", (e) => {
      if (e.key != this.storageKey) {
        return;
      }
      const data = this._storageGet(this.storageKey) || {};
      super.save(data.token || "", data.record || data.model || null);
    });
  }
};
var BaseService = class {
  constructor(client) {
    this.client = client;
  }
};
var SettingsService = class extends BaseService {
  /**
   * Fetch all available app settings.
   *
   * @throws {ClientResponseError}
   */
  getAll(options2) {
    options2 = Object.assign({
      method: "GET"
    }, options2);
    return this.client.send("/api/settings", options2);
  }
  /**
   * Bulk updates app settings.
   *
   * @throws {ClientResponseError}
   */
  update(bodyParams, options2) {
    options2 = Object.assign({
      method: "PATCH",
      body: bodyParams
    }, options2);
    return this.client.send("/api/settings", options2);
  }
  /**
   * Performs a S3 filesystem connection test.
   *
   * The currently supported `filesystem` are "storage" and "backups".
   *
   * @throws {ClientResponseError}
   */
  testS3(filesystem = "storage", options2) {
    options2 = Object.assign({
      method: "POST",
      body: {
        filesystem
      }
    }, options2);
    this.client.send("/api/settings/test/s3", options2);
    return true;
  }
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
  testEmail(collectionIdOrName, toEmail, emailTemplate, options2) {
    options2 = Object.assign({
      method: "POST",
      body: {
        email: toEmail,
        template: emailTemplate,
        collection: collectionIdOrName
      }
    }, options2);
    this.client.send("/api/settings/test/email", options2);
    return true;
  }
  /**
   * Generates a new Apple OAuth2 client secret.
   *
   * @throws {ClientResponseError}
   */
  generateAppleClientSecret(clientId, teamId, keyId, privateKey, duration, options2) {
    options2 = Object.assign({
      method: "POST",
      body: {
        clientId,
        teamId,
        keyId,
        privateKey,
        duration
      }
    }, options2);
    return this.client.send("/api/settings/apple/generate-client-secret", options2);
  }
};
var CrudService = class extends BaseService {
  /**
   * Response data decoder.
   */
  decode(data) {
    return data;
  }
  getFullList(batchOrqueryParams, options2) {
    if (typeof batchOrqueryParams == "number") {
      return this._getFullList(batchOrqueryParams, options2);
    }
    options2 = Object.assign({}, batchOrqueryParams, options2);
    let batch = 500;
    if (options2.batch) {
      batch = options2.batch;
      delete options2.batch;
    }
    return this._getFullList(batch, options2);
  }
  /**
   * Returns paginated items list.
   *
   * You can use the generic T to supply a wrapper type of the crud model.
   *
   * @throws {ClientResponseError}
   */
  getList(page = 1, perPage = 30, options2) {
    options2 = Object.assign({
      method: "GET"
    }, options2);
    options2.query = Object.assign({
      page,
      perPage
    }, options2.query);
    const responseData = this.client.send(this.baseCrudPath, options2);
    responseData.items = responseData.items?.map((item) => {
      return this.decode(item);
    }) || [];
    return responseData;
  }
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
  getFirstListItem(filter, options2) {
    options2 = Object.assign({
      requestKey: "one_by_filter_" + this.baseCrudPath + "_" + filter
    }, options2);
    options2.query = Object.assign({
      filter,
      skipTotal: 1
    }, options2.query);
    const result = this.getList(1, 1, options2);
    if (!result?.items?.length) {
      throw new ClientResponseError({
        status: 404,
        response: {
          code: 404,
          message: "The requested resource wasn't found.",
          data: {}
        }
      });
    }
    return result.items[0];
  }
  /**
   * Returns single item by its id.
   *
   * You can use the generic T to supply a wrapper type of the crud model.
   *
   * If `id` is empty it will throw a 404 error.
   *
   * @throws {ClientResponseError}
   */
  getOne(id, options2) {
    if (!id) {
      throw new ClientResponseError({
        url: this.client.buildURL(this.baseCrudPath + "/"),
        status: 404,
        response: {
          code: 404,
          message: "Missing required record id.",
          data: {}
        }
      });
    }
    options2 = Object.assign({
      method: "GET"
    }, options2);
    const responseData = this.client.send(this.baseCrudPath + "/" + encodeURIComponent(id), options2);
    return this.decode(responseData);
  }
  /**
   * Creates a new item.
   *
   * You can use the generic T to supply a wrapper type of the crud model.
   *
   * @throws {ClientResponseError}
   */
  create(bodyParams, options2) {
    options2 = Object.assign({
      method: "POST",
      body: bodyParams
    }, options2);
    const responseData = this.client.send(this.baseCrudPath, options2);
    return this.decode(responseData);
  }
  /**
   * Updates an existing item by its id.
   *
   * You can use the generic T to supply a wrapper type of the crud model.
   *
   * @throws {ClientResponseError}
   */
  update(id, bodyParams, options2) {
    options2 = Object.assign({
      method: "PATCH",
      body: bodyParams
    }, options2);
    const responseData = this.client.send(this.baseCrudPath + "/" + encodeURIComponent(id), options2);
    return this.decode(responseData);
  }
  /**
   * Deletes an existing item by its id.
   *
   * @throws {ClientResponseError}
   */
  delete(id, options2) {
    options2 = Object.assign({
      method: "DELETE"
    }, options2);
    const responseData = this.client.send(this.baseCrudPath + "/" + encodeURIComponent(id), options2);
    return responseData;
  }
  /**
   * Returns a promise with all list items batch fetched at once.
   */
  _getFullList(batchSize = 500, options2) {
    options2 = options2 || {};
    options2.query = Object.assign({
      skipTotal: 1
    }, options2.query);
    let result = [];
    let request = (page) => {
      const list2 = this.getList(page, batchSize || 500, options2);
      const castedList = list2;
      const items = castedList.items;
      result = result.concat(items);
      if (items.length == list2.perPage) {
        return request(page + 1);
      }
      return result;
    };
    return request(1);
  }
};
function normalizeLegacyOptionsArgs(legacyWarn, baseOptions, bodyOrOptions, query) {
  const hasBodyOrOptions = typeof bodyOrOptions !== "undefined";
  const hasQuery = typeof query !== "undefined";
  if (!hasQuery && !hasBodyOrOptions) {
    return baseOptions;
  }
  if (hasQuery) {
    console.warn(legacyWarn);
    baseOptions.body = Object.assign({}, baseOptions.body, bodyOrOptions);
    baseOptions.query = Object.assign({}, baseOptions.query, query);
    return baseOptions;
  }
  return Object.assign(baseOptions, bodyOrOptions);
}
var RecordService = class extends CrudService {
  constructor(client, collectionIdOrName) {
    super(client);
    this.collectionIdOrName = collectionIdOrName;
  }
  /**
   * @inheritdoc
   */
  get baseCrudPath() {
    return this.baseCollectionPath + "/records";
  }
  /**
   * Returns the current collection service base path.
   */
  get baseCollectionPath() {
    return "/api/collections/" + encodeURIComponent(this.collectionIdOrName);
  }
  /**
   * Returns whether the current service collection is superusers.
   */
  get isSuperusers() {
    return this.collectionIdOrName == "_superusers" || this.collectionIdOrName == "_pbc_2773867675";
  }
  /**
   * @inheritdoc
   */
  getFullList(batchOrOptions, options2) {
    if (typeof batchOrOptions == "number") {
      return super.getFullList(batchOrOptions, options2);
    }
    const params = Object.assign({}, batchOrOptions, options2);
    return super.getFullList(params);
  }
  /**
   * @inheritdoc
   */
  getList(page = 1, perPage = 30, options2) {
    return super.getList(page, perPage, options2);
  }
  /**
   * @inheritdoc
   */
  getFirstListItem(filter, options2) {
    return super.getFirstListItem(filter, options2);
  }
  /**
   * @inheritdoc
   */
  getOne(id, options2) {
    return super.getOne(id, options2);
  }
  /**
   * @inheritdoc
   */
  create(bodyParams, options2) {
    return super.create(bodyParams, options2);
  }
  /**
   * @inheritdoc
   *
   * If the current `client.authStore.record` matches with the updated id, then
   * on success the `client.authStore.record` will be updated with the new response record fields.
   */
  update(id, bodyParams, options2) {
    const item = super.update(id, bodyParams, options2);
    if (
      // is record auth
      this.client.authStore.record?.id === item?.id && (this.client.authStore.record?.collectionId === this.collectionIdOrName || this.client.authStore.record?.collectionName === this.collectionIdOrName)
    ) {
      let authExpand = Object.assign({}, this.client.authStore.record.expand);
      let authRecord = Object.assign({}, this.client.authStore.record, item);
      if (authExpand) {
        authRecord.expand = Object.assign(authExpand, item.expand);
      }
      this.client.authStore.save(this.client.authStore.token, authRecord);
    }
    return item;
  }
  /**
   * @inheritdoc
   *
   * If the current `client.authStore.record` matches with the deleted id,
   * then on success the `client.authStore` will be cleared.
   */
  delete(id, options2) {
    const success = super.delete(id, options2);
    if (success && // is record auth
    this.client.authStore.record?.id === id && (this.client.authStore.record?.collectionId === this.collectionIdOrName || this.client.authStore.record?.collectionName === this.collectionIdOrName)) {
      this.client.authStore.clear();
    }
    return success;
  }
  // ---------------------------------------------------------------
  // Auth handlers
  // ---------------------------------------------------------------
  /**
   * Prepare successful collection authorization response.
   */
  authResponse(responseData) {
    const record = this.decode(responseData?.record || {});
    this.client.authStore.save(responseData?.token, record);
    return Object.assign({}, responseData, {
      // normalize common fields
      token: responseData?.token || "",
      record
    });
  }
  /**
   * Returns all available collection auth methods.
   *
   * @throws {ClientResponseError}
   */
  listAuthMethods(options2) {
    options2 = Object.assign({
      method: "GET",
      // @todo remove after deleting the pre v0.23 API response fields
      fields: "mfa,otp,password,oauth2"
    }, options2);
    return this.client.send(this.baseCollectionPath + "/auth-methods", options2);
  }
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
  authWithPassword(usernameOrEmail, password, options2) {
    options2 = Object.assign({
      method: "POST",
      body: {
        identity: usernameOrEmail,
        password
      }
    }, options2);
    let authData = this.client.send(this.baseCollectionPath + "/auth-with-password", options2);
    authData = this.authResponse(authData);
    return authData;
  }
  authWithOAuth2Code(provider, code, codeVerifier, redirectURL, createData, bodyOrOptions, query) {
    let options2 = {
      method: "POST",
      body: {
        provider,
        code,
        codeVerifier,
        redirectURL,
        createData
      }
    };
    options2 = normalizeLegacyOptionsArgs("This form of authWithOAuth2Code(provider, code, codeVerifier, redirectURL, createData?, body?, query?) is deprecated. Consider replacing it with authWithOAuth2Code(provider, code, codeVerifier, redirectURL, createData?, options?).", options2, bodyOrOptions, query);
    const data = this.client.send(this.baseCollectionPath + "/auth-with-oauth2", options2);
    return this.authResponse(data);
  }
  authRefresh(bodyOrOptions, query) {
    let options2 = {
      method: "POST"
    };
    options2 = normalizeLegacyOptionsArgs("This form of authRefresh(body?, query?) is deprecated. Consider replacing it with authRefresh(options?).", options2, bodyOrOptions, query);
    const data = this.client.send(this.baseCollectionPath + "/auth-refresh", options2);
    return this.authResponse(data);
  }
  requestPasswordReset(email, bodyOrOptions, query) {
    let options2 = {
      method: "POST",
      body: {
        email
      }
    };
    options2 = normalizeLegacyOptionsArgs("This form of requestPasswordReset(email, body?, query?) is deprecated. Consider replacing it with requestPasswordReset(email, options?).", options2, bodyOrOptions, query);
    this.client.send(this.baseCollectionPath + "/request-password-reset", options2);
    return true;
  }
  confirmPasswordReset(passwordResetToken, password, passwordConfirm, bodyOrOptions, query) {
    let options2 = {
      method: "POST",
      body: {
        token: passwordResetToken,
        password,
        passwordConfirm
      }
    };
    options2 = normalizeLegacyOptionsArgs("This form of confirmPasswordReset(token, password, passwordConfirm, body?, query?) is deprecated. Consider replacing it with confirmPasswordReset(token, password, passwordConfirm, options?).", options2, bodyOrOptions, query);
    this.client.send(this.baseCollectionPath + "/confirm-password-reset", options2);
    return true;
  }
  requestVerification(email, bodyOrOptions, query) {
    let options2 = {
      method: "POST",
      body: {
        email
      }
    };
    options2 = normalizeLegacyOptionsArgs("This form of requestVerification(email, body?, query?) is deprecated. Consider replacing it with requestVerification(email, options?).", options2, bodyOrOptions, query);
    this.client.send(this.baseCollectionPath + "/request-verification", options2);
    return true;
  }
  confirmVerification(verificationToken, bodyOrOptions, query) {
    let options2 = {
      method: "POST",
      body: {
        token: verificationToken
      }
    };
    options2 = normalizeLegacyOptionsArgs("This form of confirmVerification(token, body?, query?) is deprecated. Consider replacing it with confirmVerification(token, options?).", options2, bodyOrOptions, query);
    this.client.send(this.baseCollectionPath + "/confirm-verification", options2);
    const payload = getTokenPayload(verificationToken);
    const model = this.client.authStore.record;
    if (model && !model.verified && model.id === payload.id && model.collectionId === payload.collectionId) {
      model.verified = true;
      this.client.authStore.save(this.client.authStore.token, model);
    }
    return true;
  }
  requestEmailChange(newEmail, bodyOrOptions, query) {
    let options2 = {
      method: "POST",
      body: {
        newEmail
      }
    };
    options2 = normalizeLegacyOptionsArgs("This form of requestEmailChange(newEmail, body?, query?) is deprecated. Consider replacing it with requestEmailChange(newEmail, options?).", options2, bodyOrOptions, query);
    this.client.send(this.baseCollectionPath + "/request-email-change", options2);
    return true;
  }
  confirmEmailChange(emailChangeToken, password, bodyOrOptions, query) {
    let options2 = {
      method: "POST",
      body: {
        token: emailChangeToken,
        password
      }
    };
    options2 = normalizeLegacyOptionsArgs("This form of confirmEmailChange(token, password, body?, query?) is deprecated. Consider replacing it with confirmEmailChange(token, password, options?).", options2, bodyOrOptions, query);
    this.client.send(this.baseCollectionPath + "/confirm-email-change", options2);
    const payload = getTokenPayload(emailChangeToken);
    const model = this.client.authStore.record;
    if (model && model.id === payload.id && model.collectionId === payload.collectionId) {
      this.client.authStore.clear();
    }
    return true;
  }
  /**
   * Sends auth record OTP to the provided email.
   *
   * @throws {ClientResponseError}
   */
  requestOTP(email, options2) {
    options2 = Object.assign({
      method: "POST",
      body: { email }
    }, options2);
    return this.client.send(this.baseCollectionPath + "/request-otp", options2);
  }
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
  authWithOTP(otpId, password, options2) {
    options2 = Object.assign({
      method: "POST",
      body: { otpId, password }
    }, options2);
    const data = this.client.send(this.baseCollectionPath + "/auth-with-otp", options2);
    return this.authResponse(data);
  }
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
  impersonate(recordId, duration, options2) {
    options2 = Object.assign({
      method: "POST",
      body: { duration }
    }, options2);
    options2.headers = options2.headers || {};
    if (!options2.headers.Authorization) {
      options2.headers.Authorization = this.client.authStore.token;
    }
    const client = new Client(this.client.baseURL, new BaseAuthStore(), this.client.lang);
    const authData = client.send(this.baseCollectionPath + "/impersonate/" + encodeURIComponent(recordId), options2);
    client.authStore.save(authData?.token, this.decode(authData?.record || {}));
    return client;
  }
};
var CollectionService = class extends CrudService {
  /**
   * @inheritdoc
   */
  get baseCrudPath() {
    return "/api/collections";
  }
  /**
   * Imports the provided collections.
   *
   * If `deleteMissing` is `true`, all local collections and their fields,
   * that are not present in the imported configuration, WILL BE DELETED
   * (including their related records data)!
   *
   * @throws {ClientResponseError}
   */
  import(collections, deleteMissing = false, options2) {
    options2 = Object.assign({
      method: "PUT",
      body: {
        collections,
        deleteMissing
      }
    }, options2);
    this.client.send(this.baseCrudPath + "/import", options2);
    return true;
  }
  /**
   * Returns type indexed map with scaffolded collection models
   * populated with their default field values.
   *
   * @throws {ClientResponseError}
   */
  getScaffolds(options2) {
    options2 = Object.assign({
      method: "GET"
    }, options2);
    return this.client.send(this.baseCrudPath + "/meta/scaffolds", options2);
  }
  /**
   * Deletes all records associated with the specified collection.
   *
   * @throws {ClientResponseError}
   */
  truncate(collectionIdOrName, options2) {
    options2 = Object.assign({
      method: "DELETE"
    }, options2);
    this.client.send(this.baseCrudPath + "/" + encodeURIComponent(collectionIdOrName) + "/truncate", options2);
    return true;
  }
};
var LogService = class extends BaseService {
  /**
   * Returns paginated logs list.
   *
   * @throws {ClientResponseError}
   */
  getList(page = 1, perPage = 30, options2) {
    options2 = Object.assign({ method: "GET" }, options2);
    options2.query = Object.assign({
      page,
      perPage
    }, options2.query);
    return this.client.send("/api/logs", options2);
  }
  /**
   * Returns a single log by its id.
   *
   * If `id` is empty it will throw a 404 error.
   *
   * @throws {ClientResponseError}
   */
  getOne(id, options2) {
    if (!id) {
      throw new ClientResponseError({
        url: this.client.buildURL("/api/logs/"),
        status: 404,
        response: {
          code: 404,
          message: "Missing required log id.",
          data: {}
        }
      });
    }
    options2 = Object.assign({
      method: "GET"
    }, options2);
    return this.client.send("/api/logs/" + encodeURIComponent(id), options2);
  }
  /**
   * Returns logs statistics.
   *
   * @throws {ClientResponseError}
   */
  getStats(options2) {
    options2 = Object.assign({
      method: "GET"
    }, options2);
    return this.client.send("/api/logs/stats", options2);
  }
};
var HealthService = class extends BaseService {
  /**
   * Checks the health status of the api.
   *
   * @throws {ClientResponseError}
   */
  check(options2) {
    options2 = Object.assign({
      method: "GET"
    }, options2);
    return this.client.send("/api/health", options2);
  }
};
var FileService = class extends BaseService {
  /**
   * @deprecated Please replace with `pb.files.getURL()`.
   */
  getUrl(record, filename, queryParams = {}) {
    console.warn("Please replace pb.files.getUrl() with pb.files.getURL()");
    return this.getURL(record, filename, queryParams);
  }
  /**
   * Builds and returns an absolute record file url for the provided filename.
   */
  getURL(record, filename, queryParams = {}) {
    if (!filename || !record?.id || !(record?.collectionId || record?.collectionName)) {
      return "";
    }
    const parts = [];
    parts.push("api");
    parts.push("files");
    parts.push(encodeURIComponent(record.collectionId || record.collectionName));
    parts.push(encodeURIComponent(record.id));
    parts.push(encodeURIComponent(filename));
    let result = this.client.buildURL(parts.join("/"));
    if (Object.keys(queryParams).length) {
      if (queryParams.download === false) {
        delete queryParams.download;
      }
      const params = new URLSearchParams(queryParams);
      result += (result.includes("?") ? "&" : "?") + params;
    }
    return result;
  }
  /**
   * Requests a new private file access token for the current auth model.
   *
   * @throws {ClientResponseError}
   */
  getToken(options2) {
    options2 = Object.assign({
      method: "POST"
    }, options2);
    const data = this.client.send("/api/files/token", options2);
    return data?.token || "";
  }
};
var BackupService = class extends BaseService {
  /**
   * Returns list with all available backup files.
   *
   * @throws {ClientResponseError}
   */
  getFullList(options2) {
    options2 = Object.assign({
      method: "GET"
    }, options2);
    return this.client.send("/api/backups", options2);
  }
  /**
   * Initializes a new backup.
   *
   * @throws {ClientResponseError}
   */
  create(basename, options2) {
    options2 = Object.assign({
      method: "POST",
      body: {
        name: basename
      }
    }, options2);
    this.client.send("/api/backups", options2);
    return true;
  }
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
  upload(bodyParams, options2) {
    options2 = Object.assign({
      method: "POST",
      body: bodyParams
    }, options2);
    this.client.send("/api/backups/upload", options2);
    return true;
  }
  /**
   * Deletes a single backup file.
   *
   * @throws {ClientResponseError}
   */
  delete(key, options2) {
    options2 = Object.assign({
      method: "DELETE"
    }, options2);
    this.client.send(`/api/backups/${encodeURIComponent(key)}`, options2);
    return true;
  }
  /**
   * Initializes an app data restore from an existing backup.
   *
   * @throws {ClientResponseError}
   */
  restore(key, options2) {
    options2 = Object.assign({
      method: "POST"
    }, options2);
    this.client.send(`/api/backups/${encodeURIComponent(key)}/restore`, options2);
    return true;
  }
  /**
   * Builds a download url for a single existing backup using a
   * superuser file token and the backup file key.
   *
   * The file token can be generated via `pb.files.getToken()`.
   */
  getDownloadURL(token2, key) {
    return this.client.buildURL(`/api/backups/${encodeURIComponent(key)}?token=${encodeURIComponent(token2)}`);
  }
};
var CronService = class extends BaseService {
  /**
   * Returns list with all registered cron jobs.
   *
   * @throws {ClientResponseError}
   */
  getFullList(options2) {
    options2 = Object.assign({
      method: "GET"
    }, options2);
    return this.client.send("/api/crons", options2);
  }
  /**
   * Runs the specified cron job.
   *
   * @throws {ClientResponseError}
   */
  run(jobId, options2) {
    options2 = Object.assign({
      method: "POST"
    }, options2);
    this.client.send(`/api/crons/${encodeURIComponent(jobId)}`, options2);
    return true;
  }
};
function isFile(val) {
  return typeof Blob !== "undefined" && val instanceof Blob || typeof File !== "undefined" && val instanceof File;
}
function isFormData(body) {
  return body && // we are checking the constructor name because FormData
  // is not available natively in some environments and the
  // polyfill(s) may not be globally accessible
  (body.constructor.name === "FormData" || // fallback to global FormData instance check
  // note: this is needed because the constructor.name could be different in case of
  //       custom global FormData implementation, eg. React Native on Android/iOS
  typeof FormData !== "undefined" && body instanceof FormData);
}
function hasFileField(body) {
  for (const key in body) {
    const values2 = Array.isArray(body[key]) ? body[key] : [body[key]];
    for (const v of values2) {
      if (isFile(v)) {
        return true;
      }
    }
  }
  return false;
}
function convertToFormDataIfNeeded(body) {
  if (typeof FormData === "undefined" || typeof body === "undefined" || typeof body !== "object" || body === null || isFormData(body) || !hasFileField(body)) {
    return body;
  }
  const form = new FormData();
  for (const key in body) {
    const val = body[key];
    if (typeof val === "object" && !hasFileField({ data: val })) {
      let payload = {};
      payload[key] = val;
      form.append("@jsonPayload", JSON.stringify(payload));
    } else {
      const normalizedVal = Array.isArray(val) ? val : [val];
      for (let v of normalizedVal) {
        form.append(key, v);
      }
    }
  }
  return form;
}
function convertFormDataToObject(formData) {
  let result = {};
  formData.forEach((v, k) => {
    if (k === "@jsonPayload" && typeof v == "string") {
      try {
        let parsed = JSON.parse(v);
        Object.assign(result, parsed);
      } catch (err) {
        console.warn("@jsonPayload error:", err);
      }
    } else {
      if (typeof result[k] !== "undefined") {
        if (!Array.isArray(result[k])) {
          result[k] = [result[k]];
        }
        result[k].push(inferFormDataValue(v));
      } else {
        result[k] = inferFormDataValue(v);
      }
    }
  });
  return result;
}
var inferNumberCharsRegex = /^[\-\.\d]+$/;
function inferFormDataValue(value) {
  if (typeof value != "string") {
    return value;
  }
  if (value == "true") {
    return true;
  }
  if (value == "false") {
    return false;
  }
  if ((value[0] === "-" || value[0] >= "0" && value[0] <= "9") && inferNumberCharsRegex.test(value)) {
    let num = +value;
    if ("" + num === value) {
      return num;
    }
  }
  return value;
}
var knownSendOptionsKeys = [
  "fetch",
  "headers",
  "body",
  "query",
  "params",
  // ---,
  "cache",
  "credentials",
  "headers",
  "integrity",
  "keepalive",
  "method",
  "mode",
  "redirect",
  "referrer",
  "referrerPolicy",
  "signal",
  "window"
];
function normalizeUnknownQueryParams(options2) {
  if (!options2) {
    return;
  }
  options2.query = options2.query || {};
  for (let key in options2) {
    if (knownSendOptionsKeys.includes(key)) {
      continue;
    }
    options2.query[key] = options2[key];
    delete options2[key];
  }
}
function serializeQueryParams(params) {
  const result = [];
  for (const key in params) {
    if (params[key] === null || typeof params[key] === "undefined") {
      continue;
    }
    const value = params[key];
    const encodedKey = encodeURIComponent(key);
    if (Array.isArray(value)) {
      for (const v of value) {
        result.push(encodedKey + "=" + encodeURIComponent(v));
      }
    } else if (value instanceof Date) {
      result.push(encodedKey + "=" + encodeURIComponent(value.toISOString()));
    } else if (typeof value !== null && typeof value === "object") {
      result.push(encodedKey + "=" + encodeURIComponent(JSON.stringify(value)));
    } else {
      result.push(encodedKey + "=" + encodeURIComponent(value));
    }
  }
  return result.join("&");
}
var BatchService = class extends BaseService {
  constructor() {
    super(...arguments);
    this.requests = [];
    this.subs = {};
  }
  /**
   * Starts constructing a batch request entry for the specified collection.
   */
  collection(collectionIdOrName) {
    if (!this.subs[collectionIdOrName]) {
      this.subs[collectionIdOrName] = new SubBatchService(this.requests, collectionIdOrName);
    }
    return this.subs[collectionIdOrName];
  }
  /**
   * Sends the batch requests.
   *
   * @throws {ClientResponseError}
   */
  send(options2) {
    const formData = new FormData();
    const jsonData = [];
    for (let i = 0; i < this.requests.length; i++) {
      const req = this.requests[i];
      jsonData.push({
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.json
      });
      if (req.files) {
        for (let key in req.files) {
          const files = req.files[key] || [];
          for (let file of files) {
            formData.append("requests." + i + "." + key, file);
          }
        }
      }
    }
    formData.append("@jsonPayload", JSON.stringify({ requests: jsonData }));
    options2 = Object.assign({
      method: "POST",
      body: formData
    }, options2);
    return this.client.send("/api/batch", options2);
  }
};
var SubBatchService = class {
  constructor(requests, collectionIdOrName) {
    this.requests = [];
    this.requests = requests;
    this.collectionIdOrName = collectionIdOrName;
  }
  /**
   * Registers a record upsert request into the current batch queue.
   *
   * The request will be executed as update if `bodyParams` have a valid existing record `id` value, otherwise - create.
   */
  upsert(bodyParams, options2) {
    options2 = Object.assign({
      body: bodyParams || {}
    }, options2);
    const request = {
      method: "PUT",
      url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records"
    };
    this.prepareRequest(request, options2);
    this.requests.push(request);
  }
  /**
   * Registers a record create request into the current batch queue.
   */
  create(bodyParams, options2) {
    options2 = Object.assign({
      body: bodyParams || {}
    }, options2);
    const request = {
      method: "POST",
      url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records"
    };
    this.prepareRequest(request, options2);
    this.requests.push(request);
  }
  /**
   * Registers a record update request into the current batch queue.
   */
  update(id, bodyParams, options2) {
    options2 = Object.assign({
      body: bodyParams || {}
    }, options2);
    const request = {
      method: "PATCH",
      url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records/" + encodeURIComponent(id)
    };
    this.prepareRequest(request, options2);
    this.requests.push(request);
  }
  /**
   * Registers a record delete request into the current batch queue.
   */
  delete(id, options2) {
    options2 = Object.assign({}, options2);
    const request = {
      method: "DELETE",
      url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records/" + encodeURIComponent(id)
    };
    this.prepareRequest(request, options2);
    this.requests.push(request);
  }
  prepareRequest(request, options2) {
    normalizeUnknownQueryParams(options2);
    request.headers = options2.headers;
    request.json = {};
    request.files = {};
    if (typeof options2.query !== "undefined") {
      const query = serializeQueryParams(options2.query);
      if (query) {
        request.url += (request.url.includes("?") ? "&" : "?") + query;
      }
    }
    let body = options2.body;
    if (isFormData(body)) {
      body = convertFormDataToObject(body);
    }
    for (const key in body) {
      const val = body[key];
      if (isFile(val)) {
        request.files[key] = request.files[key] || [];
        request.files[key].push(val);
      } else if (Array.isArray(val)) {
        const foundFiles = [];
        const foundRegular = [];
        for (const v of val) {
          if (isFile(v)) {
            foundFiles.push(v);
          } else {
            foundRegular.push(v);
          }
        }
        if (foundFiles.length > 0 && foundFiles.length == val.length) {
          request.files[key] = request.files[key] || [];
          for (let file of foundFiles) {
            request.files[key].push(file);
          }
        } else {
          request.json[key] = foundRegular;
          if (foundFiles.length > 0) {
            let fileKey = key;
            if (!key.startsWith("+") && !key.endsWith("+")) {
              fileKey += "+";
            }
            request.files[fileKey] = request.files[fileKey] || [];
            for (let file of foundFiles) {
              request.files[fileKey].push(file);
            }
          }
        }
      } else {
        request.json[key] = val;
      }
    }
  }
};
var Client = class {
  /**
   * Legacy getter alias for baseURL.
   * @deprecated Please replace with baseURL.
   */
  get baseUrl() {
    return this.baseURL;
  }
  /**
   * Legacy setter alias for baseURL.
   * @deprecated Please replace with baseURL.
   */
  set baseUrl(v) {
    this.baseURL = v;
  }
  constructor(baseURL = "/", authStore, lang = "en-US") {
    this.recordServices = {};
    this.baseURL = baseURL;
    this.lang = lang;
    if (authStore) {
      this.authStore = authStore;
    } else if (typeof window != "undefined" && !!window.Deno) {
      this.authStore = new BaseAuthStore();
    } else {
      this.authStore = new LocalAuthStore();
    }
    this.collections = new CollectionService(this);
    this.files = new FileService(this);
    this.logs = new LogService(this);
    this.settings = new SettingsService(this);
    this.health = new HealthService(this);
    this.backups = new BackupService(this);
    this.crons = new CronService(this);
  }
  /**
   * @deprecated
   * With PocketBase v0.23.0 admins are converted to a regular auth
   * collection named "_superusers", aka. you can use directly collection("_superusers").
   */
  get admins() {
    return this.collection("_superusers");
  }
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
  createBatch() {
    return new BatchService(this);
  }
  /**
   * Returns the RecordService associated to the specified collection.
   */
  collection(idOrName) {
    if (!this.recordServices[idOrName]) {
      this.recordServices[idOrName] = new RecordService(this, idOrName);
    }
    return this.recordServices[idOrName];
  }
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
  filter(raw, params) {
    if (!params) {
      return raw;
    }
    for (let key in params) {
      let val = params[key];
      switch (typeof val) {
        case "boolean":
        case "number":
          val = "" + val;
          break;
        case "string":
          val = "'" + val.replace(/'/g, "\\'") + "'";
          break;
        default:
          if (val === null) {
            val = "null";
          } else if (val instanceof Date) {
            val = "'" + val.toISOString().replace("T", " ") + "'";
          } else {
            val = "'" + JSON.stringify(val).replace(/'/g, "\\'") + "'";
          }
      }
      raw = raw.replaceAll("{:" + key + "}", val);
    }
    return raw;
  }
  /**
   * @deprecated Please use `pb.files.getURL()`.
   */
  getFileUrl(record, filename, queryParams = {}) {
    console.warn("Please replace pb.getFileUrl() with pb.files.getURL()");
    return this.files.getURL(record, filename, queryParams);
  }
  /**
   * @deprecated Please use `pb.buildURL()`.
   */
  buildUrl(path3) {
    console.warn("Please replace pb.buildUrl() with pb.buildURL()");
    return this.buildURL(path3);
  }
  /**
   * Builds a full client url by safely concatenating the provided path.
   */
  buildURL(path3) {
    let url = this.baseURL;
    if (typeof window !== "undefined" && !!window.location && !url.startsWith("https://") && !url.startsWith("http://")) {
      url = window.location.origin?.endsWith("/") ? window.location.origin.substring(0, window.location.origin.length - 1) : window.location.origin || "";
      if (!this.baseURL.startsWith("/")) {
        url += window.location.pathname || "/";
        url += url.endsWith("/") ? "" : "/";
      }
      url += this.baseURL;
    }
    if (path3) {
      url += url.endsWith("/") ? "" : "/";
      url += path3.startsWith("/") ? path3.substring(1) : path3;
    }
    return url;
  }
  /**
   * Sends an api http request.
   *
   * @throws {ClientResponseError}
   */
  send(path3, options2) {
    options2 = this.initSendOptions(path3, options2);
    let url = this.buildURL(path3);
    if (this.beforeSend) {
      const result = Object.assign({}, this.beforeSend(url, options2));
      if (typeof result.url !== "undefined" || typeof result.options !== "undefined") {
        url = result.url || url;
        options2 = result.options || options2;
      } else if (Object.keys(result).length) {
        options2 = result;
        console?.warn && console.warn("Deprecated format of beforeSend return: please use `return { url, options }`, instead of `return options`.");
      }
    }
    if (typeof options2.query !== "undefined") {
      const query = serializeQueryParams(options2.query);
      if (query) {
        url += (url.includes("?") ? "&" : "?") + query;
      }
      delete options2.query;
    }
    if (this.getHeader(options2.headers, "Content-Type") == "application/json" && options2.body && typeof options2.body !== "string") {
      options2.body = JSON.stringify(options2.body);
    }
    const fetchFunc = options2.fetch || $http.send;
    try {
      const args = {
        url,
        method: options2.method,
        headers: options2.headers,
        body: options2.body
      };
      const response = fetchFunc(args);
      let data = {};
      try {
        data = response.json;
      } catch (_) {
      }
      if (this.afterSend) {
        data = this.afterSend(response, data, options2);
      }
      if (response.statusCode >= 400) {
        throw new ClientResponseError({
          url,
          status: response.statusCode,
          data
        });
      }
      return data;
    } catch (err) {
      throw new ClientResponseError(err);
    }
  }
  /**
   * Shallow copy the provided object and takes care to initialize
   * any options required to preserve the backward compatability.
   *
   * @param  {SendOptions} options
   * @return {SendOptions}
   */
  // @ts-ignore
  initSendOptions(path3, options2) {
    options2 = Object.assign({ method: "GET" }, options2);
    options2.body = convertToFormDataIfNeeded(options2.body);
    normalizeUnknownQueryParams(options2);
    if (this.getHeader(options2.headers, "Content-Type") === null && !isFormData(options2.body)) {
      options2.headers = Object.assign({}, options2.headers, {
        "Content-Type": "application/json"
      });
    }
    if (this.getHeader(options2.headers, "Accept-Language") === null) {
      options2.headers = Object.assign({}, options2.headers, {
        "Accept-Language": this.lang
      });
    }
    if (
      // has valid token
      this.authStore.token && // auth header is not explicitly set
      this.getHeader(options2.headers, "Authorization") === null
    ) {
      options2.headers = Object.assign({}, options2.headers, {
        Authorization: this.authStore.token
      });
    }
    return options2;
  }
  /**
   * Extracts the header with the provided name in case-insensitive manner.
   * Returns `null` if no header matching the name is found.
   */
  getHeader(headers, name) {
    headers = headers || {};
    name = name.toLowerCase();
    for (let key in headers) {
      if (key.toLowerCase() == name) {
        return headers[key];
      }
    }
    return null;
  }
};

// src/globalApi.ts
var log = __toESM(require_dist2());
var import_pocketbase_stringify2 = __toESM(require_dist());
var import_url_parse = __toESM(require_url_parse());

// src/lib/db.ts
init_cjs_shims();
var import_pocketbase_stringify = __toESM(require_dist());
var findRecordByFilter = (collection, options2, dao = $app.dao()) => {
  return findRecordsByFilter(collection, options2, dao)?.[0];
};
var findRecordsByFilter = (collection, options2, dao = $app.dao()) => {
  const { filter, sort, limit, offset, filterParams } = {
    filter: "1=1",
    sort: "",
    limit: 0,
    offset: 0,
    filterParams: {},
    ...options2
  };
  const records = dao.findRecordsByFilter(
    collection,
    filter,
    sort,
    limit,
    offset,
    filterParams
  );
  return JSON.parse((0, import_pocketbase_stringify.stringify)(records));
};

// src/globalApi.ts
var globalApi = {
  url: (path3) => (0, import_url_parse.default)(path3, true),
  stringify: import_pocketbase_stringify2.stringify,
  forEach,
  keys,
  values,
  merge,
  shuffle,
  pick,
  env: (key) => process.env[key] ?? "",
  findRecordByFilter,
  findRecordsByFilter,
  createUser: (email, password, options2) => {
    if (!email.trim()) {
      throw new Error("Email is required");
    }
    if (!password.trim()) {
      throw new Error("Password is required");
    }
    const pb = globalApi.pb();
    const user = pb.collection(options2?.collection ?? "users").create({
      email,
      password,
      passwordConfirm: password
    });
    if (options2?.sendVerificationEmail === void 0 || options2.sendVerificationEmail) {
      globalApi.requestVerification(email, options2);
    }
    return user;
  },
  createAnonymousUser: (options2) => {
    const email = `anonymous-${$security.randomStringWithAlphabet(
      10,
      "123456789"
    )}@example.com`;
    return {
      email,
      ...globalApi.createPaswordlessUser(email, {
        ...options2,
        sendVerificationEmail: false
      })
    };
  },
  createPaswordlessUser: (email, options2) => {
    const password = $security.randomStringWithAlphabet(40, "123456789");
    return { password, user: globalApi.createUser(email, password, options2) };
  },
  requestVerification: (email, options2) => {
    const pb = globalApi.pb();
    pb.collection(options2?.collection ?? "users").requestVerification(email);
  },
  pb: /* @__PURE__ */ (() => {
    let pb = null;
    return () => {
      if (pb) return pb;
      const { config } = $app.store().get(`pocketpages`);
      const { host } = config;
      pb = new Client(host);
      return pb;
    };
  })(),
  confirmVerification: (token2, options2) => {
    const pb = globalApi.pb();
    pb.collection(options2?.collection ?? "users").confirmVerification(token2);
  },
  requestOTP: (email, options2) => {
    const pb = globalApi.pb();
    try {
      const { user, password } = globalApi.createPaswordlessUser(email, options2);
    } catch (e) {
    }
    const res = pb.collection(options2?.collection ?? "users").requestOTP(email);
    return res;
  },
  ...log
};

// src/lib/AfterBootstrapHandler.ts
init_cjs_shims();
var import_pocketbase_log = __toESM(require_dist2());
var import_pocketbase_node2 = __toESM(require_dist3());

// src/lib/debug.ts
init_cjs_shims();
var log2 = __toESM(require_dist2());
var dbg2 = (...args) => {
  const dbgVal = $app.store().get("__pocketpages_debug");
  if (!dbgVal) return;
  return log2.dbg(...args);
};

// src/lib/helpers.ts
init_cjs_shims();
var import_pocketbase_node = __toESM(require_dist3());
var import_pocketbase_stringify3 = __toESM(require_dist());
var pagesRoot = $filepath.join(__hooks, `pages`);
var SAFE_HEADER = `if (typeof module === 'undefined') { module = { exports: {} } };`;
var exts = ["", ".js", ".json"];
var moduleExists = (path3) => {
  for (let i = 0; i < exts.length; i++) {
    if (import_pocketbase_node.fs.existsSync(path3 + exts[i])) {
      return true;
    }
  }
  return false;
};
var simulateRequire = (path3) => {
  for (let i = 0; i < exts.length; i++) {
    try {
      return import_pocketbase_node.fs.readFileSync(path3 + exts[i], "utf-8");
    } catch (e) {
      continue;
    }
  }
  throw new Error(`No module '${path3}' found`);
};
var NotFoundError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
};
var mkResolve = (rootPath) => (path3, options2) => {
  const _require = (path4) => {
    if (!moduleExists(path4)) {
      throw new NotFoundError(`No module '${path4}' found`);
    }
    switch (options2?.mode || "require") {
      case "raw":
        return simulateRequire(path4);
      case "require":
        return require(path4);
      case "script":
        return `<script>
${SAFE_HEADER}
${simulateRequire(path4)}
</script>`;
      case "style":
        return `<style>
${simulateRequire(path4)}
</style>`;
    }
  };
  if (path3.startsWith("/")) {
    const finalPath = $filepath.join(pagesRoot, "_private", path3);
    try {
      return _require(finalPath);
    } catch (e) {
      throw new Error(`No module '${finalPath}' found`);
    }
  }
  let currentPath = rootPath;
  while (currentPath.length >= pagesRoot.length) {
    try {
      const finalPath = $filepath.join(currentPath, "_private", path3);
      return _require(finalPath);
    } catch (e) {
      const errorMsg = `${e}`;
      if (!(e instanceof NotFoundError)) {
        throw e;
      }
      if (currentPath === pagesRoot) {
        throw new Error(
          `No module '${path3}' found in _private directories from ${rootPath} up to ${pagesRoot}`
        );
      }
      currentPath = $filepath.dir(currentPath);
    }
  }
  throw new Error(`Unreachable code reached`);
};
var mkMeta = () => {
  const metaData = {};
  return (key, value) => {
    if (value === void 0) {
      return metaData[key];
    }
    return metaData[key] = value;
  };
};
var echo = (...args) => {
  const result = args.map((arg) => {
    if (typeof arg === "function") {
      return arg.toString();
    } else if (typeof arg === "object") {
      return (0, import_pocketbase_stringify3.stringify)(arg);
    } else if (typeof arg === "number") {
      return arg.toString();
    }
    return `${arg}`;
  });
  return result.join(" ");
};

// src/lib/AfterBootstrapHandler.ts
var LOADER_METHODS = ["load", "get", "post", "put", "delete"];
var AfterBootstrapHandler = () => {
  (0, import_pocketbase_log.info)(`pocketpages startup`);
  if (!import_pocketbase_node2.fs.existsSync(pagesRoot)) {
    throw new Error(
      `${pagesRoot} must exist. Did you launch pocketbase with --dir or --hooksDir`
    );
  }
  const configPath = $filepath.join(pagesRoot, `+config.js`);
  const config = {
    preprocessorExts: [".ejs", ".md"],
    debug: false,
    host: "http://localhost:8090",
    boot: () => {
    },
    ...(() => {
      try {
        return require(configPath);
      } catch (e) {
        return {};
      }
    })()
  };
  if (config.debug) {
    $app.store().set("__pocketpages_debug", true);
  }
  config.boot(globalApi);
  const physicalFiles = [];
  $filepath.walkDir(pagesRoot, (path3, d, err) => {
    const isDir = d.isDir();
    if (isDir) {
      return;
    }
    physicalFiles.push(path3.slice(pagesRoot.length + 1));
  });
  dbg2({ physicalFiles });
  const addressableFiles = physicalFiles.filter((f) => {
    if ($filepath.base(f).startsWith("+")) {
      return false;
    }
    const pathParts = f.split("/");
    return !pathParts.some((part) => part === "_private");
  });
  dbg2({ addressableFiles });
  const routes = addressableFiles.map((relativePath) => {
    dbg2(`Examining route`, relativePath);
    const parts = relativePath.split("/").filter((p) => !p.startsWith(`(`));
    const absolutePath = $filepath.join(pagesRoot, relativePath);
    dbg2({ relativePath, absolutePath, parts });
    const content = toString($os.readFile(absolutePath));
    const contentSha = $security.sha256(content);
    const route = {
      relativePath,
      absolutePath,
      fingerprint: contentSha,
      assetPrefix: parts[parts.length - 2] ?? "",
      isMarkdown: relativePath.endsWith(".md"),
      shouldPreProcess: config.preprocessorExts.some(
        (ext) => relativePath.endsWith(ext)
      ),
      segments: parts.map((part) => {
        return {
          nodeName: part,
          paramName: part.match(/\[.*\]/) ? part.replace(/\[(.*)\].*$/g, "$1") : void 0
        };
      }),
      middlewares: [],
      layouts: [],
      loaders: {}
    };
    if (!route.shouldPreProcess) {
      return route;
    }
    {
      const pathParts = $filepath.dir(relativePath).split(`/`).filter((node) => node != ".").filter((p) => !!p);
      dbg2(`layout`, { pathParts }, $filepath.dir(relativePath));
      do {
        const maybeLayout = $filepath.join(
          pagesRoot,
          ...pathParts,
          `+layout.ejs`
        );
        dbg2({ pathParts, maybeLayout });
        if (import_pocketbase_node2.fs.existsSync(maybeLayout, "file")) {
          route.layouts.push(maybeLayout);
          dbg2(`layout found`);
        }
        if (pathParts.length === 0) {
          break;
        }
        pathParts.pop();
      } while (true);
    }
    {
      const pathParts = $filepath.dir(relativePath).split(`/`).filter((p) => !!p);
      const current = [pagesRoot];
      do {
        const maybeMiddleware = $filepath.join(...current, `+middleware.js`);
        if (import_pocketbase_node2.fs.existsSync(maybeMiddleware, "file")) {
          route.middlewares.push(maybeMiddleware);
        }
        if (pathParts.length === 0) {
          break;
        }
        current.push(pathParts.shift());
      } while (true);
    }
    {
      forEach(LOADER_METHODS, (method) => {
        const maybeLoad = $filepath.join(
          pagesRoot,
          $filepath.dir(route.relativePath),
          `+${method}.js`
        );
        if (import_pocketbase_node2.fs.existsSync(maybeLoad)) {
          route.loaders[method] = maybeLoad;
        }
      });
    }
    return route;
  }).filter((r) => r.segments.length > 0);
  dbg2({ routes });
  const cache = { routes, config };
  dbg2({ cache });
  $app.store().set(`pocketpages`, cache);
};

// src/lib/MiddlewareHandler.ts
init_cjs_shims();
var import_pocketbase_log2 = __toESM(require_dist2());
var import_url_parse2 = __toESM(require_url_parse());

// src/lib/ejs.ts
init_cjs_shims();
var import_pocketbase_ejs = __toESM(require_ejs());
var import_pocketbase_node3 = __toESM(require_dist3());
var import_pocketbase_stringify4 = __toESM(require_dist());

// src/lib/marked.ts
init_cjs_shims();
var import_front_matter = __toESM(require_front_matter());

// node_modules/marked/lib/marked.esm.js
init_cjs_shims();
function _getDefaults() {
  return {
    async: false,
    breaks: false,
    extensions: null,
    gfm: true,
    hooks: null,
    pedantic: false,
    renderer: null,
    silent: false,
    tokenizer: null,
    walkTokens: null
  };
}
var _defaults = _getDefaults();
function changeDefaults(newDefaults) {
  _defaults = newDefaults;
}
var escapeTest = /[&<>"']/;
var escapeReplace = new RegExp(escapeTest.source, "g");
var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape$1(html2, encode2) {
  if (encode2) {
    if (escapeTest.test(html2)) {
      return html2.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html2)) {
      return html2.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html2;
}
var caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
  let source = typeof regex === "string" ? regex : regex.source;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      let valSource = typeof val === "string" ? val : val.source;
      valSource = valSource.replace(caret, "$1");
      source = source.replace(name, valSource);
      return obj;
    },
    getRegex: () => {
      return new RegExp(source, opt);
    }
  };
  return obj;
}
function cleanUrl(href) {
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return href;
}
var noopTest = { exec: () => null };
function splitCells(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped = false;
    let curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (count) {
    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count)
        cells.push("");
    }
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  let level = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
function outputLink(cap, link2, raw, lexer2) {
  const href = link2.href;
  const title = link2.title ? escape$1(link2.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer2.state.inLink = true;
    const token2 = {
      type: "link",
      raw,
      href,
      title,
      text,
      tokens: lexer2.inlineTokens(text)
    };
    lexer2.state.inLink = false;
    return token2;
  }
  return {
    type: "image",
    raw,
    href,
    title,
    text: escape$1(text)
  };
}
function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
var _Tokenizer = class {
  options;
  rules;
  // set by the lexer
  lexer;
  // set by the lexer
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(/^(?: {1,4}| {0,3}\t)/gm, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "");
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
        text
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();
      if (/#$/.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: rtrim(cap[0], "\n")
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      let lines = rtrim(cap[0], "\n").split("\n");
      let raw = "";
      let text = "";
      const tokens = [];
      while (lines.length > 0) {
        let inBlockquote = false;
        const currentLines = [];
        let i;
        for (i = 0; i < lines.length; i++) {
          if (/^ {0,3}>/.test(lines[i])) {
            currentLines.push(lines[i]);
            inBlockquote = true;
          } else if (!inBlockquote) {
            currentLines.push(lines[i]);
          } else {
            break;
          }
        }
        lines = lines.slice(i);
        const currentRaw = currentLines.join("\n");
        const currentText = currentRaw.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, "\n    $1").replace(/^ {0,3}>[ \t]?/gm, "");
        raw = raw ? `${raw}
${currentRaw}` : currentRaw;
        text = text ? `${text}
${currentText}` : currentText;
        const top = this.lexer.state.top;
        this.lexer.state.top = true;
        this.lexer.blockTokens(currentText, tokens, true);
        this.lexer.state.top = top;
        if (lines.length === 0) {
          break;
        }
        const lastToken = tokens[tokens.length - 1];
        if (lastToken?.type === "code") {
          break;
        } else if (lastToken?.type === "blockquote") {
          const oldToken = lastToken;
          const newText = oldToken.raw + "\n" + lines.join("\n");
          const newToken = this.blockquote(newText);
          tokens[tokens.length - 1] = newToken;
          raw = raw.substring(0, raw.length - oldToken.raw.length) + newToken.raw;
          text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
          break;
        } else if (lastToken?.type === "list") {
          const oldToken = lastToken;
          const newText = oldToken.raw + "\n" + lines.join("\n");
          const newToken = this.list(newText);
          tokens[tokens.length - 1] = newToken;
          raw = raw.substring(0, raw.length - lastToken.raw.length) + newToken.raw;
          text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
          lines = newText.substring(tokens[tokens.length - 1].raw.length).split("\n");
          continue;
        }
      }
      return {
        type: "blockquote",
        raw,
        tokens,
        text
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list2 = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let endsWithBlankLine = false;
      while (src) {
        let endEarly = false;
        let raw = "";
        let itemContents = "";
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap[0];
        src = src.substring(raw.length);
        let line = cap[2].split("\n", 1)[0].replace(/^\t+/, (t) => " ".repeat(3 * t.length));
        let nextLine = src.split("\n", 1)[0];
        let blankLine = !line.trim();
        let indent = 0;
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimStart();
        } else if (blankLine) {
          indent = cap[1].length + 1;
        } else {
          indent = cap[2].search(/[^ ]/);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        if (blankLine && /^[ \t]*$/.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`);
          const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
          const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
          const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
          const htmlBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}<[a-z].*>`, "i");
          while (src) {
            const rawLine = src.split("\n", 1)[0];
            let nextLineWithoutTabs;
            nextLine = rawLine;
            if (this.options.pedantic) {
              nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
              nextLineWithoutTabs = nextLine;
            } else {
              nextLineWithoutTabs = nextLine.replace(/\t/g, "    ");
            }
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }
            if (headingBeginRegex.test(nextLine)) {
              break;
            }
            if (htmlBeginRegex.test(nextLine)) {
              break;
            }
            if (nextBulletRegex.test(nextLine)) {
              break;
            }
            if (hrRegex.test(nextLine)) {
              break;
            }
            if (nextLineWithoutTabs.search(/[^ ]/) >= indent || !nextLine.trim()) {
              itemContents += "\n" + nextLineWithoutTabs.slice(indent);
            } else {
              if (blankLine) {
                break;
              }
              if (line.replace(/\t/g, "    ").search(/[^ ]/) >= 4) {
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }
              itemContents += "\n" + nextLine;
            }
            if (!blankLine && !nextLine.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
            line = nextLineWithoutTabs.slice(indent);
          }
        }
        if (!list2.loose) {
          if (endsWithBlankLine) {
            list2.loose = true;
          } else if (/\n[ \t]*\n[ \t]*$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        let istask = null;
        let ischecked;
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list2.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents,
          tokens: []
        });
        list2.raw += raw;
      }
      list2.items[list2.items.length - 1].raw = list2.items[list2.items.length - 1].raw.trimEnd();
      list2.items[list2.items.length - 1].text = list2.items[list2.items.length - 1].text.trimEnd();
      list2.raw = list2.raw.trimEnd();
      for (let i = 0; i < list2.items.length; i++) {
        this.lexer.state.top = false;
        list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
        if (!list2.loose) {
          const spacers = list2.items[i].tokens.filter((t) => t.type === "space");
          const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t) => /\n.*\n/.test(t.raw));
          list2.loose = hasMultipleLineBreaks;
        }
      }
      if (list2.loose) {
        for (let i = 0; i < list2.items.length; i++) {
          list2.items[i].loose = true;
        }
      }
      return list2;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token2 = {
        type: "html",
        block: true,
        raw: cap[0],
        pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
        text: cap[0]
      };
      return token2;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      const tag2 = cap[1].toLowerCase().replace(/\s+/g, " ");
      const href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
      const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
      return {
        type: "def",
        tag: tag2,
        raw: cap[0],
        href,
        title
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (!cap) {
      return;
    }
    if (!/[:|]/.test(cap[2])) {
      return;
    }
    const headers = splitCells(cap[1]);
    const aligns = cap[2].replace(/^\||\| *$/g, "").split("|");
    const rows = cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : [];
    const item = {
      type: "table",
      raw: cap[0],
      header: [],
      align: [],
      rows: []
    };
    if (headers.length !== aligns.length) {
      return;
    }
    for (const align of aligns) {
      if (/^ *-+: *$/.test(align)) {
        item.align.push("right");
      } else if (/^ *:-+: *$/.test(align)) {
        item.align.push("center");
      } else if (/^ *:-+ *$/.test(align)) {
        item.align.push("left");
      } else {
        item.align.push(null);
      }
    }
    for (let i = 0; i < headers.length; i++) {
      item.header.push({
        text: headers[i],
        tokens: this.lexer.inline(headers[i]),
        header: true,
        align: item.align[i]
      });
    }
    for (const row of rows) {
      item.rows.push(splitCells(row, item.header.length).map((cell, i) => {
        return {
          text: cell,
          tokens: this.lexer.inline(cell),
          header: false,
          align: item.align[i]
        };
      }));
    }
    return item;
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: this.lexer.inline(cap[1])
      };
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
      return {
        type: "paragraph",
        raw: cap[0],
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: this.lexer.inline(cap[0])
      };
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: escape$1(cap[1])
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: false,
        text: cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link2 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link2) {
          href = link2[1];
          title = link2[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
        title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
      }, cap[0], this.lexer);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      const linkString = (cap[2] || cap[1]).replace(/\s+/g, " ");
      const link2 = links[linkString.toLowerCase()];
      if (!link2) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link2, cap[0], this.lexer);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrongLDelim.exec(src);
    if (!match)
      return;
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
      const lLength = [...match[0]].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim)
          continue;
        rLength = [...rDelim].length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        const lastCharLength = [...match[0]][0].length;
        const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
        if (Math.min(lLength, rLength) % 2) {
          const text2 = raw.slice(1, -1);
          return {
            type: "em",
            raw,
            text: text2,
            tokens: this.lexer.inlineTokens(text2)
          };
        }
        const text = raw.slice(2, -2);
        return {
          type: "strong",
          raw,
          text,
          tokens: this.lexer.inlineTokens(text)
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape$1(text, true);
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2])
      };
    }
  }
  autolink(src) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = escape$1(cap[1]);
        href = "mailto:" + text;
      } else {
        text = escape$1(cap[1]);
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  url(src) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === "@") {
        text = escape$1(cap[0]);
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? "";
        } while (prevCapZero !== cap[0]);
        text = escape$1(cap[0]);
        if (cap[1] === "www.") {
          href = "http://" + cap[0];
        } else {
          href = cap[0];
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  inlineText(src) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text;
      if (this.lexer.state.inRawBlock) {
        text = cap[0];
      } else {
        text = escape$1(cap[0]);
      }
      return {
        type: "text",
        raw: cap[0],
        text
      };
    }
  }
};
var newline = /^(?:[ \t]*(?:\n|$))+/;
var blockCode = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
var fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var bullet = /(?:[*+-]|\d{1,9}[.)])/;
var lheading = edit(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex();
var _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
var blockText = /^[^\n]+/;
var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
var def = edit(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
var _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var html = edit("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
var blockNormal = {
  blockquote,
  code: blockCode,
  def,
  fences,
  heading,
  hr,
  html,
  lheading,
  list,
  newline,
  paragraph,
  table: noopTest,
  text: blockText
};
var gfmTable = edit("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockGfm = {
  ...blockNormal,
  table: gfmTable,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
};
var blockPedantic = {
  ...blockNormal,
  html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
};
var escape2 = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var br = /^( {2,}|\\)\n(?!\s*$)/;
var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var _punctuation = "\\p{P}\\p{S}";
var punctuation = edit(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, _punctuation).getRegex();
var blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
var emStrongLDelim = edit(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, _punctuation).getRegex();
var emStrongRDelimAst = edit("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, _punctuation).getRegex();
var emStrongRDelimUnd = edit("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, _punctuation).getRegex();
var anyPunctuation = edit(/\\([punct])/, "gu").replace(/punct/g, _punctuation).getRegex();
var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
var tag = edit("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
var link = edit(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
var nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
var reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
var inlineNormal = {
  _backpedal: noopTest,
  // only used for GFM url
  anyPunctuation,
  autolink,
  blockSkip,
  br,
  code: inlineCode,
  del: noopTest,
  emStrongLDelim,
  emStrongRDelimAst,
  emStrongRDelimUnd,
  escape: escape2,
  link,
  nolink,
  punctuation,
  reflink,
  reflinkSearch,
  tag,
  text: inlineText,
  url: noopTest
};
var inlinePedantic = {
  ...inlineNormal,
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
};
var inlineGfm = {
  ...inlineNormal,
  escape: edit(escape2).replace("])", "~|])").getRegex(),
  url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
var inlineBreaks = {
  ...inlineGfm,
  br: edit(br).replace("{2,}", "*").getRegex(),
  text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
var block = {
  normal: blockNormal,
  gfm: blockGfm,
  pedantic: blockPedantic
};
var inline = {
  normal: inlineNormal,
  gfm: inlineGfm,
  breaks: inlineBreaks,
  pedantic: inlinePedantic
};
var _Lexer = class __Lexer {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(options2) {
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options2 || _defaults;
    this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block,
      inline
    };
  }
  /**
   * Static Lex Method
   */
  static lex(src, options2) {
    const lexer2 = new __Lexer(options2);
    return lexer2.lex(src);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(src, options2) {
    const lexer2 = new __Lexer(options2);
    return lexer2.inlineTokens(src);
  }
  /**
   * Preprocessing
   */
  lex(src) {
    src = src.replace(/\r\n|\r/g, "\n");
    this.blockTokens(src, this.tokens);
    for (let i = 0; i < this.inlineQueue.length; i++) {
      const next = this.inlineQueue[i];
      this.inlineTokens(next.src, next.tokens);
    }
    this.inlineQueue = [];
    return this.tokens;
  }
  blockTokens(src, tokens = [], lastParagraphClipped = false) {
    if (this.options.pedantic) {
      src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
    }
    let token2;
    let lastToken;
    let cutSrc;
    while (src) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token2 = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token2.raw.length);
          tokens.push(token2);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token2 = this.tokenizer.space(src)) {
        src = src.substring(token2.raw.length);
        if (token2.raw.length === 1 && tokens.length > 0) {
          tokens[tokens.length - 1].raw += "\n";
        } else {
          tokens.push(token2);
        }
        continue;
      }
      if (token2 = this.tokenizer.code(src)) {
        src = src.substring(token2.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token2.raw;
          lastToken.text += "\n" + token2.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token2);
        }
        continue;
      }
      if (token2 = this.tokenizer.fences(src)) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      if (token2 = this.tokenizer.heading(src)) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      if (token2 = this.tokenizer.hr(src)) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      if (token2 = this.tokenizer.blockquote(src)) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      if (token2 = this.tokenizer.list(src)) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      if (token2 = this.tokenizer.html(src)) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      if (token2 = this.tokenizer.def(src)) {
        src = src.substring(token2.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token2.raw;
          lastToken.text += "\n" + token2.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token2.tag]) {
          this.tokens.links[token2.tag] = {
            href: token2.href,
            title: token2.title
          };
        }
        continue;
      }
      if (token2 = this.tokenizer.table(src)) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      if (token2 = this.tokenizer.lheading(src)) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token2 = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken?.type === "paragraph") {
          lastToken.raw += "\n" + token2.raw;
          lastToken.text += "\n" + token2.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token2);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token2.raw.length);
        continue;
      }
      if (token2 = this.tokenizer.text(src)) {
        src = src.substring(token2.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token2.raw;
          lastToken.text += "\n" + token2.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token2);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens = []) {
    this.inlineQueue.push({ src, tokens });
    return tokens;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = []) {
    let token2, lastToken, cutSrc;
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    }
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token2 = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token2.raw.length);
          tokens.push(token2);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token2 = this.tokenizer.escape(src)) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      if (token2 = this.tokenizer.tag(src)) {
        src = src.substring(token2.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token2.type === "text" && lastToken.type === "text") {
          lastToken.raw += token2.raw;
          lastToken.text += token2.text;
        } else {
          tokens.push(token2);
        }
        continue;
      }
      if (token2 = this.tokenizer.link(src)) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      if (token2 = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token2.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token2.type === "text" && lastToken.type === "text") {
          lastToken.raw += token2.raw;
          lastToken.text += token2.text;
        } else {
          tokens.push(token2);
        }
        continue;
      }
      if (token2 = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      if (token2 = this.tokenizer.codespan(src)) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      if (token2 = this.tokenizer.br(src)) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      if (token2 = this.tokenizer.del(src)) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      if (token2 = this.tokenizer.autolink(src)) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      if (!this.state.inLink && (token2 = this.tokenizer.url(src))) {
        src = src.substring(token2.raw.length);
        tokens.push(token2);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token2 = this.tokenizer.inlineText(cutSrc)) {
        src = src.substring(token2.raw.length);
        if (token2.raw.slice(-1) !== "_") {
          prevChar = token2.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token2.raw;
          lastToken.text += token2.text;
        } else {
          tokens.push(token2);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
};
var _Renderer = class {
  options;
  parser;
  // set by the parser
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  space(token2) {
    return "";
  }
  code({ text, lang, escaped }) {
    const langString = (lang || "").match(/^\S*/)?.[0];
    const code = text.replace(/\n$/, "") + "\n";
    if (!langString) {
      return "<pre><code>" + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="language-' + escape$1(langString) + '">' + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
  }
  blockquote({ tokens }) {
    const body = this.parser.parse(tokens);
    return `<blockquote>
${body}</blockquote>
`;
  }
  html({ text }) {
    return text;
  }
  heading({ tokens, depth }) {
    return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>
`;
  }
  hr(token2) {
    return "<hr>\n";
  }
  list(token2) {
    const ordered = token2.ordered;
    const start = token2.start;
    let body = "";
    for (let j = 0; j < token2.items.length; j++) {
      const item = token2.items[j];
      body += this.listitem(item);
    }
    const type = ordered ? "ol" : "ul";
    const startAttr = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startAttr + ">\n" + body + "</" + type + ">\n";
  }
  listitem(item) {
    let itemBody = "";
    if (item.task) {
      const checkbox = this.checkbox({ checked: !!item.checked });
      if (item.loose) {
        if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
          item.tokens[0].text = checkbox + " " + item.tokens[0].text;
          if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
            item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
          }
        } else {
          item.tokens.unshift({
            type: "text",
            raw: checkbox + " ",
            text: checkbox + " "
          });
        }
      } else {
        itemBody += checkbox + " ";
      }
    }
    itemBody += this.parser.parse(item.tokens, !!item.loose);
    return `<li>${itemBody}</li>
`;
  }
  checkbox({ checked }) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens }) {
    return `<p>${this.parser.parseInline(tokens)}</p>
`;
  }
  table(token2) {
    let header = "";
    let cell = "";
    for (let j = 0; j < token2.header.length; j++) {
      cell += this.tablecell(token2.header[j]);
    }
    header += this.tablerow({ text: cell });
    let body = "";
    for (let j = 0; j < token2.rows.length; j++) {
      const row = token2.rows[j];
      cell = "";
      for (let k = 0; k < row.length; k++) {
        cell += this.tablecell(row[k]);
      }
      body += this.tablerow({ text: cell });
    }
    if (body)
      body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow({ text }) {
    return `<tr>
${text}</tr>
`;
  }
  tablecell(token2) {
    const content = this.parser.parseInline(token2.tokens);
    const type = token2.header ? "th" : "td";
    const tag2 = token2.align ? `<${type} align="${token2.align}">` : `<${type}>`;
    return tag2 + content + `</${type}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens }) {
    return `<strong>${this.parser.parseInline(tokens)}</strong>`;
  }
  em({ tokens }) {
    return `<em>${this.parser.parseInline(tokens)}</em>`;
  }
  codespan({ text }) {
    return `<code>${text}</code>`;
  }
  br(token2) {
    return "<br>";
  }
  del({ tokens }) {
    return `<del>${this.parser.parseInline(tokens)}</del>`;
  }
  link({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  image({ href, title, text }) {
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = `<img src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += ">";
    return out;
  }
  text(token2) {
    return "tokens" in token2 && token2.tokens ? this.parser.parseInline(token2.tokens) : token2.text;
  }
};
var _TextRenderer = class {
  // no need for block level renderers
  strong({ text }) {
    return text;
  }
  em({ text }) {
    return text;
  }
  codespan({ text }) {
    return text;
  }
  del({ text }) {
    return text;
  }
  html({ text }) {
    return text;
  }
  text({ text }) {
    return text;
  }
  link({ text }) {
    return "" + text;
  }
  image({ text }) {
    return "" + text;
  }
  br() {
    return "";
  }
};
var _Parser = class __Parser {
  options;
  renderer;
  textRenderer;
  constructor(options2) {
    this.options = options2 || _defaults;
    this.options.renderer = this.options.renderer || new _Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.renderer.parser = this;
    this.textRenderer = new _TextRenderer();
  }
  /**
   * Static Parse Method
   */
  static parse(tokens, options2) {
    const parser2 = new __Parser(options2);
    return parser2.parse(tokens);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens, options2) {
    const parser2 = new __Parser(options2);
    return parser2.parseInline(tokens);
  }
  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const anyToken = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[anyToken.type]) {
        const genericToken = anyToken;
        const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
          out += ret || "";
          continue;
        }
      }
      const token2 = anyToken;
      switch (token2.type) {
        case "space": {
          out += this.renderer.space(token2);
          continue;
        }
        case "hr": {
          out += this.renderer.hr(token2);
          continue;
        }
        case "heading": {
          out += this.renderer.heading(token2);
          continue;
        }
        case "code": {
          out += this.renderer.code(token2);
          continue;
        }
        case "table": {
          out += this.renderer.table(token2);
          continue;
        }
        case "blockquote": {
          out += this.renderer.blockquote(token2);
          continue;
        }
        case "list": {
          out += this.renderer.list(token2);
          continue;
        }
        case "html": {
          out += this.renderer.html(token2);
          continue;
        }
        case "paragraph": {
          out += this.renderer.paragraph(token2);
          continue;
        }
        case "text": {
          let textToken = token2;
          let body = this.renderer.text(textToken);
          while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
            textToken = tokens[++i];
            body += "\n" + this.renderer.text(textToken);
          }
          if (top) {
            out += this.renderer.paragraph({
              type: "paragraph",
              raw: body,
              text: body,
              tokens: [{ type: "text", raw: body, text: body }]
            });
          } else {
            out += body;
          }
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token2.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const anyToken = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[anyToken.type]) {
        const ret = this.options.extensions.renderers[anyToken.type].call({ parser: this }, anyToken);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(anyToken.type)) {
          out += ret || "";
          continue;
        }
      }
      const token2 = anyToken;
      switch (token2.type) {
        case "escape": {
          out += renderer.text(token2);
          break;
        }
        case "html": {
          out += renderer.html(token2);
          break;
        }
        case "link": {
          out += renderer.link(token2);
          break;
        }
        case "image": {
          out += renderer.image(token2);
          break;
        }
        case "strong": {
          out += renderer.strong(token2);
          break;
        }
        case "em": {
          out += renderer.em(token2);
          break;
        }
        case "codespan": {
          out += renderer.codespan(token2);
          break;
        }
        case "br": {
          out += renderer.br(token2);
          break;
        }
        case "del": {
          out += renderer.del(token2);
          break;
        }
        case "text": {
          out += renderer.text(token2);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token2.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
var _Hooks = class {
  options;
  block;
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  static passThroughHooks = /* @__PURE__ */ new Set([
    "preprocess",
    "postprocess",
    "processAllTokens"
  ]);
  /**
   * Process markdown before marked
   */
  preprocess(markdown) {
    return markdown;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(html2) {
    return html2;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(tokens) {
    return tokens;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? _Lexer.lex : _Lexer.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? _Parser.parse : _Parser.parseInline;
  }
};
var Marked = class {
  defaults = _getDefaults();
  options = this.setOptions;
  parse = this.parseMarkdown(true);
  parseInline = this.parseMarkdown(false);
  Parser = _Parser;
  Renderer = _Renderer;
  TextRenderer = _TextRenderer;
  Lexer = _Lexer;
  Tokenizer = _Tokenizer;
  Hooks = _Hooks;
  constructor(...args) {
    this.use(...args);
  }
  /**
   * Run callback for every token
   */
  walkTokens(tokens, callback) {
    let values2 = [];
    for (const token2 of tokens) {
      values2 = values2.concat(callback.call(this, token2));
      switch (token2.type) {
        case "table": {
          const tableToken = token2;
          for (const cell of tableToken.header) {
            values2 = values2.concat(this.walkTokens(cell.tokens, callback));
          }
          for (const row of tableToken.rows) {
            for (const cell of row) {
              values2 = values2.concat(this.walkTokens(cell.tokens, callback));
            }
          }
          break;
        }
        case "list": {
          const listToken = token2;
          values2 = values2.concat(this.walkTokens(listToken.items, callback));
          break;
        }
        default: {
          const genericToken = token2;
          if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
            this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
              const tokens2 = genericToken[childTokens].flat(Infinity);
              values2 = values2.concat(this.walkTokens(tokens2, callback));
            });
          } else if (genericToken.tokens) {
            values2 = values2.concat(this.walkTokens(genericToken.tokens, callback));
          }
        }
      }
    }
    return values2;
  }
  use(...args) {
    const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
    args.forEach((pack) => {
      const opts = { ...pack };
      opts.async = this.defaults.async || opts.async || false;
      if (pack.extensions) {
        pack.extensions.forEach((ext) => {
          if (!ext.name) {
            throw new Error("extension name required");
          }
          if ("renderer" in ext) {
            const prevRenderer = extensions.renderers[ext.name];
            if (prevRenderer) {
              extensions.renderers[ext.name] = function(...args2) {
                let ret = ext.renderer.apply(this, args2);
                if (ret === false) {
                  ret = prevRenderer.apply(this, args2);
                }
                return ret;
              };
            } else {
              extensions.renderers[ext.name] = ext.renderer;
            }
          }
          if ("tokenizer" in ext) {
            if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
              throw new Error("extension level must be 'block' or 'inline'");
            }
            const extLevel = extensions[ext.level];
            if (extLevel) {
              extLevel.unshift(ext.tokenizer);
            } else {
              extensions[ext.level] = [ext.tokenizer];
            }
            if (ext.start) {
              if (ext.level === "block") {
                if (extensions.startBlock) {
                  extensions.startBlock.push(ext.start);
                } else {
                  extensions.startBlock = [ext.start];
                }
              } else if (ext.level === "inline") {
                if (extensions.startInline) {
                  extensions.startInline.push(ext.start);
                } else {
                  extensions.startInline = [ext.start];
                }
              }
            }
          }
          if ("childTokens" in ext && ext.childTokens) {
            extensions.childTokens[ext.name] = ext.childTokens;
          }
        });
        opts.extensions = extensions;
      }
      if (pack.renderer) {
        const renderer = this.defaults.renderer || new _Renderer(this.defaults);
        for (const prop in pack.renderer) {
          if (!(prop in renderer)) {
            throw new Error(`renderer '${prop}' does not exist`);
          }
          if (["options", "parser"].includes(prop)) {
            continue;
          }
          const rendererProp = prop;
          const rendererFunc = pack.renderer[rendererProp];
          const prevRenderer = renderer[rendererProp];
          renderer[rendererProp] = (...args2) => {
            let ret = rendererFunc.apply(renderer, args2);
            if (ret === false) {
              ret = prevRenderer.apply(renderer, args2);
            }
            return ret || "";
          };
        }
        opts.renderer = renderer;
      }
      if (pack.tokenizer) {
        const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
        for (const prop in pack.tokenizer) {
          if (!(prop in tokenizer)) {
            throw new Error(`tokenizer '${prop}' does not exist`);
          }
          if (["options", "rules", "lexer"].includes(prop)) {
            continue;
          }
          const tokenizerProp = prop;
          const tokenizerFunc = pack.tokenizer[tokenizerProp];
          const prevTokenizer = tokenizer[tokenizerProp];
          tokenizer[tokenizerProp] = (...args2) => {
            let ret = tokenizerFunc.apply(tokenizer, args2);
            if (ret === false) {
              ret = prevTokenizer.apply(tokenizer, args2);
            }
            return ret;
          };
        }
        opts.tokenizer = tokenizer;
      }
      if (pack.hooks) {
        const hooks = this.defaults.hooks || new _Hooks();
        for (const prop in pack.hooks) {
          if (!(prop in hooks)) {
            throw new Error(`hook '${prop}' does not exist`);
          }
          if (["options", "block"].includes(prop)) {
            continue;
          }
          const hooksProp = prop;
          const hooksFunc = pack.hooks[hooksProp];
          const prevHook = hooks[hooksProp];
          if (_Hooks.passThroughHooks.has(prop)) {
            hooks[hooksProp] = (arg) => {
              if (this.defaults.async) {
                return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                  return prevHook.call(hooks, ret2);
                });
              }
              const ret = hooksFunc.call(hooks, arg);
              return prevHook.call(hooks, ret);
            };
          } else {
            hooks[hooksProp] = (...args2) => {
              let ret = hooksFunc.apply(hooks, args2);
              if (ret === false) {
                ret = prevHook.apply(hooks, args2);
              }
              return ret;
            };
          }
        }
        opts.hooks = hooks;
      }
      if (pack.walkTokens) {
        const walkTokens2 = this.defaults.walkTokens;
        const packWalktokens = pack.walkTokens;
        opts.walkTokens = function(token2) {
          let values2 = [];
          values2.push(packWalktokens.call(this, token2));
          if (walkTokens2) {
            values2 = values2.concat(walkTokens2.call(this, token2));
          }
          return values2;
        };
      }
      this.defaults = { ...this.defaults, ...opts };
    });
    return this;
  }
  setOptions(opt) {
    this.defaults = { ...this.defaults, ...opt };
    return this;
  }
  lexer(src, options2) {
    return _Lexer.lex(src, options2 ?? this.defaults);
  }
  parser(tokens, options2) {
    return _Parser.parse(tokens, options2 ?? this.defaults);
  }
  parseMarkdown(blockType) {
    const parse5 = (src, options2) => {
      const origOpt = { ...options2 };
      const opt = { ...this.defaults, ...origOpt };
      const throwError = this.onError(!!opt.silent, !!opt.async);
      if (this.defaults.async === true && origOpt.async === false) {
        return throwError(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      }
      if (typeof src === "undefined" || src === null) {
        return throwError(new Error("marked(): input parameter is undefined or null"));
      }
      if (typeof src !== "string") {
        return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
      }
      if (opt.hooks) {
        opt.hooks.options = opt;
        opt.hooks.block = blockType;
      }
      const lexer2 = opt.hooks ? opt.hooks.provideLexer() : blockType ? _Lexer.lex : _Lexer.lexInline;
      const parser2 = opt.hooks ? opt.hooks.provideParser() : blockType ? _Parser.parse : _Parser.parseInline;
      if (opt.async) {
        return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html2) => opt.hooks ? opt.hooks.postprocess(html2) : html2).catch(throwError);
      }
      try {
        if (opt.hooks) {
          src = opt.hooks.preprocess(src);
        }
        let tokens = lexer2(src, opt);
        if (opt.hooks) {
          tokens = opt.hooks.processAllTokens(tokens);
        }
        if (opt.walkTokens) {
          this.walkTokens(tokens, opt.walkTokens);
        }
        let html2 = parser2(tokens, opt);
        if (opt.hooks) {
          html2 = opt.hooks.postprocess(html2);
        }
        return html2;
      } catch (e) {
        return throwError(e);
      }
    };
    return parse5;
  }
  onError(silent, async) {
    return (e) => {
      e.message += "\nPlease report this to https://github.com/markedjs/marked.";
      if (silent) {
        const msg = "<p>An error occurred:</p><pre>" + escape$1(e.message + "", true) + "</pre>";
        if (async) {
          return Promise.resolve(msg);
        }
        return msg;
      }
      if (async) {
        return Promise.reject(e);
      }
      throw e;
    };
  }
};
var markedInstance = new Marked();
function marked(src, opt) {
  return markedInstance.parse(src, opt);
}
marked.options = marked.setOptions = function(options2) {
  markedInstance.setOptions(options2);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = _getDefaults;
marked.defaults = _defaults;
marked.use = function(...args) {
  markedInstance.use(...args);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.walkTokens = function(tokens, callback) {
  return markedInstance.walkTokens(tokens, callback);
};
marked.parseInline = markedInstance.parseInline;
marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Hooks = _Hooks;
marked.parse = marked;
var options = marked.options;
var setOptions = marked.setOptions;
var use = marked.use;
var walkTokens = marked.walkTokens;
var parseInline = marked.parseInline;
var parser = _Parser.parse;
var lexer = _Lexer.lex;

// src/lib/marked.ts
var frontmatter = null;
function preprocess(markdown) {
  frontmatter = (0, import_front_matter.default)(markdown);
  dbg2(`frontmatter`, frontmatter);
  return frontmatter.body;
}
marked.use({ hooks: { preprocess } });
var createRenderer = (api) => ({
  heading({ tokens, depth }) {
    const id = tokens[0]?.raw.toLowerCase().trim().replace(/[^a-z0-9\-_ ]/g, "").replace(/\s+/g, "-").replace(/^-+|-+$/g, "");
    return `<h${depth} id="${id}">${this.parser.parseInline(
      tokens
    )}</h${depth}>
`;
  },
  image({ href, title, text }) {
    return `<img src="${api.asset(href)}" alt="${text}" title="${title}" />`;
  }
});
var marked2 = (content, api) => {
  marked.use({
    renderer: createRenderer(api)
  });
  const html2 = marked(content);
  dbg2({ html: html2 });
  return {
    frontmatter: frontmatter?.attributes ?? {},
    content: html2
  };
};

// src/lib/ejs.ts
import_pocketbase_ejs.default.cache = {
  set: function(key, val) {
    $app.store().set(`ejs.${key}`, val);
  },
  get: function(key) {
    return $app.store().get(`ejs.${key}`);
  },
  remove: function(key) {
    $app.store().remove(`ejs.${key}`);
  },
  reset: function() {
    throw new Error(`resetting cache not supported`);
  }
};
var oldCompile = import_pocketbase_ejs.default.compile;
import_pocketbase_ejs.default.compile = function(template, options2) {
  const newTemplate = template.replaceAll(
    /<script\s+server>([\s\S]*?)<\/script>/g,
    "<% $1 %>"
  );
  return oldCompile(newTemplate, { ...options2 });
};
var oldResolveInclude = import_pocketbase_ejs.default.resolveInclude;
import_pocketbase_ejs.default.resolveInclude = function(includePath, templatePath, isDir) {
  dbg2(`resolveInclude`, { name: includePath, filename: templatePath, isDir });
  if (includePath.startsWith("/")) {
    return import_pocketbase_node3.path.resolve(pagesRoot, `_private`, includePath);
  }
  let currentPath = import_pocketbase_node3.path.dirname(templatePath);
  while (currentPath.length >= pagesRoot.length) {
    const attemptPath = import_pocketbase_node3.path.resolve(currentPath, `_private`, includePath);
    if (import_pocketbase_node3.fs.existsSync(attemptPath, "file")) {
      return attemptPath;
    } else {
      if (currentPath === pagesRoot) {
        break;
      }
      currentPath = import_pocketbase_node3.path.dirname(currentPath);
    }
  }
  throw new Error(`No partial '${includePath}' found in any _private directory`);
};
var oldIncludeFile = import_pocketbase_ejs.default.includeFile;
import_pocketbase_ejs.default.includeFile = function(path3, options2) {
  const renderFunc = oldIncludeFile(path3, options2);
  return (data) => {
    const rendered = renderFunc(data);
    if ($filepath.ext(path3) === ".md") {
      const res = marked2(rendered, options2);
      return res.content;
    }
    return rendered;
  };
};
var parseSlots = (input) => {
  const regex = /<!--\s*slot:(\w+)\s*-->([\s\S]*?)(?=<!--\s*slot:\w+\s*-->|$)/g;
  const slots = {};
  let lastIndex = 0;
  let cleanedContent = "";
  let match;
  while ((match = regex.exec(input)) !== null) {
    const name = match[1];
    const content = match[2]?.trim();
    if (name && content) {
      slots[name] = content;
      cleanedContent += input.slice(lastIndex, match.index);
      lastIndex = match.index + match[0].length;
    }
  }
  cleanedContent += input.slice(lastIndex);
  return {
    slots,
    content: cleanedContent.trim()
  };
};
var renderFile = (fname, api) => {
  dbg2(`renderFile start`, {
    fname,
    api: pick(api, "slots", "slot", "data")
  });
  const content = import_pocketbase_ejs.default.renderFile(
    fname,
    { ...api, api },
    {
      prepend: `
        const echo = (...args) => {
          const result = args.map((arg) => {
            if (typeof arg === 'object') {
              return JSON.stringify(arg)
            }
            return arg.toString()
          })
          return __append(result.join(' '))
        }
      `,
      compileDebug: true,
      async: false,
      cache: false
      // !$app.isDev(),
    }
  );
  dbg2(`renderFile end`, {
    fname,
    api: pick(api, "slots", "slot", "data")
  });
  if (typeof content !== "string") {
    if (content === void 0 || content === null) {
      return "";
    }
    return (0, import_pocketbase_stringify4.stringify)(content);
  }
  return content;
};

// src/lib/parseRoute.ts
init_cjs_shims();

// node_modules/query-string/index.js
init_cjs_shims();

// node_modules/query-string/base.js
var base_exports = {};
__export(base_exports, {
  exclude: () => exclude,
  extract: () => extract,
  parse: () => parse2,
  parseUrl: () => parseUrl,
  pick: () => pick2,
  stringify: () => stringify5,
  stringifyUrl: () => stringifyUrl
});
init_cjs_shims();

// node_modules/decode-uri-component/index.js
init_cjs_shims();
var token = "%[a-f0-9]{2}";
var singleMatcher = new RegExp("(" + token + ")|([^%]+?)", "gi");
var multiMatcher = new RegExp("(" + token + ")+", "gi");
function decodeComponents(components, split) {
  try {
    return [decodeURIComponent(components.join(""))];
  } catch {
  }
  if (components.length === 1) {
    return components;
  }
  split = split || 1;
  const left = components.slice(0, split);
  const right = components.slice(split);
  return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}
function decode(input) {
  try {
    return decodeURIComponent(input);
  } catch {
    let tokens = input.match(singleMatcher) || [];
    for (let i = 1; i < tokens.length; i++) {
      input = decodeComponents(tokens, i).join("");
      tokens = input.match(singleMatcher) || [];
    }
    return input;
  }
}
function customDecodeURIComponent(input) {
  const replaceMap = {
    "%FE%FF": "\uFFFD\uFFFD",
    "%FF%FE": "\uFFFD\uFFFD"
  };
  let match = multiMatcher.exec(input);
  while (match) {
    try {
      replaceMap[match[0]] = decodeURIComponent(match[0]);
    } catch {
      const result = decode(match[0]);
      if (result !== match[0]) {
        replaceMap[match[0]] = result;
      }
    }
    match = multiMatcher.exec(input);
  }
  replaceMap["%C2"] = "\uFFFD";
  const entries = Object.keys(replaceMap);
  for (const key of entries) {
    input = input.replace(new RegExp(key, "g"), replaceMap[key]);
  }
  return input;
}
function decodeUriComponent(encodedURI) {
  if (typeof encodedURI !== "string") {
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof encodedURI + "`");
  }
  try {
    return decodeURIComponent(encodedURI);
  } catch {
    return customDecodeURIComponent(encodedURI);
  }
}

// node_modules/filter-obj/index.js
init_cjs_shims();
function includeKeys(object, predicate) {
  const result = {};
  if (Array.isArray(predicate)) {
    for (const key of predicate) {
      const descriptor = Object.getOwnPropertyDescriptor(object, key);
      if (descriptor?.enumerable) {
        Object.defineProperty(result, key, descriptor);
      }
    }
  } else {
    for (const key of Reflect.ownKeys(object)) {
      const descriptor = Object.getOwnPropertyDescriptor(object, key);
      if (descriptor.enumerable) {
        const value = object[key];
        if (predicate(key, value, object)) {
          Object.defineProperty(result, key, descriptor);
        }
      }
    }
  }
  return result;
}

// node_modules/split-on-first/index.js
init_cjs_shims();
function splitOnFirst(string, separator) {
  if (!(typeof string === "string" && typeof separator === "string")) {
    throw new TypeError("Expected the arguments to be of type `string`");
  }
  if (string === "" || separator === "") {
    return [];
  }
  const separatorIndex = string.indexOf(separator);
  if (separatorIndex === -1) {
    return [];
  }
  return [
    string.slice(0, separatorIndex),
    string.slice(separatorIndex + separator.length)
  ];
}

// node_modules/query-string/base.js
var isNullOrUndefined = (value) => value === null || value === void 0;
var strictUriEncode = (string) => encodeURIComponent(string).replaceAll(/[!'()*]/g, (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);
var encodeFragmentIdentifier = Symbol("encodeFragmentIdentifier");
function encoderForArrayFormat(options2) {
  switch (options2.arrayFormat) {
    case "index": {
      return (key) => (result, value) => {
        const index = result.length;
        if (value === void 0 || options2.skipNull && value === null || options2.skipEmptyString && value === "") {
          return result;
        }
        if (value === null) {
          return [
            ...result,
            [encode(key, options2), "[", index, "]"].join("")
          ];
        }
        return [
          ...result,
          [encode(key, options2), "[", encode(index, options2), "]=", encode(value, options2)].join("")
        ];
      };
    }
    case "bracket": {
      return (key) => (result, value) => {
        if (value === void 0 || options2.skipNull && value === null || options2.skipEmptyString && value === "") {
          return result;
        }
        if (value === null) {
          return [
            ...result,
            [encode(key, options2), "[]"].join("")
          ];
        }
        return [
          ...result,
          [encode(key, options2), "[]=", encode(value, options2)].join("")
        ];
      };
    }
    case "colon-list-separator": {
      return (key) => (result, value) => {
        if (value === void 0 || options2.skipNull && value === null || options2.skipEmptyString && value === "") {
          return result;
        }
        if (value === null) {
          return [
            ...result,
            [encode(key, options2), ":list="].join("")
          ];
        }
        return [
          ...result,
          [encode(key, options2), ":list=", encode(value, options2)].join("")
        ];
      };
    }
    case "comma":
    case "separator":
    case "bracket-separator": {
      const keyValueSeparator = options2.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (key) => (result, value) => {
        if (value === void 0 || options2.skipNull && value === null || options2.skipEmptyString && value === "") {
          return result;
        }
        value = value === null ? "" : value;
        if (result.length === 0) {
          return [[encode(key, options2), keyValueSeparator, encode(value, options2)].join("")];
        }
        return [[result, encode(value, options2)].join(options2.arrayFormatSeparator)];
      };
    }
    default: {
      return (key) => (result, value) => {
        if (value === void 0 || options2.skipNull && value === null || options2.skipEmptyString && value === "") {
          return result;
        }
        if (value === null) {
          return [
            ...result,
            encode(key, options2)
          ];
        }
        return [
          ...result,
          [encode(key, options2), "=", encode(value, options2)].join("")
        ];
      };
    }
  }
}
function parserForArrayFormat(options2) {
  let result;
  switch (options2.arrayFormat) {
    case "index": {
      return (key, value, accumulator) => {
        result = /\[(\d*)]$/.exec(key);
        key = key.replace(/\[\d*]$/, "");
        if (!result) {
          accumulator[key] = value;
          return;
        }
        if (accumulator[key] === void 0) {
          accumulator[key] = {};
        }
        accumulator[key][result[1]] = value;
      };
    }
    case "bracket": {
      return (key, value, accumulator) => {
        result = /(\[])$/.exec(key);
        key = key.replace(/\[]$/, "");
        if (!result) {
          accumulator[key] = value;
          return;
        }
        if (accumulator[key] === void 0) {
          accumulator[key] = [value];
          return;
        }
        accumulator[key] = [...accumulator[key], value];
      };
    }
    case "colon-list-separator": {
      return (key, value, accumulator) => {
        result = /(:list)$/.exec(key);
        key = key.replace(/:list$/, "");
        if (!result) {
          accumulator[key] = value;
          return;
        }
        if (accumulator[key] === void 0) {
          accumulator[key] = [value];
          return;
        }
        accumulator[key] = [...accumulator[key], value];
      };
    }
    case "comma":
    case "separator": {
      return (key, value, accumulator) => {
        const isArray = typeof value === "string" && value.includes(options2.arrayFormatSeparator);
        const isEncodedArray = typeof value === "string" && !isArray && decode2(value, options2).includes(options2.arrayFormatSeparator);
        value = isEncodedArray ? decode2(value, options2) : value;
        const newValue = isArray || isEncodedArray ? value.split(options2.arrayFormatSeparator).map((item) => decode2(item, options2)) : value === null ? value : decode2(value, options2);
        accumulator[key] = newValue;
      };
    }
    case "bracket-separator": {
      return (key, value, accumulator) => {
        const isArray = /(\[])$/.test(key);
        key = key.replace(/\[]$/, "");
        if (!isArray) {
          accumulator[key] = value ? decode2(value, options2) : value;
          return;
        }
        const arrayValue = value === null ? [] : decode2(value, options2).split(options2.arrayFormatSeparator);
        if (accumulator[key] === void 0) {
          accumulator[key] = arrayValue;
          return;
        }
        accumulator[key] = [...accumulator[key], ...arrayValue];
      };
    }
    default: {
      return (key, value, accumulator) => {
        if (accumulator[key] === void 0) {
          accumulator[key] = value;
          return;
        }
        accumulator[key] = [...[accumulator[key]].flat(), value];
      };
    }
  }
}
function validateArrayFormatSeparator(value) {
  if (typeof value !== "string" || value.length !== 1) {
    throw new TypeError("arrayFormatSeparator must be single character string");
  }
}
function encode(value, options2) {
  if (options2.encode) {
    return options2.strict ? strictUriEncode(value) : encodeURIComponent(value);
  }
  return value;
}
function decode2(value, options2) {
  if (options2.decode) {
    return decodeUriComponent(value);
  }
  return value;
}
function keysSorter(input) {
  if (Array.isArray(input)) {
    return input.sort();
  }
  if (typeof input === "object") {
    return keysSorter(Object.keys(input)).sort((a, b) => Number(a) - Number(b)).map((key) => input[key]);
  }
  return input;
}
function removeHash(input) {
  const hashStart = input.indexOf("#");
  if (hashStart !== -1) {
    input = input.slice(0, hashStart);
  }
  return input;
}
function getHash(url) {
  let hash = "";
  const hashStart = url.indexOf("#");
  if (hashStart !== -1) {
    hash = url.slice(hashStart);
  }
  return hash;
}
function parseValue(value, options2, type) {
  if (type === "string" && typeof value === "string") {
    return value;
  }
  if (typeof type === "function" && typeof value === "string") {
    return type(value);
  }
  if (options2.parseBooleans && value !== null && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
    return value.toLowerCase() === "true";
  }
  if (type === "number" && !Number.isNaN(Number(value)) && (typeof value === "string" && value.trim() !== "")) {
    return Number(value);
  }
  if (options2.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === "string" && value.trim() !== "")) {
    return Number(value);
  }
  return value;
}
function extract(input) {
  input = removeHash(input);
  const queryStart = input.indexOf("?");
  if (queryStart === -1) {
    return "";
  }
  return input.slice(queryStart + 1);
}
function parse2(query, options2) {
  options2 = {
    decode: true,
    sort: true,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: false,
    parseBooleans: false,
    types: /* @__PURE__ */ Object.create(null),
    ...options2
  };
  validateArrayFormatSeparator(options2.arrayFormatSeparator);
  const formatter = parserForArrayFormat(options2);
  const returnValue = /* @__PURE__ */ Object.create(null);
  if (typeof query !== "string") {
    return returnValue;
  }
  query = query.trim().replace(/^[?#&]/, "");
  if (!query) {
    return returnValue;
  }
  for (const parameter of query.split("&")) {
    if (parameter === "") {
      continue;
    }
    const parameter_ = options2.decode ? parameter.replaceAll("+", " ") : parameter;
    let [key, value] = splitOnFirst(parameter_, "=");
    if (key === void 0) {
      key = parameter_;
    }
    value = value === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(options2.arrayFormat) ? value : decode2(value, options2);
    formatter(decode2(key, options2), value, returnValue);
  }
  for (const [key, value] of Object.entries(returnValue)) {
    if (typeof value === "object" && value !== null && options2.types[key] !== "string") {
      for (const [key2, value2] of Object.entries(value)) {
        const type = options2.types[key] ? options2.types[key].replace("[]", "") : void 0;
        value[key2] = parseValue(value2, options2, type);
      }
    } else if (typeof value === "object" && value !== null && options2.types[key] === "string") {
      returnValue[key] = Object.values(value).join(options2.arrayFormatSeparator);
    } else {
      returnValue[key] = parseValue(value, options2, options2.types[key]);
    }
  }
  if (options2.sort === false) {
    return returnValue;
  }
  return (options2.sort === true ? Object.keys(returnValue).sort() : Object.keys(returnValue).sort(options2.sort)).reduce((result, key) => {
    const value = returnValue[key];
    result[key] = Boolean(value) && typeof value === "object" && !Array.isArray(value) ? keysSorter(value) : value;
    return result;
  }, /* @__PURE__ */ Object.create(null));
}
function stringify5(object, options2) {
  if (!object) {
    return "";
  }
  options2 = {
    encode: true,
    strict: true,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...options2
  };
  validateArrayFormatSeparator(options2.arrayFormatSeparator);
  const shouldFilter = (key) => options2.skipNull && isNullOrUndefined(object[key]) || options2.skipEmptyString && object[key] === "";
  const formatter = encoderForArrayFormat(options2);
  const objectCopy = {};
  for (const [key, value] of Object.entries(object)) {
    if (!shouldFilter(key)) {
      objectCopy[key] = value;
    }
  }
  const keys2 = Object.keys(objectCopy);
  if (options2.sort !== false) {
    keys2.sort(options2.sort);
  }
  return keys2.map((key) => {
    const value = object[key];
    if (value === void 0) {
      return "";
    }
    if (value === null) {
      return encode(key, options2);
    }
    if (Array.isArray(value)) {
      if (value.length === 0 && options2.arrayFormat === "bracket-separator") {
        return encode(key, options2) + "[]";
      }
      return value.reduce(formatter(key), []).join("&");
    }
    return encode(key, options2) + "=" + encode(value, options2);
  }).filter((x) => x.length > 0).join("&");
}
function parseUrl(url, options2) {
  options2 = {
    decode: true,
    ...options2
  };
  let [url_, hash] = splitOnFirst(url, "#");
  if (url_ === void 0) {
    url_ = url;
  }
  return {
    url: url_?.split("?")?.[0] ?? "",
    query: parse2(extract(url), options2),
    ...options2 && options2.parseFragmentIdentifier && hash ? { fragmentIdentifier: decode2(hash, options2) } : {}
  };
}
function stringifyUrl(object, options2) {
  options2 = {
    encode: true,
    strict: true,
    [encodeFragmentIdentifier]: true,
    ...options2
  };
  const url = removeHash(object.url).split("?")[0] || "";
  const queryFromUrl = extract(object.url);
  const query = {
    ...parse2(queryFromUrl, { sort: false }),
    ...object.query
  };
  let queryString = stringify5(query, options2);
  if (queryString) {
    queryString = `?${queryString}`;
  }
  let hash = getHash(object.url);
  if (typeof object.fragmentIdentifier === "string") {
    const urlObjectForFragmentEncode = new URL(url);
    urlObjectForFragmentEncode.hash = object.fragmentIdentifier;
    hash = options2[encodeFragmentIdentifier] ? urlObjectForFragmentEncode.hash : `#${object.fragmentIdentifier}`;
  }
  return `${url}${queryString}${hash}`;
}
function pick2(input, filter, options2) {
  options2 = {
    parseFragmentIdentifier: true,
    [encodeFragmentIdentifier]: false,
    ...options2
  };
  const { url, query, fragmentIdentifier } = parseUrl(input, options2);
  return stringifyUrl({
    url,
    query: includeKeys(query, filter),
    fragmentIdentifier
  }, options2);
}
function exclude(input, filter, options2) {
  const exclusionFilter = Array.isArray(filter) ? (key) => !filter.includes(key) : (key, value) => !filter(key, value);
  return pick2(input, exclusionFilter, options2);
}

// node_modules/query-string/index.js
var query_string_default = base_exports;

// src/lib/parseRoute.ts
var fingerprint = (nodeName, fingerprint2) => {
  const lastDotIndex = nodeName.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return `${nodeName}.${fingerprint2}`;
  }
  const base = nodeName.slice(0, lastDotIndex);
  const ext = nodeName.slice(lastDotIndex);
  return `${base}.${fingerprint2}${ext}`;
};
var parseRoute = (url, routes) => {
  const { config } = $app.store().get(`pocketpages`);
  const urlPath = url.pathname.slice(1);
  const params = query_string_default.parse(url.query);
  const tryFnames = [
    `${urlPath}`,
    ...config.preprocessorExts.map((ext) => `${urlPath}${ext}`),
    ...config.preprocessorExts.map((ext) => `${urlPath}/index${ext}`)
  ];
  for (const maybeFname of tryFnames) {
    const parts = maybeFname.split("/").filter((p) => p);
    const routeCandidates = routes.filter(
      (r) => r.segments.length === parts.length
    );
    for (const route of routeCandidates) {
      const matched = route.segments.every((segment, i) => {
        const { paramName } = segment;
        if (paramName) {
          params[paramName] = parts[i];
          return true;
        }
        const matchesWithFingerprint = (() => {
          if (route.shouldPreProcess) return false;
          if (i !== route.segments.length - 1) return false;
          const fingerprinted = fingerprint(segment.nodeName, route.fingerprint);
          dbg2({ segment, fingerprinted, parts });
          return fingerprinted === parts[i];
        })();
        return segment.nodeName === parts[i] || matchesWithFingerprint;
      });
      if (matched) {
        return { route, params };
      }
    }
  }
  return null;
};

// src/lib/MiddlewareHandler.ts
var MiddlewareHandler = (request, response, next) => {
  const { routes, config } = $app.store().get(`pocketpages`);
  const { method, url } = request;
  dbg2(`pocketpages handler`);
  dbg2(`Pages middleware request: ${method} ${url}`);
  const parsedRoute = parseRoute(url, routes);
  if (!parsedRoute) {
    dbg2(`No route matched for ${url}, passing on to PocketBase`);
    return next();
  }
  const { route, params } = parsedRoute;
  const { absolutePath, relativePath } = route;
  if (!route.shouldPreProcess) {
    dbg2(`Serving static file ${absolutePath}`);
    return response.file(absolutePath);
  }
  try {
    dbg2(`Found a matching route`, { parsedRoute });
    const api = {
      ...globalApi,
      params,
      echo: (...args) => {
        const s = echo(...args);
        response.write(s);
        return s;
      },
      formData: request.formData,
      body: request.body,
      auth: request.auth,
      request,
      response,
      redirect: (path3, _options) => {
        const options2 = {
          status: 302,
          message: "",
          ..._options
        };
        const parsed = globalApi.url(path3);
        parsed.query.__flash = options2.message;
        response.redirect(parsed.toString(), options2.status);
      },
      slot: "",
      slots: {},
      asset: (path3) => {
        const shortAssetPath = path3.startsWith("/") ? path3 : $filepath.join(route.assetPrefix, path3);
        const fullAssetPath = path3.startsWith("/") ? path3 : $filepath.join(
          ...route.segments.slice(0, -2).map((s) => s.nodeName),
          route.assetPrefix,
          path3
        );
        const assetRoute = parseRoute(new import_url_parse2.default(fullAssetPath), routes);
        dbg2({ fullAssetPath, shortAssetPath, assetRoute });
        if (!assetRoute) {
          if ($app.isDev()) {
            return `${shortAssetPath}?_r=${Date.now()}`;
          }
          return `${shortAssetPath}`;
        }
        return fingerprint(shortAssetPath, assetRoute.route.fingerprint);
      },
      meta: mkMeta(),
      resolve: mkResolve($filepath.dir(absolutePath)),
      registerWithPassword: (email, password, options2) => {
        globalApi.createUser(email, password, options2);
        const authData = api.signInWithPassword(email, password, options2);
        return authData;
      },
      signInWithPassword: (email, password, options2) => {
        const authData = globalApi.pb().collection(options2?.collection ?? "users").authWithPassword(email, password);
        api.signInWithToken(authData.token);
        return authData;
      },
      signInAnonymously: (options2) => {
        const { user, email, password } = globalApi.createAnonymousUser();
        const authData = api.signInWithPassword(email, password, options2);
        return authData;
      },
      signInWithOTP: (otpId, password, options2) => {
        const pb = globalApi.pb();
        const authData = pb.collection(options2?.collection ?? "users").authWithOTP(otpId, password.toString());
        api.signInWithToken(authData.token);
        return authData;
      },
      requestOAuth2Login: (providerName, options2) => {
        const pb = globalApi.pb();
        const methods = pb.collection(options2?.collection ?? "users").listAuthMethods();
        const { providers } = methods.oauth2;
        const provider = providers.find((p) => p.name === providerName);
        if (!provider) {
          throw new Error(`Provider ${providerName} not found`);
        }
        const redirectUrl = `${$app.settings().meta.appURL}${options2?.redirectPath ?? "/auth/oauth/confirm"}`;
        const authUrl = provider.authURL + redirectUrl;
        response.cookie(options2?.cookieName ?? "pp_oauth_state", {
          ...globalApi.pick(
            provider,
            "name",
            "state",
            "codeChallenge",
            "codeVerifier"
          ),
          redirectUrl
        });
        if (options2?.autoRedirect ?? true) {
          response.redirect(authUrl);
        }
        return authUrl;
      },
      signInWithOAuth2: (state, code, options2, _storedProviderInfo) => {
        const storedProvider = _storedProviderInfo ?? api.request.cookies(
          options2?.cookieName ?? "pp_oauth_state"
        );
        if (!storedProvider) {
          throw new Error("No stored provider info found");
        }
        if (storedProvider.state !== state) {
          throw new Error(`State parameters don't match.`);
        }
        const authData = globalApi.pb().collection(options2?.collection ?? "users").authWithOAuth2Code(
          storedProvider.name,
          code,
          storedProvider.codeVerifier,
          storedProvider.redirectUrl,
          // pass any optional user create data
          {
            emailVisibility: false
          }
        );
        api.signInWithToken(authData.token);
        return authData;
      },
      signOut: () => {
        response.cookie(`pb_auth`, "");
      },
      signInWithToken: (token2) => {
        response.cookie(`pb_auth`, token2);
      }
    };
    let data = {};
    route.middlewares.forEach((maybeMiddleware) => {
      dbg2(`Executing middleware ${maybeMiddleware}`);
      data = merge(data, require(maybeMiddleware)({ ...api, data }));
    });
    {
      const methods = ["load", method.toLowerCase()];
      forEach(methods, (method2) => {
        const loaderFname = route.loaders[method2];
        if (!loaderFname) return;
        dbg2(`Executing loader ${loaderFname}`);
        data = merge(data, require(loaderFname)({ ...api, data }));
      });
    }
    api.data = data;
    dbg2(`Final api:`, { params: api.params, data: api.data });
    delete api.echo;
    dbg2(`Rendering file`, { absolutePath });
    var content = renderFile(absolutePath, api);
    if (route.isMarkdown) {
      dbg2(`Markdown file`, { absolutePath });
      const res = marked2(content, api);
      content = res.content;
      forEach(res.frontmatter, (value, key) => {
        api.meta(key, value);
      });
      dbg2(`markdown`, { content });
    }
    try {
      dbg2(`Attempting to parse as JSON`);
      const parsed = JSON.parse(content);
      return response.json(200, parsed);
    } catch (e) {
      dbg2(`Not JSON`);
    }
    route.layouts.forEach((layoutPath) => {
      const res = parseSlots(content);
      api.slots = res.slots;
      api.slot = res.slots.default || res.content;
      content = renderFile(layoutPath, api);
    });
    return response.html(200, content);
  } catch (e) {
    (0, import_pocketbase_log2.error)(e);
    const message = (() => {
      const m = `${e}`;
      if (m.includes("Value is not an object"))
        return `${m} - are you referencing a symbol missing from require() or resolve()?`;
      return `${e}`;
    })();
    if (e instanceof BadRequestError) {
      return response.html(400, message);
    }
    return response.html(
      500,
      `<html><body><h1>PocketPages Error</h1><pre><code>${message}
${e instanceof Error ? e.stack?.replaceAll(pagesRoot, "/" + $filepath.base(pagesRoot)).replaceAll(__hooks, "") : ""}</code></pre></body></html>`
    );
  }
};

// src/lib/pages/providers/v23Provider/wrapper.ts
init_cjs_shims();
var cookie = __toESM(require_dist5());
var import_pocketbase_stringify5 = __toESM(require_dist());
var import_url_parse3 = __toESM(require_url_parse());

// src/lib/auth.ts
init_cjs_shims();
var setAuthFromHeaderOrCookie = (request) => {
  const token2 = request.header("Authorization") || request.cookies("pb_auth");
  if (token2) {
    const cleanToken = token2.replace(/^Bearer\s+/i, "");
    let data = {};
    try {
      data = JSON.parse(cleanToken);
      if (typeof data === null || typeof data !== "object" || Array.isArray(data)) {
        data = {};
      }
    } catch (_) {
    }
    const pb = globalApi.pb();
    pb.authStore.save(data.token || "", data.record || data.model || null);
    try {
      pb.authStore.isValid && pb.collection("users").authRefresh();
    } catch (_) {
      pb.authStore.clear();
    }
    try {
      request.auth = $app.findAuthRecordByToken(cleanToken, "auth");
    } catch (e) {
    }
  }
};

// src/lib/pages/providers/v23Provider/wrapper.ts
var v23MiddlewareWrapper = (e) => {
  const next = () => {
    e.next();
  };
  if (!e.request) {
    dbg2(`No request, passing on to PocketBase`);
    return next();
  }
  const { method, url } = e.request;
  dbg2({ method, url });
  if (!url) {
    if (!url) {
      dbg2(`No URL, passing on to PocketBase`);
      return next();
    }
  }
  const request = {
    auth: e.auth,
    method: method.toUpperCase(),
    url: (0, import_url_parse3.default)(url.string()),
    formData: () => e.requestInfo().body,
    body: () => e.requestInfo().body,
    header: (name) => {
      return e.request?.header.get(name) || "";
    },
    cookies: /* @__PURE__ */ (() => {
      let parsed;
      const tryParseJson = (value) => {
        if (!value) return value;
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      };
      const cookieFunc = (name) => {
        if (!parsed) {
          const cookieHeader = request.header("Cookie");
          const rawParsed = cookie.parse(cookieHeader || "");
          parsed = Object.fromEntries(
            Object.entries(rawParsed).map(([key, value]) => [
              key,
              tryParseJson(value)
            ])
          );
        }
        if (name === void 0) {
          return parsed;
        }
        return parsed[name];
      };
      return cookieFunc;
    })()
  };
  const response = {
    file: (path3) => {
      return e.fileFS($os.dirFS($filepath.dir(path3)), $filepath.base(path3));
    },
    write: (s) => {
      e.response.write(s);
    },
    redirect: (path3, status = 302) => {
      e.redirect(status, path3);
    },
    json: (status, data) => {
      e.json(status, data);
    },
    html: (status, data) => {
      e.html(status, data);
    },
    header: (name, value) => {
      if (value === void 0) {
        return e.response.header().get(name) || "";
      }
      e.response.header().set(name, value);
      return value;
    },
    cookie: (name, value, options2 = {}) => {
      const _options = {
        path: "/",
        ...options2
      };
      const stringifiedValue = (() => {
        if (typeof value !== "string") {
          return (0, import_pocketbase_stringify5.stringify)(value);
        }
        return value;
      })();
      const serialized = cookie.serialize(name, stringifiedValue, _options);
      response.header(`Set-Cookie`, serialized);
      return serialized;
    }
  };
  setAuthFromHeaderOrCookie(request);
  require(`${__hooks}/pocketpages.pb`).MiddlewareHandler(
    request,
    response,
    next
  );
};

// src/index.ts
var isBooting = typeof onBootstrap !== "undefined";
if (isBooting) {
  const pagesProvider = getPagesProvider();
  pagesProvider.boot();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AfterBootstrapHandler,
  MiddlewareHandler,
  findRecordByFilter,
  findRecordsByFilter,
  globalApi,
  log,
  moduleExists,
  stringify,
  v23MiddlewareWrapper
});
/**
 * @file Embedded JavaScript templating engine. {@link http://ejs.co}
 * @author Matthew Eernisse <mde@fleegix.org>
 * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
 * @project EJS
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
 */
