import { appendFile } from "fs/promises"
import { type LIXIType } from "../index.js"
import { rootDir } from "../utilities/appUtil.js"
import path from 'path'

const createIntegerExpressions = (lixiTypes: LIXIType[]) => {
  const result = lixiTypes.reduce<string[]>((acc, cur) => {
    if (cur.base === 'xs:integer') {
      let zExpression = 'z.number().int()'
      cur.restriction.forEach((rCur) => {
        if (Object.hasOwn(rCur, 'minExclusive')) {
          (zExpression += `".gt(${rCur['minExclusive'].value})"`)
        }
        if (Object.hasOwn(rCur, 'minInclusive')) {
          (zExpression += `"gte.(${rCur['minExclusive'].value})"`)
        }
        if (Object.hasOwn(rCur, 'maxExclusive')) {
          (zExpression += `".lt(${rCur['maxExclusive'].value})"`)
        }
        if (Object.hasOwn(rCur, 'maxInclusive')) {
          (zExpression += `".lte(${rCur['maxExclusive'].value})"`)
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

const createIntegerTypes = async (lixiTypes: LIXIType[]) => {
  const file = path.join('simpleTypes', 'integerTypes.ts')
  const enumExpression = createIntegerExpressions(lixiTypes)
  await appendFile(file, "import {z} from 'zod'\n")
  enumExpression.forEach(async (ee) => {
    await appendFile(file, ee)
  })
}


export default createIntegerTypes