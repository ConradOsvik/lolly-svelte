export const regions = [
    {
        label: 'Europe',
        platforms: [
            {
                name: 'Europe West',
                value: 'euw'
            },
            {
                name: 'Europe Nordic & East',
                value: 'eune'
            },
            {
                name: 'Russia',
                value: 'russia'
            },
            {
                name: 'Turkey',
                value: 'turkey'
            }
        ]
    },
    {
        label: 'North America',
        platforms: [
            {
                name: 'North America',
                value: 'na'
            },
            {
                name: 'Latin America South',
                value: 'las'
            },
            {
                name: 'Latin America North',
                value: 'lan'
            },
            {
                name: 'Brazil',
                value: 'brazil'
            }
        ]
    },
    {
        label: 'Asia',
        platforms: [
            {
                name: 'Oceania',
                value: 'oce'
            },
            {
                name: 'Korea',
                value: 'korea'
            },
            {
                name: 'Japan',
                value: 'japan'
            }
        ]
    }
]

interface QUEUE {
    map: string
    name: string
    description: string
}

interface QUEUES {
    [key: number]: QUEUE
}

export const QUEUES: QUEUES = {
    0: {
        map: 'Custom games',
        name: 'Custom game',
        description: ''
    },
    400: {
        map: "Summoner's Rift",
        name: 'Normal',
        description: '5v5 Draft Pick games'
    },
    420: {
        map: "Summoner's Rift",
        name: 'Ranked Solo',
        description: '5v5 Ranked Solo games'
    },
    430: {
        map: "Summoner's Rift",
        name: 'Blind Pick',
        description: '5v5 Blind Pick games'
    },
    440: {
        map: "Summoner's Rift",
        name: 'Ranked Flex',
        description: '5v5 Ranked Flex games'
    },
    700: {
        map: "Summoner's Rift",
        name: 'Clash',
        description: "Summoner's Rift Clash games"
    },
    830: {
        map: "Summoner's Rift",
        name: 'Co-op vs. AI Intro',
        description: 'Co-op vs. AI Intro Bot games'
    },
    840: {
        map: "Summoner's Rift",
        name: 'Co-op vs. AI Beginner',
        description: 'Co-op vs. AI Beginner Bot games'
    },
    850: {
        map: "Summoner's Rift",
        name: 'Co-op vs. AI Intermediate',
        description: 'Co-op vs. AI Intermediate Bot games'
    },
    900: {
        map: "Summoner's Rift",
        name: 'ARURF',
        description: 'ARURF games'
    },
    1020: {
        map: "Summoner's Rift",
        name: 'One for All',
        description: 'One for All games'
    },
    1300: {
        map: 'Nexus Blitz',
        name: 'Nexus Blitz',
        description: 'Nexus Blitz games'
    },
    1400: {
        map: "Summoner's Rift",
        name: 'Ultimate Spellbook',
        description: 'Ultimate Spellbook games'
    },
    1900: {
        map: "Summoner's Rift",
        name: 'URF',
        description: 'Pick URF games'
    }
}
