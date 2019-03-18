
export type ClickListener<T> = (payload: T, cb: (payload: T) => void) => () => void
