import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const heroImages = [
    {
        fileName: "leo-mobile.webp",
        widths: [640, 1280, 1920],
        quality: 92,
    },
    {
        fileName: "fondoDarumaHero.webp",
        widths: [768, 1024],
        quality: 98,
    },
    {
        fileName: "LeoPrincipal.webp",
        widths: [960],
        quality: 92,
    },
    {
        fileName: "LeonAntebrazo.webp",
        widths: [960],
        quality: 92,
    },
];

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

const publicDirectory = path.join(projectRoot, "public");

const outputDirectory = path.join(publicDirectory, "hero");

const formatKilobytes = (bytes) => `${Math.round(bytes / 1024)} KB`;

const generateVariant = async ({
    inputPath,
    outputPath,
    targetWidth,
    quality,
}) => {
    await sharp(inputPath)
        .rotate()
        .resize({
            width: targetWidth,
            fit: "inside",
            withoutEnlargement: true,
            kernel: sharp.kernel.lanczos3,
        })
        .webp({
            quality,
            effort: 6,
            smartSubsample: true,
        })
        .toFile(outputPath);
};

const generateHeroImages = async () => {
    await mkdir(outputDirectory, { recursive: true });

    console.log("Generando variantes optimizadas para el Hero.\n");

    for (const imageConfig of heroImages) {
        const { fileName, widths, quality } = imageConfig;

        const inputPath = path.join(publicDirectory, fileName);

        const extension = path.extname(fileName);
        const baseName = path.basename(fileName, extension);

        const sourceMetadata = await sharp(inputPath).metadata();
        const sourceStats = await stat(inputPath);

        console.log(
            [
                `\n${fileName}`,
                `${sourceMetadata.width}x${sourceMetadata.height}`,
                `Original: ${formatKilobytes(sourceStats.size)}`,
                `Calidad: ${quality}`,
            ].join(" | "),
        );

        for (const requestedWidth of widths) {
            const targetWidth = Math.min(requestedWidth, sourceMetadata.width);

            const outputFileName = `${baseName}-${targetWidth}.webp`;

            const outputPath = path.join(outputDirectory, outputFileName);

            await generateVariant({
                inputPath,
                outputPath,
                targetWidth,
                quality,
            });

            const outputMetadata = await sharp(outputPath).metadata();

            const outputStats = await stat(outputPath);

            const reduction = Math.round(
                (1 - outputStats.size / sourceStats.size) * 100,
            );

            console.log(
                [
                    `  ✓ ${outputMetadata.width}px`,
                    formatKilobytes(outputStats.size),
                    `${reduction}% menos`,
                ].join(" | "),
            );
        }
    }

    console.log(`\nVariantes generadas en: ${outputDirectory}`);
};

generateHeroImages().catch((error) => {
    console.error("\nNo se pudieron generar las imágenes del Hero.");
    console.error(error);
    process.exitCode = 1;
});
