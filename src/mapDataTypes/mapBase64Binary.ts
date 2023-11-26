import { appendFile } from "fs/promises"
import { type LIXIType } from "../index.js"
import { rootDir } from "../utilities/appUtil.js"
import path from 'path'


const createBase64BinaryExpressions = (lixiTypes: LIXIType[]) => {
  const result = lixiTypes.reduce<string[]>((acc, cur) => {
    if (cur.base === 'xs:base64Binary') {
      let zExpression = 'z.string().refine(Base64.isValid)'


      if (cur.name) {
        acc.push(`export const ${cur.name} = ${zExpression}
          `.toString())

      }
    }

    return acc
  }, [])
  return result
}

const createBase64BinaryTypes = async (lixiTypes: LIXIType[]) => {
  const file = path.join('simpleTypes', 'base64BinaryTypes.ts')
  const enumExpression = createBase64BinaryExpressions(lixiTypes)
  await appendFile(file, "import {z} from 'zod'\n import { Base64 } from 'js-base64'\n")
  enumExpression.forEach(async (ee) => {
    await appendFile(file, ee)
  })
}


export default createBase64BinaryTypes