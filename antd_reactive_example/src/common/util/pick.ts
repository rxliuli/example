export function pick<T extends object, K extends keyof T>(
    obj: T,
    fieldList: K[],
): Pick<T, K> {
    const set = new Set(fieldList)
    return Object.entries(obj).reduce((res, [k, v]) => {
        if (set.has(k as K)) {
            Reflect.set(res, k, v)
        }
        return res
    }, {} as any)
}
