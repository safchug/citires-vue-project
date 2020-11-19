<template @load="fetchCities">
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">
          City
        </th>
        <th class="text-left">
          Population
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="city in cities"
          :key="city.name"
      >
        <td>{{ city.name }}</td>
        <td>{{ city.population }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';

export default {
  data: ()=> ({

  }),
  computed: mapGetters(['cities', 'failureMessage']),
  methods: mapActions(['fetchCities'])
}
</script>