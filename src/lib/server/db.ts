import type { PlatformType } from '$lib/types/routings'

import { sql } from 'kysely'
import { jsonArrayFrom } from 'kysely/helpers/mysql'
import type { IMatch, ISummonerInfo, ISummonerLeague } from 'riot-api-types'

import { db } from '$lib/db'
import { lolApi } from '$lib/server/lolApi'
import { Platforms, Regions } from '$lib/utils/routings'

export async function getMatchesFromDB(puuid: string, take: number = 20, skip: number = 0) {
	const matchList = await db
		.selectFrom('Match')
		.selectAll('Match')
		.select((eb) => [
			jsonArrayFrom(
				eb
					.selectFrom('MatchParticipant')
					.select([
						'assists',
						'baronKills',
						'champExperience',
						'champLevel',
						'championId',
						'championName',
						'controlWardsPlaced',
						'damageDealtToBuildings',
						'damageDealtToObjectives',
						'damageDealtToTurrets',
						'damageSelfMitigated',
						'deaths',
						'doubleKills',
						'dragonKills',
						'firstBloodAssist',
						'firstBloodKill',
						'firstTowerAssist',
						'firstTowerKill',
						'gameEndedInEarlySurrender',
						'gameEndedInSurrender',
						'goldEarned',
						'goldSpent',
						'induvidualPosition',
						'inhibitorKills',
						'inhibitorTakedowns',
						'inhibitorsLost',
						'item0',
						'item1',
						'item2',
						'item3',
						'item4',
						'item5',
						'item6',
						'itemsPurchased',
						'killingSprees',
						'kills',
						'lane',
						'largestKillingSpree',
						'largestMultiKill',
						'longestTimeSpentLiving',
						'magicDamageDealt',
						'magicDamageDealtToChampions',
						'magicDamageTaken',
						'neutralMinionsKilled',
						'objectivesStolen',
						'objectivesStolenAssists',
						'participantId',
						'pentaKills',
						'perkDefense',
						'perkFlex',
						'perkOffense',
						'perkPrimaryStyle',
						'perkPrimary1',
						'perkPrimary2',
						'perkPrimary3',
						'perkPrimary4',
						'perkSecondaryStyle',
						'perkSecondary1',
						'perkSecondary2',
						'physicalDamageDealt',
						'physicalDamageDealtToChampions',
						'physicalDamageTaken',
						'puuid',
						'quadraKills',
						'role',
						'sightWardsBoughtInGame',
						'spell1Casts',
						'spell2Casts',
						'spell3Casts',
						'spell4Casts',
						'summoner1Casts',
						'summoner1Id',
						'summoner2Casts',
						'summoner2Id',
						'summonerName',
						'teamId',
						'teamPosition',
						'timeCCingOthers',
						'timePlayed',
						'totalDamageDealt',
						'totalDamageDealtToChampions',
						'totalDamageTaken',
						'totalHeal',
						'totalHealsOnTeammates',
						'totalMinionsKilled',
						'totalTimeCCDealt',
						'totalTimeSpentDead',
						'totalUnitsHealed',
						'tripleKills',
						'trueDamageDealt',
						'trueDamageDealtToChampions',
						'trueDamageTaken',
						'turretKills',
						'turretTakedowns',
						'turretsLost',
						'unrealKills',
						'visionScore',
						'visionWardsBoughtInGame',
						'wardsKilled',
						'wardsPlaced',
						'win'
					])
					.whereRef('MatchParticipant.matchId', '=', 'Match.matchId')
			).as('MatchParticipants')
		])
		.where(
			'Match.matchId',
			'in',
			db
				.selectFrom('MatchParticipant')
				.select('MatchParticipant.matchId')
				.where('MatchParticipant.puuid', '=', puuid)
		)
		.orderBy('Match.matchId', 'desc')
		.limit(take)
		.offset(skip)
		.execute()

	if (matchList.length > 0) return matchList
}

