### WebdriverIO code with Mocha BDD

This repository contains a collection of sample webdriverIO (Selenium - Node.js/JavaScript) projects and libraries that demonstrate how to use the tool and develop automation script using the Mocha BDD framework. It support ES6 (via babel-register).It generate Spec, JUNIT, Allure, JSON reporters.

### Installation

This project is tested on ***Node v6.10.0 to v8.9.0***.  While earlier versions of node may be compatible, they have not been tested or verified.

`JDK 1.8:` Install JDK 1.8+ and make sure class path is set properly. JAVA is require to start `Selenium Server` nothing else.

`Node.JS:` Install  from the site - https://nodejs.org/en/  take the LTS version based on your Operating system. Please make sure you install NodeJS globally. If you have nvm installed globally, you run `nvm install` to get the latest version of node specified in the`.nvmrc` file [here](/.nvmrc).  If you don't use nvm, be sure that you are using a compatible version. Further details on nvm can be found on the official [github page](https://github.com/creationix/nvm). MAC OSX users are best suited to install nvm with homebrew `brew install nvm`.


Once installation is done - open terminal (MAC OS) or command prompt (windows OS) and type below command to verify NodeJS has been installed properly.

  node --version

  npm --version

Above command should print out the version that you have installed.

Now navigate to the framework's package.json folder and run `npm install` to grab all dependencies.


### Selenium

  To run your test You must have selenium running to execute any webdriverIO tests, or it will fail fast with an error. There are two ways you can run selenium.

  Once all the node dependency modules are installed (through `npm install`) then for development, you can run  `npm run selenium-postinstall` followed by `npm run selenium-start` if you wish to start it manually else you can use `services: ['selenium-standalone'],` in .conf.js to start it automatically which has been added as part of this project. That's all there is to it.!. Please note that this step is only one time activity at the initial framework set up. Alternatively you can also use below options to start the selenium server.

  1. Install Selenium (selenium-standalone) through NPM (this is the recommended way to install) as you can use it as a services in your framework without worrying to start the selenium server manually. Please note that you follow this below step if `selenium-standalone` package in not been installed through package manager. If you are behind a specific proxy. Then you need to set environment variables:

  - On OSX:
      - NODE_TLS_REJECT_UNAUTHORIZED=0

   - On Windows:
      - setx NODE_TLS_REJECT_UNAUTHORIZED 0

  ```
    sudo npm install selenium-standalone@latest -g
    sudo selenium-standalone install
    selenium-standalone start
  ```

  OR

  2. Download the latest selenium standalone server version: and then for example
    $ java -jar selenium-server-standalone-3.4.0.jar. This option is require if you have not done the step No-1. Else ignore it. this is the other way of doing.

  Note: While installing through sudo command - you need to provide System admin password. On windows don't use `sudo`

### Run Some Sample Tests

To execute the entire test suite in local development, you can use any one of the options mentioned below

Option 1: `npm run test`

### Config Files

WebdriverIO uses configuration files to setup and execute tests in specific ways.  The configuration is fully customizable, and different functions can be invoked before, during and after each test or test suite.  Config files are found in the `/test/config/` directory and all end with `*.conf.js`.  These can be called via the the cli

### Reporters

WebdriverIO uses several different types of test reporters to communicate pass/failure.  

##### Dot

To use the dot reporter just add 'dot' to the reporters array in the config file. The dot reporter prints for each test spec a dot. If colors are enabled on your machine you will see three different colors for dots. Yellow dots mean that at least one browser has executed that spec. A green dot means all browser passed that spec and a red to means that at least one browser failed that spec. All config files have this turned on by default.

##### Spec

Test reporter, that prints detailed results to console.

##### Allure

