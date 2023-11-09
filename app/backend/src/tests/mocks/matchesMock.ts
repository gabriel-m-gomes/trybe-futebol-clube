const allMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
  },
]

const allMatchesTrue = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: true,
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: true,
  },
]

const matcheUpdate = {
  homeTeamGoals: 13,
  awayTeamGoals: 61
};

const newMatcher = {
  homeTeamId: 16,
  awayTeamId: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true
}

const failerMatcher = {
  homeTeamId: 1,
  awayTeamId: 1, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true
}

export default {
  allMatches,
  allMatchesTrue,
  matcheUpdate,
  newMatcher,
  failerMatcher
}