<template>
    <div id="form">
        <textarea type="text" id="title" v-model="task.title" placeholder="Task title" rows="3"/>
        <button id="save" @click="$emit('save')">Save</button>
    </div>
</template>

<script>
export default {
    name: 'form',
    props: {
        task: {
            title: String
        },
    }
}
</script>

<style scoped>

#form {
    display: flex;
    flex-wrap: wrap;
    padding: 80px 15px 30px;
    text-align: left;
}

button {
    font-size: 0.9rem;
    font-weight: 500;
}

textarea {
    flex-basis: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    outline: none;
    font-size: 1.2rem;
    font-weight: 300;
    color: #2c3e50;
}

#save {
    margin-top: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    margin-left: auto;
    margin-right: 25px;
    color: white;
    background-color: #2c3e50;
    padding: 5px 10px;
    border-radius: 4px;
    outline: none;
    border: none;
}

</style>