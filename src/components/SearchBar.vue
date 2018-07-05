<template>
  <div class="row expanded search-container">
    <div class="row">
      <div class="columns medium-18 small-centered">
        <form @submit.prevent="onSubmit">
          <h3>Search by name or department</h3>
          <label for="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            ref="firstName">
          <label for="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            ref="lastName">
          <label for="department">Department</label>
          <select
            id="department"
            name="department"
            ref="department"
            :disabled="departments.length === 0">
            <option value="">All departments</option>
            <option
              v-for="department in departments"
              :key="department"
              :selected="department == selectedDepartment">
              {{ department }}
            </option>
          </select>

          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    departments: {
      type: Array,
      required: true
    },
    selectedDepartment: {
      type: String,
      default: ''
    }
  },
  methods: {
    onSubmit (event) {
      const firstName = this.$refs.firstName.value.trim()
      const lastName = this.$refs.lastName.value.trim()
      const department = this.$refs.department.value
      const query = {}
      if (firstName) query.firstName = firstName
      if (lastName) query.lastName = lastName
      if (department) query.department = department
      this.$router.push({ query })
    }
  }
}
</script>

<style lang="sass" scoped>
.search-container
  margin: 2rem 0
  padding: 2rem

.search-field
  margin-bottom: 3px

.form-title
  text-align: center
  padding-bottom: 1rem

.class-field
  margin-bottom: 0
</style>
