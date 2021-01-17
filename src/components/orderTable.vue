<template>
  <div>
    <div class="card border-0 shadow">
      <div class="card-body">
        <div class="row">
          <div class="col">
            <h4 class="card-title">Recent Order</h4>
          </div>
          <div class="col-3">
            <select class="custom-select" v-model="by" @change="changeMethod()">
              <option value="today">Today</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
        <table class="table mt-4 table-responsive-sm">
          <thead>
            <tr>
              <th scope="col" class="text-uppercase">Invoices</th>
              <th scope="col" class="text-uppercase">Cashier</th>
              <th scope="col" class="text-uppercase">Date</th>
              <th scope="col" style="width: 30%" class="text-uppercase">
                Orders
              </th>
              <th scope="col" class="text-uppercase">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(element, i) in history" :key="i">
              <td>{{ element.invoice }}</td>
              <td>{{ element.cashier }}</td>
              <td>{{ element.date }}</td>
              <td>{{ element.product }}</td>
              <td>{{ element.amount }}</td>
            </tr>
          </tbody>
        </table>
        <b-pagination
          class="m-0"
          v-model="page"
          :total-rows="totalData"
          :per-page="limit"
          @input="changeMethod()"
        >
          <template #first-text>
            <i class="fa fa-fast-backward"></i>
          </template>
          <template #prev-text>
            <i class="fa fa-step-backward"></i>
          </template>
          <template #next-text>
            <i class="fa fa-step-forward"></i>
          </template>
          <template #last-text>
            <i class="fa fa-fast-forward"></i>
          </template>
          <template #page="{ page, active }" secondary>
            <b v-if="active">{{ page }}</b>
            <a v-else>{{ page }}</a>
          </template>
        </b-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  data () {
    return {
      history: [],
      by: 'today',
      page: 1,
      totalData: 0,
      limit: 8
    }
  },
  methods: {
    changeMethod () {
      const limit = this.limit ? 'limit=' + this.limit : ''
      const page = this.page ? '&page=' + this.page : ''
      Axios.get('http://localhost:3000/history?' + limit + page).then((res) => {
        this.history = res.data
      })
    }
  },
  mounted () {
    Axios.get('http://localhost:3000/history?limit=' + this.limit).then((res) => {
      this.history = res.data
    })
    Axios.get('http://localhost:3000/history').then((res) => {
      this.totalData = res.data.length
    })
  }
}
</script>
