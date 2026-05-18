/**
 * @openapi
 * /pemasukanDasawisma/get/getAllPemasukan:
 *   get:
 *     tags: [Pemasukan Dasawisma]
 *     summary: Get all pemasukan dasawisma
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List pemasukan dasawisma
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PemasukanDasawisma'
 *       403:
 *         description: Forbidden (role not allowed)
 *       404:
 *         description: No pemasukan dasawisma found
 */

/**
 * @openapi
 * /pemasukanDasawisma/get/getPemasukan/{id}:
 *   get:
 *     tags: [Pemasukan Dasawisma]
 *     summary: Get pemasukan dasawisma by id
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
 *         description: Pemasukan dasawisma detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/PemasukanDasawisma'
 *       403:
 *         description: Forbidden (role not allowed)
 *       404:
 *         description: Pemasukan dasawisma not found
 */

/**
 * @openapi
 * /pemasukanDasawisma/post/createPemasukan:
 *   post:
 *     tags: [Pemasukan Dasawisma]
 *     summary: "Add pemasukan dasawisma (role: koordinator/anggota dasawisma)"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [jumlah, tanggal_penghimpunan, anggota_dasawisma_id]
 *             properties:
 *               jumlah:
 *                 type: number
 *                 example: 10000
 *               deskripsi:
 *                 type: string
 *                 nullable: true
 *               tanggal_penghimpunan:
 *                 type: string
 *                 format: date
 *                 example: 2026-05-18
 *               anggota_dasawisma_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/PemasukanDasawisma'
 *       403:
 *         description: Forbidden (role not allowed)
 */

/**
 * @openapi
 * /pemasukanDasawisma/update/updatePemasukan/{id}:
 *   put:
 *     tags: [Pemasukan Dasawisma]
 *     summary: "Update pemasukan dasawisma (role: koordinator/anggota dasawisma)"
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
 *             type: object
 *             properties:
 *               jumlah:
 *                 type: number
 *                 example: 15000
 *               deskripsi:
 *                 type: string
 *                 nullable: true
 *               tanggal_penghimpunan:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *               anggota_dasawisma_id:
 *                 type: integer
 *                 nullable: true
 *               dasawisma_id:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/PemasukanDasawisma'
 *       403:
 *         description: Forbidden (role not allowed)
 *       404:
 *         description: Pemasukan dasawisma not found
 */
