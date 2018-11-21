
import LoginPage from '../pageobjects/login.page';
import assert from 'assert';


/*
	This is a BDD test using Mocha JavaScript framework
*/

describe('phptravels.net login page', function() {
  it('should allow user to login ', function () {
    LoginPage.open();     // navigating to login page
    LoginPage.login('user@phptravels.com', 'demouser');    // entering user name, password and and submiting the page
  });
});
