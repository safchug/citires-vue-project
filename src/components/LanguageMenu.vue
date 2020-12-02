<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn
          color="orange"
          dark
          v-on="on"
      >
        {{language}}
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-title @click="switchLanguage('en')">English</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title @click="switchLanguage('ua')">Українська</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    language: 'English'
  }),
  methods: {
    switchLanguage(lang) {
      this.language = lang === 'en'? 'English': 'Українська';
      this.$i18n.locale = lang === 'en'? 'en': 'ua';
    }
  }
}

</script>