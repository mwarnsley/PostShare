<template>
    <v-container text-xs-center v-if="infiniteScrollPosts">
        <div v-for="post in infiniteScrollPosts.posts" :key="post._id">
            <img height="100px" :src="post.imageUrl">
            <h3>{{ post.title }}</h3>
        </div>
        <v-btn @click="showMorePosts" v-if="showMoreEnabled">Fetch More</v-btn>
    </v-container>
</template>

<script>
    import { INFINITE_SCROLL_POSTS } from '../../queries';

    const pageSize = 2;

    export default {
        name: 'Posts',
        data() {
            return {
                pageNum: 1,
                showMoreEnabled: true
            };
        },
        apollo: {
            infiniteScrollPosts: {
                query: INFINITE_SCROLL_POSTS,
                variables: {
                    pageNum: 1,
                    pageSize
                }
            }
        },
        methods: {
            showMorePosts() {
                this.pageNum += 1;
                // Fetch more post on click of a button
                this.$apollo.queries.infiniteScrollPosts.fetchMore({
                    variables: {
                        // pageNum is incremented by 1
                        pageNum: this.pageNum,
                        pageSize
                    },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                        // Getting the new posts from the fetch more results infinite scroll posts
                        const newPosts = fetchMoreResult.infiniteScrollPosts.posts;
                        // Getting the has more from the fetch more results infinite scroll has more
                        const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore;
                        this.showMoreEnabled = hasMore;

                        return {
                            infiniteScrollPosts: {
                                __typename: prevResult.infiniteScrollPosts.__typename,
                                // Merge previous posts with the new posts
                                posts: [
                                    ...prevResult.infiniteScrollPosts.posts,
                                    ...newPosts
                                ],
                                hasMore
                            }
                        }
                    }
                });
            }
        }
    }
</script>
