import { API_URL } from 'constants'
import { buildQuery, decodeHTML, logError } from './util'

interface PostPayload {
  data: {
    children: { data: Post }[]
  }
}

type CommentPayload = [never, { data: { children: (Comment | LoadMore)[] } }]

type MoreCommentsPayload = { json: { errors: string[]; data: { things: Comment[] } } }

export interface Post {
  subreddit: string
  title: string
  ups: number
  permalink: string
  name: string
  num_comments: number
}

export interface LoadMore {
  kind: 'more'
  data: {
    count: number
    name: string
    id: string
    parent_id: string
    children: string[]
  }
}

export interface Comment {
  kind: 't1'
  data: {
    id: string
    parent_id: string
    ups: number
    name: string
    author: string
    depth: number
    body_html: string
    edited: false | number
    is_submitter: boolean
    permalink: string
    created_utc: number
    collapsed: boolean
    replies: '' | { data: { children: CommentChild[] } }
  }
}

export type CommentChild = Comment | LoadMore

const getJSON = <T>(url: string) => fetch(url).then(res => res.json() as Promise<T>)

export const searchPosts = async (query: string, sort = true): Promise<Post[]> => {
  const payload = await getJSON<PostPayload>(
    API_URL + '/search.json?' + buildQuery({ q: query })
  ).catch(error => logError(null, 'api.getPosts() error', error))

  if (!payload) return []

  const results = payload.data.children.map(({ data: post }) => ({
    ...post,
    title: decodeHTML(post.title)
  }))

  return sort ? results.sort((a, b) => b.num_comments - a.num_comments) : results
}

export const getComments = async (
  { permalink }: Post,
  parentComment?: Comment
): Promise<CommentChild[]> => {
  const payload = await getJSON<CommentPayload>(
    API_URL + permalink + '.json?' + buildQuery({ comment: parentComment?.data.id })
  ).catch(error => logError(null, 'api.getComments() error', error))

  if (!payload) return []

  return payload[1].data.children
}

export const getMoreComments = async (link_id: string, children: string[]): Promise<Comment[]> => {
  const payload = await getJSON<MoreCommentsPayload>(
    API_URL +
      '/api/morechildren.json?' +
      buildQuery({ api_type: 'json', link_id, children: children.join(',') })
  ).catch(() => null)

  if (!payload || payload.json.errors.length > 0)
    return logError([], 'api.getMoreComments() error', payload)

  const flatComments = payload.json.data.things
  const nestedComments = flatComments.reduce<Comment[]>((acc, cmt) => {
    const parent = flatComments.find(x => x.data.name === cmt.data.parent_id)
    if (parent) {
      if (parent.data.replies) parent.data.replies.data.children.push(cmt)
      else parent.data.replies = { data: { children: [cmt] } }
    } else acc.push(cmt)
    return acc
  }, [])

  return nestedComments
}
