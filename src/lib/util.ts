import { SCRIPT_NAME } from '../constants'

export const getById = (id: string) => document.getElementById(id)

export const q = (sel: string, ctx: Element | Document = document) => ctx.querySelector(sel)
export const qq = (sel: string, ctx: Element | Document = document) =>
  Array.from(ctx.querySelectorAll(sel))

export const decodeHTML = (input: string) => {
  const e = document.createElement('textarea')
  e.innerHTML = input
  return e.value
}

export const processRedditHTML = (html: string) =>
  decodeHTML(html).replace(/<a/gi, '<a target="_blank"')

export const pluralize = (word: string, count: number) => (count !== 1 ? word + 's' : word)

export const prettyTime = (date: string | Date) => {
  // This function was copied, and slightly adapted from John Resig's website: https://johnresig.com/files/pretty.js
  date = new Date(date)
  const diff = (Date.now() - date.getTime()) / 1000
  const day_diff = Math.floor(diff / 86400)

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return

  return (
    (day_diff == 0 &&
      ((diff < 60 && 'just now') ||
        (diff < 120 && '1 minute ago') ||
        (diff < 3600 && Math.floor(diff / 60) + ' minutes ago') ||
        (diff < 7200 && '1 hour ago') ||
        (diff < 86400 && Math.floor(diff / 3600) + ' hours ago'))) ||
    (day_diff == 1 && 'Yesterday') ||
    (day_diff < 7 && day_diff + ' days ago') ||
    (day_diff < 31 && Math.ceil(day_diff / 7) + ' weeks ago')
  )
}

export const anim = (element: Element, callback: EventListener, type = 'end', unbind = true) => {
  const handler: EventListener = e => {
    if (unbind) element.removeEventListener('animation' + type, handler)
    callback(e)
  }
  element.addEventListener('animation' + type, handler)
}

const namePart = [`%c${SCRIPT_NAME}:`, 'color:indigo']
export const log = <T>(first: T, ...rest: any[]) => (
  console.log(...namePart, first, ...rest), first
)
export const logError = (...rest: any[]) => console.log(...namePart, ...rest)
