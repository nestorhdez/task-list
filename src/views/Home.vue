<template>
  <div class="home">
    <h1>Task list</h1>
    <span id="message" v-if="error.status">{{error.msg}}</span>
    <router-link to="/add" id="add-task" class="box-shadow">Add task</router-link>

    <div id="incompleted-container">
      <Task @check="checkTask" :task="task" v-for="(task, i) in incompleted" :key="i"/>
    </div>

    <div id="completed-container" :class="completedContainer ? 'show' : ''">
      <div id="completed-header" class="box-shadow">
        <span>Completed</span>
        <button @click="toggleCompleted">{{completedContainer ? 'Hide' : 'Show'}}</button>
      </div>
      <Task @check="checkTask" :task="task" v-for="(task, i) in completed" :key="i"/>
    </div>

  </div>
</template>

<script>

import Task from '../components/Task';

export default {
  name: 'home',
  data(){
    return{
      taskList: [],
      error: {
        status: false,
        msg: ''
      },
      completedContainer: false
    }
  },
  methods: {
    getTaskList() {
      this.error.status = false;
      this.$axios.get(this.$url)
        .then(res => {
          this.taskList = res.data.sort((a, b) => b.lastModified - a.lastModified);
          if(res.data.length === 0) {
            this.error.status = true;
            this.error.msg = 'There are no task to show';
          }
        })
        .catch(() => this.error.msg = 'Something wrong happend');
    },
    checkTask(id){
      const task = this.taskList.find(task => task.id === id);
      task.completed = !task.completed;
      this.$axios.patch(`${this.$url}/${id}`, task);
    },
    toggleCompleted(){
      this.completedContainer = !this.completedContainer;
    }
  },
  computed: {
    incompleted(){
      return this.taskList.filter(task => !task.completed);
    },
    completed(){
      return this.taskList.filter(task => task.completed);
    }
  },
  created(){
    this.getTaskList();
  },
  components: {
    Task
  }
}
</script>

<style scoped>

h1 {
  margin-top: 40px;
  margin-bottom: 20px;
}

#message {
  display: inline-block;
  margin-top: calc(50vh - 84px);
  font-size: 1.2rem;
  font-weight: 500;
  color: #e62a2a;
}

#add-task {
  text-decoration: none;
  color: #2c3e50;
}

#incompleted-container {
  margin-top: 30px;
}

#completed-container {
  height: 90px;
  overflow: hidden;
}

#completed-container.show {
  height: auto;
  overflow: auto;
}

.box-shadow {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 10px;
  margin: 30px 0 10px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0px 3px 1px rgba(0, 0, 0, 0.3);
  font-size: 1.1rem;
  font-weight: 500;
}

#completed-header button {
  position: absolute;
  right: 20px;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 0.9rem;
  font-weight: 500;
}

@media (min-width: 678px) {

  #add-task, #incompleted-container {
    width: calc(60% - 5px);
  }
  #add-task, #incompleted-container, #completed-container {
    margin-left: auto;
    margin-right: auto;
  }
  
  #completed-container{
    width: 60%;
    padding: 0 5px;
  }
    
}

</style>