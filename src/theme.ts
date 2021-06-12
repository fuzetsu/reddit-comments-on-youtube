import z from 'zaftig'

export const theme = {
  light: z`
    $text-primary #444
    $text-secondary #666
    $link-color #1b3e92
    $button-bg #eee
  `,
  dark: z`
    $text-primary #fff
    $text-secondary #ddd
    $link-color #1b3e92
    $button-bg #555
  `,
  common: z`
    font-size 16
    color $text-primary
    button { font-size 16; color $text-primary; background $button-bg }
    a { color $link-color }
  `
}
