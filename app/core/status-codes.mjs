/**
 * List of application status codes.
 *
 * Use `createHttpException` to handle errors.
 */
const statusCodes = {
	4000: {
		message: 'Malformed request body.',
		description: '',
		code: 400,
	},
	4011: {
		message: 'Malformed JSON in request body.',
		description: '',
		code: 400,
	},
	4021: {
		message: 'Invalid time range.',
		description: 'End time should not earilier than start time.',
		code: 400,
	},
	4022: {
		message: 'Invalid time range.',
		description: 'End time should be X ms earlier than now: ',
		code: 400,
	},
	4023: {
		message: 'Invalid time range.',
		description: 'Start time should not be X ms earlier than now: ',
		code: 400,
	},
	4024: {
		message: 'Invalid time range.',
		description: 'Time range can not narrower than ',
		code: 400,
	},
	4031: {
		message: 'Invalid location range.',
		description: 'Too narrow: ',
		code: 400,
	},
	4032: {
		message: 'Invalid location range.',
		description: 'Too narrow: ',
		code: 400,
	},
	4033: {
		message: 'Invalid location range.',
		description: 'Too narrow: ',
		code: 400,
	},
	4034: {
		message: 'Invalid location range.',
		description: 'Too wide: ',
		code: 400,
	},
	4035: {
		message: 'Invalid location range.',
		description: 'Too wide: ',
		code: 400,
	},
	4036: {
		message: 'Invalid location range.',
		description: 'Too wide: ',
		code: 400,
	},
	5011: {
		message: 'Error constructing query DSL.',
		description: '',
		code: 500,
	},
	5021: {
		message: 'Error performing search request.',
		description: '',
		code: 500,
	},
	5031: {
		message: 'Error filtering query response.',
		description: '',
		code: 500,
	},
};

export default statusCodes;
