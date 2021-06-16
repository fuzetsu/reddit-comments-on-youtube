import z from 'zaftig'

export interface Theme {
  background: string
  ups: string
  text: {
    normal: string
    subdued: string
  }
  link: {
    color: string
  }
  button: {
    background: string
  }
}

export const themes = {
  light: generateTheme({
    background: '#fefefe',
    text: { normal: '#444', subdued: '#666' },
    link: { color: '#1b3e92' },
    button: { background: '#eee' },
    ups: '#ff8300'
  }),
  dark: generateTheme({
    background: '#333',
    text: { normal: '#fff', subdued: '#ddd' },
    link: { color: '#1b3e92' },
    button: { background: '#555' },
    ups: 'orange'
  }),
  common: z`
    padding 5
    font-size 16
    color $text-normal
    background $background
    button { font-size 16; color $text-normal; background $button-background }
    a { 
      color $link-color
      text-decoration none
      :hover { text-decoration underline }
    }
  `
}

export function generateTheme(theme: Theme) {
  const getVars = <T>(obj: T, parents: string[] = []) =>
    Object.entries(obj).reduce((acc, [k, v]) => {
      const cur = [...parents, k]
      if (typeof v === 'object') Object.assign(acc, getVars(v, cur))
      else acc[cur.join('-')] = v
      return acc
    }, {} as { [name: string]: string })
  return z(Object.entries(getVars(theme)).reduce((acc, [k, v]) => `${acc}$${k} ${v};`, ''))
}
