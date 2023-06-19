const handler = {
    get: function(obj, prop) {
      return prop in obj ? obj[prop] : 
    },
    set: function() {},
    ...
  }

// 基本用法：创建对象的代理，从而实现基本操作的拦截和自定义操作

function createReactiveObject(target, isReadOnly, baseHandlers, collectionHandlers, proxyMap) {
    ...
    // collectionHandlers: 处理Map、Set、WeakMap、WeakSet
    // baseHandlers: 处理数组、对象
    const proxy = new Proxy(
      target,
      targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
    )
    proxyMap.set(target, proxy)
    return proxy
  }
// 针对常用数组原型方法push、pop、shift、unshift、splice、sort、reverse进行了hack处理；
// 提供Vue.set监听对象/数组新增属性。对象的新增/删除响应，还可以new个新对象，新增则合并新属性和旧对象；
// 删除则将删除属性后的对象深拷贝给新对象

// 依赖收集
function createGetter(isReadonly = false, shallow = false) {
    return function get(target: Target, key: string | symbol, receiver: object) {
      ...
      // 数组类型
      const targetIsArray = isArray(target)
      if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver)
      }
      // 非数组类型
      const res = Reflect.get(target, key, receiver);
      
      // 对象递归调用
      if (isObject(res)) {
        return isReadonly ? readonly(res) : reactive(res)
      }
   
      return res
    }
  }
  
// 派发更新
  function createSetter() {
    return function set(target: Target, key: string | symbol, value: unknown, receiver: Object) {
      value = toRaw(value)
      oldValue = target[key]
      // 因 ref 数据在 set value 时就已 trigger 依赖了，所以直接赋值 return 即可
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value
        return true
      }
   
      // 对象是否有 key 有 key set，无 key add
      const hadKey = hasOwn(target, key)
      const result = Reflect.set(target, key, value, receiver)
      
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, TriggerOpTypes.ADD, key, value)
        } else if (hasChanged(value, oldValue)) {
          trigger(target, TriggerOpTypes.SET, key, value, oldValue)
        }
      }
      return result
    }
  }
  