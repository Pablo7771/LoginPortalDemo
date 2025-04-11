# external-login
Mockup login app for `ecom` or `portal` application. 

This mockup has two main parts: a login page and a signup form. 
The login page is made to look nice and easy to use. 
You'll find things like spaces to put your username and password. 
It's designed to be simple and welcoming so that people can easily get into their accounts.

On the other hand, the signup form is for new users who want to create an account. 
The form is designed to be clear and not confusing, so it helps guide people as they fill it out.


## Project setup

### Requirements
Make sure you have Node.js installed on your system. 
You can download it from the official Node.js website.

Node.js comes with a package manager called npm (Node Package Manager) 
that you'll use to install and manage project dependencies.

- Node JS v18.15.0 
- NPM 9.5.0

You can install node by downloading the following installer:
https://nodejs.org/en/download

### Initial setup
Inside your Vue project directory, you'll find a package.json file. 
To install the necessary dependencies, run:

```
npm install
```

### Run for development
To run your Vue.js application during development, 
you can use the following command. 
This will start a local development server and open the app in a web browser.
```
npm run serve
```
After running the above command, you should see a URL (usually http://localhost:8080/) in your terminal. 
Open this URL in a web browser to see the Vue.js application.

### Publish version

#### Nexus login/credentials
To publish a version to the Nexus server, it's essential to have proper configuration on your computer.
Follow these steps:

1. Open your terminal and enter the following command:

   ```
   npm login --scope=@axional --registry=http://nexus3.deistercloud.com/repository/npm-private/
   ```

   This command will prompt you to provide a user code, password, and email.

2. To obtain the required user credentials, please contact the Core team or reach to support team.

This process ensures that you're authenticated to publish versions to the Nexus server.

#### Compile project
Increase the package version by editing the `version` attribute within the `package.json` file.

Subsequently, execute this command to build the login app:
```bash
npm run build
```

Once the build finalizes, run the following command to publish the project onto the Nexus server:
```bash
npm publish
```

The project will be uploaded, bearing the specified package name and version.