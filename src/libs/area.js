export function getImageData(texture) {
    const { x, y, width, height } = texture.frame;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');
    
    const textureWidth = canvas.width = texture.width;
    const textureHeight = canvas.height = texture.height;

    ctx.clearRect(0, 0, textureWidth, textureHeight);
    ctx.drawImage(texture.baseTexture.resource.source, x || 0, y || 0, width, height, 0, 0, width, height);

    return ctx.getImageData(0, 0, textureWidth, textureHeight).data;
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