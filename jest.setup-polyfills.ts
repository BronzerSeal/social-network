const util = require("util");

if (!globalThis.TextEncoder) {
  globalThis.TextEncoder = util.TextEncoder;
}

if (!globalThis.TextDecoder) {
  globalThis.TextDecoder = util.TextDecoder;
}
