<template>
    <v-container text-xs-center mt-5 pt-5>
        
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="primary-text">Add Post</h1>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-form
                    lazy-validation
                    ref="form"
                    @submit.prevent="handleAddPost"
                    v-model="isFormValid">

                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                label="Post Title"
                                required
                                :rules="titleRules"
                                type="text"
                                v-model="title">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                label="Image URL"
                                required
                                :rules="imageRules"
                                type="text"
                                v-model="imageUrl">
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12>
                            <img height="300px" :src="imageUrl">
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12>
                            <v-select
                                :items="['Art', 'Education', 'Photography', 'Technology', 'Travel']"
                                label="Categories"
                                multiple
                                :rules="categoriesRules"
                                v-model="categories">
                            </v-select>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12>
                            <v-textarea
                                label="Description"
                                :rules="descRules"
                                type="text"
                                v-model="description">
                            </v-textarea>
                        </v-flex>
                    </v-layout>   

                    <v-layout row>
                        <v-flex xs12>
                            <v-btn
                                color="info"
                                :disabled="!isFormValid || loading"
                                :loading="loading" 
                                type="submit">
                                <span slot="loader" class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                </span>
                                Submit
                            </v-btn>
                        </v-flex>
                    </v-layout>

                </v-form>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'AddPost',
        data() {
            return {
                isFormValid: true,
                categories: [],
                description: '',
                imageUrl: '',
                title: '',
                categoriesRules: [
                    // Make sure a categorie is selected
                    categories => categories.length >= 1 || 'At lest one category is required'
                ],
                descRules: [
                    // Make sure a description is written
                    description => !!description || 'Description is required',
                    // Limiting the amount of characters in the description
                    description => description.length < 200 || 'Description must have less than 200 characters'
                ],
                imageRules: [
                    // Make sure there is an image
                    image => !!image || 'Image is required'
                ],
                titleRules: [
                    // Making sure a title is provided
                    title => !!title || 'Title is required',
                    // Limiting the amount of characters in a title
                    title => title.length < 20 || 'Title must have less than 20 characters'
                ]
            };
        },
        computed: {
            ...mapGetters(['error', 'loading'])
        }
    }
</script>

<style lang="scss">
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
</style>
