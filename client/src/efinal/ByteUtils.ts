function stringToUtf8ByteArray(a) {
    if(!(a&&(typeof a === "string"))){
        return new Uint8Array(0);
    }
    for (var b = [], c = 0, d = 0; d < a.length; d++) {
        var e = a.charCodeAt(d);
        128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (55296 == (e & 64512) && d + 1 < a.length && 56320 == (a.charCodeAt(d + 1) & 64512) ? (e = 65536 + ((e & 1023) << 10) + (a.charCodeAt(++d) & 1023), b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128) : b[c++] = e >> 12 | 224, b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128)
    }
    var buf = new Uint8Array(b.length);
    for (var i = 0; i < buf.length; i++) {
        buf[i] = b[i];

    }
    return buf;
}
function utf8ByteArrayToString (a) {
    for (var b = [], c = 0, d = 0; c < a.length;) {
        var e = a[c++];
        if (128 > e) b[d++] = String.fromCharCode(e); else if (191 < e && 224 > e) {
            var f = a[c++];
            b[d++] = String.fromCharCode((e & 31) << 6 | f & 63)
        } else if (239 < e && 365 > e) {
            var f = a[c++], g = a[c++], h = a[c++],e:any = ((e & 7) << 18 | (f & 63) << 12 | (g & 63) << 6 | h & 63) - 65536;
            b[d++] = String.fromCharCode(55296 + (e >> 10));
            b[d++] = String.fromCharCode(56320 + (e & 1023))
        } else f = a[c++], g = a[c++], b[d++] = String.fromCharCode((e & 15) << 12 | (f & 63) << 6 | g & 63)
    }
    return b.join("")
}
function str2u8array(str) {
    if(str==undefined||(typeof str !== "string")){
        return str;
    }
    var out = new Uint8Array(str.length*2);
    for(var i =0;i<str.length;i++){
        out[i*2] = str.charCodeAt(i)>>8;
        out[i*2+1] = str.charCodeAt(i);
    }
    return out;
}
function u8array2str(u8array) {
    var buf = new Uint16Array(u8array.length/2);
    for(var i =0;i<buf.length;i++){
        buf[i] = u8array[i*2]<<8|u8array[i*2+1];

    }
    return String.fromCharCode.apply(null, buf);

}
