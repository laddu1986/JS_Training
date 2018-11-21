
import LoginPage from '../pageobjects/login.page';


/*
	This is a BDD test using Mocha JavaScript framework
*/

describe('phptravels.net login page', function() {
  it('should allow user to login ', function () {
    LoginPage.open();     // navigating to login page
    LoginPage.login('abc@gmail.com', 'password');    // entering user name, password and and submiting the page
  });
});
