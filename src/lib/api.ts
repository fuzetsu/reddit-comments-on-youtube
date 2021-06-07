import { API_URL } from '../constants'
import { buildQuery, decodeHTML, logError } from './util'

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

const getJSON = (url: string) => fetch(url).then(res => res.json())

export const searchPosts = async (query: string, sort = true) => {
  const payload: PostPayload = await getJSON(API_URL + '/search.json' + buildQuery({ query }))

  const results = payload.data.children.map(({ data: post }) => ({
    ...post,
    title: decodeHTML(post.title)
  }))

  return sort ? results.sort((a, b) => (a.num_comments > b.num_comments ? -1 : 1)) : results
}

export const getComments = async (post: Post, parentComment?: Comment) => {
  const payload: CommentPayload = await getJSON(
    API_URL + post.permalink + '.json' + buildQuery({ comment: parentComment?.id })
  )

  return payload[1].data.children
}

export const getMoreComments = async (postName: string, ids: string[]) => {
  const payload: MoreCommentsPayload = await getJSON(
    API_URL +
      '/api/morechildren.json' +
      buildQuery({ api_type: 'json', link_id: postName, chilren: ids.join(',') })
  )

  if ('errors' in payload.data.json) {
    logError('no comments to load', payload.data.json.errors)
    return []
  }

  return payload.data.json.data.things
}
