// Scott Crawshaw
// code from https://www.digitalonus.com/getting-started-with-api-test-automation-using-javascript/

const request = require('supertest')('http://localhost:3838');
const assert = require('chai').assert;
const expect = require('chai').expect;


describe('Med3 Backend API', () => {

    it('Hello World', () =>{
        return request
        .get('/hello')
        .expect(200)
        .then((res) => {
         assert.equal(res.body, "hello world");
       });
    });

    it('Get User by ID', () =>{
        return request
        .get('/users/8d50a388f44915f44dda067276722595f885aacc01e26d4eb3f7495a8d477a4d787bd4277ab46fb31cb0db4837ca8da1de8987ad03dc158709036e6fd1c84aa9/1')
        .expect(200)
        .then((res) => {
         expect(res.body).to.be.an("array");
         expect(res.body).to.have.lengthOf(1);
       });
    });

    it('Validate Login', () =>{
        return request
        .get('/users/login/johnsmithcs98health%40gmail.com/password/1234')
        .expect(200)
        .then((res) => {
         expect(res.body).to.be.an("array");
         expect(res.body).to.have.lengthOf(1);
       });
    });

    it('Create User', () => {
        const data = {
            name:"Elaine",
            email:"elaine@example.com",
            password:"beebus",
            admin:0,
            eth_address:"1234"
         };
        return request
         .post('/users')
         .send(data)
         .expect(201)
         .then((res) => {
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('token');
        });
    });

    it('Update User', () => {
        const data = {
            name:"Kramer",
            email:"kramer@example.com",
            password:"password",
            admin:0,
            eth_address:"1234"
         };
        return request
         .put('/users/8d50a388f44915f44dda067276722595f885aacc01e26d4eb3f7495a8d477a4d787bd4277ab46fb31cb0db4837ca8da1de8987ad03dc158709036e6fd1c84aa9/1')
         .send(data)
         .expect(200);
    });

    it('Sign Out', () =>{
        return request
        .delete('/users/login/8d50a388f44915f44dda067276722595f885aacc01e26d4eb3f7495a8d477a4d787bd4277ab46fb31cb0db4837ca8da1de8987ad03dc158709036e6fd1c84aa9/1')
        .expect(200);
    });

});