export async function updateMatchesInDB(
	puuid: string,
	platform: PlatformType,
	take: number = 20,
	skip: number = 0
) {
	try {
		const matchIdList: string[] = await lolApi(
			`https://${Regions[platform]}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${skip}&count=${take}`
		).then((res) => {
			if (res.status !== 200) throw new Error(`${res.statusText}, ${res.status}`)

			return res.json()
		})

		const dbMatchIdList = await db
			.selectFrom('Match')
			.select('matchId')
			.where('matchId', 'in', matchIdList)
			.limit(take)
			.execute()

		const missingMatchIdList = matchIdList.filter(
			(matchId) => !dbMatchIdList.some((obj) => obj.matchId === matchId)
		)

		const missingMatchDataListPromise = missingMatchIdList.map(async (matchId) => {
			const matchData: IMatch = await lolApi(
				`https://${Regions[platform]}/lol/match/v5/matches/${matchId}`
			).then((res) => {
				if (res.status !== 200) throw new Error(`${res.statusText}, ${res.status}`)

				return res.json()
			})

			return matchData
		})

		const missingMatchDataList = await Promise.all(missingMatchDataListPromise)

		const matchDataList = missingMatchDataList.map((missingMatchData) => ({
			matchId: missingMatchData.metadata.matchId,
			createdAt: new Date(),
			gameCreation: new Date(missingMatchData.info.gameCreation),
			gameDuration: missingMatchData.info.gameDuration,
			gameEndTimestamp: new Date(missingMatchData.info.gameEndTimestamp),
			gameId: String(missingMatchData.info.gameId),
			gameMode: missingMatchData.info.gameMode,
			gameStartTimestamp: new Date(missingMatchData.info.gameStartTimestamp),
			gameType: missingMatchData.info.gameType,
			gameVersion: missingMatchData.info.gameVersion.split('.').slice(0, 2).join('.'),
			mapId: missingMatchData.info.mapId,
			platform: platform,
			queueId: missingMatchData.info.queueId,
			blueBaronKills: missingMatchData.info.teams[0].objectives.baron.kills,
			blueChampionKills: missingMatchData.info.teams[0].objectives.champion.kills,
			blueDragonKills: missingMatchData.info.teams[0].objectives.dragon.kills,
			blueInhibitorKills: missingMatchData.info.teams[0].objectives.inhibitor.kills,
			blueRiftHeraldKills: missingMatchData.info.teams[0].objectives.riftHerald.kills,
			blueTowerKills: missingMatchData.info.teams[0].objectives.tower.kills,
			redBaronKills: missingMatchData.info.teams[1].objectives.baron.kills,
			redChampionKills: missingMatchData.info.teams[1].objectives.champion.kills,
			redDragonKills: missingMatchData.info.teams[1].objectives.dragon.kills,
			redInhibitorKills: missingMatchData.info.teams[1].objectives.inhibitor.kills,
			redRiftHeraldKills: missingMatchData.info.teams[1].objectives.riftHerald.kills,
			redTowerKills: missingMatchData.info.teams[1].objectives.tower.kills,
			blueFirstBaronKill: missingMatchData.info.teams[0].objectives.baron.first ? 1 : 0,
			blueFirstChampionKill: missingMatchData.info.teams[0].objectives.champion.first ? 1 : 0,
			blueFirstDragonKill: missingMatchData.info.teams[0].objectives.dragon.first ? 1 : 0,
			blueFirstInhibitorKill: missingMatchData.info.teams[0].objectives.inhibitor.first ? 1 : 0,
			blueFirstRiftHeraldKill: missingMatchData.info.teams[0].objectives.riftHerald.first ? 1 : 0,
			blueFirstTowerKill: missingMatchData.info.teams[0].objectives.tower.first ? 1 : 0,
			blueWon: missingMatchData.info.teams[0].win ? 1 : 0
		}))

		const matchParticipantDataList = missingMatchDataList
			.map((missingMatchData) =>
				missingMatchData.info.participants.map((participant) => ({
					matchId: missingMatchData.metadata.matchId,
					assists: participant.assists,
					baronKills: participant.baronKills,
					champExperience: participant.champExperience,
					champLevel: participant.champLevel,
					championId: participant.championId,
					championName: participant.championName,
					controlWardsPlaced: participant.detectorWardsPlaced,
					damageDealtToBuildings: participant.damageDealtToBuildings,
					damageDealtToObjectives: participant.damageDealtToObjectives,
					damageDealtToTurrets: participant.damageDealtToTurrets,
					damageSelfMitigated: participant.damageSelfMitigated,
					deaths: participant.deaths,
					doubleKills: participant.doubleKills,
					dragonKills: participant.dragonKills,
					firstBloodAssist: participant.firstBloodAssist ? 1 : 0,
					firstBloodKill: participant.firstBloodKill ? 1 : 0,
					firstTowerAssist: participant.firstTowerAssist ? 1 : 0,
					firstTowerKill: participant.firstTowerKill ? 1 : 0,
					gameEndedInEarlySurrender: participant.gameEndedInEarlySurrender ? 1 : 0,
					gameEndedInSurrender: participant.gameEndedInSurrender ? 1 : 0,
					goldEarned: participant.goldEarned,
					goldSpent: participant.goldSpent,
					induvidualPosition: participant.individualPosition,
					inhibitorKills: participant.inhibitorKills,
					inhibitorTakedowns: participant.inhibitorTakedowns,
					inhibitorsLost: participant.inhibitorsLost,
					item0: participant.item0,
					item1: participant.item1,
					item2: participant.item2,
					item3: participant.item3,
					item4: participant.item4,
					item5: participant.item5,
					item6: participant.item6,
					itemsPurchased: participant.itemsPurchased,
					killingSprees: participant.killingSprees,
					kills: participant.kills,
					lane: participant.lane,
					largestKillingSpree: participant.largestKillingSpree,
					largestMultiKill: participant.largestMultiKill,
					longestTimeSpentLiving: participant.longestTimeSpentLiving,
					magicDamageDealt: participant.magicDamageDealt,
					magicDamageDealtToChampions: participant.magicDamageDealtToChampions,
					magicDamageTaken: participant.magicDamageTaken,
					neutralMinionsKilled: participant.neutralMinionsKilled,
					objectivesStolen: participant.objectivesStolen,
					objectivesStolenAssists: participant.objectivesStolenAssists,
					participantId: participant.participantId,
					pentaKills: participant.pentaKills,
					perkDefense: participant.perks.statPerks.defense,
					perkFlex: participant.perks.statPerks.flex,
					perkOffense: participant.perks.statPerks.offense,
					perkPrimaryStyle: participant.perks.styles[0].style,
					perkPrimary1: participant.perks.styles[0].selections[0].perk,
					perkPrimary2: participant.perks.styles[0].selections[1].perk,
					perkPrimary3: participant.perks.styles[0].selections[2].perk,
					perkPrimary4: participant.perks.styles[0].selections[3].perk,
					perkSecondaryStyle: participant.perks.styles[1].style,
					perkSecondary1: participant.perks.styles[1].selections[0].perk,
					perkSecondary2: participant.perks.styles[1].selections[1].perk,
					physicalDamageDealt: participant.physicalDamageDealt,
					physicalDamageDealtToChampions: participant.physicalDamageDealtToChampions,
					physicalDamageTaken: participant.physicalDamageTaken,
					puuid: participant.puuid,
					quadraKills: participant.quadraKills,
					role: participant.role,
					sightWardsBoughtInGame: participant.sightWardsBoughtInGame,
					spell1Casts: participant.spell1Casts,
					spell2Casts: participant.spell2Casts,
					spell3Casts: participant.spell3Casts,
					spell4Casts: participant.spell4Casts,
					summoner1Casts: participant.summoner1Casts,
					summoner1Id: participant.summoner1Id,
					summoner2Casts: participant.summoner2Casts,
					summoner2Id: participant.summoner2Id,
					summonerName: participant.summonerName,
					teamId: participant.teamId,
					teamPosition: participant.teamPosition,
					timeCCingOthers: participant.timeCCingOthers,
					timePlayed: participant.timePlayed,
					totalDamageDealt: participant.totalDamageDealt,
					totalDamageDealtToChampions: participant.totalDamageDealtToChampions,
					totalDamageTaken: participant.totalDamageTaken,
					totalHeal: participant.totalHeal,
					totalHealsOnTeammates: participant.totalHealsOnTeammates,
					totalMinionsKilled: participant.totalMinionsKilled,
					totalTimeCCDealt: participant.totalTimeCCDealt,
					totalTimeSpentDead: participant.totalTimeSpentDead,
					totalUnitsHealed: participant.totalUnitsHealed,
					tripleKills: participant.tripleKills,
					trueDamageDealt: participant.trueDamageDealt,
					trueDamageDealtToChampions: participant.trueDamageDealtToChampions,
					trueDamageTaken: participant.trueDamageTaken,
					turretKills: participant.turretKills,
					turretTakedowns: participant.turretTakedowns,
					turretsLost: participant.turretsLost,
					unrealKills: participant.unrealKills,
					visionScore: participant.visionScore,
					visionWardsBoughtInGame: participant.visionWardsBoughtInGame,
					wardsKilled: participant.wardsKilled,
					wardsPlaced: participant.wardsPlaced,
					win: participant.win ? 1 : 0
				}))
			)
			.flat()

		if (matchDataList.length > 0) {
			const matchDataRes = await db.insertInto('Match').values(matchDataList).execute()
			if (matchDataRes.length === 0) throw { status: 500 }
		}
		if (matchParticipantDataList.length > 0) {
			const matchParticipantDataRes = await db
				.insertInto('MatchParticipant')
				.values(matchParticipantDataList)
				.execute()
			if (matchParticipantDataRes.length === 0) throw { status: 500 }
		}

		return true
	} catch (err: any) {
		// console.log(err)
		return false
	}
}

