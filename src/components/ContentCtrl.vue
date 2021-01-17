<template>
  <div>
    <div class="contentControl">
      <div class="container">
        <div class="row no-gutters py-2">
          <div class="col-md-5 border-md-right mt-2 mt-md-0">
            <div class="row no-gutters">
              <div class="col mx-2">
                <h5>Sort</h5>
              </div>
              <div class="col text-right">
                <div class="custom-control custom-switch">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customSwitch1"
                    @click="toggler('sort')"
                  />
                  <label
                    class="custom-control-label"
                    for="customSwitch1"
                  ></label>
                </div>
              </div>
            </div>
            <div v-if="toggle.sort">
              <div class="mx-2">
                <div class="input-group">
                  <select
                    class="custom-select"
                    id="inputGroupSelect02"
                    v-model="sortBy"
                  >
                    <option selected value="name">Name</option>
                    <option value="price">Price</option>
                  </select>
                  <div class="input-group-append">
                    <button
                      type="button"
                      class="btn btn-info"
                      @click="sortButton()"
                    >
                      <i :class="'fa fa-' + toggle.iconSort"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-5 mt-2 mt-md-0" v-if="parent.parent.search">
            <div class="mx-2">
              <h5>Search</h5>
              <input type="text" class="form-control" v-model="searchData" />
              <div class="input-group-append"></div>
            </div>
          </div>
          <div class="col-md-2 mt-3 px-2 mt-md-0 text-right">
            <button
              type="button"
              class="btn btn-info btn-block h-100"
              @click="search()"
            >
              Apply
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
      toggle: {
        sort: false,
        iconSort: 'sort-amount-down-alt',
        sortMethod: 'ASC'
      },
      searchData: '',
      sortBy: 'name'
    }
  },
  methods: {
    toggler (element) {
      this.toggle[element] = !this.toggle[element]
    },
    sortButton () {
      this.toggle.iconSort = this.toggle.iconSort === 'sort-amount-down-alt' ? 'sort-amount-up' : 'sort-amount-down-alt'
      this.toggle.sortMethod = this.toggle.sortMethod === 'ASC' ? 'DESC' : 'ASC'
    },
    search () {
      const searchData = this.searchData
      const sortQuery = this.toggle.sort
      const sortMethod = this.toggle.sortMethod
      const sortBy = this.sortBy
      if (searchData && sortQuery) {
        this.parent.filterHandling(searchData, sortBy, sortMethod, true)
      } else if (searchData && !sortQuery) {
        this.parent.filterHandling(searchData, false, false, true)
      } else if (!searchData && sortQuery) {
        this.parent.filterHandling(null, sortBy, sortMethod, true)
      } else {
        this.parent.filterHandling(null, false, false, true)
      }
    }
  }
}
</script>
