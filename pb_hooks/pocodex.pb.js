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

// node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
  "node_modules/tsup/assets/cjs_shims.js"() {
  }
});

// ../../pocketbase-stringify/dist/index.js
var require_dist = __commonJS({
  "../../pocketbase-stringify/dist/index.js"(exports2, module2) {
    init_cjs_shims();
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
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
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export(src_exports, {
      defaultReplacer: () => defaultReplacer,
      stringify: () => stringify
    });
    module2.exports = __toCommonJS(src_exports);
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
    var stringify = (obj, replacer = defaultReplacer, space = 0) => {
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

// ../../pocketbase-log/dist/index.js
var require_dist2 = __commonJS({
  "../../pocketbase-log/dist/index.js"(exports2, module2) {
    init_cjs_shims();
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
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
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export(src_exports, {
      dbg: () => dbg,
      error: () => error,
      info: () => info,
      log: () => log2,
      warn: () => warn
    });
    module2.exports = __toCommonJS(src_exports);
    var import_pocketbase_stringify = require_dist();
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
          return (0, import_pocketbase_stringify.stringify)(o, replacer, 2);
        }
        return o;
      });
      return parts.join(` `);
    };
    var dbg = (...objs) => {
      const s = prepare(objs);
      $app.logger().debug(s);
    };
    var info = (...objs) => {
      const s = prepare(objs);
      $app.logger().info(s);
    };
    var warn = (...objs) => {
      const s = prepare(objs);
      $app.logger().warn(s);
    };
    var error = (...objs) => {
      const s = prepare(objs);
      $app.logger().error(s);
    };
    var log2 = (...objs) => {
      const s = prepare(objs);
      console.log(s);
    };
  }
});

