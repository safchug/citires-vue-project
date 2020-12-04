<template>
  <div v-if="isRegistered">
    <v-container>
      <v-row>
        <v-alert
            type="info"
            color="orange"
        >You`ve been successfuly registred</v-alert>
      </v-row>
    </v-container>
  </div>
  <v-form v-else-if="!isRegistered" v-model="valid" ref="form" value
          @submit.prevent="submit()">
    <v-container>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="20"
              :label="$t('registration.firstname')"
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
              v-model="lastname"
              :rules="nameRules"
              :counter="20"
              :label="$t('registration.lastname')"
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
              v-model="birthday"
              :counter="10"
              :rules="birthdayRules"
              :label="$t('registration.birthday')"
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
              v-model="mail"
              :rules="emailRules"
              :label="$t('registration.mail')"
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
              :label="$t('registration.password')"
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
              v-model="passwordRepition"
              :type="inputType"
              :rules="repeatPasswordRules"
              :label="$t('registration.repeatPassword')"
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
        <v-btn type="submit" color="secondary">{{$t('registration.register')}}</v-btn>
      </v-row>

    </v-container>

  </v-form>
</template>

<script>
import { mapActions } from 'vuex';
import User from '@/models/User';

export default {
  data: () => ({
    isRegistered: false,
    isMailTaken: false,
    error: '',
    valid: false,
    firstname: '',
    lastname: '',
    birthday: '',
    mail: '',
    password: '',
    passwordRepition: '',
    inputType: 'password',
  }),
  computed: {
    nameRules() {
      return [
        (v) => !!v || this.$t('registration.nameRequired'),
        (v) => v.trim().length > 0 || this.$t('registration.nameMustBeValid'),
        (v) => v.length <= 20 || this.$t('registration.nameMustBeLess'),
      ];
    },

    emailRules() {
      return [
        (v) => !!v || this.$t('registration.mailRequired'),
        (v) => /.+@.+/.test(v) || this.$t('registration.mailMustBeValid'),
      ];
    },

    birthdayRules() {
      return [
        (v) => !!v || this.$t('registration.birthdayRequired'),
      ];
    },

    passwordRules() {
      return [
        (v) => !!v || this.$t('registration.passwordRequired'),
        (v) => v.length >= 6 || this.$t('registration.passwordMustBeMore'),
      ];
    },

    repeatPasswordRules() {
      return [
        (v) => !!v || this.$t('registration.repeatPaswordRequired'),
        () => this.password === this.passwordRepition || this.$t('registration.passwordsDontMatch'),
      ];
    },
  },
  methods: {
    ...mapActions(['regist']),
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.registUser();
      }
    },
    async registUser() {
      const user = new User(this.firstname, this.lastname,
        this.mail, this.birthday, this.password);
      try {
        const result = await this.regist(user);
        if (result) this.isRegistered = true;
      } catch (err) {
        if (err.response) {
          this.error = err.response.data.message;
        } else {
          this.error = this.$t('messages.somethingWentWrong');
        }
      }
    },
  },

};
</script>
