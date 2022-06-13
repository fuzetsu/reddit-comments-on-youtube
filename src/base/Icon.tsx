import { useEffect, useRef, useState } from 'preact/hooks'
import z from 'zaftig'
import { getCSSVar, subURI } from '../lib/util'
import { ZaftigStyle } from '../types'

const API = 'https://icongr.am/feather'

type IconName = 'message-circle'

interface Props {
  name: IconName
  onClick?(): void
  className?: string | ZaftigStyle
  size?: number
  spin?: boolean
  themeColor?: string
}

export const Icon = ({
  name,
  className,
  onClick,
  size = 18,
  spin = false,
  themeColor = 'text-normal'
}: Props) => {
  const ref = useRef<HTMLImageElement>(null)
  const [color, setColor] = useState('currentColor')
  useEffect(() => {
    const update = () => {
      if (!ref.current) return
      let newColor = getCSSVar(themeColor, ref.current).slice(1)
      if (newColor.length === 3) newColor += newColor
      setColor(newColor)
    }
    update()
    const id = setInterval(update, 5000)
    return () => clearInterval(id)
  }, [themeColor])

  const cls = z`vertical-align sub`.concat(spin && 'spin', className).class
  const path = subURI('/:name.svg?size=:size&color=:color', { name, color, size: String(size) })

  return <img ref={ref} className={cls} src={API + path} onClick={onClick} />
}
