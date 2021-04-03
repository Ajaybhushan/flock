let BASE_SERVER_;
if (process.env.REACT_APP_ENV == 'prod') {
    BASE_SERVER_ = 'https://cbf-fmg.attentive.ai';
} else if (process.env.REACT_APP_ENV == 'stage') {
    BASE_SERVER_ = 'https://staging.cbf-fmg.attentive.ai';
} else {
    BASE_SERVER_ = 'https://staging.cbf-fmg.attentive.ai';
}
export const BASE_SERVER = 'https://4639c2417891.ngrok.io';
export const BASE_URL = BASE_SERVER + '/api/';
export const LOGIN = 'auth/login/';
export const LOGOUT = 'auth/logout/';
export const SOURCE_TYPE = 'source_type/';
export const BATCH_GET = 'batch/';
export const BATCH_ID = 'batch';
