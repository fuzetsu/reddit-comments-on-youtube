import z from 'zaftig'
import { subURI } from '../lib/util'
import { ZaftigStyle } from '../type'

const API = 'https://icongr.am/feather'

interface Props {
  name: string
  onClick?(): void
  className?: string | ZaftigStyle
  size?: number
  spin?: boolean
  color?: string
}

export const Icon = ({
  name,
  className,
  onClick,
  size = 18,
  spin = false,
  color = 'currentColor'
}: Props) => {
  const cls = z`vertical-align sub`.concat(spin && 'spin', className).class
  const src =
    API + subURI('/:name.svg?size=:size&color=:color', { name, color, size: String(size) })

  return <img className={cls} src={src} onClick={onClick} />
}
