import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFoursStore = defineStore('four', () => {
  const four = ref([]);

  const getDatas = () => {
    fetch("http://localhost:3000/fours")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          four.value = data;
        } else {
          console.error("Invalid data format received", data);
          four.value = [];
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        four.value = [];
      });
  };

  const addFour = (number) => {
    const numberStr = String(number);

    if (numberStr.length !== 4 || isNaN(numberStr)) {
      console.error("Number must be a 4-character string");
      return;
    }
  
    fetch("http://localhost:3000/fours")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.some(f => f.value === numberStr)) {
          console.log("Number already exists in the database");
          return;
        }
  
        const newNumber = {
          id: data.length + 1,
          value: numberStr
        };
  
        fetch("http://localhost:3000/fours", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newNumber)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(data => {
            console.log("New four added:", data);
            four.value.push(data);
          })
          .catch(error => console.error('Error adding number:', error));
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  return { four, getDatas, addFour };
});