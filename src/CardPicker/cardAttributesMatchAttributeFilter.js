import { AttributeNames } from '../constants'

export function cardAttributesMatchAttributeFilter (cardAttributes, filter) {
  return filter.some(filterAttribute => {
    switch (filterAttribute) {
      case AttributeNames.Willpower:
      case AttributeNames.Strength:
      case AttributeNames.Intelligence:
      case AttributeNames.Endurance:
      case AttributeNames.Agility:
      case AttributeNames.Neutral:
        return (
          cardAttributes.length === 1 &&
          cardAttributes.includes(filterAttribute.toLowerCase())
        )
      case 'Battlemage':
        return ['strength', 'intelligence'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Crusader':
        return ['strength', 'willpower'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Archer':
        return ['strength', 'agility'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Warrior':
        return ['strength', 'endurance'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Mage':
        return ['intelligence', 'willpower'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Assassin':
        return ['intelligence', 'agility'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Sorcerer':
        return ['intelligence', 'endurance'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Monk':
        return ['willpower', 'agility'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Spellsword':
        return ['willpower', 'endurance'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Scout':
        return ['agility', 'endurance'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Guildsworn':
        return ['strength', 'intelligence', 'willpower'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Dagoth':
        return ['strength', 'intelligence', 'agility'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Daggerfall':
        return ['strength', 'intelligence', 'endurance'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Hlaalu':
        return ['strength', 'willpower', 'agility'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Redoran':
        return ['strength', 'willpower', 'endurance'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Ebonheart':
        return ['strength', 'agility', 'endurance'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Dominion':
        return ['intelligence', 'willpower', 'agility'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Tribunal':
        return ['intelligence', 'willpower', 'endurance'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Telvanni':
        return ['intelligence', 'agility', 'endurance'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      case 'Empire':
        return ['willpower', 'agility', 'endurance'].every(attribute =>
          cardAttributes.includes(attribute)
        )
      default:
        return false
    }
  })
}
