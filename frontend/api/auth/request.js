import axios from 'axios';

const baseURL = '';

// TODO: Add aws lambda call
const request = axios.create({
	baseURL,
});

export default request;
