import { notification } from 'antd';

export default {
  success: (message, description) => {
    notification.success({
      message,
      description
    })
  },

  error: (message, description) =>  {
    notification.error({
      message,
      description
    })
  },

  warning: (message, description) => {
    notification.warning({
      message,
      description
    })
  },

  info: (message, description) => {
    notification.info({
      // className: 'ant-notification-warning',
      message,
      description
    })
  },

  errorCatch: (err, message, description) => {
    console.log(err)
    console.log(err.response)
    notification.error({
      message: err && err.response && err.response.data && err.response.data.msg ? err.response.data.msg : message,
      description: err && err.response && err.response.data && err.response.data.reason ? err.response.data.reason : description
    })
  },

  errorThen: (res, message, description) => {
    console.log(res)
    console.log(res.response)
    notification.error({
      message: res && res.data && res.data.msg ? res.data.msg : message,
      description: res && res.data && res.data.errors && res.data.errors.errMsg ? res.data.errors.errMsg : description
    })
  }
}
