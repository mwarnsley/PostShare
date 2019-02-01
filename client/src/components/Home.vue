<template>
    <v-container>
        <h1>Home</h1>
        <ul v-for="post in getPosts" :key="post.title">
            <li>
                {{ post.title }}
                {{ post.imageUrl }}
                {{ post.description }}
            </li>
            <li>{{ post.likes }}</li>
        </ul>
    </v-container>
</template>

<script>
    import { gql } from 'apollo-boost';

    export default {
        name: 'Home',
        apollo: {
            getPosts: {
                query: gql`
                    query {
                        getPosts {
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
