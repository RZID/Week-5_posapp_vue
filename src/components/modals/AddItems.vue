<template>
  <div>
    <b-modal
      id="addItem"
      okTitle="Add"
      cancelVariant="danger"
      okVariant="info"
      title="Add Item"
      @ok="addItem()"
    >
      <div class="row">
        <div class="col-3 d-flex align-self-end">
          <h5>Name</h5>
        </div>
        <div class="col">
          <input type="text" class="form-control" v-model="dataForm.name" />
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-3 d-flex align-self-end">
          <h5>Image</h5>
        </div>
        <div class="col">
          <input type="text" class="form-control" v-model="dataForm.image" />
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-3 d-flex align-self-end">
          <h5>Price</h5>
        </div>
        <div class="col">
          <input
            type="number"
            class="form-control"
            min="0"
            v-model="dataForm.price"
          />
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-3 d-flex align-self-end">
          <h5>Category</h5>
        </div>
        <div class="col">
          <select class="form-control" v-model="dataForm.category">
            <option selected disabled value="">Choose One...</option>
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
    </b-modal>
  </div>
</template>
<script>
import Axios from 'axios'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      dataCategory: [],
      dataForm: {
        name: '',
        image: '',
        price: '',
        category: ''
      }
    }
  },
  methods: {
    addItem () {
      const name = this.dataForm.name
      const price = this.dataForm.price
      const category = this.dataForm.category
      const image = this.dataForm.image
      if (!name || !price || !category) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You must fill at least name, price and category before submit!'
        }).then(() => {
          this.$bvModal.show('addItem')
          this.$parent.filterHandling(null, false, false, true)
        })
      } else {
        Swal.fire({
          title: 'Are you sure?',
          text: `Want to add ${name} to product list? `,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sure!'
        }).then((result) => {
          if (result.isConfirmed) {
            // Initialize form data
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
            Axios.post('http://localhost:3000/product', dataForm, config).then(() => {
              Swal.fire({
                animation: true,
                title: `You've been add ${name} to product`,
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
            }).catch(err => Swal.fire({
              icon: 'error',
              title: 'Error Occured :(',
              text: err
            }).then(() => {
              this.$bvModal.show('addItem')
            }))
          } else {
            this.$bvModal.show('addItem')
          }
        })
      }
    }
  },
  mounted () {
    Axios.get('http://localhost:3000/category').then(res => { this.dataCategory = (res.data) })
  }
}
</script>
