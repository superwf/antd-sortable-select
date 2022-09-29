import path from 'path'

export const resolveRoot = (relativePath: string) => path.resolve(process.cwd(), relativePath)
