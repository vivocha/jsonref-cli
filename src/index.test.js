const child_process = require('child_process')
  , chai = require('chai')
  , spies = require('chai-spies')
  , chaiAsPromised = require('chai-as-promised')
  , should = chai.should()

require('../dist/index');

chai.use(spies);
chai.use(chaiAsPromised);

describe('jsonref-cli', function() {

  it('should print the help and exit when run with not arguments', function(done) {
    child_process.exec('node dist/index', function(err, stdout, stderr) {
      err.code.should.equal(1);
      stdout.should.match(/Command-line tool to query a JSON document/);
      stderr.should.equal('');
      done();
    });
  });

  it('should fail if an invalid JSON is read from stdin', function(done) {
    child_process.exec('echo aaa | node dist/index "/"', function(err, stdout, stderr) {
      err.code.should.equal(1);
      stdout.should.equal('');
      stderr.should.match(/Unexpected token . in JSON at position 0/);
      done();
    });
  });

  it('should fail if an invalid JSON is read from a file', function(done) {
    child_process.exec('node dist/index -f LICENSE "/"', function(err, stdout, stderr) {
      err.code.should.equal(1);
      stdout.should.equal('');
      stderr.should.match(/Unexpected token . in JSON at position 0/);
      done();
    });
  });

  it('should fail if an file if specified', function(done) {
    child_process.exec('node dist/index -f aaa "/"', function(err, stdout, stderr) {
      err.code.should.equal(1);
      stdout.should.equal('');
      stderr.should.match(/ENOENT: no such file or directory/);
      done();
    });
  });

  it('should fail if the requested path is not found', function(done) {
    child_process.exec(`echo '{"test": "value"}' | node dist/index "/aaa"`, function(err, stdout, stderr) {
      err.code.should.equal(1);
      stdout.should.equal('');
      stderr.should.equal('');
      done();
    });
  });

  it('should return the requested path as plain text', function(done) {
    child_process.exec(`echo '{"test": "value"}' | node dist/index "/test"`, function(err, stdout, stderr) {
      should.not.exist(err);
      stdout.should.equal('value');
      stderr.should.equal('');
      done();
    });
  });

  it('should return the requested path as json', function(done) {
    child_process.exec(`echo '{"test": "value"}' | node dist/index -j "/test"`, function(err, stdout, stderr) {
      should.not.exist(err);
      stdout.should.equal('"value"');
      stderr.should.equal('');
      done();
    });
  });

});