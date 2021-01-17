<template>
  <div class="bg-light .h-content overflow-auto">
    <contentControl />
    <div class="container">
      <div v-if="statement.filtered">
        {{
          statement.searchStatement
            ? "Searching '" + statement.searchStatement + "'"
            : ""
        }}
        <span v-if="statement.searchStatement && statement.filterStatement">
          and
        </span>
        <span class="text-capitalize">
          {{
            statement.filterStatement
              ? "Sorting by " + statement.filterStatement
              : ""
          }}
        </span>
      </div>
    </div>
    <div v-if="statement.isLoading">
      <div class="d-flex justify-content-center">
        <div class="card shadow">
          <div class="card-body text-center p-4">
            <div class="spinner-grow text-info" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <h4>Please wait ...</h4>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="statement.isError">
      <div class="text-center">
        <img src="" alt="" />
        <h1><i class="fa fa-exclamation-triangle"></i></h1>
        <h1 class="err-font">{{ errorHandler.errorCode }}</h1>
        {{ errorHandler.errorMessage }}
      </div>
    </div>
    <div v-else>
      <div class="container pt-3">
        <div class="row">
          <div
            class="col-lg-4 col-sm-6 col-12 py-3"
            v-for="(element, index) in dataHandler.product"
            v-bind:key="index"
          >
            <div class="card">
              <div
                :style="'background:url(' + element.image + ')'"
                class="card-img-top image-content"
                :alt="'Image Of ' + element.name"
              ></div>
              <div class="card-body">
                <h5 class="font-weight-bold">{{ element.name }}</h5>
                <h5 class="font-weight-bold">{{ element.price }}</h5>
                <hr />
                <button
                  @click="addToCart(element)"
                  type="button"
                  :class="bindCartData.btnColor(element.id)"
                >
                  <i :class="bindCartData.icon(element.id)"></i>
                  {{ bindCartData.btnText(element.id) }}
                </button>
                <button
                  @click="parent.goTo('/detail_product/' + element.id)"
                  tag="button"
                  class="btn btn-sm btn-block btn-success"
                >
                  Detail
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!statement.isError || !statement.isLoading">
          <div class="container">
            <div class="row no-gutters py-3">
              <div
                class="col-sm d-flex justify-content-sm-start justify-content-center"
              >
                <div class="align-self-center">
                  Showing {{ dataHandler.totalInPageData }} Of
                  {{ dataHandler.totalDataFiltered }} Data
                  <span
                    v-if="
                      dataHandler.totalData !== dataHandler.totalDataFiltered
                    "
                  >
                    (Returned from {{ dataHandler.totalData }} Total Data
                    without searching)
                  </span>
                </div>
              </div>
              <div
                class="col-sm d-flex justify-content-sm-end justify-content-center"
              >
                <div class="align-self-center">
                  <b-pagination
                    class="m-0"
                    v-model="pagination.currentPage"
                    :total-rows="dataHandler.totalDataFiltered"
                    :per-page="dataHandler.limit"
                    @input="filterHandling()"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import contentControl from '../components/ContentCtrl'
