// 渲染函数
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, 
    openBlock as _openBlock, createElementBlock as _createElementBlock, 
    pushScopeId as _pushScopeId, popScopeId as _popScopeId } from vue
 
const _withScopeId = n => (_pushScopeId(scope-id),n=n(),_popScopeId(),n)
const _hoisted_1 = { id: app }
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode(h1, null, 你好, -1 /* HOISTED */))
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode(p, null, 今天天气真不错, -1 /* HOISTED */))
 
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock(div, _hoisted_1, [
    _hoisted_2,
    _hoisted_3,
    _createElementVNode(div, null, _toDisplayString(_ctx.name), 1 /* TEXT */)
  ]))
}

// 注意第 3 个_createElementVNode的第 4 个参数即patchFlag字段类型，字段类型情况如下所示:
// 1代表节点为动态文本节点，那在 diff 过程中，只需比对文本对容，“无需关注 class、style”等。（通过“位运算”全部转化为动态文本节点1）
// 除此之外，发现所有的静态节点，都保存为一个变量进行静态提升，可在重新渲染时直接引用，无需重新创建。


// PatchFlags字段表
export const enum PatchFlags { 
    TEXT = 1, // 动态文本内容-------------------------------------------------> 对应动态text区域渲染
    CLASS = 1 << 1, // 动态类名
    STYLE = 1 << 2, // 动态样式
    PROPS = 1 << 3, // 动态属性，不包含类名和样式
    FULL_PROPS = 1 << 4, // 具有动态 key 属性，当 key 改变，需要进行完整的 diff 比较
    HYDRATE_EVENTS = 1 << 5, // 带有监听事件的节点
    STABLE_FRAGMENT = 1 << 6, // 不会改变子节点顺序的 fragment
    KEYED_FRAGMENT = 1 << 7, // 带有 key 属性的 fragment 或部分子节点
    UNKEYED_FRAGMENT = 1 << 8,  // 子节点没有 key 的fragment
    NEED_PATCH = 1 << 9, // 只会进行非 props 的比较
    DYNAMIC_SLOTS = 1 << 10, // 动态的插槽
    HOISTED = -1,  // 静态节点，diff阶段忽略其子节点 -----------------------------> 对应静态text区域渲染
    BAIL = -2 // 代表 diff 应该结束
  }
