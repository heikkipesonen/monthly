import { some, none } from 'fp-ts/lib/Option'
import { format } from 'date-fns'
import { PurhcaseEntry } from 'src/types/purchase-entry';

export const readFile = (files: FileList): Promise<string> =>
  new Promise((resolve, reject) => {
    const file = files[0]
    if (file.type !== 'text/plain') {
      throw new Error('unsupported filetype')
    }
    const r = new FileReader()
    r.onload = () => resolve(r.result as string)
    r.onerror = () => reject()
    r.readAsText(file)
  })


export const parseDate = (date: string) => {
  if (date.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/g)) {
    const [day, month, year] = date.split('.')
    const dt = new Date(0)
    dt.setDate(Number(day))
    dt.setMonth(Number(month) - 1)
    dt.setFullYear(Number(year))

    return some(dt)
  }

  return none
}

export const toDateString = (date: Date) =>
  format(date, 'DD.MM.YYYY')


export const parse = (src: string) => {
  const lines = src.split('\n')
  const models: PurhcaseEntry[] = []

  while (lines.length) {
    const line = lines.shift()
    if (line) {
      const t = line.trim()
      if (t.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/g)) {
        const [desc, value] = lines.splice(0, 2)
        PurhcaseEntry.from({
          date: t,
          value: Number(`${value}`.replace(",", ".")) || 0,
          desc,
          group: null
        }).map((e) => models.push(e))
      }
    }
  }

  return models
}

export const getKeywordSeparator = (src: string) =>
  src.match(/[.\.{1,}]/) && '.' ||
  src.match(/[.\,{1,}]/) && ',' ||
  src.match(/[.\;{1,}]/) && ';' ||
  ' '

export const extractKeywords = (src: string) =>
  src.split(getKeywordSeparator(src))
    .reduce((result: string[], word) =>
      result.indexOf(word) === -1 ? [...result, word] : result, [])
      .filter((word) => !!word)