<template>
    <div>
        <span id="error" v-if="error">Something wrong happend</span>
        <router-link to="/">Close</router-link>
        <button @click="remove" v-if="task.completed">Delete</button>
        <Form @save="save" :task="task"/>
    </div>    
</template>

<script>

import Form from '../components/Form';

export default {
    name: 'add',
    data(){
        return{
            task: '',
            error: false
        }
    },
    methods: {
        save(){
            this.error = false;
            if(this.task.title) {
                this.task.lastModified = Date.now();
                this.error = false;
                this.$axios.put(`${this.$url}/${this.task.id}`, this.task)
                    .then(() => this.$router.replace('/'))
                    .catch(() => this.error = true);
            }
        },
        remove(){
            this.$axios.delete(`${this.$url}/${this.task.id}`)
                .then(() => this.$router.replace('/'))
                .catch(() => this.error = true);
        }
    },
    created(){
        const id = window.location.hash.split('/').slice(-1)[0];
        this.$axios.get(`${this.$url}/${id}`)
            .then((res) => this.task = res.data)
            .catch(() => this.$router.replace('/'));
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

    button {
        position: absolute;
        top: 15px;
        right: 15px;
        text-decoration: none;
        color: #e62a2a;
        border: none;
        background-color: transparent;
        outline: none;
        font-size: 0.9rem;
        font-weight: 500;
    }

    #error {
        margin-top: 52px;
        display: inline-block;
        color: #e62a2a;
    }

</style>