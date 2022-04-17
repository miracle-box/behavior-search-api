import config from '../../../config/config.mjs';

/**
 * `POST` `/query` HTTP body schema
 */
const postRequestSchema = {
	/* eslint-disable camelcase */
	$schema: 'http://json-schema.org/draft-07/schema',
	type: 'object',
	dependencies: {
		'locations.subject.x': ['locations.subject.y', 'locations.subject.z'],
		'locations.subject.y': ['locations.subject.x', 'locations.subject.z'],
		'locations.subject.z': ['locations.subject.x', 'locations.subject.y'],
		'locations.object.x': ['locations.object.y', 'locations.object.z'],
	},
	required: ['@timestamp', 'subject', 'locations.subject.x', 'locations.subject.y', 'locations.subject.z'],
	allOf: [
		{
			additionalProperties: false,
			properties: {
				sort_index: {
					type: 'array',
					minItems: 1,
					maxItems: 1,
					uniqueItems: true,
					items: {type: 'integer'},
				},
				'@timestamp': {
					type: 'object',
					required: ['gte', 'lte'],
					additionalProperties: false,
					properties: {
						gte: {type: 'string', format: 'date-time'},
						lte: {type: 'string', format: 'date-time'},
					},
				},
				type: {
					type: 'array',
					minItems: 1,
					uniqueItems: true,
					items: {type: 'string'},
				},
				subject: {
					type: ['array', 'null'],
					oneOf: [
						{
							type: 'array',
							maxItems: config.searching.limits.subject.maxItems,
							minItems: config.searching.limits.subject.minItems,
							uniqueItems: true,
							items: {type: 'string'},
						},
						{type: 'null'},
					],
				},
				object: {
					type: ['array', 'null'],
					oneOf: [
						{
							type: 'array',
							maxItems: config.searching.limits.object.maxItems,
							minItems: config.searching.limits.object.minItems,
							uniqueItems: true,
							items: {type: 'string'},
						},
						{type: 'null'},
					],
				},
				dimension: {
					type: ['array', 'null'],
					oneOf: [
						{
							type: 'array',
							uniqueItems: true,
							items: {
								type: 'string',
								enum: ['Overworld', 'Nether', 'End'],
							},
						},
						{type: 'null'},
					],
				},
				'locations.subject.x': {},
				'locations.subject.y': {},
				'locations.subject.z': {},
				'locations.object.x': {},
				'locations.object.y': {},
				'locations.object.z': {},
			},
		},
		{
			anyOf: [
				{
					properties: {
						'locations.subject.x': {
							type: 'object',
							required: ['gte', 'lte'],
							additionalProperties: false,
							properties: {
								gte: {type: 'integer'},
								lte: {type: 'integer'},
							},
						},
						'locations.subject.y': {
							type: 'object',
							required: ['gte', 'lte'],
							additionalProperties: false,
							properties: {
								gte: {type: 'integer'},
								lte: {type: 'integer'},
							},
						},
						'locations.subject.z': {
							type: 'object',
							required: ['gte', 'lte'],
							additionalProperties: false,
							properties: {
								gte: {type: 'integer'},
								lte: {type: 'integer'},
							},
						},
					},
				},
				{
					properties: {
						'locations.subject.x': {type: 'null'},
						'locations.subject.y': {type: 'null'},
						'locations.subject.z': {type: 'null'},
					},
				},
			],
		},
		{
			anyOf: [
				{
					properties: {
						'locations.object.x': {
							type: 'object',
							required: ['gte', 'lte'],
							additionalProperties: false,
							properties: {
								gte: {type: 'integer'},
								lte: {type: 'integer'},
							},
						},
						'locations.object.y': {
							type: 'object',
							required: ['gte', 'lte'],
							additionalProperties: false,
							properties: {
								gte: {type: 'integer'},
								lte: {type: 'integer'},
							},
						},
						'locations.object.z': {
							type: 'object',
							required: ['gte', 'lte'],
							additionalProperties: false,
							properties: {
								gte: {type: 'integer'},
								lte: {type: 'integer'},
							},
						},
					},
				},
				{
					properties: {
						'locations.object.x': {type: 'null'},
						'locations.object.y': {type: 'null'},
						'locations.object.z': {type: 'null'},
					},
				},
			],
		},
		{
			not: {required: ['data']},
		},
	],
	/* eslint-enable camelcase */
};

export default postRequestSchema;
