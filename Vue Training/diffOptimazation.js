function patchChildren(n1, n2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized) {
    // 获取新老孩子节点
    const c1 = n1 && n1.children
    const c2 = n2.children
    const prevShapeFlag = n1 ? n1.shapeFlag : 0
    const { patchFlag, shapeFlag } = n2
    
    // 处理 patchFlag 大于 0 
    if(patchFlag > 0) {
      if(patchFlag && PatchFlags.KEYED_FRAGMENT) {
        // 存在 key
        patchKeyedChildren()
        return
      } els if(patchFlag && PatchFlags.UNKEYED_FRAGMENT) {
        // 不存在 key
        patchUnkeyedChildren()
        return
      }
    }
    
    // 匹配是文本节点（静态）：移除老节点，设置文本节点
    if(shapeFlag && ShapeFlags.TEXT_CHILDREN) {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        unmountChildren(c1 as VNode[], parentComponent, parentSuspense)
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2 as string)
      }
    } else {
      // 匹配新老 Vnode 是数组，则全量比较；否则移除当前所有的节点
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense,...)
        } else {
          unmountChildren(c1 as VNode[], parentComponent, parentSuspense, true)
        }
      } else {
        
        if(prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
          hostSetElementText(container, )
        } 
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          mountChildren(c2 as VNodeArrayChildren, container,anchor,parentComponent,...)
        }
      }
    }
  }

  