// import { DOMParser } from '@xmldom/xmldom'
// import libxml from "libxmljs"
import { string, z } from 'zod'
import { rootDir, rootFile } from "./utilities/appUtil.js"
import { fileURLToPath } from "url"
import { constants, readFile, writeFile } from 'fs/promises'
import { writeFile as wfs, constants as Sconstants } from 'fs'
import path from 'path'
// import { blob } from 'stream/consumers'
import MainSchema from './models/MainSchema.js'
import { XMLElement } from "libxmljs"
import { LIXIItem } from "./models/LIXIItem.js"
import { AnnotationProps, AttributeInlineAttributes, ElementInlineAttributes } from "./models/types.js"
import LIXIAttribute from "./models/LIXIAttribute.js"
import LIXIElement from "./models/LIXIElement.js"
import LIXIEnumeration from "./models/LIXIEnumeration.js"
import LIXISimpleType from './models/LIXISimpleType.js'
import createZodEnums from './mapDataTypes/mapList.js'
import createRegexPattern from './mapDataTypes/mapPattern.js'
import createIntegerTypes from './mapDataTypes/mapInteger.js'
import createDecimalTypes from './mapDataTypes/mapDecimal.js'
import createStringTypes from './mapDataTypes/mapString.js'
import createBase64BinaryTypes from './mapDataTypes/mapBase64Binary.js'
import createDateTimeTypes from './mapDataTypes/mapDateTime.js'
import createDateTypes from './mapDataTypes/mapDate.js'
import createGyearTypes from './mapDataTypes/mapgYear.js'
import createIdTypes from './mapDataTypes/mapID.js'
import createIDREFTypes from './mapDataTypes/mapIDREF.js'
// import { gYearType } from './LXITypes/gYearTypes.js'


export type LIXIType = { name: string, base: string, transactions: string, restriction: { [key: string]: { value: string, transaction: string } }[] }
console.log('hello world!!!', import.meta.url, fileURLToPath(import.meta.url), rootDir)

const main = async () => {

  try {
    const schema = await readFile(path.join(rootDir, "..", "data", "master-2-2-67.xsd"))

    const mainSchema = new MainSchema(schema)
    console.log(mainSchema.getPaths("xs:attribute").length, ' - Attributes')
    console.log(mainSchema.getPaths("xs:element").length, " - Element")
    console.log(mainSchema.getPaths("xs:enumeration").length, " - Enumerations")
    console.log(mainSchema.getPaths('xs:complexType').length, " - ComplexTypes")
    console.log(mainSchema.getPaths("xs:simpleType").length, " - simpleTypes")
    const simpleTypes = mainSchema.getItemsByLocalName('xs:simpleType')
    const lixiTypes = simpleTypes.reduce<LIXIType[]>((acc, simCur) => {
      const base = (simCur.find('.//xs:restriction', mainSchema.ns)[0] as XMLElement).getAttribute('base')?.value() || ''
      const name = simCur.getAttribute('name')?.value() || ''
      const transactions = LIXISimpleType.create(simCur).item.annotationHelper.get('li:transactions') || ''
      const rs = simCur.find('.//xs:restriction', mainSchema.ns)[0].childNodes() as XMLElement[]
      const restriction = rs.reduce<{ [key: string]: { value: string, transaction: string } }[]>((acc, cur) => {
        if (base === 'xs:token' && cur.type() === 'element') {
          const n = cur.name()
          const s: { [key: string]: { value: string, transaction: string } } = {}
          s[n] = { value: cur.getAttribute('value')?.value() || '', transaction: LIXIEnumeration.create(cur).item.annotationHelper.get('li:transactions') || '' }

          acc.push(s)
        }
        if (base !== 'xs:token' && cur.type() === 'element') {
          const n = cur.name()
          const s: { [key: string]: { value: string, transaction: string } } = {}
          s[n] = { value: cur.getAttribute('value')?.value() || '', transaction: '' }
          acc.push(s)
        }
        return acc
      }, [])
      acc.push({ name, base, transactions, restriction })
      return acc
    }, [])

    const LIXITypeNonToken = lixiTypes.reduce<{ name: string, base: string }[]>((acc, cur) => {
      if (cur.base !== 'xs:token') {
        acc.push(cur)
      }
      return acc
    }, [])
    // console.log(lixiTypes)
    // writeFile('LIXIType.json', JSON.stringify(lixiTypes))
    // writeFile('LIXITypeNonToken.json', JSON.stringify(LIXITypeNonToken))


    await createZodEnums(lixiTypes)
    await createRegexPattern(lixiTypes)
    await createIntegerTypes(lixiTypes)
    await createDecimalTypes(lixiTypes)
    await createStringTypes(lixiTypes)
    await createBase64BinaryTypes(lixiTypes)
    await createDateTimeTypes(lixiTypes)
    await createDateTypes(lixiTypes)
    await createGyearTypes(lixiTypes)
    await createIdTypes(lixiTypes)
    await createIDREFTypes(lixiTypes)

    console.log((mainSchema.getItemsByLocalName('xs:element'))[1].getAttribute('name')?.value())
    console.log(mainSchema.getItemByPath('Package.Content.Account.Fees.Fee.Type'))
    const itemEle = mainSchema.getItemByPath('Package.Content.Account.AccountHolders.AccountHolder')
    const item = mainSchema.getItemByPath('Package.Content.Account.AccountHolders.AccountHolder.x_AccountHolder')
    const lixiAttribute = LIXIAttribute.create(item)
    const lixiElement = LIXIElement.create(itemEle)
    console.log((lixiAttribute.item.annotation('lx:path')))
    console.log((lixiAttribute.inlineAttributes))
    console.log((lixiElement.item.annotation('lx:path')))
    console.log((lixiElement.inlineAttributes))


    z.string().u

    const mySchema = z.string().regex(new RegExp('^-?([1-9][0-9]{3,}|0[0-9]{3})(Z|(\\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$'), 'Not a valid "gYear"')
    console.log(mySchema.parse('2002-14:00'))
    // console.log(gYearType.safeParse('2002-14:001'))
  } catch (error) {
    console.log(error)
  }

}



console.log('hello world!!')

main()
