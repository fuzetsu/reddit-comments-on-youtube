// ==UserScript==
// @name      Reddit Comments on Youtube
// @namespace RCOY
// @version   0.0.3
// @match     *://*.youtube.com/*
// @grant     GM_addStyle
// @require   https://rawgit.com/fuzetsu/userscripts/477063e939b9658b64d2f91878da20a7f831d98b/wait-for-elements/wait-for-elements.js
// @require   https://unpkg.com/mithril@1
// @require   https://unpkg.com/bss@1
// @require   httsp://unpkg.com/lodash@4
// ==/UserScript==
/* globals m b _ waitForElems waitForUrl GM_addStyle */

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
  openPost: null
}

const sizes = {
  xs: 0,
  sm: 768,
  md: 992,
  lg: 1200
}

// bss
b.helper({
  badge: b
    .br('4px')
    .d('inline-block')
    .p('2px')
    .fw('bold')
    .va('middle')
    .mw('20px')
    .ta('center')
    .fs('smaller'),
  ellipsis: b
    .whiteSpace('nowrap')
    .overflow('hidden')
    .textOverflow('ellipsis'),
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

const ScoreIndicator = {
  isGoodScore(score) {
    if (score >= 500) return 'super-good'
    if (score >= 20) return 'real-good'
    if (score >= 1) return 'kinda-good'
    if (score >= -5) return 'bad'
    if (score >= -20) return 'real-bad'
    return 'super-bad'
  },
  view(vnode) {
    return m(
      'span.score',
      {
        class: this.isGoodScore(vnode.attrs.score)
      },
      vnode.attrs.score
    )
  }
}

const PostComments = {
  oninit(vnode) {
    this.comments = []
    this.loading = true
    this.post = vnode.attrs.post
    // load comments
    api.getComments(this.post).then(data => {
      this.comments = data
      this.loading = false
      m.redraw()
    })
  },
  view() {
    if (this.loading) return m('div.center', partials.loadingSpinner())
    return m('div.post-comments', [
      m(
        'div.post-comments-list',
        this.comments.length < 1
          ? m('div.center', 'No comments yet...')
          : this.comments.map((c, idx, arr) => {
              if (c.kind === 'more')
                return m(LoadMoreComments, { parentArray: arr, moreComments: c.data })
              return m(PostComment, { comment: c.data })
            })
      )
    ])
  }
}

const LoadMoreComments = {
  loading: false,
  view(vnode) {
    if (this.loading) return m('div.center', partials.loadingSpinner())
    const args = vnode.attrs
    const mc = args.moreComments
    const count = mc.children && mc.children.length
    // dont show button if no comments to load...
    if (count <= 0) return ''
    return m(
      'a.link.btn-load-more-comments[href=#]',
      {
        onclick: e => {
          e.preventDefault()
          this.loading = true
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
              this.loading = false
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

const PostComment = {
  oninit(vnode) {
    const cmt = vnode.attrs.comment
    // cache comment html for performance
    this.commentHtml = m.trust(util.processRedditHtml(cmt.body_html))
  },
  setDepth(comment, depth) {
    if (!comment) return
    comment.depth = depth
    if (comment.replies) comment.replies.data.children.map(c => this.setDepth(c.data, depth + 1))
  },
  sep: () => m.trust(' &#x2022; '),
  view(vnode) {
    const cmt = vnode.attrs.comment
    const createdAt = new Date(cmt.created_utc * 1000)
    const editedAt = cmt.edited && new Date(cmt.edited * 1000)
    const borderColor = state.borders[cmt.depth % state.borders.length]
    const cmtClasses = [
      cmt.is_submitter ? 'post-comment-op' : '',
      cmt.distinguished === 'moderator' ? 'post-comment-mod' : '',
      cmt.distinguished === 'admin' ? 'post-comment-admin' : ''
    ]
      .join(' ')
      .trim()
    return m(
      'div.post-comment',
      {
        style: `border-left-color: ${borderColor};`
      },
      [
        m('div.post-comment-info', [
          m(
            'strong.post-comment-collapse',
            {
              onclick: () => (cmt.collapsed = !cmt.collapsed)
            },
            '[',
            cmt.collapsed ? '+' : '-',
            '] '
          ),
          m(
            'a[target=_blank].post-comment-author',
            {
              class: cmtClasses ? 'post-comment-special ' + cmtClasses : '',
              href: `${API_URL}/u/${cmt.author}`
            },
            cmt.author
          ),
          this.sep(),
          cmt.score_hidden
            ? m('em.score-hidden', 'Score Hidden')
            : m(ScoreIndicator, { score: cmt.score }),
          this.sep(),
          util.prettyTime(createdAt) || createdAt.toLocaleString(),
          editedAt
            ? [this.sep(), ' edited ', util.prettyTime(editedAt) || editedAt.toLocaleString()]
            : '',
          this.sep(),
          m('a[target=_blank].link', { href: API_URL + cmt.permalink }, 'permalink'),
          this.sep(),
          m(
            'span.post-comment-refresh[title=Refresh Comment Thread]',
            {
              onclick: e => {
                e.redraw = false
                api.getComments(state.openPost, cmt).then(data => {
                  const newCmt = data[0]
                  if (!newCmt || !newCmt.data) return
                  // normalize comment depth (will always start from 0 so set based on current depth)
                  this.setDepth(newCmt.data, cmt.depth)
                  _.mergeWith(cmt, newCmt.data, (o, i, key) => (key === 'collapsed' ? o : i))
                  m.redraw()
                })
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
            m('div.post-comment-text', this.commentHtml),
            cmt.replies
              ? m(
                  'div.post-comment-replies',
                  cmt.replies.data.children.map((c, idx, arr) => {
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

const PostChoices = {
  loadPost(post) {
    state.openPost = null
    setTimeout(() => {
      state.openPost = post
      m.redraw()
    }, 500)
  },
  view(vnode) {
    return m(
      'div.post-choice-list' +
        b`
        d grid
        mb 10
        mt 10
      `.gridWidths({ 700: '1fr', 1000: '1fr 1fr', 1600: '1fr 1fr 1fr' }),
      vnode.attrs.posts.map(post => {
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
            onclick: () => this.loadPost(post),
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
  view(vnode) {
    const post = vnode.attrs.post
    return m('div.post-info' + b.fs('150%').mb('10px'), [
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
}

const App = {
  posts: [],
  loadPosts() {
    state.loading = true
    api.getPostsForVideo(window.location.href).then(posts => {
      state.loading = false
      this.posts = posts || []
      if (this.posts.length <= 0) {
        // switch comments after delay to allow user to read "no comments found" message
        console.log('didnt find any reddit posts, hiding')
        setTimeout(this.switchComments, 2000)
      }
      state.openPost = posts[0]
      console.log(posts)
      m.redraw()
    })
  },
  oninit(v) {
    state.borders = BORDERS.day
    this.switchComments = v.attrs.switchComments
    this.loadPosts()
  },
  view() {
    if (state.loading) return m('div.center', partials.loadingSpinner())
    return m('div' + b`fs medium;pr var(--watch-sidebar-width)`, [
      m(PostChoices, { posts: this.posts }),
      this.posts.length === 0 && m('div.center', "Didn't find any reddit posts for this video."),
      state.openPost
        ? [m(PostInfo, { post: state.openPost }), m(PostComments, { post: state.openPost })]
        : ''
    ])
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

GM_addStyle(`
/* UTIL */

.hidden {
  display: none;
}

.noscroll {
  overflow: hidden;
  /* width of the scroll bar */
  padding-right: 20px;
}

.dib {
  display: inline-block;
}

.center {
  text-align: center;
}

.big-text {
  font-size: large;
}

/* Post Comment Goodness Indicators  */

.kinda-good {
  color: #ffce0a;
}

.real-good {
  color: orange;
}

.super-good {
  color: #ff7a00;
}

.bad {
  color: rgb(0, 181, 247);
}

.real-bad {
  color: rgb(62, 127, 255);
}

.super-bad {
  color:  rgb(98, 103, 241);
}
.post-comment {
  padding: 0 0 0 17px;
  border-left: 3px solid #555;
}

.post-comment-author {
  color: #215854;
}

.post-comment-op {
color: #1a1abd;
}

.post-comment-admin {
  color: red;
}

.post-comment-mod {
color: #109610;
}

.post-comment-special:after {
  font-family: monospace;
  position: relative;
  top: -1px;
  margin-left: 3px;
color: black;
}

.post-comment-op:after {
  content: '[OP]';
}

.post-comment-mod:after {
  content: '[MOD]';
}

.post-comment-admin:after {
  content: '[ADMIN]';
}

/* don't add bottom padding on last child since parent already has it */
.post-comment:not(:last-child) {
  margin-bottom: 20px;
}

.post-comment-info {
  font-size: 90%;
  color: #666;
  margin-bottom: 5px;
}

.post-comment-collapse {
  font-family: monospace;
  cursor: pointer;
  user-select: none;
}

.btn-load-more-comments {
  margin-top: 5px;
  display: inline-block;
}

.post-comment blockquote {
  padding-left: 8px;
  border-left: 4px solid #a2a2a2;
  margin: 4px 0px 4px 8px;
}

.post-comment blockquote:last-child {
  margin-bottom: 0;
}

.post-comment-refresh {
  background: #ddd;
  border-radius: 15px;
  height: 16px;
  width: 25px;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  transition: transform 1.5s;
  user-select: none;
}

.post-comment-refresh:hover {
  transform: scale(1.5) rotate(360deg);
}

.score-hidden {
  color: #999;
}

.score {
  font-weight: Bold;
}

.post-comment-text a,.self-post-content a,.link {
  color: #1b3e92;
}
`)

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
