<template>
    <v-container text-xs-center>
        <v-flex xs12>
            <v-carousel v-bind="{ 'cycle': true }" interval="3000">
                <v-carousel-item v-for="post in posts" :key="post._id" :src="post.imageUrl">
                    <h1 class="carousel-title">{{ post.title }}</h1>
                </v-carousel-item>
            </v-carousel>
        </v-flex>
    </v-container>
</template>

<script>
    import { gql } from 'apollo-boost';

    export default {
        name: 'Home',
        data() {
            return {
                posts: []
            };
        },
        apollo: {
            getPosts: {
                query: gql`
                    query {
                        getPosts {
                            _id
                            title
                            imageUrl
                            description
                            likes
                        }
                    }
                `,
                result({ data, loading }) {
                    if (!loading) {
                        this.posts = data.getPosts;
                    }
                }
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