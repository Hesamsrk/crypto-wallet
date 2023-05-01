import {networkInterfaces} from "os";
import QRCode from "qrcode";


const nets = networkInterfaces();
const ips = Object.entries(nets).map(([key, list]) => list).flat(1).map(config => config?.address).filter(i => typeof i === "string") as string[]


interface QRCodeConfig {
    host: string
    authToken: string
}

export const printConfigToConsole = () => {
    const localIP = ips.find(ip => ip.startsWith("192."))
    const config = {
        IP_LIST: ips,
        LOCAL_IP: `http://${localIP || "localhost"}:${process.env.PORT || "3346"}/`,
        AUTH_TOKEN: process.env.AUTH_TOKEN || ""
    }
    console.log(JSON.stringify(config, undefined, " "))
    dataToQrCode<QRCodeConfig>({
        authToken: config.AUTH_TOKEN,
        host: config.LOCAL_IP
    }).then(qrcode => console.log(qrcode))
}


const dataToQrCode = async <T = {}>(data: T): Promise<string> => {
    let StringData = JSON.stringify(data)
    return new Promise((resolve, reject) => {
        QRCode.toString(StringData, {type: 'terminal', small: true},
            function (err, QRcode) {
                if (err) {
                    reject(err)
                }
                resolve(QRcode)
            })
    })
}