// src/pb/pb_hooks/pocodex.pb.ts
init_cjs_shims();
var import_pocketbase_log = __toESM(require_dist2());
try {
  (0, import_pocketbase_log.log)(`pocodex bootstrap`);
  (0, import_pocketbase_log.log)(`loading CLI`);
  require("pocodex/dist/pb").Init();
  (0, import_pocketbase_log.log)("pocodex loaded");
} catch (e) {
  (0, import_pocketbase_log.log)(`WARNING: pocodex not loaded: ${e}`);
  (0, import_pocketbase_log.log)(e);
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL3RzdXAvYXNzZXRzL2Nqc19zaGltcy5qcyIsICIuLi8uLi8uLi8uLi9wb2NrZXRiYXNlLXN0cmluZ2lmeS9kaXN0L2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uL3BvY2tldGJhc2UtbG9nL2Rpc3QvaW5kZXguanMiLCAiLi4vLi4vc3JjL3BiL3BiX2hvb2tzL3BvY29kZXgucGIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIFNoaW0gZ2xvYmFscyBpbiBjanMgYnVuZGxlXG4vLyBUaGVyZSdzIGEgd2VpcmQgYnVnIHRoYXQgZXNidWlsZCB3aWxsIGFsd2F5cyBpbmplY3QgaW1wb3J0TWV0YVVybFxuLy8gaWYgd2UgZXhwb3J0IGl0IGFzIGBjb25zdCBpbXBvcnRNZXRhVXJsID0gLi4uIF9fZmlsZW5hbWUgLi4uYFxuLy8gQnV0IHVzaW5nIGEgZnVuY3Rpb24gd2lsbCBub3QgY2F1c2UgdGhpcyBpc3N1ZVxuXG5jb25zdCBnZXRJbXBvcnRNZXRhVXJsID0gKCkgPT5cbiAgdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJ1xuICAgID8gbmV3IFVSTChgZmlsZToke19fZmlsZW5hbWV9YCkuaHJlZlxuICAgIDogKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmMpIHx8XG4gICAgICBuZXcgVVJMKCdtYWluLmpzJywgZG9jdW1lbnQuYmFzZVVSSSkuaHJlZlxuXG5leHBvcnQgY29uc3QgaW1wb3J0TWV0YVVybCA9IC8qIEBfX1BVUkVfXyAqLyBnZXRJbXBvcnRNZXRhVXJsKClcbiIsICJ2YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICBmb3IgKHZhciBuYW1lIGluIGFsbClcbiAgICBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7IGdldDogYWxsW25hbWVdLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XG4gIH1cbiAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3RvQ29tbW9uSlMgPSAobW9kKSA9PiBfX2NvcHlQcm9wcyhfX2RlZlByb3Aoe30sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pLCBtb2QpO1xuXG4vLyBzcmMvaW5kZXgudHNcbnZhciBzcmNfZXhwb3J0cyA9IHt9O1xuX19leHBvcnQoc3JjX2V4cG9ydHMsIHtcbiAgZGVmYXVsdFJlcGxhY2VyOiAoKSA9PiBkZWZhdWx0UmVwbGFjZXIsXG4gIHN0cmluZ2lmeTogKCkgPT4gc3RyaW5naWZ5XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX190b0NvbW1vbkpTKHNyY19leHBvcnRzKTtcbnZhciBkZWZhdWx0UmVwbGFjZXIgPSAoaywgdikgPT4ge1xuICBpZiAodiBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgcmV0dXJuIHYuc3RhY2s7XG4gIH1cbiAgaWYgKHYgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICByZXR1cm4gdi50b1N0cmluZygpO1xuICB9XG4gIGlmICh2IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gdi50b1N0cmluZygpO1xuICB9XG4gIHJldHVybiB2O1xufTtcbnZhciBzdHJpbmdpZnkgPSAob2JqLCByZXBsYWNlciA9IGRlZmF1bHRSZXBsYWNlciwgc3BhY2UgPSAwKSA9PiB7XG4gIGNvbnN0IHNlZW4gPSAvKiBAX19QVVJFX18gKi8gbmV3IFdlYWtTZXQoKTtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KFxuICAgIG9iaixcbiAgICAoaywgdikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB2ID09PSBcIm9iamVjdFwiICYmIHYgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKHNlZW4uaGFzKHYpKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcGxhY2VyID8gcmVwbGFjZXIoaywgYFtDaXJjdWxhcl1gKSA6IGBbQ2lyY3VsYXJdYDtcbiAgICAgICAgfVxuICAgICAgICBzZWVuLmFkZCh2KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXBsYWNlciA/IHJlcGxhY2VyKGssIHYpIDogdjtcbiAgICB9LFxuICAgIHNwYWNlXG4gICk7XG59O1xuLy8gQW5ub3RhdGUgdGhlIENvbW1vbkpTIGV4cG9ydCBuYW1lcyBmb3IgRVNNIGltcG9ydCBpbiBub2RlOlxuMCAmJiAobW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRlZmF1bHRSZXBsYWNlcixcbiAgc3RyaW5naWZ5XG59KTtcbiIsICJ2YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICBmb3IgKHZhciBuYW1lIGluIGFsbClcbiAgICBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7IGdldDogYWxsW25hbWVdLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XG4gIH1cbiAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3RvQ29tbW9uSlMgPSAobW9kKSA9PiBfX2NvcHlQcm9wcyhfX2RlZlByb3Aoe30sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pLCBtb2QpO1xuXG4vLyBzcmMvaW5kZXgudHNcbnZhciBzcmNfZXhwb3J0cyA9IHt9O1xuX19leHBvcnQoc3JjX2V4cG9ydHMsIHtcbiAgZGJnOiAoKSA9PiBkYmcsXG4gIGVycm9yOiAoKSA9PiBlcnJvcixcbiAgaW5mbzogKCkgPT4gaW5mbyxcbiAgbG9nOiAoKSA9PiBsb2csXG4gIHdhcm46ICgpID0+IHdhcm5cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfX3RvQ29tbW9uSlMoc3JjX2V4cG9ydHMpO1xudmFyIGltcG9ydF9wb2NrZXRiYXNlX3N0cmluZ2lmeSA9IHJlcXVpcmUoXCJwb2NrZXRiYXNlLXN0cmluZ2lmeVwiKTtcbnZhciByZXBsYWNlciA9IChrLCB2KSA9PiB7XG4gIGlmICh2IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXR1cm4gYCR7dn1cbiR7di5zdGFja31gO1xuICB9XG4gIGlmICh2IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuIHYudG9TdHJpbmcoKTtcbiAgfVxuICBpZiAodiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIHYudG9TdHJpbmcoKTtcbiAgfVxuICByZXR1cm4gdjtcbn07XG52YXIgcHJlcGFyZSA9IChvYmpzKSA9PiB7XG4gIGNvbnN0IHBhcnRzID0gb2Jqcy5tYXAoKG8pID0+IHtcbiAgICBpZiAobyBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICByZXR1cm4gby5zdGFjaztcbiAgICB9XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIHJldHVybiBvLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChvIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiBvLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuICgwLCBpbXBvcnRfcG9ja2V0YmFzZV9zdHJpbmdpZnkuc3RyaW5naWZ5KShvLCByZXBsYWNlciwgMik7XG4gICAgfVxuICAgIHJldHVybiBvO1xuICB9KTtcbiAgcmV0dXJuIHBhcnRzLmpvaW4oYCBgKTtcbn07XG52YXIgZGJnID0gKC4uLm9ianMpID0+IHtcbiAgY29uc3QgcyA9IHByZXBhcmUob2Jqcyk7XG4gICRhcHAubG9nZ2VyKCkuZGVidWcocyk7XG59O1xudmFyIGluZm8gPSAoLi4ub2JqcykgPT4ge1xuICBjb25zdCBzID0gcHJlcGFyZShvYmpzKTtcbiAgJGFwcC5sb2dnZXIoKS5pbmZvKHMpO1xufTtcbnZhciB3YXJuID0gKC4uLm9ianMpID0+IHtcbiAgY29uc3QgcyA9IHByZXBhcmUob2Jqcyk7XG4gICRhcHAubG9nZ2VyKCkud2FybihzKTtcbn07XG52YXIgZXJyb3IgPSAoLi4ub2JqcykgPT4ge1xuICBjb25zdCBzID0gcHJlcGFyZShvYmpzKTtcbiAgJGFwcC5sb2dnZXIoKS5lcnJvcihzKTtcbn07XG52YXIgbG9nID0gKC4uLm9ianMpID0+IHtcbiAgY29uc3QgcyA9IHByZXBhcmUob2Jqcyk7XG4gIGNvbnNvbGUubG9nKHMpO1xufTtcbi8vIEFubm90YXRlIHRoZSBDb21tb25KUyBleHBvcnQgbmFtZXMgZm9yIEVTTSBpbXBvcnQgaW4gbm9kZTpcbjAgJiYgKG1vZHVsZS5leHBvcnRzID0ge1xuICBkYmcsXG4gIGVycm9yLFxuICBpbmZvLFxuICBsb2csXG4gIHdhcm5cbn0pO1xuIiwgImltcG9ydCB7IGxvZyB9IGZyb20gJ3BvY2tldGJhc2UtbG9nJ1xuXG50cnkge1xuICBsb2coYHBvY29kZXggYm9vdHN0cmFwYClcbiAgbG9nKGBsb2FkaW5nIENMSWApXG4gIHJlcXVpcmUoJ3BvY29kZXgvZGlzdC9wYicpLkluaXQoKVxuICBsb2coJ3BvY29kZXggbG9hZGVkJylcbn0gY2F0Y2ggKGUpIHtcbiAgbG9nKGBXQVJOSU5HOiBwb2NvZGV4IG5vdCBsb2FkZWQ6ICR7ZX1gKVxuICBsb2coZSlcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQTtBQUFBLDZDQUFBQSxVQUFBQyxTQUFBO0FBQUE7QUFBQSxRQUFJQyxhQUFZLE9BQU87QUFDdkIsUUFBSUMsb0JBQW1CLE9BQU87QUFDOUIsUUFBSUMscUJBQW9CLE9BQU87QUFDL0IsUUFBSUMsZ0JBQWUsT0FBTyxVQUFVO0FBQ3BDLFFBQUksV0FBVyxDQUFDLFFBQVEsUUFBUTtBQUM5QixlQUFTLFFBQVE7QUFDZixRQUFBSCxXQUFVLFFBQVEsTUFBTSxFQUFFLEtBQUssSUFBSSxJQUFJLEdBQUcsWUFBWSxL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QUFFLEtBQUssQ0FBQztBQUFBLElBQ3RCO0FBQ0EsUUFBSSxPQUFPLElBQUksU0FBUztBQUN0QixZQUFNLElBQUksUUFBUSxJQUFJO0FBQ3RCLFdBQUssT0FBTyxFQUFFLEtBQUssQ0FBQztBQUFBLElBQ3RCO0FBQ0EsUUFBSSxRQUFRLElBQUksU0FBUztBQUN2QixZQUFNLElBQUksUUFBUSxJQUFJO0FBQ3RCLFdBQUssT0FBTyxFQUFFLE1BQU0sQ0FBQztBQUFBLElBQ3ZCO0FBQ0EsUUFBSU0sT0FBTSxJQUFJLFNBQVM7QUFDckIsWUFBTSxJQUFJLFFBQVEsSUFBSTtBQUN0QixjQUFRLElBQUksQ0FBQztBQUFBLElBQ2Y7QUFBQTtBQUFBOzs7QUMvRUE7QUFBQSw0QkFBb0I7QUFFcEIsSUFBSTtBQUNGLGlDQUFJLG1CQUFtQjtBQUN2QixpQ0FBSSxhQUFhO0FBQ2pCLFVBQVEsaUJBQWlCLEVBQUUsS0FBSztBQUNoQyxpQ0FBSSxnQkFBZ0I7QUFDdEIsU0FBUyxHQUFHO0FBQ1YsaUNBQUksZ0NBQWdDLENBQUMsRUFBRTtBQUN2QyxpQ0FBSSxDQUFDO0FBQ1A7IiwKICAibmFtZXMiOiBbImV4cG9ydHMiLCAibW9kdWxlIiwgIl9fZGVmUHJvcCIsICJfX2dldE93blByb3BEZXNjIiwgIl9fZ2V0T3duUHJvcE5hbWVzIiwgIl9faGFzT3duUHJvcCIsICJfX2NvcHlQcm9wcyIsICJyZXF1aXJlX2Rpc3QiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiX19kZWZQcm9wIiwgIl9fZ2V0T3duUHJvcERlc2MiLCAiX19nZXRPd25Qcm9wTmFtZXMiLCAiX19oYXNPd25Qcm9wIiwgIl9fY29weVByb3BzIiwgImxvZyJdCn0K