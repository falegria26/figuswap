import type { Sticker, Team } from '@/types'

export const TEAMS: Team[] = [
  // Grupo A
  { code: 'MEX', name: 'México', group: 'A', flag: '🇲🇽' },
  { code: 'KOR', name: 'Corea del Sur', group: 'A', flag: '🇰🇷' },
  { code: 'ZAF', name: 'Sudáfrica', group: 'A', flag: '🇿🇦' },
  { code: 'CZE', name: 'Rep. Checa', group: 'A', flag: '🇨🇿' },
  // Grupo B
  { code: 'CAN', name: 'Canadá', group: 'B', flag: '🇨🇦' },
  { code: 'SUI', name: 'Suiza', group: 'B', flag: '🇨🇭' },
  { code: 'QAT', name: 'Catar', group: 'B', flag: '🇶🇦' },
  { code: 'BIH', name: 'Bosnia y Herz.', group: 'B', flag: '🇧🇦' },
  // Grupo C
  { code: 'BRA', name: 'Brasil', group: 'C', flag: '🇧🇷' },
  { code: 'MAR', name: 'Marruecos', group: 'C', flag: '🇲🇦' },
  { code: 'SCO', name: 'Escocia', group: 'C', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { code: 'HAI', name: 'Haití', group: 'C', flag: '🇭🇹' },
  // Grupo D
  { code: 'USA', name: 'Estados Unidos', group: 'D', flag: '🇺🇸' },
  { code: 'AUS', name: 'Australia', group: 'D', flag: '🇦🇺' },
  { code: 'PAR', name: 'Paraguay', group: 'D', flag: '🇵🇾' },
  { code: 'TUR', name: 'Turquía', group: 'D', flag: '🇹🇷' },
  // Grupo E
  { code: 'GER', name: 'Alemania', group: 'E', flag: '🇩🇪' },
  { code: 'ECU', name: 'Ecuador', group: 'E', flag: '🇪🇨' },
  { code: 'CIV', name: 'Costa de Marfil', group: 'E', flag: '🇨🇮' },
  { code: 'CUW', name: 'Curazao', group: 'E', flag: '🇨🇼' },
  // Grupo F
  { code: 'NED', name: 'Países Bajos', group: 'F', flag: '🇳🇱' },
  { code: 'JPN', name: 'Japón', group: 'F', flag: '🇯🇵' },
  { code: 'TUN', name: 'Túnez', group: 'F', flag: '🇹🇳' },
  { code: 'SWE', name: 'Suecia', group: 'F', flag: '🇸🇪' },
  // Grupo G
  { code: 'BEL', name: 'Bélgica', group: 'G', flag: '🇧🇪' },
  { code: 'IRN', name: 'Irán', group: 'G', flag: '🇮🇷' },
  { code: 'EGY', name: 'Egipto', group: 'G', flag: '🇪🇬' },
  { code: 'NZL', name: 'Nueva Zelanda', group: 'G', flag: '🇳🇿' },
  // Grupo H
  { code: 'CPV', name: 'Cabo Verde', group: 'H', flag: '🇨🇻' },
  { code: 'KSA', name: 'Arabia Saudita', group: 'H', flag: '🇸🇦' },
  { code: 'ESP', name: 'España', group: 'H', flag: '🇪🇸' },
  { code: 'URU', name: 'Uruguay', group: 'H', flag: '🇺🇾' },
  // Grupo I
  { code: 'FRA', name: 'Francia', group: 'I', flag: '🇫🇷' },
  { code: 'SEN', name: 'Senegal', group: 'I', flag: '🇸🇳' },
  { code: 'NOR', name: 'Noruega', group: 'I', flag: '🇳🇴' },
  { code: 'IRQ', name: 'Irak', group: 'I', flag: '🇮🇶' },
  // Grupo J
  { code: 'ALG', name: 'Argelia', group: 'J', flag: '🇩🇿' },
  { code: 'ARG', name: 'Argentina', group: 'J', flag: '🇦🇷' },
  { code: 'AUT', name: 'Austria', group: 'J', flag: '🇦🇹' },
  { code: 'JOR', name: 'Jordania', group: 'J', flag: '🇯🇴' },
  // Grupo K
  { code: 'POR', name: 'Portugal', group: 'K', flag: '🇵🇹' },
  { code: 'COL', name: 'Colombia', group: 'K', flag: '🇨🇴' },
  { code: 'UZB', name: 'Uzbekistán', group: 'K', flag: '🇺🇿' },
  { code: 'COD', name: 'R.D. Congo', group: 'K', flag: '🇨🇩' },
  // Grupo L
  { code: 'ENG', name: 'Inglaterra', group: 'L', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { code: 'CRO', name: 'Croacia', group: 'L', flag: '🇭🇷' },
  { code: 'PAN', name: 'Panamá', group: 'L', flag: '🇵🇦' },
  { code: 'GHA', name: 'Ghana', group: 'L', flag: '🇬🇭' },
]

function generateStickers(): Sticker[] {
  const stickers: Sticker[] = []

  stickers.push({
    id: 'FWC-00',
    section: 'FWC',
    sectionLabel: 'Introducción',
    number: '00',
    type: 'foil',
    label: 'FWC 00',
  })

  for (let i = 1; i <= 8; i++) {
    stickers.push({
      id: `FWC-${i}`,
      section: 'FWC',
      sectionLabel: 'Introducción',
      number: String(i),
      type: 'special',
      label: `FWC ${i}`,
    })
  }

  for (const team of TEAMS) {
    if (team.code === 'BEL') {
      for (let i = 1; i <= 12; i++) {
        stickers.push({
          id: `COC-${i}`,
          section: 'COCA_COLA',
          sectionLabel: 'Coca-Cola',
          number: String(i),
          type: 'special',
          label: `Coca-Cola ${i}`,
        })
      }
    }

    for (let n = 1; n <= 20; n++) {
      const isBadge = n === 1
      const isPhoto = n === 2
      stickers.push({
        id: `${team.code}-${n}`,
        section: team.code,
        sectionLabel: team.name,
        teamCode: team.code,
        teamName: team.name,
        teamFlag: team.flag,
        group: team.group,
        number: String(n),
        type: isBadge ? 'foil' : 'normal',
        label: isBadge
          ? `${team.flag} Escudo`
          : isPhoto
          ? 'Foto equipo'
          : `Jugador ${n - 2}`,
      })
    }
  }

  for (let i = 9; i <= 13; i++) {
    stickers.push({
      id: `FWC-${i}`,
      section: 'FWC_END',
      sectionLabel: 'Cierre',
      number: String(i),
      type: 'special',
      label: `FWC ${i}`,
    })
  }

  return stickers
}

export const ALL_STICKERS = generateStickers()
export const TOTAL_STICKERS = ALL_STICKERS.length

export const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

export function getTeamsByGroup(group: string): Team[] {
  return TEAMS.filter(t => t.group === group)
}

export function getStickersByTeam(teamCode: string): Sticker[] {
  return ALL_STICKERS.filter(s => s.teamCode === teamCode)
}

export function getStickerById(id: string): Sticker | undefined {
  return ALL_STICKERS.find(s => s.id === id)
}
