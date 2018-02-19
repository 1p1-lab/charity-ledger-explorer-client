import axios from 'axios'
import _ from 'lodash'
import config from './../../env'

const API_BASE_URL = config.apiRoot

const _axios = axios.create({
  baseURL: API_BASE_URL
})

/***********************************************************************************************************************
 *  CORE METHODS
 ***********************************************************************************************************************/

const prepareQuery = function (params) {
  if (!params) return ''
  let s = []
  _.each(params, (value, key) => {
    if (value) {
      s.push(key + '=' + value)
    }
  })

  return s.length > 0 ? s.join('&') : ''
}

const findOneById = function (resource, id, params) {
  let url   = resource + '/' + id
  let query = prepareQuery(params)
  if (query) {
    url += '?' + query
  }

  return new Promise((resolve, reject) => {
    _axios.get(url)
      .then((response) => {
        resolve(response.data)
      })
      .catch((response) => {
        reject(response)
        //const errorMsg = _.get(response, 'response.data.error', 'Unexpected error')
        //reject(errorMsg)
      })
  })
}

const findMany = function (resource, params) {
  let url   = resource
  let query = prepareQuery(params)
  if (query) {
    url += '?' + query
  }

  return new Promise((resolve, reject) => {
    _axios.get(url)
      .then((response) => {
        resolve(response.data)
      })
      .catch((response) => {
        reject(response)
        //const errorMsg = _.get(response, 'response.data.error', 'Unexpected error')
        //reject(errorMsg)
      })
  })
}

const findAll = function (resource, params) {
  if (params) {
    params['limit'] = null
    params['skip']  = null
  }

  return findMany(resource, params)
}

/***********************************************************************************************************************
 *  FOUNDATION API
 ***********************************************************************************************************************/

export const foundationApi = {
  find: {
    one (id, params) {
      params = params || {}
      return findOneById('foundations', id, params)
    },
    all (params) {
      params = params || {}
      return findMany('foundations', params)
    },
    project: {
      one (foundation, project, params) {
        params = params || {}
        return findOneById('foundations', foundation + '/projects/' + project, params)
      }
    },
    program: {
      one (foundation, program, params) {
        params = params || {}
        return findOneById('foundations', foundation + '/programs/' + program, params)
      }
    },
    target: {
      one(foundation, target, params) {
        params = params || {}
        return findOneById('foundations', foundation + '/targets/' + target, params)
      }
    },
  }
}

/***********************************************************************************************************************
 *  PROGRAM API
 ***********************************************************************************************************************/

export const programApi = {
  find: {
    one (id) {
      return findOneById('programs', id, {include: ['foundation']})
    },
    all () {
      return findAll('programs', {include: ['foundation']})
    }
  }
}

/***********************************************************************************************************************
 *  COST API
 ***********************************************************************************************************************/

export const costApi = {
  find: {
    one (id) {
      return findOneById('costs', id)
    },
    all () {
      return findAll('costs')
    }
  }
}

/***********************************************************************************************************************
 *  EXPENSE API
 ***********************************************************************************************************************/

export const expenseApi = {
  find: {
    one (id) {
      return findOneById('expenses', id)
    },
    all (params) {
      return findAll('expenses', params)
    }
  }
}

/***********************************************************************************************************************
 *  DONATOR API
 ***********************************************************************************************************************/

export const donatorApi = {
  find: {
    one (id) {
      return findOneById('donators', id)
    },
    byEmail (email) {
      return new Promise((resolve, reject) => {
        _axios.post('/login', {email})
          .then((response) => {
            resolve(response.data)
          })
          .catch((exception) => {
            reject(exception.response)
          })
      })
    },
    all () {
      return findAll('donators')
    }
  }
}

/***********************************************************************************************************************
 *  DONATION API
 ***********************************************************************************************************************/

export const donationApi = {
  find: {
    one (id) {
      return findOneById('donations', id)
    },
    all (params) {
      return findMany('donations', params)
    }
  }
}
