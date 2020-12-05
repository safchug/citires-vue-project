<template>
  <v-form v-model="valid" ref="form"
          @submit.prevent="submit()">
    <v-container>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="mail"
              :rules="mailRules"
              :label="$t('loginForm.mail')"
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
              :label="$t('loginForm.password')"
              required
          ></v-text-field>
        </v-col>
      </v-row>
      <template v-if="error">
        <v-row>
          <v-alert
              type="error"
          >{{error}}</v-alert>
        </v-row>
      </template>
      <v-row>
        <v-btn type="submit" color="secondary">{{$t('loginForm.login')}}</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';
import LoginData from '@/models/LoginData';

export default {
  data: () => ({
    valid: false,
    mail: '',
    password: '',
    inputType: 'password',
    error: '',
  }),

  computed: {
    mailRules() {
      return [
        (v) => !!v || this.$t('loginForm.mailRequired'),
        (v) => /.+@.+/.test(v) || this.$t('loginForm.mailMustBeValid')];
    },
    passwordRules() {
      return [
        (v) => !!v || this.$t('loginForm.passwordRequired'),
        (v) => v.trim().length >= 6 || this.$t('loginForm.passwordMustBeValid'),
      ];
    },
  },

  methods: {
    ...mapActions(['login']),
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.loginUser();
      }
    },
    async loginUser() {
      try {
        const loginData = new LoginData(this.mail, this.password);
        const result = await this.login(loginData);

        if (result) this.$router.push('/');
      } catch (err) {
        if (err.response) {
          this.error = err.response.data.message;
        } else {
          this.error = 'Something went wrong';
        }
      }
    },
  },
};
</script>
