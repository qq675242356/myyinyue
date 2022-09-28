import config from "./config"

export default (url, data = {}, method = "GET") => {

    return new Promise((resolve, reject) => {
        wx.request({
            url: config.host + url,
            data,
            method,
            header: {
                cookie: 'MUSIC_U=96f9bfe1fd02498715159383ea19baef39675c2e3333a49d40b50c83c2815f89519e07624a9f005352a170ca28bd12429958f5a4e5e4215e3d32bafc53674035f9260416312838b6d4dbf082a8813684; Max-Age=1296000; Expires=Thu, 06 Oct 2022 13:38:43 GMT; Path=/; Domain=.music.163.com; HTTPOnly'
            },
            success: (res) => {
                // console.log(res)
                resolve(res.data)
            },
            fail: (err) => {
                console.log(err)
                reject(err)
            }
        })
    })
}

