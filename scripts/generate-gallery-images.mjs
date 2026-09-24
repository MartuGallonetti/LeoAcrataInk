import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const TARGET_WIDTHS = [480, 960];
const WEBP_QUALITY = 92;

const galleryImages = [
    "leoGorra.webp",
    "conveVilla.webp",
    "diabloMonja.webp",
    "DragonPierna.webp",
    "espaldaCompleta.webp",
    "foxRiver.webp",
    "guerreAntebrzo.webp",
    "leoMonja.webp",
    "mangaMonja.webp",
    "tatuandoRemeNegra.webp",
    "Snoop.webp",
];

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

const publicDirectory = path.join(projectRoot, "public");

const outputDirectory = path.join(publicDirectory, "gallery");

const formatKilobytes = (bytes) => `${Math.round(bytes / 1024)} KB`;

const generateVariant = async ({ inputPath, outputPath, targetWidth }) => {
    await sharp(inputPath)
        .rotate()
        .resize({
            width: targetWidth,
            fit: "inside",
            withoutEnlargement: true,
            kernel: sharp.kernel.lanczos3,
        })
        .webp({
            quality: WEBP_QUALITY,
            effort: 6,
            smartSubsample: true,
        })
        .toFile(outputPath);
};

const generateGalleryImages = async () => {
    await mkdir(outputDirectory, { recursive: true });

    console.log(
        [
            "Generando variantes para el carrusel.",
            `Tamaños: ${TARGET_WIDTHS.join("px, ")}px.`,
            `Calidad WebP: ${WEBP_QUALITY}.`,
            "",
        ].join("\n"),
    );

    for (const fileName of galleryImages) {
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
            ].join(" | "),
        );

        for (const targetWidth of TARGET_WIDTHS) {
            const outputFileName = `${baseName}-${targetWidth}.webp`;

            const outputPath = path.join(outputDirectory, outputFileName);

            await generateVariant({
                inputPath,
                outputPath,
                targetWidth,
            });

            const outputStats = await stat(outputPath);

            const reduction = Math.round(
                (1 - outputStats.size / sourceStats.size) * 100,
            );

            console.log(
                [
                    `  ✓ ${targetWidth}px`,
                    formatKilobytes(outputStats.size),
                    `${reduction}% menos`,
                ].join(" | "),
            );
        }
    }

    console.log(`\nVariantes generadas en: ${outputDirectory}`);
};

generateGalleryImages().catch((error) => {
    console.error("\nNo se pudieron generar las imágenes.");
    console.error(error);
    process.exitCode = 1;
});
