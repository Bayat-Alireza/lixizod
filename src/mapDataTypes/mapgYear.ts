import { appendFile } from "fs/promises"
import { type LIXIType } from "../index.js"
import { rootDir } from "../utilities/appUtil.js"
import path from 'path'


const createGyearExpressions = (lixiTypes: LIXIType[]) => {
  const result = lixiTypes.reduce<string[]>((acc, cur) => {
    if (cur.base === 'xs:gYear') {
      const gYearLexicalRegEx = new RegExp('^-?([1-9][0-9]{3,}|0[0-9]{3})(Z|(\\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$')
      const errorMessage = 'Not a valid "gYear" with optional timezone or offset'
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

const createGyearTypes = async (lixiTypes: LIXIType[]) => {
  const file = path.join('simpleTypes', 'gYearTypes.ts')
  const enumExpression = createGyearExpressions(lixiTypes)
  await appendFile(file, "import {z} from 'zod'\n")
  enumExpression.forEach(async (ee) => {
    await appendFile(file, ee)
  })
}


export default createGyearTypes