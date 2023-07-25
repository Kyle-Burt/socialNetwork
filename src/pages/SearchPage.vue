<template>
    
    <div class="container-fluid">
        <div class="row">
            <form @submit.prevent="getPostsByQuery()">
                <div class="fs-4 text-center my-2">
                    <label class="me-2" for="searchBar">search posts</label>
                    <input v-model="editable.query" type="text" id="searchBar" required minlength="2" maxlength="50">
                    <button class="btn btn-primary" type="submit"> <i class="mdi mdi-magnify"></i> </button>
                </div>
            </form>
            <div class="col-9" v-for="post in posts" :key="post.id">

                <PostCard :postProp="post"/>

            </div>
            <div class="col-3" v-for="ad in ads" :key="ad.id">

                <AdCard/>
                
            </div>
        </div>
    </div>
</template>


<script>
import { computed, ref } from 'vue';
import PostCard from '../components/PostCard.vue';
import AdCard from '../components/adCard.vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';


export default {
    setup() {
        
        const editable = ref({})
        return {
            editable,
            ads: computed(() => AppState.ads),
            posts: computed(() => AppState.posts),

            async getPostsByQuery(){
                try {
                    logger.log(editable.value)
                    const queryObject = editable.value
                    await postsService.getPostsByQuery(queryObject)
                } catch (error) {
                    Pop.error(error.message)
                }
            }
        };
    },
    components: { PostCard, AdCard }
}
</script>


<style lang="scss" scoped>

</style>