The Allure Reporter creates [Allure](http://allure.qatools.ru/) test reports which is an HTML generated website with all necessary information to debug your test results and take a look on error screenshots. Add allure to the reporters array in config file and define the output directory of the allure reports.

To generate and view an allure report locally, run `npm run allure-report`. A typical Allure report will look like this

![ScreenShot](https://github.com/allure-framework/allure2/blob/master/.github/readme-img.png)

Allure has several other reporting tools optimized for the CI server of your choice.  You can [view the documentation here](http://wiki.qatools.ru/display/AL/Reporting).

##### JUnit/xUnit

The JUnit reporter helps you to create xml reports for your CI server. Add it to the reports array in the config file and define the directory where the xml files should get stored. webdriverIO will create an xml file for each instance under test and the filename will contain the browser and OS.

To generate and view an allure report locally, run `npm run junit-report`.

##### JSON

The JSON reporter is especially versatile. Since it produces a literal in a key : value pair, help to read, translate execution results to any custom reporter / it can be used to transport reporter events to another process and format them there, or to store the execution results back to any standard RDBMS or to NoSQL like mongodb with very minimal effort.

### Develop automation scripts (for both desktop browser and mobile browser / app)

You can write test either by using Cucumber BDD framework or Mocha BDD framework. You can choose javascript based design pattern or ES6 based. This project is ES6 friendly (via babel-register)

#### Using Mocha JavaScript framework

Tests are written in the Mocha framework. More about Mocha can be found at https://mochajs.org/

Tests are place in `*.specs.js` files in the `/test/specs/` directory. A typical test will look similar to this:
```
//example.js
//using synchronous mode//

describe('WebdriverIO search', function() {
    it('searches for WebdriverIO', function() {
        browser.url('https://duckduckgo.com/');
        browser.setValue('#search_form_input_homepage', 'WebdriverIO');
        browser.click('#search_button_homepage');
        var title = browser.getTitle();
        console.log('Title is: ' + title);
    });
});

```
### The Page Object Design Pattern

Within your web app's UI there are areas that your tests interact with. A Page Object simply models these as objects within the test code. This reduces the amount of duplicated code and means that if the UI changes, the fix need only be applied in one place. In other wards one of the challenges of writing test automation is keeping your [selectors] (classes, id's, or xpath') up to date with the latest version of your code.  The next challenge is to keep the code you write nice and [DRY] (Don't Repeat Yourself).  The page object pattern helps us accomplish this in one solution.  Instead of including our selectors in our step definitions(in cucumber) or in Spec file (in Mocha or Mocha), we instead place them in a `<pagename>.js` file where we can manage all these selectors and methods together. Your test file should only call the test methods.

You can also place reusable functions or logic inside of these pages and call them from your step files. The page object serves as a layer of abstraction between tests and code.  When A test fails, it fails on a individual step.  That step may call a selector that is no longer valid, but that selector may be used by many other steps.  By having a single source of truth of what the selector is supposed to be, fixing one selector on the page object could repair a number of failing tests that were affected by the same selector.

An object called `Page` will be created with the prototype model or by ES6 class pattern.  This ensures that every instance of a page object is exported as a stateless construct. Any any changes to that state are handled in the browser, rather than on the server.

It is preferable to separate page objects into individual files that end with `.page.js`.  These will require the basic `page.js` prototype construct / abstract class and create new objects for each individual page. For more information on the implementation, refer to the `/test/pageobjects` directory.

Note: `node-any-jdbc` is NOT packaged under this project. If you need, you can install it and start using it right away. You can also find sample examples under /util-examples/database-example.js

```
### Common utilities

Refer to the common Javascript functions that provides clean, performant methods for manipulating objects, collections, MS-Excel utilities, DataBase utilities etc. Few sample code can be found in ./util-examples/

Use [Underscore.js](http://underscorejs.org/) already bundled inside the framework which provides over 100 functions that support both your favorite workaday functional helpers: map, filter, invoke — as well as more specialized goodies: function binding, javascript templating, creating quick indexes, deep equality testing, and so on.

### Contribution

Create a fork of the project into your own repository. Make all your necessary changes and create a pull request with a description on what was added or removed and details explaining the changes in lines of code. If approved, project owners will merge it.

## History

Industry is moving towards Node.js / JavaScript, Angularjs, Full-Stack world. WebdriverIO, a JavaScript binding wrapper for Selenium Webdriver, was originated by Camilo Tapia's initial Selenium project called WebdriverJS, which was the first Webdriver project on NPM. In 2014, the project was renamed WebdriverIO later on. This repository is a pre-configured version of webdriverIO meant to jump-start the process of writing new test automation or adding test automation to existing node.js applications.


## Licensing

MIT
# webdriverio-training
# webdriverio-training
