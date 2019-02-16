// ==UserScript==
// @name      Reddit Comments on Youtube
// @namespace RCOY
// @version   0.0.4
// @match     *://*.youtube.com/*
// @grant     none
// @require   https://rawgit.com/fuzetsu/userscripts/477063e939b9658b64d2f91878da20a7f831d98b/wait-for-elements/wait-for-elements.js
// @require   https://unpkg.com/mithril@1
// @require   https://unpkg.com/bss@1
// @require   httsp://unpkg.com/lodash@4
// ==/UserScript==
/* globals m b _ waitForElems waitForUrl */

const COMMENT_LOAD_NUM = 20

const API_URL = 'https://www.reddit.com'

const BORDERS = {
  day: [
    'rgb(226, 26, 25)',
    'rgb(243, 146, 51)',
    'rgb(249, 231, 49)',
    'rgb(84, 166, 76)',
    'rgb(54, 141, 238)'
  ],
  night: [
    'rgb(226, 26, 25)',
    'rgb(243, 146, 51)',
    'rgb(249, 231, 49)',
    'rgb(84, 166, 76)',
    'rgb(54, 141, 238)'
  ]
}

const partials = {
  loadingSpinner: () => m('img[src=https://loading.io/spinners/pies/lg.pie-chart-loading-gif.gif]')
}

const state = {
  openPost: null,
  posts: [],
  loading: false,
  borders: BORDERS.day
}

const sizes = {
  xs: 0,
  sm: 768,
  md: 992,
  lg: 1200
}

// bss
const styles = {
  root: b`
    --link-color #1b3e92
    --author-color #215854
    --op-color #1a1abd
    --mod-color #109610
    --admin-color red
    --good-score-color #ff7a00
    --bad-score-color #3070a9
    --score-hidden-color #999
  `,
  fixBlockquotes: b
    .$nest(
      ' blockquote',
      `
        pl 8
        bl 4px solid #a2a2a2
        m 4 0 4 8 
      `
    )
    .$nest(' blockquote:last-child', 'mb 0'),
  postCommentRefresh: b`
    background #ddd
    border-radius 15
    height 16
    width 25
    display inline-block
    text-align center
    box-sizing border-box
    color black
    cursor pointer
    transition transform 1.5s
    user-select none
  `.$nest(':hover', 'transform scale(1.5) rotate(360deg)')
}

b.helper({
  badge: `
    br 4
    d inline-block
    p 2
    fw bold
    va middle
    mw 20
    ta center
    fs smaller
  `,
  ellipsis: `
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  `,
  minWidths: (...confs) => {
    if (confs.length % 2 !== 0) throw new Error('b.minWidths() - invalid usage')
    let ref = b
    for (let i = 0; i < confs.length; i += 2)
      ref = ref.$media(`(min-width: ${confs[i]}px)`, confs[i + 1])
    return ref
  },
  gridWidths: conf =>
    b.minWidths(
      ...Object.entries(conf)
        .map(([k, v]) => [k in sizes ? sizes[k] : k, b.gridTemplateColumns(v)])
        .reduce((total, cur) => total.concat(cur), [])
    )
})

const api = {
  getVideoIdFromUrl: url => {
    const match = url.match(/v=(?<id>[^&]+)/i)
    return match ? match.groups.id : false
  },
  getPostsForVideo(vidUrl) {
    const id = api.getVideoIdFromUrl(vidUrl)
    if (!id) return Promise.reject('must be a video URL')
    return m
      .request({
        method: 'get',
        background: true,
        url: `${API_URL}/search.json`,
        data: {
          q: `(url:3D${id} OR url:${id}) (site:youtube.com OR site:youtu.be)`
        }
      })
      .then(data =>
        data.data.children
          .map(({ data }) => {
            return {
              id: data.id,
              subreddit: data.subreddit,
              title: data.title,
              score: data.score,
              gilded: data.gilded,
              permalink: data.permalink,
              name: data.name,
              num_comments: data.num_comments
            }
          })
          .sort((a, b) => (a.num_comments > b.num_comments ? -1 : 1))
      )
  },
  getComments(post, comment) {
    return m
      .request({
        method: 'get',
        background: true,
        url: `${API_URL}/${post.permalink}.json`,
        data: {
          comment: comment && comment.id
        }
      })
      .then(data => data[1].data.children)
  }
}