export async function getProfileFromDB(summoner: string, platform: PlatformType) {
	const profile = await db
		.selectFrom('SummonerProfile')
		.selectAll()
		.where('SummonerProfile.summonerName', '=', summoner)
		.where('SummonerProfile.platform', '=', platform)
		.executeTakeFirst()

	if (profile) return profile
}

export async function updateProfileInDB(summoner: string, platform: PlatformType) {
	try {
		const data: ISummonerInfo = await lolApi(
			`https://${Platforms[platform]}/lol/summoner/v4/summoners/by-name/${summoner}`
		).then((res) => {
			if (res.status !== 200) throw new Error(`${res.statusText}, ${res.status}`)

			return res.json()
		})

		await db
			.insertInto('SummonerProfile')
			.values({
				createdAt: new Date(),
				updatedAt: new Date(),
				platform: platform,
				summonerName: data.name,
				summonerLevel: data.summonerLevel,
				profileIconId: data.profileIconId,
				summonerId: data.id,
				accountId: data.accountId,
				puuid: data.puuid
			})
			.onDuplicateKeyUpdate({
				updatedAt: new Date(),
				platform: platform,
				summonerName: data.name,
				summonerLevel: data.summonerLevel,
				profileIconId: data.profileIconId,
				summonerId: data.id,
				accountId: data.accountId,
				puuid: data.puuid
			})
			.execute()

		return true
	} catch (err: any) {
		// console.log(err)
		return false
	}
}

