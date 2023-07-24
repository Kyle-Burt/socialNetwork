<template>
    <div class="container-fluid" v-if="profile">
        <div class="row justify-content-center">
            <div class="col-12">
                <img class="coverImg" :src="profile.coverImg" alt="">
            </div>
            <div>
                <img class="profileImg mt-5" :src="profile.picture" :alt="profile.name">
            </div>
            <div class="flex-block">
                <h1>{{ profile.name }}</h1>
                <p>{{ profile.bio }}</p>
                <a v-if="profile.linkedin" :href="profile.linkedin"><i class="mdi mid-linkedin fs-2"></i></a>
                <a v-if="profile.github" :href="profile.github"><i class="mdi mid-github fs-2"></i></a>
                <a v-if="profile.resume" :href="profile.resume"><i class="mdi mid-file-account fs-2"></i></a>
            </div>
        </div>
        <div class="row">
            <div class="col-12" v-for="post in Posts" :key="post?.id">
                
                <PostCard :post ="post" />
            </div>
        </div>
    </div>
</template>


<script>
import PostCard from '../components/PostCard.vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import {profilesService} from '../services/ProfilesService.js'
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
// import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';

export default {
    // props:{
    //     post: {type: Post, required: true},
    // },
    setup() {
        const route = useRoute();

        async function getProfile() {
            try {
                const profileId = route.params.profileId;
                await profilesService.getProfile(profileId);
            }
            catch (error) {
                Pop.error(error.message);
            }
        }

        async function getProfilePostById(){
            try {
                const profileId = route.params.profileId
                await postsService.getProfilePostById(profileId)
            } catch (error) {
                Pop.error(error.massage)
            }
        }
        
        onMounted(() => {
            getProfile();
            getProfilePostById();
        });
        return {
            profile: computed(() => AppState.activeProfile),
            coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),
            profilePosts: computed(() => AppState.posts)
        };
        
    },
    components: { PostCard }
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

.coverImg{
    width: 100vw;
    height: 30vw;
    object-fit: cover;
    object-position: center;
}

</style>