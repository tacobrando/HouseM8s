export const colorPalette = [
  'rgba(255, 99, 132, 0.8)', // Red
  'rgba(54, 162, 235, 0.8)', // Blue
  'rgba(255, 206, 86, 0.8)', // Yellow
  'rgba(75, 192, 192, 0.8)', // Teal
  'rgba(153, 102, 255, 0.8)', // Purple
];



export function parseChartData(store, members, totals) {
  store.completed
    .filter(item => item.completed.userId !== null)
    .forEach(item => {
      const completingMember = members.find(member => member.userId === item.completed.userId)
      if(completingMember) {
        totals[completingMember.username] += parseFloat(item.price) || 1
      }
    })
  let unfinishedCount = 0;
  store.list
    .forEach(item => {
      if(item.completed.userId === null) {
        unfinishedCount += 1
      }
    })
  if (unfinishedCount > 0) {
    totals['Unfinished'] = unfinishedCount;
  }
}

export function generateRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70; 
  const lightness = 60; 

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function generateColors(labels) {
  let colorIndex = 0; // Reset color index for each call
  const colors = [];

  for (let i = 0; i < labels.length; i++) {
    if (labels[i] === 'Unfinished') {
      colors.push('rgb(128, 128, 128, 0.8)'); // Grey for "Unfinished"
    } else {
      colors.push(colorPalette[colorIndex % colorPalette.length]);
      colorIndex++;
    }
  }

  return colors;
}
