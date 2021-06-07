// ==UserScript==
// @name        Reddit Comments on Youtube
// @description show reddit comments on youtube (and crunchyroll) videos
// @namespace   RCOY
// @version     0.2.9
// @match       https://*.youtube.com/*
// @match       https://*.crunchyroll.com/*
// @match       https://www14.9anime.to/watch/*
// @grant       none
// ==/UserScript==
(() => {
  // src/constants.ts
  var SCRIPT_NAME = "RCOY";
  var API_URL = "https://www.reddit.com";

  // src/lib/util.ts
  var getById = (id) => document.getElementById(id);
  var q = (sel, ctx = document) => ctx.querySelector(sel);
  var decodeHTML = (input) => {
    const e = document.createElement("textarea");
    e.innerHTML = input;
    return e.value;
  };
  var namePart = [`%c${SCRIPT_NAME}:`, "color:indigo"];
  var log = (first, ...rest) => (console.log(...namePart, first, ...rest), first);
  var logError = (...rest) => console.log(...namePart, ...rest);

  // src/lib/api.ts
  var searchPosts = async (query, sort = true) => {
    const payload = await fetch(`${API_URL}/search.json?q=${encodeURIComponent(query)}`).then((res) => res.json());
    const results = payload.data.children.map(({ data: post }) => ({
      ...post,
      title: decodeHTML(post.title)
    }));
    return sort ? results.sort((a, b) => a.num_comments > b.num_comments ? -1 : 1) : results;
  };

  // src/conf/crunchyroll.ts
  var filterForEp = (posts, episode) => {
    const epRegex = new RegExp(`\\bepisode ${episode}\\b`, "i");
    return posts.filter((post) => epRegex.test(post.title));
  };
  var crunchyroll = {
    commentSelector: ".guestbook.comments",
    isMatch: () => !!getById("showmedia_about_media"),
    getPosts: async () => {
      var _a, _b, _c, _d, _e, _f;
      const epNum = (_d = (_c = (_b = (_a = q("#showmedia_about_media h4:last-child")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.split(",").pop()) == null ? void 0 : _c.match(/[0-9]+/)) == null ? void 0 : _d[0];
      const animeName = (_f = (_e = getById("showmedia_about_media")) == null ? void 0 : _e.textContent) == null ? void 0 : _f.replace(/\s+/g, " ");
      if (!animeName) {
        logError("unable to find anime name");
        return [];
      }
      const posts = await searchPosts(animeName + " discussion");
      return epNum ? filterForEp(posts, epNum) : posts;
    }
  };

  // src/conf/youtube.ts
  var getVideoIdFromUrl = (url) => {
    var _a;
    return (_a = url.match(/v=([^&]+)/i)) == null ? void 0 : _a[1];
  };
  var youtube = {
    commentSelector: "#comments",
    isMatch: () => Boolean(getVideoIdFromUrl(location.href)),
    getPosts: () => {
      const id = getVideoIdFromUrl(location.href);
      if (!id)
        throw new Error("must be a video URL");
      return searchPosts(`(url:3D${id} OR url:${id}) (site:youtube.com OR site:youtu.be)`);
    }
  };

  // src/conf/index.ts
  var confs = {
    crunchyroll,
    youtube
  };
  var confNames = Object.keys(confs);

  // src/index.ts
  log("started!");
  var host = location.hostname;
  var mode = confNames.find((name) => host.includes(name));
  if (!mode) {
    logError("encountered unknown host", host);
  } else {
    const conf = confs[mode];
    conf.getPosts().then(log);
  }
})();
