import * as util from './util.js'

export default function draw(bytes, generator) {
    const pageCanvas = document.getElementById("canvas");
    const pageCtx = pageCanvas.getContext("2d");

    pageCtx.fillStyle = generator.backgroundColor || "#FFFFFF";
    pageCtx.fillRect(0, 0, canvas.width, canvas.height);

    if (bytes) {
        const layers = generator.getLayers(bytes.length * 8);
        const radius = util.arcRadius(Math.max(layers, 5)) + util.config.arcWidth / 2;

        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = radius * 2 + util.config.arcWidth * 4;

        const ctx = canvas.getContext("2d");

        ctx.fillStyle = generator.backgroundColor || "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.moveTo(0, 0);

        ctx.lineWidth = util.config.arcWidth;
        ctx.fillStyle = ctx.strokeStyle = "#000000";

        generator.generate(bytes, canvas, ctx);

        pageCtx.drawImage(canvas, 0, 0, pageCanvas.width, pageCanvas.height);

        pageCtx.beginPath();
        const anchorOffset = 50;
        const anchorLength = 100;
        pageCtx.lineTo(anchorOffset, anchorOffset);
        pageCtx.lineTo(anchorOffset + anchorLength, anchorOffset);
        pageCtx.lineTo(anchorOffset, anchorOffset + anchorLength);
        pageCtx.fillStyle = generator.foregroundTextColor || "#000000";
        pageCtx.fill();

        pageCtx.fillStyle = generator.foregroundTextColor || "#000000";
        const length = bytes.length;
        pageCtx.fillText(bytes.length === 1 ? "1 byte" : `${length} bytes`, 5, pageCanvas.height - 5);
    } else {

        pageCtx.fillStyle = generator.foregroundTextColor || "#000000";
        pageCtx.fillText(`0 bytes`, 5, pageCanvas.height - 5);
    }
}