<template>
    <canvas :id="chartId"></canvas>
</template>
<script setup>
import Chart from 'chart.js/auto';
import { 
  ref, 
  watch, 
  onMounted, 
  nextTick 
} from 'vue';

const { type, data, options } = defineProps({
  type: {
    type: String,
    default: 'bar'
  },
  data: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    default: () => ({})
  }
});

const chartId = `${type}-chart-${Math.random().toString(36).substr(2, 9)}`;
const chartInstance = ref(null);

function createChart() {
  nextTick(() => {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;

    const context = canvas.getContext('2d');

    if (chartInstance.value) {
      chartInstance.value.data = data;
      chartInstance.value.update();
    } else {
      chartInstance.value = new Chart(context, {
        type: type,
        data: data,
        options: options
      });
    }
  });
}

onMounted(() => {
  createChart();
});

watch(() => [type, data, options], () => {
  chartInstance.value.destroy();
  createChart();
}, { deep: true });
</script>