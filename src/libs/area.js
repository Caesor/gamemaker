export function getImageData(imgData, width, height) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');

    if(typeof imgData === "object" && width && height) {
        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(imgData, 0, 0, width, height)

        return ctx.getImageData(0, 0, width, height).data;
    }
    return null;
}
export function getArea(data) {
    let sum = 0;
    for (let i = 0, len = data.length; i < len; i += 4) {
        const alpha = data[i + 3];
        if (alpha !== 0 || alpha === undefined) {
            sum++;
        }
    }
    return sum;
}

export function getAreaByUrl(url) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');
    
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            const width = canvas.width = this.width;
            const height = canvas.height = this.height;

            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(this, 0, 0, width, height)

            const data = ctx.getImageData(0, 0, width, height).data;

            let sum = 0;
            for (let i = 0, len = data.length; i < len; i += 4) {
                const alpha = data[i + 3];
                if (alpha !== 0 || alpha === undefined) {
                    sum++;
                }
            }
            resolve(sum);
        }
        img.onerror = function(e) {
            reject(e)
        }

        img.src = url;
    })

}