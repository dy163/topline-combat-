import '@/vendor/gt'

export default function (options) {
  return new Promise((resolve, reject) => {
    window.initGeetest(options, captchaObj => {
      resolve(captchaObj)
    })
  })
}

// const captchaObj = await initGeetest({
//     gt: data.gt,
//     challenge: data.challenge,
//     offline: !data.success,
//     new_captcha: data.new_captcha,
//     product: "bind"
// })
