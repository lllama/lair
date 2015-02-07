string2Hex = function (s) {
    var hex = '';
    for (var i = 0; i < s.length; i++) {
        hex += s.charCodeAt(i).toString(16);
    }
    return hex;
};
