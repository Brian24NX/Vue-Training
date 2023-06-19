// patchKeyedChildren源码，有运用最长递增序列的算法思想。

function patchKeyedChildren(c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized) {
    let i = 0;
    const e1 = c1.length - 1
    const e2 = c2.length - 1
    const l2 = c2.length
    
    // 从头开始遍历，若新老节点是同一节点，执行 patch 更新差异；否则，跳出循环 
    while(i <= e1 && i <= e2) {
      const n1 = c1[i]
      const n2 = c2[i]
      
      if(isSameVnodeType) {
        patch(n1, n2, container, parentAnchor, parentComponent, parentSuspense, isSvg, optimized)
      } else {
        break
      }
      i++
    }
    
    // 从尾开始遍历，若新老节点是同一节点，执行 patch 更新差异；否则，跳出循环 
    while(i <= e1 && i <= e2) {
      const n1 = c1[e1]
      const n2 = c2[e2]
      if(isSameVnodeType) {
        patch(n1, n2, container, parentAnchor, parentComponent, parentSuspense, isSvg, optimized)
      } else {
        break
      }
      e1--
      e2--
    }
    
    // 仅存在需要新增的节点
    if(i > e1) {    
      if(i <= e2) {
        const nextPos = e2 + 1
        const anchor = nextPos < l2 ? c2[nextPos] : parentAnchor
        while(i <= e2) {
          patch(null, c2[i], container, parentAnchor, parentComponent, parentSuspense, isSvg, optimized)
        }
      }
    }
    
    // 仅存在需要删除的节点
    else if(i > e2) {
      while(i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true)    
      }
    }
    
    // 新旧节点均未遍历完
    // [i ... e1 + 1]: a b [c d e] f g
    // [i ... e2 + 1]: a b [e d c h] f g
    // i = 2, e1 = 4, e2 = 5
    else {
      const s1 = i
      const s2 = i
      // 缓存新 Vnode 剩余节点 上例即{e: 2, d: 3, c: 4, h: 5}
      const keyToNewIndexMap = new Map()
      for (i = s2; i <= e2; i++) {
        const nextChild = (c2[i] = optimized
            ? cloneIfMounted(c2[i] as VNode)
            : normalizeVNode(c2[i]))
        
        if (nextChild.key != null) {
          if (__DEV__ && keyToNewIndexMap.has(nextChild.key)) {
            warn(
              `Duplicate keys found during update:`,
               JSON.stringify(nextChild.key),
              `Make sure keys are unique.`
            )
          }
          keyToNewIndexMap.set(nextChild.key, i)
        }
      }
    }
    
    let j = 0
    // 记录即将 patch 的 新 Vnode 数量
    let patched = 0
    // 新 Vnode 剩余节点长度
    const toBePatched = e2 - s2 + 1
    // 是否移动标识
    let moved = false
    let maxNewindexSoFar = 0
    
    // 初始化 新老节点的对应关系（用于后续最大递增序列算法）
    const newIndexToOldIndexMap = new Array(toBePatched)
    for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0
    
    // 遍历老 Vnode 剩余节点
    for (i = s1; i <= e1; i++) {
      const prevChild = c1[i]
      
      // 代表当前新 Vnode 都已patch，剩余旧 Vnode 移除即可
      if (patched >= toBePatched) {
        unmount(prevChild, parentComponent, parentSuspense, true)
        continue
      }
      
      let newIndex
      // 旧 Vnode 存在 key，则从 keyToNewIndexMap 获取
      if (prevChild.key != null) {
        newIndex = keyToNewIndexMap.get(prevChild.key)
      // 旧 Vnode 不存在 key，则遍历新 Vnode 获取
      } else {
        for (j = s2; j <= e2; j++) {
          if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j] as VNode)){
             newIndex = j
             break
          }
        }           
     }
     
     // 删除、更新节点
     // 新 Vnode 没有 当前节点，移除
     if (newIndex === undefined) {
       unmount(prevChild, parentComponent, parentSuspense, true)
     } else {
       // 旧 Vnode 的下标位置 + 1，存储到对应 新 Vnode 的 Map 中
       // + 1 处理是为了防止数组首位下标是 0 的情况，因为这里的 0 代表需创建新节点
       newIndexToOldIndexMap[newIndex - s2] = i + 1
       
       // 若不是连续递增，则代表需要移动
       if (newIndex >= maxNewIndexSoFar) {
         maxNewIndexSoFar = newIndex
       } else {
         moved = true
       }
       
       patch(prevChild,c2[newIndex],...)
       patched++
     }
    }
    
    // 遍历结束，newIndexToOldIndexMap = {0:5, 1:4, 2:3, 3:0}
    // 新建、移动节点
    const increasingNewIndexSequence = moved
    // 获取最长递增序列
    ? getSequence(newIndexToOldIndexMap)
    : EMPTY_ARR
    
    j = increasingNewIndexSequence.length - 1
   
    for (i = toBePatched - 1; i >= 0; i--) {
      const nextIndex = s2 + i
      const nextChild = c2[nextIndex] as VNode
      const anchor = extIndex + 1 < l2 ? (c2[nextIndex + 1] as VNode).el : parentAnchor
      // 0 新建 Vnode
      if (newIndexToOldIndexMap[i] === 0) {
        patch(null,nextChild,...)
      } else if (moved) {
        // 移动节点
        if (j < 0 || i !== increasingNewIndexSequence[j]) {
          move(nextChild, container, anchor, MoveType.REORDER)
        } else {
          j--
        }
      }
    }
  }