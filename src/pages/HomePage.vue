<template>
  <div class="container-fluid">
    <div class="row justify-content-between">
      <div class="col-1"></div>
      <div class="col-9">
        <PostForm/>
      </div>
      <div class="col-2">
      </div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-9">
        <div class="card elevated mb-3 mt-3 bg-white" v-for="post in posts" :key="post.id">
          
          <PostCard :postProp="post"/>
        </div>
      </div>
      <div v-for="ad in ads" :key="ad.id" class="col-2">
        <div class="card elevated">
          <AdCard :adProp="ad"/>
        </div>
        
      </div>
      <PageNavigation/>
    </div>
  </div>
</template>

<script>


import AdCard from '../components/adCard.vue';
import PageNavigation from '../components/PageNavigation.vue';
import PostForm from '../components/PostForm.vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js'
// import { adsService } from '../services/AdsService.js'
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.vue';


export default {
    setup() {
        async function getPost() {
            try {
                await postsService.getPost();
            }
            catch (error) {
                Pop.error(error.message);
            }
        }

        // async function getAds(){
        //   try {
        //     await adsService.getAds()
        //   } catch (error) {
        //     Pop.error(error.message)
        //   }
        // }

        // async function removePost(){
        //   try {
        //     const wantsToRemovePost = await Pop.confirm(`Are you sure you want to delete this post?`)
        //     await postsService.removePost()
        //   } catch (error) {
        //     Pop.error(error.message)
        //   }
        // }

        onMounted(() => {
            getPost();
            // getAds();
        });

        return {
            getPost,
            // getAds,
            ads: computed(() => AppState.ads),
            posts: computed(() => AppState.posts),
            account: computed(() => AppState.account)
        };
    },
components: { PostCard, PostForm, PageNavigation, AdCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

}

</style>
