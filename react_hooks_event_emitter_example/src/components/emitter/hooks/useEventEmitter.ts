import { DependencyList, useCallback, useContext, useEffect } from 'react'
import { EventEmitterRCContext } from '../EventEmitterRC'
import { BaseEvents } from '../util/EventEmitter'

function useEmit<Events extends BaseEvents>() {
  const em = useContext(EventEmitterRCContext)
  return useCallback(
    <E extends keyof Events>(type: E, ...args: Events[E]) => {
      console.log('emitter emit: ', type, args)
      em.emit(type, ...args)
    },
    [em],
  )
}

export function useEventEmitter<Events extends BaseEvents>() {
  const emit = useEmit()
  return {
    useListener: <E extends keyof Events>(
      type: E,
      listener: (...args: Events[E]) => void,
      deps: DependencyList = [],
    ) => {
      const em = useContext(EventEmitterRCContext)
      useEffect(() => {
        console.log('emitter add: ', type, listener)
        em.add(type, listener)
        return () => {
          console.log('emitter remove: ', type, listener)
          em.remove(type, listener)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [listener, type, ...deps])
    },
    emit,
  }
}
