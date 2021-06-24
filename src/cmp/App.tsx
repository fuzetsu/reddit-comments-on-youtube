import z from 'zaftig'
import { PostSelect } from './PostSelect'
import { useEffect, useState } from 'preact/hooks'
import { PostComments } from './PostComments'
import { Conf } from 'types'
import { useStore } from 'state'
import { init } from 'state/actions'
import { subscribe } from 'state/state'
import { SwitchComments } from './SwitchComments'

interface Props {
  conf: Conf
  setNativeCommentsVisible(visible: boolean): void
}

export const App = ({ conf, setNativeCommentsVisible }: Props) => {
  const [postsLoading, noPosts] = useStore([s => s.postsLoading, s => s.posts.length <= 0])

  useEffect(() => {
    init(conf)
    return subscribe([s => s.noContent], noContent => {
      if (noContent && visible) toggleVisible()
    })
  }, [])

  const [visible, setVisible] = useState(true)
  const toggleVisible = () => {
    setNativeCommentsVisible(visible)
    setVisible(!visible)
  }

  const message = postsLoading ? 'Loading posts…' : noPosts ? 'No posts found…' : ''

  return (
    <div className={container}>
      <SwitchComments onSwitch={toggleVisible} />
      {visible &&
        (message || (
          <>
            <PostSelect />
            <PostComments />
          </>
        ))}
    </div>
  )
}

const container = z`d flex;flex-direction column;gap 10`.class
