import { appendFile } from "fs/promises"
import { type LIXIType } from "../index.js"
import { rootDir } from "../utilities/appUtil.js"
import path from 'path'

const createEnumExpression = (lixiTypes: LIXIType[]) => {
  const result = lixiTypes.reduce<string[]>((acc, cur) => {
    if (cur.base === 'xs:token') {
      const enumerations = cur.restriction.reduce<string[]>((rAcc, rCur) => {
        rAcc.push(`"${rCur['enumeration'].value}"`)
        return rAcc
      }, [])

      if (enumerations.length && cur.name) {
        acc.push(`export const ${cur.name} = z.enum([${[...enumerations]}])
          `.toString())

      }
    }

    return acc
  }, [])
  return result
}

const createZodEnums = async (lixiTypes: LIXIType[]) => {
  const file = path.join('simpleTypes', 'listTypes.ts')
  const enumExpression = createEnumExpression(lixiTypes)
  await appendFile(file, "import {z} from 'zod'\n")
  enumExpression.forEach(async (ee) => {
    await appendFile(file, ee)
  })
}


export default createZodEnums