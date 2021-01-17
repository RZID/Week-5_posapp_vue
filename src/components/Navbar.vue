<template>
  <div>
    <div class="container-fluid nBar">
      <div class="row h-100 no-gutters">
        <div class="col-0-5 d-flex">
          <button
            @click="sidebarToggle = !sidebarToggle"
            type="button"
            class="align-self-center btn btn-outline-secondary"
          >
            <div v-if="!sidebarToggle">
              <i class="fa fa-bars"></i>
            </div>
            <div v-else>
              <i class="fa fa-times"></i>
            </div>
          </button>
        </div>
        <div v-if="currentRoute && currentRoute === 'Home'" class="col">
          <div class="row no-gutters d-flex h-100">
            <div class="col align-self-center text-center">
              <h4>Food Items</h4>
            </div>
            <div class="col-2 align-self-center">
              <b-link
                class="text-dark text-right"
                @click="$parent.toggleSearch()"
              >
                <div v-if="this.$parent.search">
                  <h4><i class="fa fa-times"></i></h4>
                </div>
                <div v-else>
                  <h4><i class="fa fa-search"></i></h4>
                </div>
              </b-link>
            </div>
          </div>
        </div>
        <div
          class="col-md-4 d-none d-md-flex justify-content-center"
          v-if="currentRoute && currentRoute === 'Home'"
        >
          <h4 class="align-self-center">
            Cart
            <span
              class="badge badge-info m-0 p-1"
              v-text="this.$parent.cart.length ? this.$parent.cart.length : ''"
            ></span>
          </h4>
        </div>
        <div
          v-if="currentRoute === 'Detail Product'"
          class="col h-100 d-flex justify-content-center"
        >
          <div class="align-self-center">
            <h4 class="m-0">Detail Of ({{ this.$parent.productName }})</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      sidebarToggle: false,
      currentRoute: ''
    }
  },
  mounted () {
    this.currentRoute = this.$route.name
  }
}
</script>
