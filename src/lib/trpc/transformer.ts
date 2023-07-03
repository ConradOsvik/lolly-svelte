import { stringify, parse, uneval } from 'devalue'

export const transformer = {
	input: {
		serialize: (object: unknown) => stringify(object),
		deserialize: (object: string) => parse(object)
	},
	output: {
		serialize: (object: unknown) => uneval(object),
		deserialize: (object: string) =>(0, eval)(`(${object})`)
	}
}
