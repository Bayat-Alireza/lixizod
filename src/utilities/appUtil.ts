import { fileURLToPath } from "url"

const rootFile = fileURLToPath(import.meta.url)
const rootDir = fileURLToPath(new URL("..", import.meta.url))
export {
  rootDir,
  rootFile
}


