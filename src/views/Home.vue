<template>
  <div>
    <SearchBar
      :departments="departments"
      :selected-department="query.department"/>

    <div class="row column">
      <div v-if="isLoading">
        <PhilaLoadingIndicator/>
      </div>
      <div v-else-if="error">
        <h2>Error encountered while searching</h2>
        <p>{{ error }}</p>
      </div>
      <div v-else-if="results.length > 0">
        <h2>Search results</h2>
        <ResultsTable :results="results"/>
        <router-link :to="nextPageLink">Next page</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import ResultsTable from '@/components/ResultsTable'
import api from '@/api'

export default {
  components: {
    SearchBar,
    ResultsTable
  },
  props: {
    query: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isLoading: false,
      error: null,
      results: [],
      departments: []
    }
  },
  computed: {
    nextPageLink () {
      const nextPage = (this.query.page || 0) + 1
      return {
        query: Object.assign({}, this.query, { page: nextPage })
      }
    }
  },
  watch: {
    query: 'search'
  },
  created () {
    this.getDepartments()
    const isQuerySet = (Object.keys(this.query).length > 0)
    if (isQuerySet) this.search()
  },
  methods: {
    async getDepartments () {
      this.departments = await api.getDepartments()
    },
    async search () {
      this.results = []
      this.error = null
      this.isLoading = true
      try {
        this.results = await api.search(this.query)
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
ul
  padding: 0 1rem
</style>
