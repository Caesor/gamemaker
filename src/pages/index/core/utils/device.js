export function getBrowser() {
	return navigator.userAgent.indexOf("Edge") > -1 ? "Edge" : navigator.userAgent.indexOf("Chrome") > -1 ? "Chrome" : navigator.userAgent.indexOf("Safari") > -1 ? "Safari" : "Other"
}
export function isSafari() {
	return "Safari" === getBrowser()
}

export function getSafariVersion() {
	if (!isSafari())
		return 0;
	var raw = navigator.userAgent.match(/Version\/([0-9]+)\./);
	return raw ? parseInt(raw[1], 10) : 0
}

export function getDeviceInfo() {
    let info = {};
    let defaultInfo = {
        devicePixelRatio: 2,
        windowWidth     : 375,
        windowHeight    : 667
    }

    if ( typeof wx !== 'undefined' ) {
        try {
            info = wx.getSystemInfoSync();
        } catch (e) {
            console.log(e);
            info = defaultInfo
        }
    } else {
        info = defaultInfo;
    }

    return info;
}

export const isMiniGame = typeof wx !== 'undefined';