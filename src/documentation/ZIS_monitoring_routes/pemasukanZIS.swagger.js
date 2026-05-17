/**
 * @openapi
 * /pemasukanZIS/get/getAllPemasukanZIS:
 *   get:
 *     tags: [Pemasukan ZIS]
 *     summary: Get all pemasukan ZIS
 *     responses:
 *       200:
 *         description: List pemasukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PemasukanZIS'
 */

/**
 * @openapi
 * /pemasukanZIS/get/getPemasukanZISById/{id}:
 *   get:
 *     tags: [Pemasukan ZIS]
 *     summary: Get pemasukan ZIS by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pemasukan detail
 */

/**
 * @openapi
 * /pemasukanZIS/get/getRiwayatPemasukanZISByNik:
 *   get:
 *     tags: [Pemasukan ZIS]
 *     summary: Get riwayat pemasukan ZIS by NIK + last 4 phone digits
 *     parameters:
 *       - in: query
 *         name: nik
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: last_phone_digits
 *         required: true
 *         schema:
 *           type: string
 *           example: "1234"
 *     responses:
 *       200:
 *         description: Riwayat ditemukan
 */

/**
 * @openapi
 * /pemasukanZIS/add/addPemasukanZIS:
 *   post:
 *     tags: [Pemasukan ZIS]
 *     summary: "Add pemasukan ZIS (role: amil zakat)"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PemasukanZIS'
 *     responses:
 *       200:
 *         description: Added
 */

/**
 * @openapi
 * /pemasukanZIS/update/updatePemasukanZIS/{id}:
 *   put:
 *     tags: [Pemasukan ZIS]
 *     summary: "Update pemasukan ZIS (role: amil zakat)"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PemasukanZIS'
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @openapi
 * /pemasukanZIS/delete/deletePemasukanZIS/{id}:
 *   delete:
 *     tags: [Pemasukan ZIS]
 *     summary: "Delete pemasukan ZIS (role: amil zakat)"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 */
