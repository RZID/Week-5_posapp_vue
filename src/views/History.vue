<template>
  <div class="h-100">
    <navbar />
    <div class="row no-gutters">
      <div class="col-0-5">
        <sidebar />
      </div>
      <div class="col h-content-force bg-light overflow-auto">
        <div class="container-fluid pt-4">
          <div class="row">
            <div class="col-xl-4 col-sm-6 col-12">
              <div class="card border-0 bg-card-red shadow">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="media-body text-left py-3">
                        <span>Today's Income</span>
                        <h3 class="primary m-0">
                          {{ toRupiah(income.today) }}
                        </h3>
                        <span>{{ percentage.todayIncome }}% Yesterday</span>
                      </div>
                      <div class="align-self-center">
                        <i
                          class="text-white fa fa-hand-holding-usd primary fa-3x float-right"
                        >
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-sm-6 col-12">
              <div class="card border-0 bg-card-blue shadow">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="media-body text-left py-3">
                        <span>Orders</span>
                        <h3 class="primary m-0">{{ orders.length }}</h3>
                        <span>{{ percentage.orderPerWeek }}% Last Week</span>
                      </div>
                      <div class="align-self-center">
                        <i
                          class="fa fa-shopping-basket primary fa-3x text-white float-right"
                        >
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-sm-6 col-12">
              <div class="card border-0 bg-card-purple shadow">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="media-body text-left py-3">
                        <span>This Year's Income</span>
                        <h3 class="primary m-0">
                          {{ toRupiah(income.year) }}
                        </h3>
                        <span>{{ percentage.yearsIncome }}% Last Year</span>
                      </div>
                      <div class="align-self-center">
                        <i
                          class="fa fa-dollar-sign primary fa-3x text-white float-right"
                        >
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container-fluid py-3">
            <div class="card border-0 shadow">
              <div class="card-body">
                <h4 class="card-title">Revenue</h4>
                <chart />
              </div>
            </div>
          </div>
          <div class="container-fluid py-3">
            <orderTable />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from '../components/Navbar'
import sidebar from '../components/Sidebar'
import orderTable from '../components/orderTable'
import chart from '../components/Chart'
import Axios from 'axios'
import Moment from 'moment'

export default {
  components: {
    navbar, sidebar, chart, orderTable
  },
  data () {
    return {
      today: [],
      orders: [],
      years: [],
      income: {
        year: 0,
        today: 0
      },
      percentage: {
        todayIncome: '',
        orderPerWeek: '',
        yearsIncome: ''
      }
    }
  },
  methods: {
    // Toggle number to rupiah
    toRupiah (number) {
      return number.toLocaleString('id', { style: 'currency', currency: 'IDR' }).replace(',00', ',-').replace('Rp', 'Rp.')
    },
    allDay (key) {
      const day = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      return day[key]
    },
    profitOrLoss (val1, val2) {
      if (val1 - val2 < 0) {
        return '-' + Math.ceil(((val2 - val1) / val2) * 100)
      } else {
        return '+' + Math.ceil(((val1 - val2) / val1) * 100)
      }
    }
  },
  mounted () {
    Axios.get('http://localhost:3000/history').then((res) => {
      // Day initialization with MomentJS
      const todayStart = Moment().startOf('day').unix()
      const todayEnd = Moment().endOf('day').unix()
      const yesterdayStart = Moment().subtract(1, 'day').startOf('day').unix()
      const yesterdayEnd = Moment().subtract(1, 'day').endOf('day').unix()
      const thisYearStart = Moment().startOf('years').unix()
      const thisYearEnd = Moment().endOf('years').unix()
      const lastYearStart = Moment().subtract(1, 'year').startOf('years').unix()
      const lastYearEnd = Moment().subtract(1, 'year').endOf('years').unix()
      const unixThisFirst = Moment().startOf('week').unix()
      const unixThisEnd = Moment().endOf('week').unix()
      const unixLastFirst = Moment().subtract(1, 'weeks').startOf('week').unix()
      const unixLastEnd = Moment().subtract(1, 'weeks').endOf('week').unix()

      // Add data
      this.orders = res.data
      this.today = res.data.filter(el => el.date_number >= todayStart && el.date_number <= todayEnd)
      this.years = res.data.filter(el => el.date_number >= thisYearStart && el.date_number <= thisYearEnd)
      this.income.today = this.today.map(el => el.num_amount).reduce((a, b) => a + b)
      this.income.year = this.years.map(el => el.num_amount).reduce((a, b) => a + b)

      // Profit and Loss (Yesterday)
      const yesterdayAmount = this.orders.filter(el => el.date_number >= yesterdayStart && el.date_number <= yesterdayEnd).map(el => el.num_amount).reduce((a, b) => a + b)
      this.percentage.todayIncome = this.profitOrLoss(this.income.today, yesterdayAmount)

      // Profit and Loss (Order Week)
      const thisWeekOrder = this.orders.filter(el => el.date_number >= unixThisFirst && el.date_number <= unixThisEnd)
      const lastWeekOrder = this.orders.filter(el => el.date_number >= unixLastFirst && el.date_number <= unixLastEnd)
      this.percentage.orderPerWeek = this.profitOrLoss(thisWeekOrder.length, lastWeekOrder.length)

      // Profit and Loss (Year's)
      const lastYearOrder = this.orders.filter(el => el.date_number >= lastYearStart && el.date_number <= lastYearEnd)
      this.percentage.yearsIncome = this.profitOrLoss(this.years.length, lastYearOrder.length)
    })
  }
}
</script>
