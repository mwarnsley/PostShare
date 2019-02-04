<template>
    <v-container text-xs-center mt-5 pt-5>
        
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1>Get Started Here</h1>
            </v-flex>
        </v-layout>

        <v-layout v-if="error" row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <form-alert :message="error"></form-alert>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card color="accent" dark>
                    <v-container>
                        <v-form
                            lazy-validation
                            ref="form"
                            @submit.prevent="handleSignupUser"
                            v-model="isFormValid">
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                        label="Username"
                                        prepend-icon="face"
                                        required
                                        :rules="usernameRules"
                                        type="text"
                                        v-model="username">
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                        label="Email"
                                        prepend-icon="email"
                                        required
                                        :rules="emailRules"
                                        type="email"
                                        v-model="email">
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                        label="Password"
                                        prepend-icon="extension"
                                        required
                                        :rules="passwordRules"
                                        type="password"
                                        v-model="password">
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                        label="Password Confirmation"
                                        prepend-icon="gavel"
                                        required
                                        :rules="passwordRules"
                                        type="password"
                                        v-model="passwordConfirmation">
                                    </v-text-field>
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
                                        Signup
                                    </v-btn>
                                    <h3>
                                        Already have an account?
                                        <router-link to="/signin">Signin</router-link>
                                    </h3>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'Signup',
        data() {
            return {
                isFormValid: true,
                email: null,
                password: null,
                passwordConfirmation: null,
                username: null,
                emailRules: [
                    // Check to make sure the email is entered
                    email => !!email || 'Email is required',
                    // Confirming that the email is in the format of an email
                    email => /.@+./.test(email) || 'Email must be valid'
                ],
                passwordRules: [
                    // Check to make sure there is a password typed in
                    password => !!password || 'Password is required',
                    // Checking to make sure that the password is at least 7 characters long
                    password => password && password.length >= 4 || 'Password must be at least 7 characters',
                    // Verifying that the password confirmation matches the original password
                    confirmation => confirmation === this.password || 'Passwords must match'
                ],
                usernameRules: [
                    // Checking to see if the username in input evauluates to true (converting to boolean with !!)
                    username => !!username || 'Username is required',
                    // Make sure the username is less than 10 characters
                    username => username && username.length < 10 || 'Username must be less than 10 characters'
                ]
            };
        },
        computed: {
            ...mapGetters(['error', 'loading'])
        },
        methods: {
            handleSignupUser() {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('signupUser', {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                    });
                }
            }
        },
        watch: {
            user(value) {
                // Allow for us to watch for changes if the user value changes, redirect to homepage
                if (value) {
                    this.$router.push('/');
                }
            }
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
