// Settings
export const HEADER_DEFAULT = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const TIMEOUT = 60000

// HTTP Status
export const STT_OK = 200
export const STT_CREATED = 201
export const STT_NOT_MODIFIED = 304
export const STT_BAD_REQUEST = 400
export const STT_UNAUTHORIZED = 401
export const STT_FORBIDDEN = 403
export const STT_NOT_FOUND = 404
export const STT_INTERNAL_SERVER = 500

// Auth endpoint
export const GET_NONCE = '/auth/nonce'
export const POST_VERIFY = '/auth/verify'

// User endpoint
export const GET_USER = '/user'
export const PUT_NAME = '/user/update/name'
export const PUT_EMAIL = '/user/update/email'
export const POST_UPDATE_AVATAR = '/user/update/avatar'
export const PUT_REF_CODE = '/user/update/referral-code'
export const PUT_REFER_BY = '/user/update/referral-by-other'

export const GET_USER_JACKPOT_TRANSACTION = '/user/transaction'

// System endpoint
export const GET_SYSTEM_STATS = '/system/stats'
export const GET_SYSTEM_TOP_WEEK = '/system/top/week'

// Affiliate
export const GET_AFFILIATE_INFO = '/affiliate/info'
export const GET_AFFILIATE_CLAIM = '/affiliate/claim'

// Fairness
export const GET_FAIRNESS_JACKPOT = '/fairness/jackpot'
export const GET_FAIRNESS_JACKPOT_DETAIL = '/fairness/jackpot/transactions'
export const GET_FAIRNESS_COIN_FLIP = '/fairness/coinflip'
export const GET_FAIRNESS_COIN_FLIP_DETAIL = '/fairness/coinflip/transactions'

// Other variables
export const DEFAULT_PAGE_SIZE = 10

// PYTH services
export const GET_LATEST_PRICE = '/v2/updates/price/latest'
