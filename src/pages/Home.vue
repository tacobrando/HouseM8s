<template>
  <div class="flex flex-col p-2">
    <div class="activity-board" v-if="groupStore.groupId !== null">
      <div class="task-activity text-center">
        <div class="text-xl underline font-bold">{{ groupStore.groupName }} Activity</div>
        <div class="grocery-activities mb-4">
          <div class="font-semibold text-lg underline">
            <span>Groceries ({{ groupStore.currency }})</span>
          </div>
          <span v-if="groceryStore.completed.length < 1">No data</span>
          <Chart 
            v-else
            :key="groceryStore.completed" 
            type="doughnut" 
            :options="chartOptions" 
            :data="groceryChartData" 
          />
        </div>
        <div class="chore-activities mb-4">
          <div class="font-semibold text-lg underline">
            <span>Chores</span>
          </div>
          <span v-if="choreStore.completed.length < 1">No data</span>
          <Chart 
            v-else
            :key="choreStore.completed" 
            type="doughnut" 
            :options="chartOptions" 
            :data="choreChartData" 
          />
        </div>
      </div>
    </div>
    <div v-else>Select a group</div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue';
import { useChoreStore } from '@/composables/chore';
import { useGroceryStore } from '@/composables/grocery';
import { useGroupStore } from '@/composables/group';
import { parseChartData, generateColors } from '@/utils/Chart'
import Chart from '@/components/Chart.vue';

const groceryStore = useGroceryStore()
const choreStore = useChoreStore()
const groupStore = useGroupStore()

const chartOptions =  {
    maintainAspectRatio: true,
    aspectRatio: 1.8
}

const groceryChartData = computed(() => {
  const priceTotals = groupStore.members.reduce((totals, member) => {
    totals[member.username] = 0;
    return totals;
  }, {});

  parseChartData(groceryStore, groupStore.members, priceTotals)

  const labels = Object.keys(priceTotals);
  const data = Object.values(priceTotals);
  const backgroundColors = generateColors(labels);


  return {
    labels: labels,
    datasets: [
      {
        label: "Monthly Data",
        data: data,
        borderWidth: 1,
        backgroundColor: backgroundColors,
      }
    ]
  };
});

const choreChartData = computed(() => {
  const taskTotals = groupStore.members.reduce((totals, member) => {
    totals[member.username] = 0
    return totals
  }, {})
  parseChartData(choreStore, groupStore.members, taskTotals)

  const labels = Object.keys(taskTotals)
  const data = Object.values(taskTotals)
  const backgroundColors = generateColors(labels);

  return {
    labels: labels,
    datasets: [{
      label: "Monthly Data",
      data: data,
      borderWidth: 1,
      backgroundColor: backgroundColors,
    }]
  }
})

</script>