const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const puzzleString = require('../controllers/puzzle-strings').puzzlesAndSolutions;

chai.use(chaiHttp);

suite('Functional Tests', () => {
    let validPuzzle = puzzleString[0][0];
    let invalidChars = puzzleString[0][0].replace('1', '$');

    suite('POST request to /api/solve', () => {
//Solve a puzzle with valid puzzle string: POST request to /api/solve
        test('Valid puzzle string', (done) => {
            let puzzle = puzzleString[0][0];
            let solution = puzzleString[0][1]
            chai
            .request(server)
            .post('/api/solve')
            .send({puzzle})
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.solution, solution)
                done();
            })
        })
//Solve a puzzle with missing puzzle string: POST request to /api/solve

        test('Missing puzzle string', (done) => {
            chai
            .request(server)
            .post('/api/solve')
            .send({})
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.error, "Required field missing");
                done();
            })
        })
//Solve a puzzle with invalid characters: POST request to /api/solve
        test('Invalid characters', (done) => {
            let puzzle = puzzleString[0][0].replace('1', '$');

            chai
            .request(server)
            .post('/api/solve')
            .send({puzzle})
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                done();
            })
        })
//Solve a puzzle with incorrect length: POST request to /api/solve
        test('Incorrect puzzle string length', (done) => {
            let puzzle = '123.3'

            chai
            .request(server)
            .post('/api/solve')
            .send({puzzle})
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            })
        })
//Solve a puzzle that cannot be solved: POST request to /api/solve
        test('Puzzle that cannot be solved', (done) => {
            let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.47.'
            
            chai
            .request(server)
            .post('/api/solve')
            .send({puzzle})
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Puzzle cannot be solved');
                done();
            })
        })
    })
    suite('POST request to /api/check', () => {
//Check a puzzle placement with all fields: POST request to /api/check
        test('Puzzle placement with all fields', (done) => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: validPuzzle, coordinate: 'A2', value: '3'})
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.valid, true);
                done();
            })
        })
//Check a puzzle placement with single placement conflict: POST request to /api/check
        test('Check single placement conflict', (done) => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: validPuzzle, coordinate: 'A2', value: '9'})
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, false)
                assert.equal(res.body.conflict.length, 1);
                done();
            })
        })
//Check a puzzle placement with multiple placement conflicts: POST request to /api/check
        test('Multiple placement conflicts', (done) => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: validPuzzle, coordinate: 'A2', value: '1'})
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.valid, false)
                assert.equal(res.body.conflict.length, 2)
                done();
            })
        })
//Check a puzzle placement with all placement conflicts: POST request to /api/check
        test('All placement conflicts', (done) => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: validPuzzle, coordinate: 'A2', value: '2'})
            .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.valid, false)
            assert.equal(res.body.conflict.length, 3);
            done();
        })
    })
//Check a puzzle placement with missing required fields: POST request to /api/check
         test('Missing required fields', (done) => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: '', coordinate: '', value: ''})
            .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
        })
    })
//Check a puzzle placement with invalid characters: POST request to /api/check
        test('Invalid characters', (done) => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: invalidChars, coordinate: 'A2', value: '2'})
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                done();
            })
        })
//Check a puzzle placement with incorrect length: POST request to /api/check
        test('Incorrect puzzle length', (done) => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: '1111', coordinate: 'A2', value: '2'})
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            })
        })
//Check a puzzle placement with invalid placement coordinate: POST request to /api/check
        test('Invalid placement coordinate', (done) => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: validPuzzle, coordinate: '11', value: '2'})
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.error, 'Invalid coordinate');
                done();
            })
        })
//Check a puzzle placement with invalid placement value: POST request to /api/check
        test('Invalid placement value', (done) => {
            chai
            .request(server)
            .post('/api/check')
            .send({puzzle: validPuzzle, coordinate: 'A2', value: 'A'})
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.error, 'Invalid value');
                done();
            })
        })
    })
});

