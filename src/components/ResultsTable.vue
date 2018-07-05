<template>
  <table role="grid" class="stack">
    <thead>
      <tr>
        <th scope="col">First name</th>
        <th scope="col">Last name</th>
        <th scope="col">Department</th>
        <th scope="col">Unit</th>
        <th scope="col">Title</th>
        <th scope="col">Phone</th>
        <th scope="col">Location</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="result in results"
        :key="result.cartodb_id">
        <td>{{ result.first_name }}</td>
        <td>{{ result.last_name }}</td>
        <td>{{ result.dept_name }}</td>
        <td>{{ result.unit_name }}</td>
        <td>{{ result.title }}</td>
        <td>{{ result.phone }}</td>
        <td>{{ result.location }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  props: {
    results: {
      type: Array,
      required: true
    }
  }
}
</script>