const util = {
  id: id => document.getElementById(id),
  htmlDecode: function(input) {
    const e = document.createElement('div')
    e.innerHTML = input
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
  },
  processRedditHtml(html) {
    return util.htmlDecode(html).replace(/<a/gi, '<a target="_blank"')
  },
  pluralize: function(word, count) {
    return count !== 1 ? word + 's' : word
  },
  prettyTime(d) {
    // This function was copied, and slightly adapted from John Resig's website: https://johnresig.com/files/pretty.js
    const date = new Date(d)
    const diff = (Date.now() - date.getTime()) / 1000
    const day_diff = Math.floor(diff / 86400)

    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return

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
}

const PostComments = ({ attrs: { post } }) => {
  let comments = []
  let loading = true
  // load comments
  api.getComments(post).then(data => {
    comments = data
    loading = false
    m.redraw()
  })
  return {
    view: () =>
      loading
        ? m('div' + b`ta center`, partials.loadingSpinner())
        : m('div.post-comments', [
            m(
              'div.post-comments-list',
              comments.length < 1
                ? m('div' + b`ta center`, 'No comments yet...')
                : comments.map((c, idx, arr) => {
                    if (c.kind === 'more')
                      return m(LoadMoreComments, { parentArray: arr, moreComments: c.data })
                    return m(PostComment, { comment: c.data })
                  })
            )
          ])
  }
}

const LoadMoreComments = () => {
  let loading = false
  return {
    view(vnode) {
      if (loading) return m('div' + b`ta center`, partials.loadingSpinner())
      const args = vnode.attrs
      const mc = args.moreComments
      const count = mc.children && mc.children.length
      // dont show button if no comments to load...
      if (count <= 0) return ''
      return m(
        'a.btn-load-more-comments[href=#]' + b`d inline-block;mt 5`,
        {
          onclick: e => {
            e.preventDefault()
            loading = true
            const childrenToLoad = mc.children.splice(0, COMMENT_LOAD_NUM)
            m.request({
              method: 'GET',
              url: API_URL + '/api/morechildren.json',
              data: {
                api_type: 'json',
                children: childrenToLoad.join(','),
                link_id: state.openPost.name
              }
            }).then(
              data => {
                loading = false
                console.log('more comments => ', data)
                if (
                  !data ||
                  !data.json ||
                  !data.json.data ||
                  !data.json.data.things ||
                  data.json.data.things.length <= 0
                ) {
                  console.log(
                    'didnt get more comments to load :(',
                    data && data.json && data.json.errors
                  )
                  return
                }
                // detach load more button
                let loadMoreButton
                args.parentArray.some((c, idx) => {
                  if (c.kind === 'more' && c.data.id === mc.id) {
                    loadMoreButton = args.parentArray.splice(idx, 1)[0]
                    return true
                  }
                })
                // add in new comments
                const lastCommentAtDepth = {}
                data.json.data.things.forEach(cmt => {
                  if (cmt.data.depth === mc.depth) {
                    args.parentArray.push(cmt)
                  } else {
                    const parentComment = lastCommentAtDepth[cmt.data.depth - 1]
                    if (!parentComment) return
                    parentComment.data.replies = parentComment.data.replies || {
                      kind: 'Listing',
                      data: {
                        children: []
                      }
                    }
                    parentComment.data.replies.data.children.push(cmt)
                  }
                  lastCommentAtDepth[cmt.data.depth] = cmt
                })
                // re-add load more button if necessary
                if (mc.children.length > 0 && loadMoreButton) {
                  args.parentArray.push(loadMoreButton)
                }
              },
              err => console.log(err)
            )
          }
        },
        'Load ',
        count > COMMENT_LOAD_NUM ? [COMMENT_LOAD_NUM, ' (of ', count, ')'] : count,
        ' more ',
        util.pluralize('comment', count),
        '.'
      )
    }
  }
}

const PostComment = ({ attrs: { comment } }) => {
  // cache comment html for performance
  const commentHtml = m.trust(util.processRedditHtml(comment.body_html))
  const setDepth = (comment, depth) => {
    if (!comment) return
    comment.depth = depth
    if (comment.replies) comment.replies.data.children.map(c => this.setDepth(c.data, depth + 1))
  }
  const sep = () => m.trust(' &#x2022; ')
  const refreshComment = cmt =>
    api.getComments(state.openPost, cmt).then(([newCmt]) => {
      if (!newCmt || !newCmt.data) return
      // normalize comment depth (will always start from 0 so set based on current depth)
      setDepth(newCmt.data, cmt.depth)
      _.mergeWith(cmt, newCmt.data, (o, i, key) => (key === 'collapsed' ? o : i))
      m.redraw()
    })
  const getAuthorStyle = cmt =>
    cmt.is_submitter
      ? b`content '[OP]'; c var(--op-color)`
      : cmt.distinguished === 'moderator'
      ? b`content '[MOD]'; c var(--mod-color)`
      : cmt.distinguished === 'admin'
      ? b`content '[ADMIN]'; c var(--admin-color)`
      : null
  return {
    view: ({ attrs: { comment: cmt } }) => {
      const createdAt = new Date(cmt.created_utc * 1000)
      const editedAt = cmt.edited && new Date(cmt.edited * 1000)
      const borderColor = state.borders[cmt.depth % state.borders.length]
      return m(
        'div.post-comment' +
          b`p 0 0 0 17; border-left 3px solid #555;blc ${borderColor}` +
          b`blc ${borderColor}`.$nest(':not(:last-child)', 'mb 20'),
        [
          m('div.post-comment-info' + b`fs 90%;c #666;mb 5`, [
            m(
              'strong.post-comment-collapse' + b`ff monospace; cursor pointer; user-select none`,
              {
                onclick: () => (cmt.collapsed = !cmt.collapsed)
              },
              '[',
              cmt.collapsed ? '+' : '-',
              '] '
            ),
            m(
              'a[target=_blank].post-comment-author' +
                b`c var(--author-color)`.$nest(
                  ':after',
                  `
                    ff monospace
                    position relative
                    t -1; ml 3; c black
                    ${getAuthorStyle(cmt)}
                  `
                ),
              {
                href: `${API_URL}/u/${cmt.author}`
              },
              cmt.author
            ),
            sep(),
            cmt.score_hidden
              ? m('em' + b`c var(--score-hidden-color)`, 'Score Hidden')
              : m(
                  'span.score' + b`fw bold;c var(--${cmt.score >= 1 ? 'good' : 'bad'}-score-color)`,
                  cmt.score
                ),
            sep(),
            util.prettyTime(createdAt) || createdAt.toLocaleString(),
            editedAt
              ? [sep(), ' edited ', util.prettyTime(editedAt) || editedAt.toLocaleString()]
              : '',
            sep(),
            m('a[target=_blank]', { href: API_URL + cmt.permalink }, 'permalink'),
            sep(),
            m(
              'span.post-comment-refresh[title=Refresh Comment Thread]' + styles.postCommentRefresh,
              {
                onclick: e => {
                  e.redraw = false
                  refreshComment(cmt)
                }
              },
              '⟳'
            )
          ]),
          m(
            'div',
            {
              hidden: cmt.collapsed
            },
            [
              m('div.post-comment-text' + styles.fixBlockquotes, commentHtml),
              cmt.replies
                ? m(
                    'div.post-comment-replies',
                    cmt.replies.data.children.map((c, _, arr) => {
                      if (c.kind === 'more')
                        return m(LoadMoreComments, { parentArray: arr, moreComments: c.data })
                      return m(PostComment, { comment: c.data })
                    })
                  )
                : ''
            ]
          )
        ]
      )
    }
  }
}

const PostChoices = () => {
  const loadPost = post => {
    state.openPost = null
    setTimeout(() => {
      state.openPost = post
      m.redraw()
    }, 500)
  }
  return {
    view: ({ attrs: { posts } }) =>
      m(
        'div.post-choice-list' +
          b`
          d grid
          mb 10
          mt 10
        `.gridWidths({ 700: '1fr', 1000: '1fr 1fr', 1600: '1fr 1fr 1fr' }),
        posts.map(post => {
          return m(
            'span.post-choice' +
              b`
              d inline-grid
              gtc auto 1fr minmax(55px, auto)
              grid-column-gap 5px
              m 5; ml 0; p 3
              border 1px solid black
              cursor pointer
            `,
            {
              title: post.title,
              onclick: () => loadPost(post),
              class: post === state.openPost ? b`c white;bc black`.class : ''
            },
            [
              m('span' + b`fw bold`, '/r/', post.subreddit),
              m('span' + b.ellipsis, post.title),
              m('span', '\uD83D\uDCAC ', post.num_comments)
            ]
          )
        })
      )
  }
}

const PostInfo = {
  view: ({ attrs: { post } }) =>
    m('div.post-info' + b`fs 150%;mb 10`, [
      m(
        'span' +
          b`
          badge
          bc #ff6a00; c white
          fs medium
          mt -4; p 2px 6px
        `,
        post.score
      ),
      ' [ ',
      m('span' + b`fw bold`, '/r/', post.subreddit),
      ' ] ',
      post.title
    ])
}

const App = ({ attrs: { switchComments } }) => {
  state.posts = []
  state.loading = true
  api.getPostsForVideo(window.location.href).then(newPosts => {
    state.loading = false
    const posts = newPosts || []
    state.posts = posts
    if (posts.length <= 0 || posts.every(post => post.num_comments <= 0)) {
      // switch comments after delay to allow user to read "no posts (or comments) found" message
      console.log('didnt find any reddit posts, hiding')
      setTimeout(switchComments, 2000)
    }
    state.openPost = posts[0]
    m.redraw()
  })
  return {
    view() {
      if (state.loading) return m('div' + b`ta center`, partials.loadingSpinner())
      return m(
        'div' + b`fs medium;pr var(--watch-sidebar-width)`.$nest(' a', 'c var(--link-color)'),
        [
          m(PostChoices, { posts: state.posts }),
          state.posts.length === 0 &&
            m('div' + b`ta center`, "Didn't find any reddit posts for this video."),
          state.openPost
            ? [m(PostInfo, { post: state.openPost }), m(PostComments, { post: state.openPost })]
            : ''
        ]
      )
    }
  }
}

const switchCommentsButton = switchComments =>
  m(
    'paper-button.ytd-subscribe-button-renderer[animated][subscribed]',
    {
      onclick: switchComments
    },
    'Switch Comments'
  )

const switchBtnId = 'rcoy-switch-button'
const appId = 'rcoy'

let waitObj
waitForUrl(
  () => true,
  () =>
    setTimeout(() => {
      // clean up old instance
      if (waitObj) {
        waitObj.stop()
        waitObj = null
      }
      state.openPost = null
      const oldInstance = util.id(appId)
      if (oldInstance) {
        m.mount(oldInstance, null)
        oldInstance.remove()
        const oldSwitchBtn = util.id(switchBtnId)
        if (oldSwitchBtn) oldSwitchBtn.remove()
      }
      // is this a video?
      if (!api.getVideoIdFromUrl(location.href)) return
      // mount app
      waitObj = waitForElems({
        sel: '#comments',
        stop: true,
        onmatch: ytComments => {
          const container = document.createElement('div')
          container.className = styles.root.class
          container.id = appId
          const switchBtnArea = document.createElement('div')
          switchBtnArea.id = switchBtnId
          const main = ytComments.parentElement
          main.insertBefore(container, ytComments)
          main.insertBefore(switchBtnArea, container)
          let hideReddit = false
          const switchComments = () => {
            hideReddit = !hideReddit
            ytComments.hidden = !hideReddit
            container.hidden = hideReddit
          }
          m.render(switchBtnArea, switchCommentsButton(switchComments))
          m.mount(container, { view: () => m(App, { switchComments }) })
          // wait for comments to actually load in and update visibility
          waitForElems({
            sel: '#sections > #header > ytd-comments-header-renderer',
            ctx: ytComments,
            stop: true,
            onmatch: () => (ytComments.hidden = !hideReddit)
          })
        }
      })
    }, 2000)
)
