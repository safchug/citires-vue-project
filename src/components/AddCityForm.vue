<template>
  <v-container >
    <v-form v-model="valid" @submit.prevent="submit()" ref="form">
    <v-card
        class="mx-auto my-12"
        max-width="374"
    >

      <v-card-title>Add city</v-card-title>
      <v-card-text>
        <template v-if="!error">
        <v-row>
          <v-text-field v-model="name"
          :rules="nameRules"
          label="Name">
          </v-text-field>
        </v-row>
        <v-row>
          <v-text-field v-model="location"
          :rules="locationRules" label="Location"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field v-model="population"
          :rules="populationRules" label="Population"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field v-model="area"
          :rules="areaRules"
                        label="Area"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field v-model="found"
          :rules="foundRules"
          label="Found"></v-text-field>
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
          Add
        </v-btn>
        <v-btn
            color="orange"
            text
            @click="comeBack()"
        >
          Come back
        </v-btn>

      </v-card-actions>
    </v-card>
    </v-form>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";
import City from "@/models/City";

export default {
  data: ()=> ({
    valid: false,
    name: '',
    location: '',
    population: '',
    area: '',
    found: '',
    addingStatus: '',
    error: '',
    nameRules: [
        v => v.trim().length > 0 || 'Name is required'
    ],
    locationRules: [
      v => v.trim().length > 0 || 'Location is required'
    ],
    populationRules: [
      v => v.trim().length > 0 || 'Population is required'
    ],
    areaRules: [
      v => v.trim().length > 0 || 'Area is required'
    ],
    foundRules: [
       v => v.trim().length > 0 || 'Found is required'
    ]
  }),
  computed: {
  },
  methods: {
    ...mapActions(['addCity', 'logout']),
    submit(){
      this.$refs.form.validate();
      if(this.valid) {
        this.add();
      }
    },
    async add() {
      try {
        const city = new City(this.name, this.location,
            this.population, this.area, this.found);
        console.log('city', city);
        let result = await this.addCity(city);
        if(result) this.addingStatus = 'The city has been added';
      } catch (err) {
        if(err.response) {
          this.addingStatus = err.response.data.message;
        } else if (err.message.includes('authorized')){
          this.logout();
          this.error = 'You need to login';
        } else {
          this.error = 'Something went wrong';
        }
      }
    },
    comeBack() {
      this.$router.push('/');
    }
  }
}
</script>