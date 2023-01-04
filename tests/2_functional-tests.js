const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .get('/hello?name=Jerry')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Jerry');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({
          "surname": "Colombo"
        })
        .end(function (err, res) {
          assert.equal(res.status, 200, "response status should be 200");
          assert.equal(res.type, 'application/json', 'response should be in json');
          assert.equal(res.body.name, 
                       'Cristoforo', 'resonse res.body.name should be Cristoforo');
          assert.equal(res.body.surname, 'Colombo', 
                       'response res.body.surname should be colombo');
          done();
        });
    });
    
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
      .request(server)
      .put('/travellers')
      .send({
        "surname": "da Verrazzano"
      })
      .end(function(err, res) {
        assert.equal(res.status, 200, 'res.status should have the value 200');
        assert.equal(res.type, "application/json", 
                     "response.type should have value of json")
        assert.equal(res.body.name, "Giovanni", 
                    'res.body.name should have the value "Giovannie"')
        assert.equal(res.body.surname, "da Verrazzano",
                     'res.body.surname should have the value "da Verrazzano"')
        done();
      });
    });
  });
});

const Browser = require('zombie');
Browser.site = 'https://boilerplate-mochachai.jerryh-jr.repl.co';

suite('Functional Tests with Zombie.js', function () {
  this.timeout(10000);
  const browser = new Browser();
  
  suiteSetup(function(done) {
    return browser.visit('/', done);
  });

  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      browser.fill("surname", "Colombo" ).then(() => { browser.pressButton('submit', () => {
          browser.assert.success();
          browser.assert.text('span#name', 'Cristoforo');
          browser.assert.text('span#surname', 'Colombo');
          browser.assert.elements('span#dates', 1);
           done();
        });
      });
    });

    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      broswer.fill('surname', 'Vespucci').then(() => { broweser.pressButton('submit', () => {
        broswer.assert.success();
        browser.assert.text('apan#name', 'Amerigo');
        browser.assert.text('span#surname', 'Vespucci');
        browser.assert.elements('span#dates', 1);
         done();
        });                                           
      });
    });
  });
});

