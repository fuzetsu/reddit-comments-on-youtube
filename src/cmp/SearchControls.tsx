import z from 'zaftig'
import { useState } from 'preact/hooks'

import { Button } from '../base/Button'
import { useStore } from '@/state'
import { setPosts, setPostsLoading, setSearchQuery } from '@/state/actions'
import { executeSearch } from '@/lib/search'
import { Conf } from '@/types'

interface Props {
  conf: Conf
  visible: boolean
  onToggleVisible(): void
}

export const SearchControls = ({ conf, visible, onToggleVisible }: Props) => {
  const [searchQuery] = useStore([s => s.searchQuery])
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('')

  const isSwap = !conf.mode || conf.mode === 'swap'

  // When native comments are showing, only show switch button
  if (!visible) {
    return isSwap ? (
      <div className={controls}>
        <div className={layout}>
          <Button className={switchButtonAlone} onClick={onToggleVisible}>
            Switch to Reddit Posts
          </Button>
        </div>
      </div>
    ) : null
  }

  const handleEditClick = () => {
    setEditValue(searchQuery || '')
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!editValue.trim()) {
      setIsEditing(false)
      return
    }

    setPostsLoading(true)
    setSearchQuery(editValue)

    try {
      const result = await executeSearch(conf, editValue)
      setPosts(result.posts)
    } catch (error) {
      console.error('Search failed:', error)
      setPosts([])
    }

    setPostsLoading(false)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditValue('')
  }

  if (isEditing) {
    return (
      <div className={controls}>
        <div className={layout}>
          {isSwap && (
            <Button className={switchButton} onClick={onToggleVisible}>
              Switch to Native
            </Button>
          )}
          <input
            className={searchInput}
            type="text"
            value={editValue}
            onInput={e => setEditValue(e.currentTarget.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSave()
              if (e.key === 'Escape') handleCancel()
            }}
            placeholder="Enter search query..."
            autoFocus
          />
          <div className={actionButtons}>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      </div>
    )
  }

  // Normal state: Switch + Edit Query buttons
  const queryText = searchQuery ? `Edit Query: "${searchQuery}"` : 'Edit Query: No query set'

  return (
    <div className={controls}>
      <div className={layout}>
        {isSwap && (
          <Button className={switchButton} onClick={onToggleVisible}>
            Switch to Native
          </Button>
        )}
        <button
          className={queryButton}
          onClick={handleEditClick}
          title={searchQuery || 'No query set'}
        >
          {queryText}
        </button>
      </div>
    </div>
  )
}

const controls = z`
  d flex
  flex-direction column
  gap 8
  max-width 100%
`.class

const layout = z`
  d flex
  gap 8
  align-items center
  max-width 100%
  overflow hidden
`.class

const switchButton = z`
  flex-shrink 0
`.class

const switchButtonAlone = z`
  width 100%
`.class

const queryButton = z`
  cursor pointer
  border none
  background $button-background
  text-align left
  transition all 0.2s ease
  border-radius 6
  padding 12
  flex 1
  min-width 0
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  &:hover {
    opacity 0.8
  }
`.class

const actionButtons = z`
  d flex
  gap 4
  flex-shrink 0
`.class

const searchInput = z`
  flex 1
  min-width 0
  padding 12
  border 1px solid #ccc
  border-radius 6
  box-sizing border-box
`.class
