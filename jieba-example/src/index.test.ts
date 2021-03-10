import nodejieba from 'nodejieba'

enum Lang {
  En,
  ZhCN
}

type Snippet = { type: Lang, str: string }

function getLang(s: string): Lang {
  if (/[\u4e00-\u9fa5]/.test(s)) {
    return Lang.ZhCN
  }
  return Lang.En
}

function group(str: string): Snippet[] {
  const arr = str.split('')
  const res: Snippet[] = []
  let last = Lang.En
  let temp = ''
  for (let s of arr) {
    let lang = getLang(s)
    if (lang === last) {
      temp += s
    } else {
      res.push({
        type: last,
        str: temp,
      })
      temp = s
      last = lang
    }
  }
  res.push({
    type: last,
    str: temp,
  })
  return res
}

function split(snippet: Snippet): string[] {
  const str = snippet.str
  switch (snippet.type) {
    case Lang.En:
      return str.split(' ')
    case Lang.ZhCN:
      return nodejieba.cut(str)
  }
}

function f(str: string): string[] {
  return group(str)
    .flatMap(split)
    .filter(s => s.length !== 0)
}


describe('test', () => {
  it('Test Chinese', () => {
    const result = nodejieba.cut('工具清单')
    console.log(result) // [ '工具', '清单' ]
  })
  it('Test mixed Chinese and English', () => {
    console.log(f('Windows 工具清单')) // [ 'Windows', '工具', '清单' ]
  })
})
