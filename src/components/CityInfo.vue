<template>
  <v-container >
    <v-card
        class="mx-auto my-12"
        max-width="374"
    >
      <v-card-title >{{city.name}}</v-card-title>
      <v-card-text>
        <v-row>
          <strong>Location: </strong>{{city.location}}
        </v-row>
        <v-row>
          <strong>Population: </strong>{{city.population}}
        </v-row>
        <v-row>
          <strong>Area: </strong>{{city.area}}
        </v-row>
        <v-row>
          <strong>Found: </strong>{{city.found}}
        </v-row>
        <v-row>
          <strong>Created by: </strong>
        </v-row>
        <v-row>
          <strong>Name: </strong>{{city.user.name}}
        </v-row>
        <v-row>
          <strong>Mail: </strong>{{city.user.mail}}
        </v-row>
        <v-row v-if="failureMessage">
          <v-alert
              type="error"
          >{{failureMessage}}</v-alert>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
            color="orange"
            text
            @click="updateCity(city.id)"
        >
          Update
        </v-btn>

        <v-btn
            color="orange"
            text
            @click="deleteCityWithId(city.id)"
        >
          Delete
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
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  data: ()=> ({

  }),
    computed: mapGetters(['city', 'failureMessage']),
    methods: {
      ...mapActions(['fetchCityWithId', 'deleteCity']),
      deleteCityWithId(id) {
        this.deleteCity(id);
      },
      updateCity(id){
        this.$router.push(`/update/${id}`);
      },
      comeBack(){
        this.$router.push('/');
      }
    },
    mounted() {
      this.fetchCityWithId(this.$route.params.id);
    }
  }
</script>