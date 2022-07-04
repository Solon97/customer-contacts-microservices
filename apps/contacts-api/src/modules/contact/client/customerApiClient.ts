import { BadRequestException, InternalServerErrorException } from '@nestjs/common'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { Customer } from '../../customer/entities/customer.entity'
import { CreateContactDto } from '../dto/create-contact.dto'
import { UpdateContactDto } from '../dto/update-contact.dto'

export class CustomerApiClient {
  constructor (private readonly customer: Customer) {
  }

  private async getAxiosInstance (accessToken?: string) {
    const requestConfig: AxiosRequestConfig = {
      baseURL: this.customer.api_address,
      timeout: 1000
    }

    if (accessToken) {
      requestConfig.headers = { Authorization: `Bearer ${accessToken}` }
    }

    return axios.create(requestConfig)
  }

  private async auth () {
    return (await this.getAxiosInstance()).post('auth', { token: this.customer.api_token })
  }

  async getClient (): Promise<AxiosInstance> {
    const { data } = await this.auth().catch(error => {
      this.handleError(error)
      return null
    })

    return this.getAxiosInstance(data.accessToken)
  }

  async sendPostRequest (endpoint: string, data: CreateContactDto) {
    const client = await this.getClient()
    return client.post(endpoint, data).then(response => response.data).catch(error => {
      this.handleError(error)
    })
  }

  async sendGetRequest (endpoint: string) {
    const client = await this.getClient()
    return client.get(endpoint).then(response => response.data).catch(error => {
      this.handleError(error)
    })
  }

  async sendPatchRequest (endpoint: string, data: UpdateContactDto) {
    const client = await this.getClient()
    return client.patch(endpoint, data).then(response => response.data).catch(error => {
      this.handleError(error)
    })
  }

  async sendDeleteRequest (endpoint: string) {
    const client = await this.getClient()
    return client.delete(endpoint).then(response => response.data).catch(error => {
      this.handleError(error)
    })
  }

  private handleError (error: any) {
    console.log(error)
    if (error.response.status >= 400 && error.response.status <= 500) {
      throw new BadRequestException(
        {
          message: error.message,
          request: {
            baseURL: error?.config?.baseURL,
            url: error?.config?.url,
            method: error?.config?.method,
            data: error?.config?.data
          }
        }
      )
    }

    throw new InternalServerErrorException(
      {
        message: error.message,
        request: {
          baseURL: error?.config?.baseURL,
          url: error?.config?.url,
          method: error?.config?.method,
          data: error?.config?.data
        }
      }
    )
  }
}
