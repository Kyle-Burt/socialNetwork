<template>
    <div class="card elevated shadow bg-white mt-2">
        <form @submit.prevent="makePost()" v-if="account.id" class="mt-2" action="">
        <div class="form-floating mb-3 px-2">
            <textarea v-model="editable.body" class="w-100" name="body" id="body" cols="30" rows="10" placeholder="Your post"></textarea>
        </div>
        <div class="form-floating mb-3 px-2">
            <input type="url" class="form-control" id="imgUrl" placeholder="post img">
            <label for="imgUrl">post img</label>
        </div>
        <div class="d-flex justify-content-end me-2 mb-2">
            <button class="btn btn-primary" type="submit">Post</button>
        </div>
        </form>
    </div>
</template>


<script>
import { computed, ref } from 'vue';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

export default {
    setup(){
        const editable = ref({})

        return {
            account: computed(() => AppState.account),
            editable,

            async makePost() {
            try {
                const postData = editable.value;
                await postsService.makePost(postData);
                editable.value = {};
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
        }
    }
}
</script>


<style lang="scss" scoped>

</style>