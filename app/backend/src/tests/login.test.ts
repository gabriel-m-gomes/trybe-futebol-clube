import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUsers from '../database/models/SequelizeUsers';
import loginMock from './mocks/loginMock';
chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o fluxo 2', () => {
  afterEach(function () {
    sinon.restore();
  });

 it('Retorna um token valido', async function() {
    const httpRequestBody = loginMock.userBody
    const mockFindOneReturn = SequelizeUsers.build(loginMock.existingUser);
    sinon.stub(SequelizeUsers, 'findOne').resolves(mockFindOneReturn);

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.key('token');
  });

  it('Retorna um erro caso o email não seja enviado', async function() {
    const httpRequestBody = loginMock.noEmptyEmail

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.not.have.key('token');
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });

  });

  it('Retorna um erro caso o password não seja enviado', async function() {
    const httpRequestBody = loginMock.noEmptyPassword

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.not.have.key('token');
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });

  });

  
});