import {Client} from '@elastic/elasticsearch';

import config from '../../config/config.mjs';

const client = new Client(config.elastic.clientOptions);

export default client;
