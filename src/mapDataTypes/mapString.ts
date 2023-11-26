import { appendFile } from "fs/promises"
import { type LIXIType } from "../index.js"
import { rootDir } from "../utilities/appUtil.js"
import path from 'path'

const createStringExpressions = (lixiTypes: LIXIType[]) => {
  const result = lixiTypes.reduce<string[]>((acc, cur) => {
    if (cur.base === 'xs:string') {
      let zExpression = 'z.string()'
      cur.restriction.forEach((rCur) => {
        if (Object.hasOwn(rCur, 'length')) {
          (zExpression += `".length(${rCur['length'].value})"`)
        }
        if (Object.hasOwn(rCur, 'minLength')) {
          (zExpression += `".min(${rCur['minLength'].value})"`)
        }
        if (Object.hasOwn(rCur, 'maxLength')) {
          (zExpression += `".max(${rCur['maxLength'].value})"`)
        }


      }, [])

      if (cur.name) {
        acc.push(`export const ${cur.name} = ${zExpression}
          `.toString())

      }
    }

    return acc
  }, [])
  return result
}

const createStringTypes = async (lixiTypes: LIXIType[]) => {
  const file = path.join('simpleTypes', 'stringTypes.ts')
  const enumExpression = createStringExpressions(lixiTypes)
  await appendFile(file, "import {z} from 'zod'\n")
  enumExpression.forEach(async (ee) => {
    await appendFile(file, ee)
  })
}


export default createStringTypes