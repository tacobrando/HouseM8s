<template>
    <canvas :id="chartId"></canvas>
    <!-- <div v-else>No Data</div> -->
</template>
<script setup>
import { ref, watch, onMounted, nextTick, computed } from 'vue';
import Chart from 'chart.js/auto';

const { chartType, chartData, chartOptions } = defineProps({
  chartType: {
    type: String,
    default: 'bar'
  },
  chartData: {
    type: Object,
    required: true
  },
  chartOptions: {
    type: Object,
    default: () => ({})
  }
});

const chartId = `${chartType}-chart-${Math.random().toString(36).substr(2, 9)}`;
const chartInstance = ref(null);

function createChart() {
  nextTick(() => {
    if (chartInstance.value) {
      chartInstance.value.destroy();
    }
    const canvas = document.getElementById(chartId);
    if (canvas) {
      const context = canvas.getContext('2d');
      chartInstance.value = new Chart(context, {
        type: chartType,
        data: chartData,
        options: chartOptions
      });
    }
  });
}

onMounted(() => {
  createChart();
});

watch(() => [chartType, chartData, chartOptions], () => {
  chartInstance.value.destroy();
  createChart();
}, { deep: true });

// onBeforeUnmount(() => {
//   if (chartInstance.value) {
//     chartInstance.value.destroy();
//   }
// });
</script>