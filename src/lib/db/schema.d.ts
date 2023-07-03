import type { ColumnType, GeneratedAlways } from 'kysely'
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
	? ColumnType<S, I | undefined, U>
	: ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

export type Match = {
	matchId: string
	createdAt: Generated<Timestamp>
	gameCreation: Timestamp
	gameDuration: number
	gameEndTimestamp: Timestamp
	gameId: string
	gameMode: string
	gameStartTimestamp: Timestamp
	gameType: string
	gameVersion: string
	mapId: number
	platform: string
	queueId: number
	blueBaronKills: number
	blueChampionKills: number
	blueDragonKills: number
	blueInhibitorKills: number
	blueRiftHeraldKills: number
	blueTowerKills: number
	redBaronKills: number
	redChampionKills: number
	redDragonKills: number
	redInhibitorKills: number
	redRiftHeraldKills: number
	redTowerKills: number
	blueFirstBaronKill: number
	blueFirstChampionKill: number
	blueFirstDragonKill: number
	blueFirstInhibitorKill: number
	blueFirstRiftHeraldKill: number
	blueFirstTowerKill: number
	blueWon: number
}
export type MatchParticipant = {
	matchId: string
	assists: number
	baronKills: number
	champExperience: number
	champLevel: number
	championId: number
	championName: string
	controlWardsPlaced: number
	damageDealtToBuildings: number
	damageDealtToObjectives: number
	damageDealtToTurrets: number
	damageSelfMitigated: number
	deaths: number
	doubleKills: number
	dragonKills: number
	firstBloodAssist: number
	firstBloodKill: number
	firstTowerAssist: number
	firstTowerKill: number
	gameEndedInEarlySurrender: number
	gameEndedInSurrender: number
	goldEarned: number
	goldSpent: number
	induvidualPosition: string
	inhibitorKills: number
	inhibitorTakedowns: number
	inhibitorsLost: number
	item0: number
	item1: number
	item2: number
	item3: number
	item4: number
	item5: number
	item6: number
	itemsPurchased: number
	killingSprees: number
	kills: number
	lane: string
	largestKillingSpree: number
	largestMultiKill: number
	longestTimeSpentLiving: number
	magicDamageDealt: number
	magicDamageDealtToChampions: number
	magicDamageTaken: number
	neutralMinionsKilled: number
	objectivesStolen: number
	objectivesStolenAssists: number
	participantId: number
	pentaKills: number
	perkDefense: number
	perkFlex: number
	perkOffense: number
	perkPrimaryStyle: number
	perkPrimary1: number
	perkPrimary2: number
	perkPrimary3: number
	perkPrimary4: number
	perkSecondaryStyle: number
	perkSecondary1: number
	perkSecondary2: number
	physicalDamageDealt: number
	physicalDamageDealtToChampions: number
	physicalDamageTaken: number
	puuid: string
	quadraKills: number
	role: string
	sightWardsBoughtInGame: number
	spell1Casts: number
	spell2Casts: number
	spell3Casts: number
	spell4Casts: number
	summoner1Casts: number
	summoner1Id: number
	summoner2Casts: number
	summoner2Id: number
	summonerName: string
	teamId: number
	teamPosition: string
	timeCCingOthers: number
	timePlayed: number
	totalDamageDealt: number
	totalDamageDealtToChampions: number
	totalDamageTaken: number
	totalHeal: number
	totalHealsOnTeammates: number
	totalMinionsKilled: number
	totalTimeCCDealt: number
	totalTimeSpentDead: number
	totalUnitsHealed: number
	tripleKills: number
	trueDamageDealt: number
	trueDamageDealtToChampions: number
	trueDamageTaken: number
	turretKills: number
	turretTakedowns: number
	turretsLost: number
	unrealKills: number
	visionScore: number
	visionWardsBoughtInGame: number
	wardsKilled: number
	wardsPlaced: number
	win: number
}
export type SummonerProfile = {
	createdAt: Generated<Timestamp>
	updatedAt: Timestamp
	platform: string
	summonerName: string
	summonerLevel: number
	profileIconId: number
	summonerId: string
	accountId: string
	puuid: string
}
export type SummonerRankedStats = {
	summonerId: string
	platform: string
	leagueId: string
	queueType: string
	tier: string
	rank: string
	lp: number
	wins: number
	losses: number
	veteran: number
	inactive: number
	freshBlood: number
	hotStreak: number
	promosTarget: number | null
	promosWins: number | null
	promosLosses: number | null
	promosProgress: string | null
}
export type DB = {
	Match: Match
	MatchParticipant: MatchParticipant
	SummonerProfile: SummonerProfile
	SummonerRankedStats: SummonerRankedStats
}
