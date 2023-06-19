function patchUnkeyedChildren(c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized) {
    c1 = c1 || EMPTY_ARR
    c2 = c2 || EMPTY_ARR
    const oldLength = c1.length
    const newLength = c2.length
    const commonLength = Math.min(oldLength, newLength)
    let i
    for(i = 0; i < commonLength; i++) {
      // 如果新 Vnode 已经挂载，则直接 clone 一份，否则新建一个节点
      const nextChild = (c2[i] = optimized ? cloneIfMounted(c2[i] as Vnode)) : normalizeVnode(c2[i])
      patch()
    }
    if(oldLength > newLength) {
      // 移除多余的节点
      unmountedChildren()
    } else {
      // 创建新的节点
      mountChildren()
    }
    
  }
