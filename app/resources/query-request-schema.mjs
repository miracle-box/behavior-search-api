import config from '../../config/config.mjs';

const queryRequestSchema = {
	/* eslint-disable camelcase */
	$schema: 'http://json-schema.org/draft-07/schema',
	$id: 'https://sagirii.me/behavior-logging/query/request/schema',
	type: 'object',
	required: ['timestamp', 'subject', 'locations.subject'],
	additionalProperties: false,
	properties: {
		sort_index: {
			type: 'integer',
		},
		timestamp: {
			type: 'object',
			required: ['since', 'until'],
			additionalProperties: false,
			properties: {
				since: {
					type: 'string',
					format: 'date-time',
				},
				until: {
					type: 'string',
					format: 'date-time',
				},
			},
		},
		type: {
			type: 'array',
			minItems: 1,
			uniqueItems: true,
			items: {
				type: 'string',
			},
		},
		subject: {
			type: ['array', 'null'],
			oneOf: [
				{
					type: 'array',
					maxItems: config.searching.limits.subject.maxItems,
					minItems: config.searching.limits.subject.minItems,
					uniqueItems: true,
					items: {
						type: 'string',
					},
				},
				{
					type: 'null',
				},
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
					items: {
						type: 'string',
					},
				},
				{
					type: 'null',
				},
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
				{
					type: 'null',
				},
			],
		},
		'locations.subject': {
			type: ['object', 'null'],
			oneOf: [
				{
					type: 'object',
					required: ['least', 'most'],
					additionalProperties: false,
					properties: {
						least: {
							type: 'object',
							required: ['x', 'y', 'z'],
							additionalProperties: false,
							properties: {
								x: {
									type: 'integer',
								},
								y: {
									type: 'integer',
								},
								z: {
									type: 'integer',
								},
							},
						},
						most: {
							type: 'object',
							required: ['x', 'y', 'z'],
							additionalProperties: false,
							properties: {
								x: {
									type: 'integer',
								},
								y: {
									type: 'integer',
								},
								z: {
									type: 'integer',
								},
							},
						},
					},
				},
				{
					type: 'null',
				},
			],
		},
		'locations.object': {
			type: ['object', 'null'],
			oneOf: [
				{
					type: 'object',
					required: ['least', 'most'],
					additionalProperties: false,
					properties: {
						least: {
							type: 'object',
							required: ['x', 'y', 'z'],
							additionalProperties: false,
							properties: {
								x: {
									type: 'integer',
								},
								y: {
									type: 'integer',
								},
								z: {
									type: 'integer',
								},
							},
						},
						most: {
							type: 'object',
							required: ['x', 'y', 'z'],
							additionalProperties: false,
							properties: {
								x: {
									type: 'integer',
								},
								y: {
									type: 'integer',
								},
								z: {
									type: 'integer',
								},
							},
						},
					},
				},
				{
					type: 'null',
				},
			],
		},
	},
	/* eslint-enable camelcase */
};

export default queryRequestSchema;
