import pkg from '../../package.json'

export const version = pkg.version
export const isDark = useDark()
export const toggleDark = useToggle(isDark)
export const getEnv = () => import.meta.env
export function sleep(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), timeout)
  })
}
