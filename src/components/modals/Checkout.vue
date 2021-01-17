<template>
  <div>
    <b-modal id="checkOut" hide-footer hide-header>
      <div class="row no-gutters">
        <div class="col">
          <h4>Checkout</h4>
          <p class="m-0">Cashier : {{ currentCashier }}</p>
        </div>
        <div class="col text-right">
          <h6>Receipt no: #{{ receiptNo }}</h6>
        </div>
      </div>
      <hr />
      <div class="py-3">
        <div v-for="(element, i) in cart" :key="i">
          <div class="row">
            <div class="col">
              <h6>{{ element.name }} {{ element.qty }}x</h6>
            </div>
            <div class="col text-right">
              <h6>
                {{ parent.toRupiah(element.price * element.qty) }}
              </h6>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h6 class="m-0">Ppn {{ ppn }}%</h6>
          </div>
          <div class="col text-right">
            <h6>{{ parent.toRupiah(parent.countPrice() / ppn) }}</h6>
          </div>
        </div>
        <div class="text-right">
          <h6>
            Total :
            {{
              parent.toRupiah(parent.countPrice() / ppn + parent.countPrice())
            }}
          </h6>
        </div>
        <div>
          <h6>Payment : {{ payMethod }}</h6>
        </div>
        <hr />
        <div class="row pt-3">
          <div class="col border-right">
            <button
              type="button"
              class="btn btn-success btn-block h-100"
              @click="saveHistory()"
            >
              Save Transaction
            </button>
          </div>
          <div class="col border-left">
            <button type="button" class="btn btn-danger btn-block">
              Print
            </button>
            <p class="m-0 text-center">Or</p>
            <button type="button" class="btn btn-info btn-block">
              Send Email
            </button>
          </div>
        </div>
      </div>
      <div class="text-center">
        <b-link class="text-muted" @click="$bvModal.hide('checkOut')">
          Go back, i want to change</b-link
        >
      </div>
    </b-modal>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import Axios from 'axios'
export default {
  data () {
    return {
      parent: this.$parent,
      cart: this.$parent.cart,
      receiptNo: '010410919',
      payMethod: 'Cash',
      ppn: 10,
      currentCashier: 'Pevita Pearce'
    }
  },
  methods: {
    saveHistory () {
      Swal.fire({
        title: 'Save This Transaction?',
        text: 'Have you checked items and quantities in advance?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#138496',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'I\'ve Check it'
      }).then((result) => {
        if (result.isConfirmed) {
          const dataForm = new URLSearchParams()
          const product = () => {
            const productContainer = []
            productContainer.push(this.cart.map(el => (el.id.toString() + ',').repeat(el.qty)).join(''))
            return productContainer.join(',').replace(/,\s*$/, '')
          }
          dataForm.append('cashier', this.currentCashier)
          dataForm.append('product', product())
          // Config
          const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
          Axios.post('http://localhost:3000/history', dataForm, config).then((res) => {
            this.cart.splice(0, this.cart.length)
            this.$bvModal.hide('checkOut')
            Swal.fire({
              animation: true,
              title: `Successfully saved the transaction, thank's cashier ${this.currentCashier} <i class="ml-2 fa fa-thumbs-up"></i>`,
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
          }).catch(err => alert(err))
        }
      })
    },
    countAllPrice () {
      return this.cart.map((el, i, self) => { self.push(el.price * el.qty) }).reduce((a, b) => a + b)
    }
  }
}
</script>
