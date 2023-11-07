import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import matchesMock from './mocks/matchesMock';
chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o fluxo 3', () => {
  afterEach(function () {
    sinon.restore();
  });

 it('Retorna todos as partidas', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock.allMatches.map((matcher) => SequelizeMatches.build(matcher)));

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    console.log(matchesMock.allMatches, 'QUIDSADA')
    expect(body).to.deep.equal(matchesMock.allMatches);
  });
})