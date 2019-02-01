<template>
    <v-container text-xs-center>

        <v-layout row>
            <v-dialog v-model="loading" persistent fullscreen>
                <v-container fill-height>
                    <v-layout row justify-center align-center>
                        <v-progress-circular indeterminate :size="70" :width="7" color="secondary"></v-progress-circular>
                    </v-layout>
                </v-container>
            </v-dialog>
        </v-layout>

        <v-flex xs12>
            <v-carousel v-if="!loading && posts.length > 0" v-bind="{ 'cycle': true }" interval="3000">
                <v-carousel-item v-for="post in posts" :key="post._id" :src="post.imageUrl">
                    <h1 class="carousel-title">{{ post.title }}</h1>
                </v-carousel-item>
            </v-carousel>
        </v-flex>

    </v-container>
</template>

<script>
    import { gql } from 'apollo-boost';
    import { mapGetters } from 'vuex';

    export default {
        name: 'Home',
        created() {
            this.handleGetCarouselPosts();
        },
        computed: {
            ...mapGetters(['loading', 'posts'])
        },
        methods: {
            handleGetCarouselPosts() {
                this.$store.dispatch('getPosts');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .carousel-title {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 5px 5px 0 0;
        bottom: 50px;
        color: #fff;
        left: 0;
        margin: 0 auto;
        position: absolute;
        right: 0;
    }
</style>