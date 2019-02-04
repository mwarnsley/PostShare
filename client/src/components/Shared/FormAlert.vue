<template>
    <v-alert dismissible transition="scale-transition" type="error" :value="true">
        <h3>{{ message }}</h3>
    </v-alert>
</template>

<script>
    export default {
        name: 'FormAlert',
        props: ['message']
    }
</script>

