import { appendFile } from "fs/promises"
import { type LIXIType } from "../index.js"
import { rootDir } from "../utilities/appUtil.js"
import path from 'path'

const createIdExpressions = (lixiTypes: LIXIType[]) => {
  const result = lixiTypes.reduce<string[]>((acc, cur) => {
    if (cur.base === 'xs:ID') {
      let zExpression = `z.string().uuid({message:'invalid ID'})`


      if (cur.name) {
        acc.push(`export const ${cur.name} = ${zExpression}
          `.toString())

      }
    }

    return acc
  }, [])
  return result
}

const createIdTypes = async (lixiTypes: LIXIType[]) => {
  const file = path.join('simpleTypes', 'IDTypes.ts')
  const enumExpression = createIdExpressions(lixiTypes)
  await appendFile(file, "import {z} from 'zod'\n")
  enumExpression.forEach(async (ee) => {
    await appendFile(file, ee)
  })
}


export default createIdTypes