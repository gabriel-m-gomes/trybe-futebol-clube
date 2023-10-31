import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { Response } from 'superagent';
import teamsMocks from './mocks/teamsMocks';
chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
 it('should return all books', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teamsMocks.allTeams.map((team) => SequelizeTeams.build(team)));

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMocks.allTeams);
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
