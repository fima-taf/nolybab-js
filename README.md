# Nolybab JS

A CLI based tool for converting i18n to csv and csv to i18n files.  
This tool allow you to quickly convert all your i18n (json) files in your project into a csv file and vice versa.

## Table of Contents
* [Install](#install)
* [Usage](#usage)
* [Examples](#examples)
* [License](#license)


## Install
```
 
```

## Usage
```
nolybab -a to-csv 

Options:
  -a, --action                  The action to be executed. to-csv | to-i18n
                                                             [string] [required]
  -m, --main-file-name          The name of the main i18n file
                                                        [string] [default: "en"]
  -i, --i18n-files-path         The path to the i18n files
                                             [string] [default: "src/languages"]
  -c, --csv-delimiter           The csv delimiter        [string] [default: ","]
  -n, --csv-file-name  The name of the csv translations file
                                                   [string] [default: "nolybab"]
  -p, --csv-file-path  The path to the csv translations file
                                             [string] [default: "src/languages"]
```

## Examples
The following i18n json files:
<details>
  <summary>Click to see</summary>

  ```
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
      body: {
        about: {
          title: 'Acerca de'
        },
        contact_us: 'Contacta con nosotros'
      }
    }
  }
  ```
</details>

Will be converted into the following csv file:  

<details>
  <summary>Click to see</summary>

  ```
  ,en,es,fr
  hello,Hello,Hola,Bonjour
  yes,Yes,Sí,Oui
  no,No,No,Non
  login.title,Login,Acceso,Connexion
  login.message,Please login,Por favor Iniciar sesión,Veuillez vous connecter
  home.description,Welcome to Nolybab,Bienvenido a nolybab,Bienvenue sur Nolybab
  home.header.title,Nolybab,Nolybab,Nolybab
  home.footer.credit,2022 Nolybab,2022 Nolybab,2022 Nolybab
  home.body.about.title,About,Acerca de,Sur
  home.body.contact_us,Contact us,Contacta con nosotros,Nous contacter
  ```

  ![CSV file](https://user-images.githubusercontent.com/18335346/167492345-ee742731-9f66-4a8f-9f79-a6b37115fc91.png)

</details>

## License

[MIT](LICENSE)
