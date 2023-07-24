<template>
    <div>
        {{ ad.title }}
        <img class="img-fluid" :src="ad.img" :alt="ad.title">
    </div>
</template>


<script>
import { Ad } from '../models/Ad.js';

export default {
    props: {
        adProp: {type: Ad, required: true},
    },
    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>

</style>