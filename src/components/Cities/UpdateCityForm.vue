<template>
    <v-container >
      <v-form v-model="valid" @submit.prevent="submit()" ref="form">
      <v-card
          class="mx-auto my-12"
          max-width="374"
      >

        <template v-if="!error">
        <v-card-title >{{city.name}}</v-card-title>
        <v-card-text>
            <v-row>
              <v-text-field v-model="name"
                            :rules="nameRules"
                            :label="$t('updateCity.name')">
              </v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="location"
                            :rules="locationRules" :label="$t('updateCity.location')"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="population"
                            :rules="populationRules" :label="$t('updateCity.population')"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="area"
                            :rules="areaRules"
                            :label="$t('updateCity.area')"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="found"
                            :rules="foundRules"
                            :label="$t('updateCity.found')"></v-text-field>
            </v-row>
          <template v-if="updateStus">
            <v-row>
              <v-alert
              >{{updateStus}}</v-alert>
            </v-row>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-btn
              type="submit"
              color="orange"
              text
          >
            {{$t('updateCity.update')}}
          </v-btn>

          <v-btn
              color="orange"
              text
              @click="comeBack()"
          >
            {{$t('updateCity.comeBack')}}
          </v-btn>

        </v-card-actions>
        </template>
          <template v-else>
            <v-row>
              <v-alert
                  type="error"
              >{{ error }}</v-alert>
            </v-row>
          </template>
      </v-card>
      </v-form>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import City from '@/models/City';

export default {
  data: () => ({
    name: '',
    location: '',
    population: '',
    area: '',
    found: '',
    error: '',
    updateStus: '',
    valid: false,
  }),
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // access to component instance via `vm`
      if (!vm.user) vm.error = vm.$t('messages.accessForbiten');
    });
  },
  computed: {
    ...mapState({
      city: (state) => state.cities.city,
      user: (state) => state.users.user,
    }),
    nameRules() {
      return [(v) => v.trim().length > 0 || this.$t('updateCity.nameRequired')];
    },
    locationRules() {
      return [(v) => v.trim().length > 0 || this.$t('updateCity.locationRequired')];
    },
    populationRules() {
      return [(v) => v.trim().length > 0 || this.$t('updateCity.populationRequiured')];
    },
    areaRules() {
      return [(v) => v.trim().length > 0 || this.$t('updateCity.areaRequired')];
    },
    foundRules() {
      return [(v) => v.trim().length > 0 || this.$t('updateCity.foundReuired')];
    },
  },
  methods: {
    ...mapActions(['fetchCityWithId', 'updateCityWithId', 'logout']),
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.updateCity(this.city.id);
      }
    },
    async updateCity(id) {
      try {
        const city = new City(this.name, this.location,
          this.population, this.area, this.found);

        const result = await this.updateCityWithId({ id, city });
        if (result) this.updateStus = this.$t('messages.theCityUpdated');
      } catch (err) {
        if (err.response) {
          this.error = err.response.data.message;
        } else if (err.message.includes('authorized')) {
          this.logout();
          this.error = this.$t('messages.youNeedToLogIn');
        } else {
          this.error = this.$t('messages.somethingWentWrong');
        }
      }
    },
    comeBack() {
      this.$router.push('/');
    },
  },
  async mounted() {
    try {
      await this.fetchCityWithId(this.$route.params.id);
    } catch (err) {
      if (err.response) {
        this.error = err.response.data.message;
      } else {
        this.error = this.$t('messages.somethingWentWrong');
      }
    }
  },

  watch: {
    city() {
      this.name = this.city.name;
      this.location = this.city.location;
      this.population = this.city.population;
      this.area = this.city.area;
      this.found = this.city.found;
    },
  },
};
</script>
