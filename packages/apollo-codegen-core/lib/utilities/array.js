"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function maybePush(list, item) {
  if (!list.includes(item)) {
    list.push(item);
  }
  return list;
}
exports.maybePush = maybePush;
//# sourceMappingURL=array.js.map