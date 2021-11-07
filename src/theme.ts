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

export const Themes = {
  light: generateTheme({
    background: '#fefefe',
    text: { normal: '#444', subdued: '#666' },
    link: { color: '#1b3e92' },
    button: { background: '#eee' },
    ups: '#ff8300'
  }),
  dark: generateTheme({
    background: '#191919',
    text: { normal: '#fff', subdued: '#b2b2b2' },
    link: { color: '#6e96b7' },
    button: { background: '#303030' },
    ups: 'orange'
  }),
  common: z`
    font-size 16
    color $text-normal
    background $background
    text-align left

    button { font-size 16; color $text-normal; background $button-background }
    a {
      color $link-color
      text-decoration none
      :hover { text-decoration underline }
    }
  `
} as const

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

export const CommentBorderColors = {
  day: [
    'rgb(226, 26, 25)',
    'rgb(243, 146, 51)',
    'rgb(249, 231, 49)',
    'rgb(84, 166, 76)',
    'rgb(54, 141, 238)'
  ],
  night: [
    'rgb(226, 26, 25)',
    'rgb(243, 146, 51)',
    'rgb(249, 231, 49)',
    'rgb(84, 166, 76)',
    'rgb(54, 141, 238)'
  ]
} as const
