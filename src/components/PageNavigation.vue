<template>
    <h4>Page {{ page }} of {{ totalPages }}</h4>
    <div class=" d-flex justify-content-between">
        <button :disabled="page <= 1" class="btn btn-primary" @click="getNewPageOfPosts(page -1)">Older posts</button>
        <button :disabled="page == totalPages" class="btn btn-primary" @click="getNewPageOfPosts(page +1)">Newer Post</button>
    </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';

export default {
    setup(){
        return {
            page: computed(() => AppState.page),
            totalPages: computed(() => AppState.totalPages),

            async getNewPageOfPosts(pageNumber){
                try {
                    const query = AppState.query

                    if(!query){
                        await postsService.getNewPageOfPosts(pageNumber);
                    }

                    else{
                        await postsService.getPostByQueryPageNumber(query, pageNumber)
                    }
                } catch (error) {
                    Pop.error(error.message)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>

</style>