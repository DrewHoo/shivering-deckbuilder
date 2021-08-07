import { ExpansionSets } from '../constants'

export const Dimensions = [
  'Name',
  'Text',
  'Class',
  'Attributes',
  'Magicka Cost',
  'Attack',
  'Health',
  'Rarity',
  'Race',
  'Keywords',
  'Mechanics',
  'Type',
  'Expansion Set'
]

export const Segments = [
  'Attributes',
  'Class',
  'Magicka Cost',
  'Attack',
  'Health',
  'Rarity',
  'Race',
  'Keywords',
  'Type',
  'Expansion Set'
]

export const DimensionToVariableTypeMap = {
  Class: 'Categorical',
  Name: 'String',
  Text: 'String',
  Mechanics: 'Categorical',
  Attributes: 'Categorical',
  'Magicka Cost': 'Numerical',
  Attack: 'Numerical',
  Health: 'Numerical',
  Rarity: 'Categorical',
  Race: 'Categorical',
  Keywords: 'Categorical',
  Type: 'Categorical',
  'Expansion Set': 'Ordinal'
}

export const OrdinalTypeValues = {
  'Expansion Set': {
    [ExpansionSets.CoreSet]: 0,
    [ExpansionSets.MadhouseCollection]: 1,
    [ExpansionSets.FallOfTheDarkBrotherhood]: 2,
    [ExpansionSets.HeroesOfSkyrim]: 3,
    [ExpansionSets.ReturnToClockworkCity]: 4,
    [ExpansionSets.ForgottenHeroCollection]: 5,
    [ExpansionSets.HousesOfMorrowind]: 6,
    [ExpansionSets.FrostSparkCollection]: 7,
    [ExpansionSets.IsleOfMadness]: 8,
    [ExpansionSets.AllianceWar]: 9,
    [ExpansionSets.MoonsOfElsweyr]: 10,
    [ExpansionSets.JawsOfOblivion]: 11,
    [ExpansionSets.TamrielCollection]: 12,
    [ExpansionSets.MonthlyReward]: 13
  }
}

export const ChartTypeOptions = ['Bar', 'Pie']