export async function getRankedStatsFromDB(summonerId: string, platform: PlatformType) {
	const rankedStats = await db
		.selectFrom('SummonerRankedStats')
		.selectAll()
		.where('SummonerRankedStats.summonerId', '=', summonerId)
		.where('SummonerRankedStats.platform', '=', platform)
		.orderBy('SummonerRankedStats.queueType', 'desc')
		.execute()

	if (rankedStats.length > 0) return rankedStats
}

export async function updateRankedStatsInDB(summonerId: string, platform: PlatformType) {
	try {
		const res: ISummonerLeague[] = await lolApi(
			`https://${Platforms[platform]}/lol/league/v4/entries/by-summoner/${summonerId}`
		).then((res) => {
			if (res.status !== 200) throw new Error(`${res.statusText}, ${res.status}`)

			return res.json()
		})

		const rankedStatsData = res.map((data) => {
			if (data.miniSeries)
				return {
					summonerId: data.summonerId,
					platform: platform,
					leagueId: data.leagueId,
					queueType: data.queueType,
					tier: data.tier,
					rank: data.rank,
					lp: data.leaguePoints,
					wins: data.wins,
					losses: data.losses,
					veteran: data.veteran ? 1 : 0,
					inactive: data.inactive ? 1 : 0,
					freshBlood: data.freshBlood ? 1 : 0,
					hotStreak: data.hotStreak ? 1 : 0,
					promosTarget: data.miniSeries.target,
					promosWins: data.miniSeries.wins,
					promosLosses: data.miniSeries.losses,
					promosProgress: data.miniSeries.progress
				}

			return {
				summonerId: data.summonerId,
				platform: platform,
				leagueId: data.leagueId,
				queueType: data.queueType,
				tier: data.tier,
				rank: data.rank,
				lp: data.leaguePoints,
				wins: data.wins,
				losses: data.losses,
				veteran: data.veteran ? 1 : 0,
				inactive: data.inactive ? 1 : 0,
				freshBlood: data.freshBlood ? 1 : 0,
				hotStreak: data.hotStreak ? 1 : 0
			}
		})

		if (rankedStatsData === undefined || rankedStatsData.length === 0) return false

		await db
			.insertInto('SummonerRankedStats')
			.values(rankedStatsData)
			.onDuplicateKeyUpdate({
				summonerId: sql`VALUES(summonerId)`,
				platform: sql`VALUES(platform)`,
				leagueId: sql`VALUES(leagueId)`,
				queueType: sql`VALUES(queueType)`,
				tier: sql`VALUES(tier)`,
				rank: sql`VALUES(\`rank\`)`,
				lp: sql`VALUES(lp)`,
				wins: sql`VALUES(wins)`,
				losses: sql`VALUES(losses)`,
				veteran: sql`VALUES(veteran)`,
				inactive: sql`VALUES(inactive)`,
				freshBlood: sql`VALUES(freshBlood)`,
				hotStreak: sql`VALUES(hotStreak)`
			})
			.execute()

		return true
	} catch (err: any) {
		// console.log(err)
		return false
	}
}
