<template>
    <div>
        {{ ad.title }}
        <img class="img-fluid" :src="ad.img" :alt="ad.title">
    </div>
</template>


<script>
import { Ad } from '../models/Ad.js';
import { adsService } from '../services/AdsService.js';
import Pop from '../utils/Pop.js';

export default {
    props: {
        adProp: {type: Ad, required: true},
    },
    setup(){
        async function getAds(){
            try {
                await adsService.getAds()
            } catch (error) {
                Pop.error(error.message)
            }
        }
        return {
            getAds,
        }
    }
}
</script>


<style lang="scss" scoped>

</style>