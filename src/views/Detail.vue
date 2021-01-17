<template>
  <div>
    <div class="h-100-body">
      <navbar />
      <div class="row no-gutters h-content">
        <div class="col-0-5 text-center">
          <sidebar />
        </div>
        <div class="col bg-light">
          <detail />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from '../components/Navbar'
import sidebar from '../components/Sidebar'
import detail from '../components/details/Details'
export default {
  components: {
    navbar, sidebar, detail
  }
}
</script>
