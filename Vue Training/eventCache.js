// 渲染函数
import { createElementVNode as _createElementVNode, 
    toDisplayString as _toDisplayString, 
    openBlock as _openBlock, 
    createElementBlock as _createElementBlock, 
    pushScopeId as _pushScopeId, 
    popScopeId as _popScopeId } from vue
 
const _withScopeId = n => (_pushScopeId(scope-id),n=n(),_popScopeId(),n)
const _hoisted_1 = { id: app }
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode(h1, null, 你好, -1 /* HOISTED */))
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode(p, null, 今天天气真不错, -1 /* HOISTED */))
const _hoisted_4 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode(span, { onCLick: () => {} }, [
  /*#__PURE__*/_createElementVNode(span)
], -1 /* HOISTED */)) // 
// ---------------------------> 对照VDOM的patchFlag字段类型，HOISTED = -1,  为静态节点，所以diff阶段忽略其子节点，因此是缓存状态！！
 
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock(div, _hoisted_1, [
    _hoisted_2,
    _hoisted_3,
    _createElementVNode(div, null, _toDisplayString(_ctx.name), 1 /* TEXT */),
    _hoisted_4  // ----------> 已缓存事件
  ]))
}

// ---------------------------> _cache = cacheHandle 第一次渲染DOM后缓存事件
