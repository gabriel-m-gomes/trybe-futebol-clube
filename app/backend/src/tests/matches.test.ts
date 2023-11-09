import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import matchesMock from './mocks/matchesMock';
import loginMock from './mocks/loginMock';
import SequelizeUsers from '../database/models/SequelizeUsers';
import JwtService from '../utils/jwt';
chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o fluxo 3', () => {
  afterEach(function () {
    sinon.restore();
  });

 it('Retorna todos as partidas', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock.allMatches.map((team) => SequelizeMatches.build(team)))
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMock.allMatches);
  });

  it('Retorna todos as partidas com inProgress true', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock.allMatchesTrue.map((team) => SequelizeMatches.build(team)))
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMock.allMatchesTrue);
  });

  it('Testando se finaliza uma partida', async function() {
    sinon.stub(SequelizeUsers, 'findByPk').resolves(SequelizeUsers.build(loginMock.existingUser));
    const token = JwtService.sign(loginMock.existingUser);

    sinon.stub(SequelizeMatches, 'findByPk').resolves(SequelizeMatches.build(matchesMock.allMatches[0]));
    sinon.stub(SequelizeMatches, 'update').resolves([1]);

    const response = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set( 'Authorization', `Bearer ${token}`)

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ "message": "Finished" });
  });

   it('Testando se não finaliza uma partida sem o token', async function() {

    sinon.stub(SequelizeMatches, 'findByPk').resolves(SequelizeMatches.build(matchesMock.allMatches[0]));
    sinon.stub(SequelizeMatches, 'update').resolves([1]);

    const response = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set( 'Authorization', `Bearer`)

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ "message": "Token must be a valid token" });
  });

   it('Testando se atualiza um jogo', async function() {

    sinon.stub(SequelizeUsers, 'findByPk').resolves(SequelizeUsers.build(loginMock.existingUser));
    const token = JwtService.sign(loginMock.existingUser);

    sinon.stub(SequelizeMatches, 'findByPk').resolves(SequelizeMatches.build(matchesMock.allMatches[0]));
    sinon.stub(SequelizeMatches, 'update').resolves([1]);

    const response = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', `Bearer ${token}`)
      .send(matchesMock.matcheUpdate);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal("UPDATE!");
  });

  it('Testando se cria um novo jogo', async function() {

    sinon.stub(SequelizeUsers, 'findByPk').resolves(SequelizeUsers.build(loginMock.existingUser));
    const token = JwtService.sign(loginMock.existingUser);

    sinon.stub(SequelizeMatches, 'create').resolves(SequelizeMatches.build({ ...matchesMock.newMatcher, id: 1}))

    const response = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${token}`)
      .send(matchesMock.newMatcher);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal({...matchesMock.newMatcher, id: 1});
  });

  it('Testando se não cria um novo jogo caso os id sejam iguais', async function() {

    sinon.stub(SequelizeUsers, 'findByPk').resolves(SequelizeUsers.build(loginMock.existingUser));
    const token = JwtService.sign(loginMock.existingUser);

    sinon.stub(SequelizeMatches, 'create').resolves(SequelizeMatches.build({ ...matchesMock.failerMatcher}))

    const response = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${token}`)
      .send(matchesMock.failerMatcher);

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({"message": "It is not possible to create a match with two equal teams"});
  });
})