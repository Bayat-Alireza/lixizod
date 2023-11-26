import { appendFile } from "fs/promises"
import { type LIXIType } from "../index.js"
import { rootDir } from "../utilities/appUtil.js"
import path from 'path'

const createDateTimeExpressions = (lixiTypes: LIXIType[]) => {
  const result = lixiTypes.reduce<string[]>((acc, cur) => {
    if (cur.base === 'xs:dateTime') {
      let zExpression = 'z.string().datetime({ offset: true })'


      if (cur.name) {
        acc.push(`export const ${cur.name} = ${zExpression}
          `.toString())

      }
    }

    return acc
  }, [])
  return result
}

const createDateTimeTypes = async (lixiTypes: LIXIType[]) => {
  const file = path.join('simpleTypes', 'dateTimeTypes.ts')
  const enumExpression = createDateTimeExpressions(lixiTypes)
  await appendFile(file, "import {z} from 'zod'\n")
  enumExpression.forEach(async (ee) => {
    await appendFile(file, ee)
  })
}


export default createDateTimeTypes