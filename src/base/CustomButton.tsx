import { h, JSX } from 'preact'

type TagName = keyof JSX.IntrinsicElements
type GetElem<Tag extends TagName> = JSX.IntrinsicElements[Tag] extends JSX.HTMLAttributes<infer E>
  ? E
  : never
type Props<Tag extends TagName> = { tag: Tag; children: JSX.Element } & JSX.HTMLAttributes<
  GetElem<Tag>
>

export function CustomButton<Tag extends TagName>({ tag, children, ...props }: Props<Tag>) {
  const handleKeyPress: JSX.KeyboardEventHandler<GetElem<Tag>> = e => {
    if ((e.key === ' ' || e.key === 'Enter') && props.onClick) {
      e.preventDefault()
      props.onClick.call(e.currentTarget, e as never)
    }
  }
  return h(
    tag,
    { role: 'button', tabIndex: 0, handleKeyPress, ...props } as Record<string, unknown>,
    children
  )
}
