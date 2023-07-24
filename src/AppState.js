import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Post.js').Post} */
  posts: [],
  /** @type {import('./models/Post.js').Post | null} */
  activePost: null,
  /** @type {import('./models/Ads.js').Ads} */
  ads: [],
  /** @type {import('./models/Profile.js').Profile*/
  activeProfile: {},

  page: 0,
  totalPages: 0,
  query: null

})