import Axios from 'axios'
import Swal from 'sweetalert2'
export default {
  components: {
    contentControl
  },
  data () {
    return {
      statement: {
        isLoading: true,
        isError: false,
        filtered: false,
        searchStatement: '',
        filterStatement: ''
      },
      errorHandler: {
        errorMessage: '',
        errorCode: ''
      },
      dataHandler: {
        product: {},
        currentFilter: '',
        limit: 6,
        totalData: 0,
        totalInPageData: 0,
        totalDataFiltered: 0
      },
      pagination: {
        currentPage: 1
      },
      parent: this.$parent,
      cart: this.$parent.cart,
      bindCartData: {
        icon: (id) => this.bindCart(id) ? 'fa fa-minus' : 'fa fa-cart-plus',
        btnText: (id) => this.bindCart(id) ? 'Remove from cart' : 'Add to cart',
        btnColor: (id) => this.bindCart(id) ? 'btn btn-sm btn-block btn-danger' : 'btn btn-sm btn-block btn-info'
      }
    }
  },
  methods: {
    addToCart (element) {
      if (this.cart.filter(el => el.id === element.id).length === 0) {
        this.cart.push({
          id: element.id,
          name: element.name,
          price: element.priceOriginal,
          image: element.image,
          qty: 1
        })
      } else {
        const dataThis = this.cart.filter(el => el.id === element.id)[0]
        Swal.fire({
          title: 'Are you sure?',
          text: `Want to remove ${dataThis.qty} of ${dataThis.name} from cart?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#138496',
          cancelButtonColor: '#dc3545',
          confirmButtonText: 'Yes, delete it'
        }).then((result) => {
          if (result.isConfirmed) {
            this.cart.forEach((el, i) => {
              if (el.id === element.id) {
                this.cart.splice(i, 1)
              }
            })
            Swal.fire({
              animation: true,
              title: `You've been delete ${dataThis.name} from cart`,
              toast: true,
              icon: 'success',
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
          }
        })
      }
    },
    bindCart (id) {
      if (this.cart.filter(el => el.id === id).length > 0) {
        return true
      } else {
        return false
      }
    },
    countTotalData (totalDataFiltering) {
      Axios.get('http://localhost:3000/product').then(res => { this.dataHandler.totalData = res.data.length }).finally(() => {
        this.dataHandler.totalInPageData = totalDataFiltering
      })
    },
    countTotalDataFiltered (filterStatement) {
      const filtering = filterStatement
      Axios.get(`http://localhost:3000/product?${filtering}`).then(res => { this.dataHandler.totalDataFiltered = res.data.length })
    },
    filterHandling (name, order, orderMethod, setFirstPage) {
      this.statement.isLoading = true
      if (setFirstPage) {
        this.pagination.currentPage = 1
      }
      const namePure = name
      const orderPure = order
      const orderMethodPure = orderMethod
      name = name ? `&searchLike=${name}` : ''
      order = order && orderMethod ? `&order=${order}&orderMethod=${orderMethod}` : ''
      const page = this.pagination.currentPage ? `&page=${this.pagination.currentPage}` : ''
      const current = name + order
      if (name || order) {
        this.statement.filtered = true
        this.statement.searchStatement = !namePure ? '' : namePure
        if (order) {
          const filteringStatement = orderMethodPure === 'ASC' ? 'Ascending' : 'Descending'
          this.statement.filterStatement = orderPure + ' with ' + filteringStatement
        } else {
          this.statement.filterStatement = ''
        }
        this.dataHandler.currentFilter = current !== this.dataHandler.currentFilter ? current : this.dataHandler.currentFilter
      } else {
        if (setFirstPage) {
          this.dataHandler.currentFilter = ''
          this.statement.searchStatement = ''
          this.statement.filterStatement = ''
          this.statement.filtered = false
        }
      }
      this.filteringData(this.dataHandler.currentFilter, page, order)
    },
    filteringData (statement, page, order) {
      const limit = this.dataHandler.limit ? `&limit=${this.dataHandler.limit}` : ''
      Axios.get(`http://localhost:3000/product?${this.dataHandler.currentFilter}${limit}${page}`).then((response) => {
        if (response.data.length < 1) {
          this.statement.isError = true
          this.errorHandler.errorMessage = ':\'( Ooops!'
          this.errorHandler.errorCode = 'Data not found!'
        } else {
          this.statement.isError = false
          this.dataHandler.product = response.data
        }
        this.countTotalData(response.data.length)
      }).catch(error => {
        this.statement.isError = true
        this.errorHandler.errorMessage = 'Ooops! ' + error.message
        this.errorHandler.errorCode = error.response.status
      }).finally(() => {
        this.statement.isLoading = false
        this.countTotalDataFiltered(statement)
      })
    }
  },
  mounted () {
    Axios.get('http://localhost:3000/product?limit=' + this.dataHandler.limit).then((response) => {
      this.dataHandler.product = response.data
      this.countTotalData(response.data.length)
    }).catch((error) => {
      this.statement.isError = true
      this.errorHandler.errorMessage = 'Ooops! ' + error.message
      this.errorHandler.errorCode = error.response.status
    }).finally(() => {
      this.statement.isLoading = false
      this.countTotalDataFiltered()
    })
  }
}
</script>
