import axios from 'axios'

class Http {
  instance = null
  showLoading = false

  constructor(config) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? false
  }
}
