<template>
    <v-container>
        <h1>Home</h1>

        <ApolloQuery :query="getPostsQuery">

            <template slot-scope="{ result: { loading, error, data, networkStatus } }">
                <div v-if="loading">Loading...</div>
                <div v-else-if="error">Error! {{ error.message }}</div>
                <div v-else-if="networkStatus">Network Status: {{ networkStatus }}</div>
                <ul v-else v-for="post in data.getPosts" :key="post._id">
                    <li>
                        {{ post.title }}
                        {{ post.imageUrl }}
                        {{ post.description }}
                        {{ post.likes }}
                    </li>
                </ul>
            </template>

        </ApolloQuery>

    </v-container>
</template>

<script>
    import { gql } from 'apollo-boost';

    export default {
        name: 'Home',
        data() {
            return {
                getPostsQuery: gql`
                    query {
                        getPosts {
                            _id
                            title
                            imageUrl
                            description
                            likes
                        }
                    }
                `
            }
        }
    }
</script>
