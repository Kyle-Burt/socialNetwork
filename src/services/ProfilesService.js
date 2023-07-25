import { AppState } from "../AppState.js"
// import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfilesService {

    async getProfile(profileId) {
        const res = await api.get(`api/profiles/${profileId}`)
        logger.log('Got Profile', res.data)
        const profile = new Profile(res.data)
        AppState.activeProfile = profile
    }

    // async getProfilePostById(profileId) {
    //     const res = await api.get(`api/profiles/${profileId}/posts`)
    //     logger.log('Got profile posts', res.data)
    //     // const profilePost = res.data.posts.map(p => new Post(p))
    //     // AppState.posts = profilePost
    // }
}

export const profilesService = new ProfilesService()