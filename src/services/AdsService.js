import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { Ad } from "../models/Ad.js"
import { AppState } from "../AppState.js"

class AdsService {
    async getAds() {
        try {
            const res = await api.get('api/ads')
            logger.log('Got Ads', res.data)
            const ads = res.data.map(a => new Ad(a))
            AppState.ads = ads

        } catch (error) {
            Pop.error(error.message)
        }
    }
}

export const adsService = new AdsService()