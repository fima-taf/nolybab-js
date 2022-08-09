export const en = {
  hello: 'Hello',
  yes: 'Yes',
  no: 'No',
  login: {
    title: 'Login',
    message: 'Please login'
  },
  home: {
    description: 'Welcome to Nolybab',
    header: {
      title: 'Nolybab'
    },
    footer: {
      credit: '2022 Nolybab'
    },
    content: "Welcome to Nolybab, a tool for converting i18n to csv and csv to i18n files.",
    body: {
      about: {
        title: 'About'
      },
      contact_us: 'Contact us'
    }
  }
}

export const fr = {
  hello: 'Bonjour',
  yes: 'Oui',
  no: 'Non',
  login: {
    title: 'Connexion',
    message: 'Veuillez vous connecter'
  },
  home: {
    description: 'Bienvenue sur Nolybab',
    header: {
      title: 'Nolybab'
    },
    footer: {
      credit: '2022 Nolybab'
    },
    content: "Bienvenue sur Nolybab, un outil pour convertir des fichiers i18n en csv et csv en fichiers i18n.",
    body: {
      about: {
        title: 'Sur'
      },
      contact_us: 'Nous contacter'
    }
  }
}

export const es = {
  hello: 'Hola',
  yes: 'Sí',
  no: 'No',
  login: {
    title: 'Acceso',
    message: 'Por favor Iniciar sesión'
  },
  home: {
    description: 'Bienvenido a nolybab',
    header: {
      title: 'Nolybab'
    },
    footer: {
      credit: '2022 Nolybab'
    },
    content: "Bienvenido a Nolybab, una herramienta para convertir archivos i18n a csv y csv a i18n.",
    body: {
      about: {
        title: 'Acerca de'
      },
      contact_us: 'Contacta con nosotros'
    }
  }
}

export const de = {
  hello: 'Hallo',
  yes: 'ja',
  login: {
    title: 'Anmeldung',
    message: 'Bitte loggen Sie sich ein'
  },
  home: {
    description: 'Willkommen bei Nolybab',
    header: {},
    footer: {
      credit: '2022 Nolybab'
    },
    content: "Willkommen bei Nolybab, einem Tool zum Konvertieren von i18n- in csv- und csv-in i18n-Dateien.",
    body: {
      about: {
        title: 'Etwa'
      }
    }
  }
}

export const csvContent = ' ,en,es,fr\nhello,Hello,Hola,Bonjour\nyes,Yes,Sí,Oui\nno,No,No,Non\nlogin.title,Login,Acceso,Connexion\nlogin.message,Please login,Por favor Iniciar sesión,Veuillez vous connecter\nhome.description,Welcome to Nolybab,Bienvenido a nolybab,Bienvenue sur Nolybab\nhome.header.title,Nolybab,Nolybab,Nolybab\nhome.footer.credit,2022 Nolybab,2022 Nolybab,2022 Nolybab\nhome.content,"Welcome to Nolybab, a tool for converting i18n to csv and csv to i18n files.","Bienvenido a Nolybab, una herramienta para convertir archivos i18n a csv y csv a i18n.","Bienvenue sur Nolybab, un outil pour convertir des fichiers i18n en csv et csv en fichiers i18n."\nhome.body.about.title,About,Acerca de,Sur\nhome.body.contact_us,Contact us,Contacta con nosotros,Nous contacter'

export const csvContentWithMissingKeys = ' ,de,en,es,fr\nhello,Hallo,Hello,Hola,Bonjour\nyes,ja,Yes,Sí,Oui\nno,,No,No,Non\nlogin.title,Anmeldung,Login,Acceso,Connexion\nlogin.message,Bitte loggen Sie sich ein,Please login,Por favor Iniciar sesión,Veuillez vous connecter\nhome.description,Willkommen bei Nolybab,Welcome to Nolybab,Bienvenido a nolybab,Bienvenue sur Nolybab\nhome.header.title,,Nolybab,Nolybab,Nolybab\nhome.footer.credit,2022 Nolybab,2022 Nolybab,2022 Nolybab,2022 Nolybab\nhome.content,"Willkommen bei Nolybab, einem Tool zum Konvertieren von i18n- in csv- und csv-in i18n-Dateien.","Welcome to Nolybab, a tool for converting i18n to csv and csv to i18n files.","Bienvenido a Nolybab, una herramienta para convertir archivos i18n a csv y csv a i18n.","Bienvenue sur Nolybab, un outil pour convertir des fichiers i18n en csv et csv en fichiers i18n."\nhome.body.about.title,Etwa,About,Acerca de,Sur\nhome.body.contact_us,,Contact us,Contacta con nosotros,Nous contacter'