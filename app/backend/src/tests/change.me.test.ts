import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams';
import teamsMocks from './mocks/teamsMocks';
chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  afterEach(function () {
    // Restaura o stub do Sinon após cada teste
    sinon.restore();
  });

 it('Retorna todos os times', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teamsMocks.allTeams.map((team) => SequelizeTeams.build(team)));

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMocks.allTeams);
  });

  it('Retorna apenas um time', async function () {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(SequelizeTeams.build(teamsMocks.teamOne))

    const response = await chai.request(app).get('/teams/1');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsMocks.teamOne);
  })

   it('Retorna erro um id inexistente', async function () {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(null)

    const response = await chai.request(app).get('/teams/1');
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Team not found' });
  })

});
