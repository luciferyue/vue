const crypto = require('crypto')
module.exports.createToken = token => {
    const ary = token.split('.')
    if (ary.length !== 3) {
        return
    }
    //暗号：贪心算法
    return {
        getExp: () => {
            const data = JSON.parse(Buffer.from(ary[1], 'base64').toString());
            return data.exp;
        },

        verify: key => {
            const hmac = crypto.createHmac('SHA256', key).update(ary[0] + '.' + ary[1]).digest('base64');
            return hmac === ary[2] + '='

        }
    }
}
