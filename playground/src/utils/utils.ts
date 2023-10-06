import pkg from '../../package.json'

export const version = pkg.version
export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export const getEnv = () => import.meta.env
