import contactUs from '../pageobjects/contactus.page';
const chai = require('chai');
require('chai').should();
require('chai').expect;
/*
	This is a BDD test using Mocha JavaScript framework
*/

describe('navigating to contact-us page', function() {
  it('should allow user to navigating contact-us page ', function () {
    contactUs.open();     // navigating to login page
    contactUs.waitForContactPageToLoad();
    console.log(contactUs.getPageTitle());
    let contactUsPageTitle = contactUs.getPageTitle();
    contactUsPageTitle.should.equal('Contact Us'); //should style of writing assertions
    expect(contactUs.getPageTitle()).to.equal('Contact Us'); // expect style of writing assertions

  });
});
