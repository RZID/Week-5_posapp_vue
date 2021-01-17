<template>
  <div>
    <div class="py-3 text-center">
      <router-link to="/" class="text-dark">
        <h3><i class="fa fa-utensils"></i></h3>
      </router-link>
    </div>
    <div class="pb-3 text-center">
      <router-link to="/history" class="text-dark">
        <h3><i class="fa fa-chart-line"></i></h3>
      </router-link>
    </div>
    <div v-if="currentRoute && currentRoute === 'Home'">
      <div class="pb-3 text-center d-md-none">
        <b-link class="no-decor text-dark" v-b-modal.cart>
          <h3>
            <span class="badge badge-info">
              <i class="fa fa-shopping-cart"></i>
              {{ this.$parent.cart ? this.$parent.cart.length : "" }}
            </span>
          </h3>
        </b-link>
      </div>
    </div>
    <div>
      <b-link v-b-modal.addItem>
        <h3 class="text-success text-center"><i class="fa fa-plus"></i></h3>
      </b-link>
    </div>
    <addItem />
  </div>
</template>
<script>
import addItem from '../components/modals/AddItems'
export default {
  components: {
    addItem
  },
  data () {
    return {
      currentRoute: ''
    }
  },
  mounted () {
    this.currentRoute = this.$route.name
  }
}
</script>
