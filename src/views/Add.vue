<template>
    <div>
        <span v-if="error">Something wrong happend</span>
        <router-link to="/">Close</router-link>
        <Form @save="save" :task="task"/>
    </div>    
</template>

<script>

import Form from '../components/Form';

export default {
    name: 'add',
    data(){
        return{
            task: {
                title: '',
                completed: false,
                createdAt: 0,
                lastModified: 0
            },
            error: false
        }
    },
    methods: {
        save(){
            if(this.task.title) {
                this.task.createdAt = Date.now();
                this.task.lastModified = Date.now();
                this.error = false;
                this.$axios.post(this.$url, this.task)
                    .then(() => this.$router.replace('/'))
                    .catch(() => this.error = true);
            }
        }
    },
    components: {
        Form
    }
}
</script>

<style scoped>

    a {
        position: absolute;
        top: 15px;
        left: 15px;
        text-decoration: none;
        color: #2c3e50;
    }

</style>