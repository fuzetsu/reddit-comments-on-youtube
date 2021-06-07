import { API_URL } from '../constants'
import { decodeHTML, logError } from './util'

interface PostPayload {
  data: {
    children: { data: Post }[]
  }
}

type CommentPayload = [never, { data: { children: Comment[] } }]

type MoreCommentsPayload =
  | { data: { json: { errors: unknown } } }
  | {
      data: { json: { data: { things: Comment[] } } }
    }

export interface Post {
  id: string
  subreddit: string
  title: string
  score: number
  gilded: boolean
  permalink: string
  name: string
  num_comments: number
}

interface Comment {
  id: string
}

export const searchPosts = async (query: string, sort = true) => {
  const payload: PostPayload = await fetch(
    `${API_URL}/search.json?q=${encodeURIComponent(query)}`
  ).then(res => res.json())

  const results = payload.data.children.map(({ data: post }) => ({
    ...post,
    title: decodeHTML(post.title)
  }))

  return sort ? results.sort((a, b) => (a.num_comments > b.num_comments ? -1 : 1)) : results
}

export const getComments = async (post: Post, parentComment: Comment) => {
  const payload: CommentPayload = await fetch(
    `${API_URL}${post.permalink}.json?comment=${encodeURIComponent(parentComment.id)}`
  ).then(res => res.json())

  return payload[1].data.children
}

export const getMoreComments = async (postName: string, ids: string[]) => {
  const payload: MoreCommentsPayload = await fetch(
    `${API_URL}/api/morechildren.json?api_type=json&link_id=${encodeURIComponent(
      postName
    )}&children=${ids.join(',')}`
  ).then(res => res.json())

  if ('errors' in payload.data.json) {
    logError('no comments to load', payload.data.json.errors)
    return []
  }

  return payload.data.json.data.things
}
