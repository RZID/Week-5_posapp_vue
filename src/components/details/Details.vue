<template>
  <div class="h-100">
    <div class="container py-3">
      <div class="card">
        <div class="row no-gutters">
          <div
            class="col-md-4 card-img-detail"
            :style="'background:url(' + currentData.image + ')'"
            :alt="'Image Of ' + currentData.name"
          ></div>
          <div class="col-md-8 d-flex">
            <div class="align-self-center card-body">
              <div class="p-3">
                <div class="form-group row">
                  <div class="col-3 d-flex">
                    <div class="align-self-center">
                      <h5 class="m-0">Name</h5>
                    </div>
                  </div>
                  <div class="col-1 d-flex">
                    <div class="align-self-center">:</div>
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      v-model="currentData.name"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-3 d-flex">
                    <div class="align-self-center">
                      <h5 class="m-0">Price</h5>
                    </div>
                  </div>
                  <div class="col-1 d-flex">
                    <div class="align-self-center">:</div>
                  </div>
                  <div class="col">
                    <input
                      type="number"
                      class="form-control"
                      v-model="currentData.priceOriginal"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-3 d-flex">
                    <div class="align-self-center">
                      <h5 class="m-0">Image</h5>
                    </div>
                  </div>
                  <div class="col-1 d-flex">
                    <div class="align-self-center">:</div>
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      v-model="currentData.image"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-3 d-flex">
                    <div class="align-self-center">
                      <h5 class="m-0">Category</h5>
                    </div>
                  </div>
                  <div class="col-1 d-flex">
                    <div class="align-self-center">:</div>
                  </div>
                  <div class="col">
                    <select
                      class="form-control"
                      v-model="currentData.category_id"
                    >
                      <option
                        v-for="(element, i) in dataCategory"
                        :key="i"
                        :value="element.id_category"
                      >
                        {{ element.name_category }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-danger btn-block"
                    @click="deleteThis()"
                  >
                    Delete this item
                  </button>
                </div>
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-info btn-block"
                    @click="saveThis()"
                  >
                    Save Changes
                  </button>
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
import Axios from 'axios'
import Swal from 'sweetalert2'
export default {
  data: () => {
    return {
      pageId: '',
      modified: false,
      currentData: [],
      dataCategory: []
    }
  },
  methods: {
    deleteThis () {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Want to delete this item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#138496',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Sure'
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete('http://localhost:3000/product/' + this.pageId).then(() => {
            this.$router.push('/')
            Swal.fire({
              animation: true,
              title: 'You\'ve been delete a product',
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
          })
        }
      })
    },
    saveThis () {
      const name = this.currentData.name
      const price = this.currentData.priceOriginal
      const category = this.currentData.category_id
      const image = this.currentData.image
      if (!name || !price || !category) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You must fill at least name, price and category before submit!'
        })
      } else {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Want to change this item?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#138496',
          cancelButtonColor: '#dc3545',
          confirmButtonText: 'Sure'
        }).then((result) => {
          if (result.isConfirmed) {
            const dataForm = new URLSearchParams()
            dataForm.append('name', name)
            dataForm.append('category', category)
            dataForm.append('price', price)
            // If image set in form
            if (image) {
              dataForm.append('image', image)
            }
            // Config
            const config = {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
            Axios.patch(`http://localhost:3000/product/${this.pageId}`, dataForm, config).then((res) => {
              this.$router.push('/')
              Swal.fire({
                animation: true,
                title: 'You\'ve been update a product',
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
      }
    }
  },
  mounted () {
    this.pageId = this.$route.params.id
    Axios.get('http://localhost:3000/productDetail/' + this.$route.params.id).then((res) => {
      this.currentData = res.data[0]
      this.$parent.productName = res.data[0].name
    }).catch(err => console.error(err))
    Axios.get('http://localhost:3000/category').then(res => { this.dataCategory = (res.data) })
  }
}
</script>
