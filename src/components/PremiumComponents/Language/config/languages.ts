// Expanded translations for all form elements
export const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'id', name: 'Indonesian' },
  { code: 'fil', name: 'Filipino' }
] as const;

export const translations = {
  en: {
    // Form Elements
    'form.text.label': 'Text Field',
    'form.checkbox.label': 'Checkbox',
    'form.radio.label': 'Radio',
    'form.select.label': 'Select',
    'form.button.label': 'Button',
    'form.datetime.label': 'Date/Time',
    'form.fileupload.label': 'File Upload',
    'form.signature.label': 'Signature',
    'form.otp.label': 'OTP',
    'form.tags.label': 'Tags',
    
    // Validation Messages
    'validation.required': 'This field is required',
    'validation.email': 'Please enter a valid email address',
    'validation.minLength': 'Must be at least {0} characters',
    'validation.maxLength': 'Must be no more than {0} characters',
    'validation.pattern': 'Invalid format',
    'validation.number': 'Must be a valid number',
    
    // Common UI Elements
    'common.select': 'Select an option',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    
    // Form Actions
    'form.submit': 'Submit',
    'form.reset': 'Reset',
    'form.clear': 'Clear',
    
    // Language Component
    'language.label': 'Language Selection',
    'language.preview': 'Preview Language',
    'language.select': 'Select Languages',
    
    // Placeholders
    'placeholder.text': 'Enter text',
    'placeholder.email': 'Enter email',
    'placeholder.search': 'Search...',
    'placeholder.select': 'Select...'
  },
  hi: {
    // Form Elements
    'form.text.label': 'टेक्स्ट फ़ील्ड',
    'form.checkbox.label': 'चेकबॉक्स',
    'form.radio.label': 'रेडियो',
    'form.select.label': 'चयन करें',
    'form.button.label': 'बटन',
    'form.datetime.label': 'दिनांक/समय',
    'form.fileupload.label': 'फ़ाइल अपलोड',
    'form.signature.label': 'हस्ताक्षर',
    'form.otp.label': 'ओटीपी',
    'form.tags.label': 'टैग',
    
    // Validation Messages
    'validation.required': 'यह फ़ील्ड आवश्यक है',
    'validation.email': 'कृपया वैध ईमेल पता दर्ज करें',
    'validation.minLength': 'कम से कम {0} अक्षर होने चाहिए',
    'validation.maxLength': '{0} अक्षरों से अधिक नहीं होना चाहिए',
    'validation.pattern': 'अमान्य प्रारूप',
    'validation.number': 'एक वैध संख्या होनी चाहिए',
    
    // Common UI Elements
    'common.select': 'एक विकल्प चुनें',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.cancel': 'रद्द करें',
    'common.save': 'सहेजें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    
    // Form Actions
    'form.submit': 'जमा करें',
    'form.reset': 'रीसेट',
    'form.clear': 'साफ़ करें',
    
    // Language Component
    'language.label': 'भाषा चयन',
    'language.preview': 'पूर्वावलोकन भाषा',
    'language.select': 'भाषाएं चुनें',
    
    // Placeholders
    'placeholder.text': 'टेक्स्ट दर्ज करें',
    'placeholder.email': 'ईमेल दर्ज करें',
    'placeholder.search': 'खोजें...',
    'placeholder.select': 'चुनें...'
  },
  id: {
    // Form Elements
    'form.text.label': 'Kolom Teks',
    'form.checkbox.label': 'Kotak Centang',
    'form.radio.label': 'Radio',
    'form.select.label': 'Pilihan',
    'form.button.label': 'Tombol',
    'form.datetime.label': 'Tanggal/Waktu',
    'form.fileupload.label': 'Unggah Berkas',
    'form.signature.label': 'Tanda Tangan',
    'form.otp.label': 'OTP',
    'form.tags.label': 'Tag',
    
    // Validation Messages
    'validation.required': 'Bidang ini wajib diisi',
    'validation.email': 'Masukkan alamat email yang valid',
    'validation.minLength': 'Minimal {0} karakter',
    'validation.maxLength': 'Maksimal {0} karakter',
    'validation.pattern': 'Format tidak valid',
    'validation.number': 'Harus berupa angka valid',
    
    // Common UI Elements
    'common.select': 'Pilih opsi',
    'common.loading': 'Memuat...',
    'common.error': 'Kesalahan',
    'common.success': 'Berhasil',
    'common.cancel': 'Batal',
    'common.save': 'Simpan',
    'common.edit': 'Edit',
    'common.delete': 'Hapus',
    
    // Form Actions
    'form.submit': 'Kirim',
    'form.reset': 'Atur Ulang',
    'form.clear': 'Bersihkan',
    
    // Language Component
    'language.label': 'Pemilihan Bahasa',
    'language.preview': 'Pratinjau Bahasa',
    'language.select': 'Pilih Bahasa',
    
    // Placeholders
    'placeholder.text': 'Masukkan teks',
    'placeholder.email': 'Masukkan email',
    'placeholder.search': 'Cari...',
    'placeholder.select': 'Pilih...'
  },
  fil: {
    // Form Elements
    'form.text.label': 'Text Field',
    'form.checkbox.label': 'Checkbox',
    'form.radio.label': 'Radio',
    'form.select.label': 'Pagpili',
    'form.button.label': 'Button',
    'form.datetime.label': 'Petsa/Oras',
    'form.fileupload.label': 'Pag-upload ng File',
    'form.signature.label': 'Lagda',
    'form.otp.label': 'OTP',
    'form.tags.label': 'Mga Tag',
    
    // Validation Messages
    'validation.required': 'Kinakailangan ang field na ito',
    'validation.email': 'Maglagay ng wastong email address',
    'validation.minLength': 'Hindi dapat bababa sa {0} karakter',
    'validation.maxLength': 'Hindi dapat hihigit sa {0} karakter',
    'validation.pattern': 'Hindi wastong format',
    'validation.number': 'Dapat ay wastong numero',
    
    // Common UI Elements
    'common.select': 'Pumili ng opsyon',
    'common.loading': 'Naglo-load...',
    'common.error': 'Error',
    'common.success': 'Tagumpay',
    'common.cancel': 'Kanselahin',
    'common.save': 'I-save',
    'common.edit': 'I-edit',
    'common.delete': 'Burahin',
    
    // Form Actions
    'form.submit': 'Ipasa',
    'form.reset': 'I-reset',
    'form.clear': 'Burahin',
    
    // Language Component
    'language.label': 'Pagpili ng Wika',
    'language.preview': 'Preview ng Wika',
    'language.select': 'Pumili ng mga Wika',
    
    // Placeholders
    'placeholder.text': 'Maglagay ng text',
    'placeholder.email': 'Maglagay ng email',
    'placeholder.search': 'Maghanap...',
    'placeholder.select': 'Pumili...'
  }
} as const;
