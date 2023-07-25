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
                <a :href="profile.linkedin"><i class="mdi mid-linkedin fs-2 me-2">linkedin</i></a>
                <a :href="profile.github"><i class="mdi mid-github fs-2 me-2">github</i></a>
                <a :href="profile.resume"><i class="mdi mid-file-account fs-2">resume</i></a>
                <p>{{ profile.class }}</p>
                <p> graduated: {{ profile.graduated }}</p>
                
            </div>
        </div>
        <div class="row">
            <div class="col-9" v-for="post in profilePosts" :key="post.id">
                
                <PostCard :postProp ="post" />
            </div>
            <div class="col-3" v-for="ad in ads" :key="ad.id">
                
                <AdCard :adProp ="ad"/>
            </div>
        </div>
        <PageNavigation/>
    </div>
</template>


<script>
import AdCard from '../components/adCard.vue';
import PageNavigation from '../components/PageNavigation.vue';
import PostCard from '../components/PostCard.vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import {profilesService} from '../services/ProfilesService.js'
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { adsService } from '../services/AdsService.js';

export default {

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
            // debugger
            try {
                const profileId = route.params.profileId
                await postsService.getProfilePostById(profileId)
            } catch (error) {
                Pop.error(error.massage)
            }
        }

        async function getAds(){
            try {
                await adsService.getAds()
            } catch (error) {
                Pop.error(error.message)
            }
        }
        
        onMounted(() => {
            getProfile();
            getProfilePostById();
            getAds()
        
        });
        return {
            profile: computed(() => AppState.activeProfile),
            coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),
            profilePosts: computed(() => AppState.posts),
            ad: computed(() => AppState.ads)
        };
        
    },
    components: { PostCard, PageNavigation, AdCard }
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