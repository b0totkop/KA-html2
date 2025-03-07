<template>
  <div class="container">
    <div class="fours-list">
      <div v-for="four in foursStore.four" :key="four.id" class="four-item">
        <h1 class="four-id">{{ four.id }}</h1>
        <p class="four-value">{{ four.value }}</p>
      </div>
    </div>

    <div class="add-new-number">
      <input 
        v-model="newNumber" 
        type="number" 
        placeholder="Enter a new number" 
        class="number-input"
      />
      <button @click="addNewNumber" class="add-button">Add New Number</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useFoursStore } from "./stores/szamnegyes.js";

const foursStore = useFoursStore();
const newNumber = ref("");

onMounted(() => {
  foursStore.getDatas();
});

const addNewNumber = () => {
  if (newNumber.value) {
    foursStore.addFour(Number(newNumber.value));
    newNumber.value = "";
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.fours-list {
  margin-bottom: 30px;
}

.four-item {
  background-color: #f4f4f4;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.four-id {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.four-value {
  font-size: 18px;
  color: #666;
}

.add-new-number {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.number-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 70%;
}

.add-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #45a049;
}
</style>