<template>
  <div>
    <b-modal id="cart" title="Cart" size="xl" scrollable>
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
      <div v-else v-for="(element, i) in cart" :key="i">
        <div class="card mb-3 h-cartSm">
          <div class="row no-gutters h-100">
            <div
              class="col-5 bg-imgCart h-100"
              :style="'background:url(' + element.image + ')'"
              :alt="'Image of ' + element.name"
            ></div>
            <div class="col">
              <div class="card-body">
                <div class="row no-gutters">
                  <div class="col">
                    <h5 class="card-title">{{ element.name }}</h5>
                  </div>
                  <div class="col-2 text-right">
                    <b-link
                      class="cart text-danger no-decor"
                      @click="parent.removeItem(element.id)"
                    >
                      <i class="fa fa-minus-square"></i>
                    </b-link>
                  </div>
                </div>
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
                {{ parent.toRupiah(element.price * element.qty) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #modal-footer v-if="cart.length > 0">
        <div class="w-100">
          <div class="row">
            <div class="col">
              <h6 class="font-weight-bold">Total :</h6>
            </div>
            <div class="col text-right">
              <h6 class="font-weight-bold">
                {{ parent.toRupiah(parent.countPrice()) }}
              </h6>
            </div>
          </div>
          <p>*Belum termasuk Ppn</p>
          <button
            type="button"
            class="btn btn-sm btn-info btn-block"
            @click="parent.toggleModal(parent.checkOut())"
          >
            Checkout!
          </button>
          <button
            type="button"
            class="btn btn-sm btn-danger btn-block"
            @click="parent.toggleModal(parent.emptyCart())"
          >
            Cancel
          </button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      cart: this.$parent.cart,
      parent: this.$parent
    }
  }
}
</script>
