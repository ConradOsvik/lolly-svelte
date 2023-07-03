import { RIOT_API_KEY } from '$env/static/private'

const maxConcurrentRequests = 20
const maxRequestsPerSecond = 20
const maxRequestsPerTwoMinutes = 100
let concurrentRequests = 0
let requestsLastSecond: number[] = []
let requestsLastTwoMinutes: number[] = []

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function lolApi(url: string): Promise<Response> {
	console.log(
		'fetching',
		'concurrent: ' + concurrentRequests,
		'rls: ' + requestsLastSecond.length,
		'rltm: ' + requestsLastTwoMinutes.length
	)

	while (
		concurrentRequests >= maxConcurrentRequests ||
		requestsLastSecond.length >= maxRequestsPerSecond ||
		requestsLastTwoMinutes.length >= maxRequestsPerTwoMinutes
	) {
		await sleep(100)
	}

	concurrentRequests++
	requestsLastSecond.push(Date.now())
	requestsLastTwoMinutes.push(Date.now())

	try {
		const res = await fetch(url, {
			headers: {
				'X-Riot-Token': RIOT_API_KEY
			}
		})
		const headers = res.headers

		if (res.status === 429) {
			console.log('Rate limited')
			const retryIn = headers.get('Retry-After')
			const rateLimitType = headers.get('X-Rate-Limit-Type')
			if (rateLimitType === 'application') {
				const rateLimit = headers.get('X-App-Rate-Limit')
				const rateLimitCount = headers.get('X-App-Rate-Limit-Count')

				console.log(
					'application',
					'Rate limit: ' + rateLimit,
					'Rate limit count: ' + rateLimitCount,
					'Retry in: ' + retryIn
				)

				return new Response('Rate limit exceeded', {
					status: 429
				})
			}
			if (rateLimitType === 'method') {
				const rateLimit = headers.get('X-Method-Rate-Limit')
				const rateLimitCount = headers.get('X-Method-Rate-Limit-Count')

				console.log(
					'method',
					'Rate limit: ' + rateLimit,
					'Rate limit count: ' + rateLimitCount,
					'Retry in: ' + retryIn
				)
			}

			await sleep(Number(retryIn) * 1000)

			return lolApi(url)
		}

		return res
	} finally {
		concurrentRequests--
		setTimeout(() => {
			requestsLastSecond.shift()
		}, 1000)
		setTimeout(() => {
			requestsLastTwoMinutes.shift()
		}, 120000)

		console.log(
			'finished',
			'concurrent: ' + concurrentRequests,
			'rls: ' + requestsLastSecond.length,
			'rltm: ' + requestsLastTwoMinutes.length
		)
	}
}
