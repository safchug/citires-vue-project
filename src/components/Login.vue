<template>
  <v-form v-model="valid" >
    <v-container>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="mail"
              :rules="mailRules"
              :counter="10"
              label="Mail"
              required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="password"
              :type="inputType"
              :rules="passwordRules"
              label="Password"
              required
          ></v-text-field>
        </v-col>
      </v-row>
      <template v-if="isFailure">
        <v-row>
          <v-alert
              type="error"
          >{{message}}</v-alert>
        </v-row>
      </template>
      <v-row>
        <v-btn color="secondary"
               @click.prevent="login({mail, password})"
        >Log in</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  data:()=> ({
    valid: false,
    mail: '',
    password: '',
    inputType: 'password',
    mailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
    ]
  }),
  computed: mapGetters(['isFailure', 'message']),
  methods: mapActions(['login'])
}
</script>