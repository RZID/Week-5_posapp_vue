<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data: () => ({
    chartdata: {
      labels: ['Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'],
      datasets: [
        {
          label: 'Last Week',
          borderColor: '#ffb8c6',
          fill: false,
          data: [100000, 50000, 300000, 400000, 312000, 40000, 90000]
        },
        {
          label: 'This Week',
          borderColor: '#00f1ff',
          fill: false,
          data: [135000, 150000, 250000]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
