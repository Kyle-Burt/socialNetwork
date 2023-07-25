import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

    async getPost() {
        const res = await api.get('api/posts')
        logger.log('Got Posts', res.data)
        const posts = res.data.posts.map(p => new Post(p))
        AppState.posts = posts

        AppState.page = res.data.page
        AppState.totalPages = res.data.totalPages
    }

    async makePost(postData) {
        const res = await api.post('api/posts', postData)
        logger.log('making post', res.data)
        const post = new Post(res.data)
        AppState.posts.unshift(post)
    }

    async getNewPageOfPosts(pageNumber) {
        const res = await api.get(`api/posts/?page=${pageNumber}`)
        logger.log('Got next page', res.data)

        const posts = res.data.posts.map(postPojo => new Post(postPojo))

        AppState.posts = posts
        AppState.page = res.data.page
        AppState.totalPages = res.data.totalPages
    }

    async removePost(postId) {
        const res = await api.delete(`api/posts/${postId}`)
        logger.log(`removing post`, res.data)

        const postIndex = AppState.posts.findIndex(post => post.id == postId)

        AppState.posts.splice(postIndex, 1)
    }

    async likePost(creatorId) {

        const res = await api.post(`api/posts/${creatorId}/like`)
        logger.log('liked post', res.data)


        AppState.posts.splice(creatorId, 1)

    }

    async getProfilePostById(profileId) {
        const res = await api.get(`api/profiles/${profileId}/posts`)
        logger.log('Got profile posts', res.data)
        const profilePost = res.data.posts.map(p => new Post(p))
        AppState.posts = profilePost
        AppState.totalPages = res.data.totalPages
        AppState.page = res.data.page

    }

    async getPostsByQuery(queryObject) {
        const res = await api.get(`api/posts?query=${queryObject.query}`)
        logger.log(`Got post by query`, res.data)
        // const posts = res.data

    }
}

export const postsService = new PostsService()