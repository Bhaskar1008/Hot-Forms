import { useTranslationContext } from '../context/TranslationContext';
import { TRANSLATION_KEYS } from '../config/translationKeys';

export const useUITranslation = () => {
  const { t } = useTranslationContext();

  return {
    ui: {
      select: () => t(TRANSLATION_KEYS.UI.SELECT),
      loading: () => t(TRANSLATION_KEYS.UI.LOADING),
      error: () => t(TRANSLATION_KEYS.UI.ERROR),
      success: () => t(TRANSLATION_KEYS.UI.SUCCESS),
      cancel: () => t(TRANSLATION_KEYS.UI.CANCEL),
      save: () => t(TRANSLATION_KEYS.UI.SAVE),
      edit: () => t(TRANSLATION_KEYS.UI.EDIT),
      delete: () => t(TRANSLATION_KEYS.UI.DELETE)
    },
    form: {
      submit: () => t(TRANSLATION_KEYS.FORM.SUBMIT),
      reset: () => t(TRANSLATION_KEYS.FORM.RESET),
      clear: () => t(TRANSLATION_KEYS.FORM.CLEAR)
    },
    language: {
      label: () => t(TRANSLATION_KEYS.LANGUAGE.LABEL),
      preview: () => t(TRANSLATION_KEYS.LANGUAGE.PREVIEW),
      select: () => t(TRANSLATION_KEYS.LANGUAGE.SELECT)
    },
    placeholder: {
      text: () => t(TRANSLATION_KEYS.PLACEHOLDER.TEXT),
      email: () => t(TRANSLATION_KEYS.PLACEHOLDER.EMAIL),
      search: () => t(TRANSLATION_KEYS.PLACEHOLDER.SEARCH),
      select: () => t(TRANSLATION_KEYS.PLACEHOLDER.SELECT)
    }
  };
};
