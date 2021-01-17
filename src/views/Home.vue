<template>
  <div class="h-100">
    <navbar />
    <div class="row no-gutters h-content">
      <div class="col-0-5">
        <sidebar />
      </div>
      <div class="col h-100">
        <foodItems class="h-100" />
      </div>
      <div class="col-md-4 d-sm-none d-md-block">
        <cart />
      </div>
    </div>
    <cartOnSm />
    <checkOut />
  </div>
</template>

<script>
import navbar from '../components/Navbar'
import sidebar from '../components/Sidebar'
import foodItems from '../components/FoodItems'
import cart from '../components/Cart'
import cartOnSm from '../components/modals/CartSm'
import checkOut from '../components/modals/Checkout'
import Swal from 'sweetalert2'
export default {
  name: 'Home',
  components: {
    sidebar, navbar, foodItems, cart, cartOnSm, checkOut
  },
  data () {
    return {
      cart: [],
      search: false
    }
  },
  methods: {
    // Warner if wan't to change page
    goTo (link) {
      if (this.cart.length > 0) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Want to move pages even though your cart isn\'t empty?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#138496',
          cancelButtonColor: '#dc3545',
          confirmButtonText: 'I\'m sure wan\'t to move'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push(link)
          }
        })
      } else {
        this.$router.push(link)
      }
    },
    // Emptying cart
    emptyCart () {
      if (this.cart.length > 0) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Want to cancel and delete all item(s) on cart?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#138496',
          cancelButtonColor: '#dc3545',
          confirmButtonText: 'I\'m sure!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.cart.splice(0, this.cart.length)
            Swal.fire({
              animation: true,
              title: 'You\'ve been delete all item(s) from cart',
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
      } else {
        this.cart.splice(0, this.cart.length)
        Swal.fire({
          animation: true,
          title: 'You\'ve been delete all item(s) from cart',
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
    },
    // Toggling modal cart then run script on parameter
    toggleModal (then) {
      this.$bvModal.hide('cart')
      return then
    },
    // Toggling modal cart then run script on parameter
    toggleSearch () {
      this.search = !this.search
    },
    // Toggle number to rupiah
    toRupiah (number) {
      return number.toLocaleString('id', { style: 'currency', currency: 'IDR' }).replace(',00', ',-').replace('Rp', 'Rp.')
    },
    // Incrementing amount of product
    increment (id) {
      const filtered = this.cart.filter(el => el.id === id)
      if (filtered[0].qty < 100) {
        this.cart.forEach(el => {
          if (el.id === id) {
            el.qty += 1
          }
        })
      }
    },
    // Decrementing amount of product
    decrement (id) {
      const filtered = this.cart.filter(el => el.id === id)
      if (filtered[0].qty > 1) {
        this.cart.forEach(el => {
          if (el.id === id) {
            el.qty -= 1
          }
        })
      }
    },
    // Counting price in cart
    countPrice () {
      const allPrice = []
      this.cart.filter(el => allPrice.push(el.price * el.qty))
      if (allPrice.length !== 0) {
        return allPrice.reduce((a, b) => a + b)
      }
    },
    // Counting amount of product in cart
    countLength (id) {
      const filtered = this.cart.filter(el => el.id === id)
      return filtered.map(el => el.qty)
    },
    // Removing item on cart
    removeItem (id) {
      const dataThis = this.cart.filter(el => el.id === id)[0]
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
            if (el.id === id) {
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
    },
    checkOut () {
      this.$bvModal.show('checkOut')
    }
  }
}
</script>
