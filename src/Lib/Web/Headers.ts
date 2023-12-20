// Properties
export const getEntries = (headers: Headers): Array<[string, string]> => Array.from(headers.entries())
export const getKeys = (headers: Headers): Array<string> => Array.from(headers.keys())
export const getValues = (headers: Headers): Array<string> => Array.from(headers.values())

// Methods
export const create = (init: Array<[string, string]>): Headers => new Headers(init)
export const appendHeader = (headers: Headers) => (name: string) => (value: string): Headers => {
  headers.append(name, value)
  return create(getEntries(headers))
}
export const deleteHeader = (headers: Headers) => (name: string): Headers => {
  headers.delete(name)
  return create(getEntries(headers))
}
export const getHeaderImpl = (headers: Headers) => (name: string): string | null => headers.get(name)
export const hasHeader = (headers: Headers) => (name: string): boolean => headers.has(name)
export const setHeader = (headers: Headers) => (name: string) => (value: string): Headers => {
  headers.set(name, value)
  return create(getEntries(headers))
}
