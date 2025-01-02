// Define all translation keys as constants to avoid typos
export const TRANSLATION_KEYS = {
    UI: {
      SELECT: 'common.select',
      LOADING: 'common.loading',
      ERROR: 'common.error',
      SUCCESS: 'common.success',
      CANCEL: 'common.cancel',
      SAVE: 'common.save',
      EDIT: 'common.edit',
      DELETE: 'common.delete'
    },
    FORM: {
      SUBMIT: 'form.submit',
      RESET: 'form.reset',
      CLEAR: 'form.clear'
    },
    LANGUAGE: {
      LABEL: 'language.label',
      PREVIEW: 'language.preview',
      SELECT: 'language.select'
    },
    PLACEHOLDER: {
      TEXT: 'placeholder.text',
      EMAIL: 'placeholder.email',
      SEARCH: 'placeholder.search',
      SELECT: 'placeholder.select'
    }
  } as const;
