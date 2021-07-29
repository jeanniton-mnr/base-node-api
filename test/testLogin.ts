const request = require('supertest');
const expect = require('chai').expect;
const chai = require('chai');
chaiHttp = require('chai-http');

chai.use(chaiHttp);
const should = chai.should();

process.env.NODE_ENV = 'test'; // Set environment to test

describe('Testing Login', function () {
  let server;
  this.timeout(6000);
  beforeEach(() => {
    server = require('../bin/www');
  });
  afterEach((done) => {
    const iAmDone = done;
    server.close();
    setTimeout(() => {
      iAmDone();
    }, 2000);
  });
  describe('POST /niouz/login - missing auth', () => {
    it('should get /niouz/login', (done) => {
      chai.request(server)
        .post('/niouz/login')
        .end((err, res) => {
          res.should.have.status(400); // No Auth headers!
          done(err);
        });
    });
  });

  describe('POST /niouz/login - correct auth', () => {
    it('should get /niouz/login', (done) => {
      chai.request(server)
        .post('/niouz/login')
        .send({ usernameOrEmail: 'unittest', password: 'testpassword' })
        .end((err, res) => {
          res.should.have.status(200); // Correct Auth!
          res.body.should.have.property('version').eql('0.2.0');
          res.body.should.have.property('token');
          done(err);
        });
    });
  });
  describe('POST /niouz/login - incorrect auth', () => {
    it('should get /niouz/login', (done) => {
      chai.request(server)
        .post('/niouz/login')
        .send({ usernameOrEmail: 'administrator', password: 'xxxx' })
        .end((err, res) => {
          res.should.have.status(401); // Invalid Auth!
          done(err);
        });
    });
  });
});
