// ==UserScript==
// @name        Reddit Comments on Youtube
// @description show reddit comments on youtube (and crunchyroll) videos
// @namespace   RCOY
// @version     0.1.0
// @match       *://*.youtube.com/*
// @match       *://*.crunchyroll.com/*
// @grant       none
// @require     https://rawgit.com/fuzetsu/userscripts/477063e939b9658b64d2f91878da20a7f831d98b/wait-for-elements/wait-for-elements.js
// @require     https://unpkg.com/mithril@next
// @require     https://unpkg.com/bss
// @require     httsp://unpkg.com/lodash@4
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
  fixComment: b
    .$nest(
      ' blockquote',
      `
        pl 8
        bl 4px solid #a2a2a2
        m 4 0 4 8 
      `
    )
    .$nest(' blockquote:last-child', 'mb 0')
    .$nest('p', 'margin 0.75em 0'),
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
  `
})

const api = {
  getVideoIdFromUrl: url => {
    const match = url.match(/v=(?<id>[^&]+)/i)
    return match ? match.groups.id : false
  },
  searchPosts: async (query, sort = true) => {
    const results = await m
      .request({
        method: 'get',
        background: true,
        url: `${API_URL}/search.json`,
        data: {
          q: query
        }
      })
      .then(data =>
        data.data.children.map(({ data }) => {
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
      )
    if (sort) results.sort((a, b) => (a.num_comments > b.num_comments ? -1 : 1))
    return results
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
  q: (sel, ctx = document) => ctx.querySelector(sel),
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
              m('div.post-comment-text' + styles.fixComment, commentHtml),
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
    view: ({ attrs: { posts, reloadPosts } }) =>
      m(
        'div.post-choice-list' +
          b`
          d grid
          mb 10
          mt 10
          gtc ${mode === 'youtube' ? '1fr 1fr 1fr' : '1fr 1fr'}
        `,
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
              class: post.id === (state.openPost || {}).id ? b`c white;bc black`.class : ''
            },
            [
              m('span' + b`fw bold`, '/r/', post.subreddit),
              m('span' + b.ellipsis, post.title),
              m('span', '\uD83D\uDCAC ', post.num_comments)
            ]
          )
        }),
        m(
          'div.reload-posts' +
            b`
            d flex;jc center;ai center
            border 1px solid black
            cursor pointer
            m 5;ml 0; p 3
          `,
          { onclick: reloadPosts },
          'Reload Posts'
        )
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
      m('a' + b`td none`, { href: API_URL + post.permalink, target: '_blank' }, post.title)
    ])
}

const App = ({ attrs: { switchComments, getPosts } }) => {
  const reloadPosts = async () => {
    state.posts = []
    state.loading = true
    const posts = (await getPosts()) || []
    state.loading = false
    state.posts = posts
    console.log('reddit comments found ', posts)
    if (posts.length <= 0 || posts.every(post => post.num_comments <= 0)) {
      // switch comments after delay to allow user to read "no posts (or comments) found" message
      console.log('didnt find any reddit posts, hiding')
      setTimeout(switchComments, 200)
    }
    if (!state.openPost) state.openPost = posts[0]
    m.redraw()
  }
  reloadPosts()
  return {
    view() {
      if (state.loading) return m('div' + b`ta center`, partials.loadingSpinner())
      return m(
        'div' + b`fs medium;pr var(--watch-sidebar-width)`.$nest(' a', 'c var(--link-color)'),
        [
          m(PostChoices, { posts: state.posts, reloadPosts }),
          state.posts.length === 0 &&
            m('div' + b`ta center`, "Sorry, didn't find any reddit posts..."),
          state.openPost
            ? [m(PostInfo, { post: state.openPost }), m(PostComments, { post: state.openPost })]
            : ''
        ]
      )
    }
  }
}

const switchBtnId = 'rcoy-switch-button'
const appId = 'rcoy'

const mode = (() => {
  const host = location.hostname
  return host.includes('youtube') ? 'youtube' : host.includes('crunchyroll') ? 'crunchyroll' : null
})()

const confs = {
  youtube: {
    cmtSel: '#comments',
    isMatch: () => !!api.getVideoIdFromUrl(location.href),
    getPosts: () => {
      const id = api.getVideoIdFromUrl(location.href)
      if (!id) throw new Error('must be a video URL')
      return api.searchPosts(`(url:3D${id} OR url:${id}) (site:youtube.com OR site:youtu.be)`)
    }
  },
  crunchyroll: {
    cmtSel: '.guestbook.comments',
    isMatch: () => !!util.id('showmedia_about_media'),
    getPosts: async () => {
      const epNum = util
        .q('#showmedia_about_media h4:last-child')
        .textContent.split(',')
        .pop()
        .match(/[0-9]+/)[0]
      const epRegex = new RegExp(`episode ${epNum}([^0-9]|$)`, 'i')
      const posts = await api.searchPosts(
        util.id('showmedia_about_media').textContent.replace(/\s+/g, ' ') + ' discussion'
      )
      return posts.filter(post => epRegex.test(post.title))
    }
  }
}

const conf = confs[mode]

const switchCommentsButton = switchComments =>
  m(
    'paper-button.ytd-subscribe-button-renderer[animated][subscribed]',
    {
      onclick: switchComments
    },
    'Switch Comments'
  )

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
      if (!conf.isMatch()) return
      // wait for mount area
      waitObj = waitForElems({
        sel: conf.cmtSel,
        stop: true,
        onmatch: commentsElem => {
          // hide comments
          commentsElem.style.display = 'none'
          // create container and place in DOM
          const container = document.createElement('div')
          container.className = styles.root.class
          container.id = appId
          const switchBtnArea = document.createElement('div')
          switchBtnArea.id = switchBtnId
          const main = commentsElem.parentElement
          main.insertBefore(container, commentsElem)
          main.insertBefore(switchBtnArea, container)
          // setup switch area and function
          let hideReddit = false
          const switchComments = () => {
            hideReddit = !hideReddit
            commentsElem.style.display = hideReddit ? '' : 'none'
            container.hidden = hideReddit ? 'none' : ''
          }
          m.render(switchBtnArea, switchCommentsButton(switchComments))
          // mount main app
          m.mount(container, { view: () => m(App, { switchComments, getPosts: conf.getPosts }) })
        }
      })
    }, 2000)
)
