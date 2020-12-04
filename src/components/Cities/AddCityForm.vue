<template>
  <v-container >
    <v-form v-model="valid" @submit.prevent="submit()" ref="form">
    <v-card
        class="mx-auto my-12"
        max-width="374"
    >

      <v-card-title>{{$t('addCity.title')}}</v-card-title>
      <v-card-text>
        <template v-if="!error">
        <v-row>
          <v-text-field v-model="name"
          :rules="nameRules"
          :label="$t('addCity.name')">
          </v-text-field>
        </v-row>
        <v-row>
          <v-text-field v-model="location"
          :rules="locationRules" :label="$t('addCity.location')"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field v-model="population"
          :rules="populationRules" :label="$t('addCity.population')"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field v-model="area"
          :rules="areaRules"
                        :label="$t('addCity.area')"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field v-model="found"
                        :rules="foundRules"
                        :label="$t('addCity.found')"></v-text-field>
        </v-row>
        <template v-if="addingStatus">
          <v-row>
            <v-alert
            >{{addingStatus}}</v-alert>
          </v-row>
        </template>
        </template>
        <template v-else>
          <v-row>
            <v-alert
                type="error"
            >{{error}}</v-alert>
          </v-row>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn
            color="orange"
            text
            type="submit"
        >
          {{$t('addCity.add')}}
        </v-btn>
        <v-btn
            color="orange"
            text
            @click="comeBack()"
        >
          {{$t('addCity.comeBack')}}
        </v-btn>

      </v-card-actions>
    </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import City from '@/models/City';

export default {
  data: () => ({
    valid: false,
    name: '',
    location: '',
    population: '',
    area: '',
    found: '',
    addingStatus: '',
    error: '',
  }),

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // access to component instance via `vm`
      if (!vm.user) vm.error = vm.$t('messages.accessForbiten');
    });
  },

  computed: {
    ...mapState({
      user: (state) => state.users.user,
    }),
    nameRules() {
      return [(v) => v.trim().length > 0 || this.$t('addCity.nameRequired')];
    },
    locationRules() {
      return [(v) => v.trim().length > 0 || this.$t('addCity.locationRequired')];
    },
    populationRules() {
      return [(v) => v.trim().length > 0 || this.$t('addCity.populationRequiured')];
    },
    areaRules() {
      return [(v) => v.trim().length > 0 || this.$t('addCity.areaRequired')];
    },
    foundRules() {
      return [(v) => v.trim().length > 0 || this.$t('addCity.foundReuired')];
    },
  },
  methods: {
    ...mapActions(['addCity', 'logout']),
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.add();
      }
    },
    async add() {
      try {
        const city = new City(this.name, this.location,
          this.population, this.area, this.found);
        console.log('city', city);
        const result = await this.addCity(city);
        if (result) this.addingStatus = this.$t('messages.theCityAdded');
      } catch (err) {
        if (err.response) {
          this.addingStatus = err.response.data.message;
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
};
</script>
