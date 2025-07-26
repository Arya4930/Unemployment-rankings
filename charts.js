import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import fs from 'fs';
import path from 'path';

const width = 1400;
const height = 1000;
const chartCallback = (ChartJS) => {
  ChartJS.defaults.font.family = 'Arial';
};

const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });

export async function saveBarChart(labels, data, title, filename) {
  const config = {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: title,
        data,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: title,
          font: { size: 24 }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { precision: 0 }
        }
      }
    }
  };

  const buffer = await chartJSNodeCanvas.renderToBuffer(config);
  fs.writeFileSync(path.join('charts', filename), buffer);
}
