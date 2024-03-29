import { h, JSX } from 'preact'

type TagName = keyof JSX.IntrinsicElements
type GetElem<Tag extends TagName> = JSX.IntrinsicElements[Tag] extends JSX.HTMLAttributes<infer E>
  ? E
  : never
type Props<Tag extends TagName> = { tag: Tag; children?: JSX.Element } & JSX.HTMLAttributes<
  GetElem<Tag>
>

export function CustomButton<Tag extends TagName>({ tag, children, ...props }: Props<Tag>) {
  const onKeyPress: JSX.KeyboardEventHandler<GetElem<Tag>> = e => {
    props.onKeyPress?.call(e.currentTarget as never, e)
    if (!e.defaultPrevented && props.onClick && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault()
      props.onClick.call(e.currentTarget as never, e as never)
    }
  }
  return h(
    tag,
    { role: 'button', tabIndex: 0, ...props, onKeyPress } as Record<string, unknown>,
    children
  )
}
