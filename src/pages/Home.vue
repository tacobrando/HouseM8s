<template>
  <div class="flex flex-col p-2">
    <div class="activity-board" v-if="groupStore.groupId !== null">
      Activity
      <div v-if="groceryStore.completed.length < 1">No data</div>
      <Chart v-else :key="groceryStore.completed" chartType="doughnut" :chartOptions="chartOptions" :chartData="chartData" />
    </div>
    <div v-else>Select a group</div>
  </div>
</template>

<script setup>
import { useChoreStore } from '@/composables/chore';
import { useGroceryStore } from '@/composables/grocery';
import { computed, onBeforeMount } from 'vue';
import Chart from '../components/Chart.vue';
import { useGroupStore } from '@/composables/group';

const groceryStore = useGroceryStore()
const choreStore = useChoreStore()
const groupStore = useGroupStore()

const chartOptions =  {
    maintainAspectRatio: true,
    aspectRatio: 1.8
}
const chartData = computed(() => {
  const priceTotals = groupStore.members.reduce((totals, member) => {
    totals[member.username] = 0;
    return totals;
  }, {});

  groceryStore.completed
    .filter(item => item.completed)
    .forEach(item => {
      const completingMember = groupStore.members.find(member => member.userId === item.completed);
      if (completingMember) {
        priceTotals[completingMember.username] += parseFloat(item.price);
      }
    });

  const labels = Object.keys(priceTotals);
  const data = Object.values(priceTotals);

  return {
    labels: labels,
    datasets: [
      {
        label: "Monthly Data",
        data: data,
        borderWidth: 1
      }
    ]
  };
});

onBeforeMount(() => {
  groceryStore.init()
  choreStore.init()
})
</script>