<template>
  <div>
    <div class="container d-none d-md-block">
      <div v-if="cart.length < 1">
        <div class="text-center">
          <img
            src="/assets/images/nocart.svg"
            class="image-nocart"
            alt=""
            srcset=""
          />
          <h4>Your cart is empty</h4>
          <p class="text-muted">Please add some items from the menu</p>
        </div>
      </div>
      <div v-else>
        <div class="cartContainer overflow-auto">
          <div v-for="(element, index) in cart" :key="index">
            <div class="card mb-3">
              <div class="row no-gutters">
                <div
                  class="col-md-4 bg-imgCart"
                  :style="'background-image:url(' + element.image + ')'"
                ></div>
                <div class="col-md-8">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <h5>{{ element.name }}</h5>
                      </div>
                      <div class="col-2">
                        <b-link
                          class="cart text-danger no-decor"
                          @click="parent.removeItem(element.id)"
                        >
                          <i class="fa fa-minus-square"></i>
                        </b-link>
                      </div>
                    </div>
                    <div class="row no-gutters">
                      <div class="col-xl">
                        <div class="input-group input-group-sm mb-3">
                          <div class="input-group-prepend">
                            <button
                              class="btn btn-outline-success"
                              type="button"
                              @click="parent.decrement(element.id)"
                            >
                              <i class="fa fa-minus"></i>
                            </button>
                          </div>
                          <input
                            type="number"
                            class="form-control text-success outline-success"
                            :value="parent.countLength(element.id)"
                            size="2"
                            disabled
                          />
                          <div class="input-group-append">
                            <button
                              class="btn btn-outline-success"
                              type="button"
                              @click="parent.increment(element.id)"
                            >
                              <i class="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl text-center">
                        {{ parent.toRupiah(element.price * element.qty) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="checkoutSection d-flex">
          <div class="container align-self-center">
            <div class="row">
              <div class="col-lg">
                <h6 class="font-weight-bold">Total :</h6>
              </div>
              <div class="col-lg text-lg-right">
                <h6 class="font-weight-bold">
                  {{ parent.toRupiah(parent.countPrice()) }}
                </h6>
              </div>
            </div>
            <p>*Belum termasuk Ppn</p>
            <button
              type="button"
              class="btn btn-sm btn-info btn-block"
              @click="parent.checkOut()"
            >
              Checkout!
            </button>
            <button
              type="button"
              class="btn btn-sm btn-danger btn-block"
              @click="parent.emptyCart()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      parent: this.$parent,
      cart: this.$parent.cart
    }
  }
}
</script>
