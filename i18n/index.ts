import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  defaultNS: 'Common',
  ns: ['Common', 'Profile', 'Referral', 'ProvablyFair'],
  resources: {
    en: {
      Common: en.Common,
      Profile: en.Profile,
      Referral: en.Referral,
      ProvablyFair: en.ProvablyFair,
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
