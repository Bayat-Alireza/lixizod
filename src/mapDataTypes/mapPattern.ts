import { appendFile } from "fs/promises"
import { type LIXIType } from "../index.js"
import { rootDir } from "../utilities/appUtil.js"
import path from 'path'

const createRegexExpression = (lixiTypes: LIXIType[]) => {
  const result = lixiTypes.reduce<string[]>((acc, cur) => {
    if (cur.base === 'xs:string') {
      const regex = cur.restriction.reduce<string[]>((rAcc, rCur) => {
        rAcc.push(`"${rCur['pattern'].value}"`)
        return rAcc
      }, [])

      if (regex.length && cur.name) {
        acc.push(`export const ${cur.name} = z.string().regex(new RegExp('${regex.at(0)}'))
          `.toString())

      }
    }

    return acc
  }, [])
  return result
}

const createRegexPattern = async (lixiTypes: LIXIType[]) => {
  const file = path.join('simpleTypes', 'patternTypes.ts')
  const enumExpression = createRegexExpression(lixiTypes)
  await appendFile(file, "import {z} from 'zod'\n")
  enumExpression.forEach(async (ee) => {
    await appendFile(file, ee)
  })
}


export default createRegexPattern