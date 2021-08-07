module.exports = { detectMechanics }
const Mechanics = [
  'Action',
  'Activate',
  'Animal',
  'Another Creature',
  'Another Friendly Creature',
  'Assemble',
  'Attack',
  'Attribute', // like Court Wizard, Baron
  'Aura',
  'Banish',
  'Battle',
  'Beast Form',
  'Betray',
  'Buff',
  'Buff Hand',
  'Buff Deck',
  'Buff Race',
  'Burn Damage',
  "Can't",
  'Change',
  'Choose',
  'Consume',
  'Copy',
  'Cover',
  'Cost',
  'Cost Reduction',
  'Cost Increase',
  'Creature',
  'Both Lanes',
  'Damage',
  'Damage Creature',
  'Damage Opponent',
  'Debuff',
  'Destroy',
  'Destroy Creature',
  'Destroy Support',
  'Discard',
  'Draw',
  'Enemy',
  'End of',
  'Empower',
  'Equip',
  'Exalt',
  'Expertise',
  'Friendly',
  'Gain Health',
  'Gain Power',
  'Gain Magicka',
  'Gain Keyword',
  'Give',
  'Heal',
  'Health',
  'Ignore',
  'Immune',
  'Immune to Shackle',
  'Immune to Lethal',
  'Immune to Wounded',
  'Immune to Damage',
  'Immune to Silence',
  'Immune to Target',
  'Invade',
  'Lane',
  'Last Gasp',
  'Magicka',
  'Mono',
  'Move',
  'Ping',
  'Pilfer',
  'Plot',
  'Power',
  'Put a',
  'Random',
  'Random Card',
  'Random Creature',
  'Random Action',
  'Random Item',
  'Random Support',
  'Reduce',
  'Recursion',
  'Rune',
  'Sacrifice',
  'Shackle',
  'Shuffle',
  'Shout',
  'Silence',
  'Slay',
  'Steal',
  'Start of',
  'Summon',
  'Transform',
  'Treasure Hunt',
  'Undead',
  'Unique',
  'Singleton',
  'Unsummon',
  'Veteran',
  'Wax and Wane',
  'Wounded',
  'Win the Game'
]

function detectMechanics ({ Text, Name }) {
  return Mechanics.filter(mechanic => {
    switch (mechanic) {
      case 'Power':

      case 'Action':
      case 'Activate':
      case 'Animal':
      case 'Another Creature':
      case 'Another Friendly Creature':
      case 'Assemble':
      case 'Attack':
      case 'Attribute':
      case 'Aura':
      case 'Banish':
      case 'Battle':
      case 'Beast Form':
      case 'Betray':
      case 'Buff':
      case 'Buff Hand':
      case 'Buff Deck':
      case 'Buff Race':
      case 'Burn Damage':
      case 'Change':
      case 'Choose':
      case 'Consume':
      case 'Copy':
      case 'Cover':
      case 'Cost':
      case 'Cost Reduction':
      case 'Cost Increase':
      case 'Creature':
      case 'Both Lanes':
      case 'Damage':
      case 'Damage Creature':
      case 'Damage Opponent':
      case 'Debuff':
      case 'Destroy':
      case 'Destroy Creature':
      case 'Destroy Support':
      case 'Discard':
      case 'Draw':
      case 'Enemy':
      case 'End of':
      case 'Empower':
      case 'Equip':
      case 'Exalt':
      case 'Expertise':
      case 'Friendly':
      case 'Gain Health':
      case 'Gain Power':
      case 'Gain Magicka':
      case 'Gain Keyword':
      case 'Give':
      case 'Heal':
      case 'Health':
      case 'Immune':
      case 'Immune to Shackle':
      case 'Immune to Lethal':
      case 'Immune to Wounded':
      case 'Immune to Damage':
      case 'Immune to Silence':
      case 'Immune to Target':
      case 'Invade':
      case 'Lane':
      case 'Last Gasp':
      case 'Magicka':
      case 'Mono':
      case 'Move':
      case 'Ping':
      case 'Pilfer':
      case 'Plot':

      case 'Put a':
      case 'Random':
      case 'Random Card':
      case 'Random Creature':
      case 'Random Action':
      case 'Random Item':
      case 'Random Support':
      case 'Reduce':
      case 'Recursion':
      case 'Rune':
      case 'Sacrifice':
      case 'Shackle':
      case 'Shout':
      case 'Shuffle':
      case 'Shout':
      case 'Silence':
      case 'Slay':
      case 'Steal':
      case 'Start of':
      case 'Summon':
      case 'Transform':
      case 'Treasure Hunt':
      case 'Undead':
      case 'Unique':
      case 'Singleton':
      case 'Unsummon':
      case 'Veteran':
      case 'Wax and Wane':
      case 'Wounded':
      case 'Win the Game':
      default:
        return Text.toLowerCase().includes(mechanic.toLowerCase())
    }
  })
}
