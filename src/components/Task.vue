<template>
    <div :id="task.id" class="task">
        <button @click="$emit('check', task.id)" :class="task.completed ? 'done' : ''"></button>
        <router-link :to="`/edit/${task.id}`" :class="task.completed ? 'line-through' : ''">{{task.title}}</router-link>
    </div>
</template>

<script>
export default {
    name: "task",
    props: {
        task: {
            id: Number,
            title: String,
            completed: Boolean,
            createdAt: Date,
            lastModified: Date
        }
    }
}
</script>

<style scoped>
    .task {
        background-color: #fff;
        border-radius: 3px;
        display: flex;
        align-items: center;
        padding: 15px 10px;
        border-bottom: 1px solid rgba(0, 0, 0, .3);
    }

    button {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        outline: none;
        border: 2px solid #a5a5a5;
        background-color: white;
        margin-right: 20px;
        transition-duration: 0.2s;
    }

    button.done {
        background-color: #2c3e50;
        border: none;
    }

    a {
        width: 85%;
        text-align: justify;
        color: #2c3e50;
        text-decoration: none;
    }

    a.line-through {
        text-decoration: line-through;
    }
    
</style>