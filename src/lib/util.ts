import { SCRIPT_NAME } from 'constants'

export const getById = (id: string) => document.getElementById(id)

export const q = <T extends HTMLElement>(sel: string, ctx: Element | Document = document) =>
  ctx.querySelector<T>(sel)
export const qq = <T extends HTMLElement>(sel: string, ctx: Element | Document = document) =>
  Array.from(ctx.querySelectorAll<T>(sel))

export const decodeHTML = (input: string) => {
  const e = document.createElement('textarea')
  e.innerHTML = input
  return e.value
}

export const processRedditHTML = (html: string) =>
  decodeHTML(html).replace(/<a/gi, '<a target="_blank"')

export const pluralize = (word: string, count: number) => (count !== 1 ? word + 's' : word)

export const prettyTime = (
  date: string | Date | number,
  fallback?: 'date' | 'date-time' | 'time'
) => {
  // This function was copied, and slightly adapted from John Resig's website: https://johnresig.com/files/pretty.js
  date = new Date(date)
  const diff = (Date.now() - date.getTime()) / 1000
  const day_diff = Math.floor(diff / 86400)

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) {
    if (fallback === 'date') return date.toLocaleString()
    if (fallback === 'date-time')
      return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`
    if (fallback === 'time') return date.toLocaleTimeString()
    return
  }

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

export const anim = (
  element: HTMLElement,
  callback: EventListener,
  type = 'end',
  unbind = true
) => {
  const handler: EventListener = e => {
    if (unbind) element.removeEventListener('animation' + type, handler)
    callback(e)
  }
  element.addEventListener('animation' + type, handler)
}

const namePart = [`%c${SCRIPT_NAME}:`, 'color:#ddd']
export const log = <T>(first: T, ...rest: unknown[]) => (
  console.log(...namePart, first, ...rest), first
)
export const logError = (...rest: unknown[]) => console.log(...namePart, ...rest)

export const subURI = (template: string, subs: { [key: string]: string }) =>
  Object.entries(subs).reduce(
    (acc, [k, v]) => acc.replace(':' + k, encodeURIComponent(v)),
    template
  )

export const buildQuery = (params: { [key: string]: string | undefined }) => {
  const data = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => v && data.append(k, v))
  return data.toString()
}

export const throttle = <T extends (...args: unknown[]) => void>(ms: number, cb: T) => {
  let lastCall = 0
  let id = -1

  const throttled = (...args: Parameters<T>) => {
    clearTimeout(id)
    const now = Date.now()
    const delta = now - lastCall
    if (delta < ms) {
      id = setTimeout(throttled, delta - ms + 5)
      return
    }
    lastCall = now
    cb(...args)
  }

  return throttled
}

export const sleep = (ms: number) => new Promise<void>(res => setTimeout(res, ms))

export const reduceCount = (count: number, digits = 1) => {
  let indicator, divisor

  if (count > 999999) {
    indicator = 'M'
    divisor = 1000000
  } else if (count > 999) {
    indicator = 'k'
    divisor = 1000
  }

  // Do not reduce if we are below 1000
  return divisor ? (count / divisor).toFixed(digits) + indicator : count
}
