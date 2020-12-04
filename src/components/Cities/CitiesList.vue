<template >
  <v-progress-circular v-if="loading"
                       :size="100"
                       :width="7"
                       color="orange"
                       indeterminate
  ></v-progress-circular>

  <v-simple-table v-else-if="cities && cities.length > 0">
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">
          {{$t('home.citiesList.city')}}
        </th>
        <th class="text-left">
          {{$t('home.citiesList.population')}}
        </th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="city in cities"
          :key="city.name"
      >
        <td>{{ city.name }}</td>
        <td>{{ city.population }}</td>
        <td>
          <v-btn @click="openCityInfo(city.id)">
            {{$t('home.citiesList.info')}}
          </v-btn>
        </td>
          <template v-if="user && user.id === city.userId">
            <td>
              <v-btn @click="updateCityForm(city.id)">
                {{$t('home.citiesList.update')}}
              </v-btn>
            </td>
            <td>
              <v-btn @click="deleteCityWithId(city.id)">
                {{$t('home.citiesList.delete')}}
              </v-btn>
            </td>
          </template>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
  <v-alert v-else type="info">Nobody added any cities yet</v-alert>
</template>

<script>

import { mapActions, mapState } from 'vuex';

export default {
  data: () => ({
    error: '',
  }),

  computed: {
    ...mapState({
      user: (state) => state.users.user,
      cities: (state) => state.cities.cities,
      loading: (state) => state.cities.loading,
    }),
  },
  methods: {
    ...mapActions(['fetchCities', 'deleteCity', 'logout']),
    openCityInfo(id) {
      this.$router.push(`/city/${id}`);
    },
    async deleteCityWithId(id) {
      try {
        const result = await this.deleteCity(id);
        if (result) this.$router.push('/');
      } catch (err) {
        if (err.response) {
          this.$emit('error', err.response.data.message);
        } else if (err.message.includes('authorized')) {
          this.logout();
        } else {
          this.$emit('error', this.$t('messages.somethingWentWrong'));
        }
      }
    },
    updateCityForm(id) {
      this.$router.push(`/update/${id}`);
    },
  },
  async mounted() {
    try {
      await this.fetchCities();
    } catch (err) {
      if (err.response) {
        this.$emit('error', err.response.data.message);
      } else {
        this.$emit('error', this.$t('messages.somethingWentWrong'));
      }
    }
  },
};
</script>
