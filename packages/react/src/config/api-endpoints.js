const isDev = process.env.NODE_ENV === 'development';

const DATA_READER = `http://localhost:${isDev ? '1110' : '8080'}/reader/data`;
const IMAGE_MATCH = `http://localhost:${isDev ? '1111' : '8081'}/image/match`;

export { DATA_READER, IMAGE_MATCH };
