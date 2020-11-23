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
        <v-row v-if="err">
          <v-alert
              type="error"
          >{{err}}</v-alert>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <template v-if="user && user.id === city.userId">
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
        </template>
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
import {mapState, mapActions} from 'vuex';

export default {
  data: () => ({
    err: ''
  }),
    computed: {
      ...mapState({
        user: state => state.users.user,
        city: state => state.cities.city
      })
    },
    methods: {
      ...mapActions(['fetchCityWithId', 'deleteCity']),
      async deleteCityWithId(id) {
        try {
          let result = await this.deleteCity(id);
          if(result === 'ok') {
            this.$router.push('/');
          } else {
            this.err = result;
          }
        } catch (err) {
          console.log(err);
        }
      },
      updateCity(id){
        this.$router.push(`/update/${id}`);
      },
      comeBack(){
        this.$router.push('/');
      }
    },
    async mounted() {
      try {
        let result = await this.fetchCityWithId(this.$route.params.id);
        if(result !== 'ok') {
          this.err = result;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
</script>