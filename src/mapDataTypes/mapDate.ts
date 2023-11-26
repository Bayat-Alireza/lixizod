import { appendFile } from "fs/promises"
import { type LIXIType } from "../index.js"
import { rootDir } from "../utilities/appUtil.js"
import path from 'path'

const createDateExpressions = (lixiTypes: LIXIType[]) => {
  const result = lixiTypes.reduce<string[]>((acc, cur) => {
    if (cur.base === 'xs:date') {
      const gYearLexicalRegEx = new RegExp('^-?([1-9][0-9]{3,}|0[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])(Z|(\\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$')
      const errorMessage = 'Not a valid "date" with optional timezone or offset'
      let zExpression = `z.string().regex(${gYearLexicalRegEx}, '${errorMessage}')`


      if (cur.name) {
        acc.push(`export const ${cur.name} = ${zExpression}
          `.toString())

      }
    }

    return acc
  }, [])
  return result
}

const createDateTypes = async (lixiTypes: LIXIType[]) => {
  const file = path.join('simpleTypes', 'dateTypes.ts')
  const enumExpression = createDateExpressions(lixiTypes)
  await appendFile(file, "import {z} from 'zod'\n")
  enumExpression.forEach(async (ee) => {
    await appendFile(file, ee)
  })
}


export default createDateTypes