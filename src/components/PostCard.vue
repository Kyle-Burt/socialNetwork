<template>
    <div class="d-flex fs-5 mb-3 ps-2">
        <div class="ps-2 pt-2">
            <router-link :to="{name:'Profile', params: {profileId: postProp.creatorId}}">
                <img class="img-fluid profileImg" :src="postProp.creator.picture" alt="postProp.creator.name">
            </router-link>
        </div>
            <div class="ps-2">
                {{ postProp.creator.name }} 
            <div>
                {{new Date(postProp.createdAt).toLocaleDateString()}}
            </div>
        </div>
    </div>
        <div class="fs-4 d-flex flex-block ps-2">{{ postProp.body }}</div>
        <img class="img-fluid postImg ps-2 pb-2" :src="postProp.imgUrl" alt="">
        <div class="d-flex justify-content-end ">
            <div class="fs-3 pe-3"><i class="mdi mdi-thumb-up"></i>
                {{ postProp.likeIds.length }}
            </div>
        <button  @click="likePost()" type="button">like post</button>
        <!-- TODO I should not see this button if I am not the post creator -->
        <button v-if="account" @click="removePost()" type="button" class="mdi mdi-delete"></button>  
    </div>
</template>


<script>
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

export default {
    props:{
        postProp: {type: Post, required: true},
    },

    setup(props){

        return {

            async removePost(){
                try {
                    const wantsToRemovePost = await Pop.confirm(`Are you sure you want to delete this post?`)

                    if(!wantsToRemovePost) {
                        return
                    }
                    const postId = props.postProp.id
                    await postsService.removePost(postId)
                } catch (error) {
                    Pop.error(error.message)
                }
            },

            async likePost(){
                try {
                    // const creatorId = props.postProp.creatorId
                    await postsService.likePost(props.postProp.id)
                } catch (error) {
                    Pop.error(error.message)
                }
            }

        }
    }
}
</script>


<style lang="scss" scoped>
.profileImg{
    width: 8vh;
    height: 8vh;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
}
.postImg{
    width: 30vh;
    height: 30vh;
}
</style>