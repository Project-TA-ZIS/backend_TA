/**
 * @openapi
 * /totalZIS/get/getTotalZISByKategori:
 *   get:
 *     tags: [Total ZIS]
 *     summary: Get total ZIS grouped by kategori
 *     responses:
 *       200:
 *         description: Totals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TotalKasZIS'
 */

/**
 * @openapi
 * /totalZIS/get/getTotalAllPemasukanZIS:
 *   get:
 *     tags: [Total ZIS]
 *     summary: Get total keseluruhan pemasukan ZIS
 *     responses:
 *       200:
 *         description: Total keseluruhan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/TotalKasZIS'
 */
