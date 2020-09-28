<template>
  <v-container>
    <v-form>
      <v-text-field
        v-model="name"
        type="text"
        label="予定のタイトル"
      ></v-text-field>
      <v-text-field
        v-model="description"
        type="text"
        label="詳細"
      ></v-text-field>
      <!-- <v-text-field
        v-model="startDate"
        type="date"
        label="start"
      ></v-text-field>
      <v-text-field v-model="endDate" type="date" label="end"></v-text-field>
      <v-text-field
        v-model="color"
        type="color"
        label="color (click to open color menu)"
      ></v-text-field> -->
      <v-btn @click="createTodo" type="submit" color="primary" class="mr-4">
        create event
      </v-btn>
      <v-btn @click="deleteTodo" type="submit" color="primary" class="mr-4">
        delete event
      </v-btn>
      <v-btn @click="calendar">戻る</v-btn>
      <!-- <v-btn outlined>
        <router-link to="/">New</router-link>
      </v-btn> -->
    </v-form>
    <div v-for="todo in todos" :key="todo.id">
      <h3>{{ todo.name }}</h3>
      <p>{{ todo.description }}</p>
    </div>
  </v-container>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { createTodo, deleteTodo } from "../graphql/mutations";
import { listTodos } from "../graphql/queries";

export default {
  async created() {
    this.getTodos();
  },
  data() {
    return {
      name: "",
      description: "",
      todos: []
    };
  },
  methods: {
    async createTodo() {
      const { name, description } = this;
      if (!name || !description) return;
      // <同じ意味>if (!this.name || !this.description) return;
      const todo = { name, description };
      this.todos = [...this.todos, todo];
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
      //  <graphqlOperationを使わない場合>
      //    await API.graphql({
      //     query: createTodo,
      //     variables: { input: todo }
      //    });
      // this.name = "";
      // this.description = "";
    },
    calendar() {
      this.$router.push({ path: "/" });
    },
    async deleteTodo() {
      await API.graphql(
        graphqlOperation(deleteTodo, {
          input: { id: this.todos[0].id }
        })
      );
    },
    async getTodos() {
      const todos = await API.graphql({
        query: listTodos
      });
      this.todos = todos.data.listTodos.items;
      // this.$emit("getTodo", this.todos[0].name);
      // this.$store.commit("todocommit", this.todos[5].name);
    }
  }
};
</script>
