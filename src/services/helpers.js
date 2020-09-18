module.exports.generateRandom = () => {
    let random = Math.random();
    return Math.round(random * 1000000)
}
module.exports.generateAlphaNumeric = () => {
    let mask = '';
    let result = ''; let str;
    mask += 'abcdefghijklmnopqrstuvwxyz';
    for (var i = 50; i > 0; --i) {
        result += mask[Math.floor(Math.random() * mask.length)]
        if (result.length % 2 === 0) {
            str = String(Math.round(Math.random() * 10));
            result += str
        };
    };
    return result;
}