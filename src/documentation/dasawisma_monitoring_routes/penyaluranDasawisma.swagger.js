/**
 * @openapi
 * /pengeluaranDasawisma/get/getAllPengeluaran:
 *   get:
 *     tags: [Pengeluaran Dasawisma]
 *     summary: Get all pengeluaran dasawisma
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List pengeluaran dasawisma
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PengeluaranDasawisma'
 *       403:
 *         description: Forbidden (role not allowed)
 *       404:
 *         description: Data pengeluaran Dasawisma tidak ditemukan
 */

/**
 * @openapi
 * /pengeluaranDasawisma/get/getPengeluaran/{id}:
 *   get:
 *     tags: [Pengeluaran Dasawisma]
 *     summary: Get pengeluaran dasawisma by id
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
 *         description: Pengeluaran dasawisma detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/PengeluaranDasawisma'
 *       403:
 *         description: Forbidden (role not allowed)
 *       404:
 *         description: Data pengeluaran Dasawisma tidak ditemukan
 */

/**
 * @openapi
 * /pengeluaranDasawisma/get/getPengeluaranByRW:
 *   get:
 *     tags: [Pengeluaran Dasawisma]
 *     summary: Get pengeluaran dasawisma by RW dari token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List pengeluaran dasawisma pada RW user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PengeluaranDasawisma'
 *       403:
 *         description: Forbidden (role not allowed)
 *       404:
 *         description: Data pengeluaran Dasawisma tidak ditemukan
 */

/**
 * @openapi
 * /pengeluaranDasawisma/post/createPengeluaran:
 *   post:
 *     tags: [Pengeluaran Dasawisma]
 *     summary: "Add pengeluaran dasawisma (role: penanggung jawab dasawisma)"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [deskripsi, jumlah, tanggal_penyaluran]
 *             properties:
 *               jumlah:
 *                 type: number
 *                 example: 10000
 *               deskripsi:
 *                 type: string
 *               tanggal_penyaluran:
 *                 type: string
 *                 format: date
 *                 example: 2026-05-18
 *               nama_anggota:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Created
 *       400:
 *         description: Validation error atau saldo tidak cukup
 *       403:
 *         description: Forbidden (role not allowed)
 */

/**
 * @openapi
 * /pengeluaranDasawisma/update/updatePengeluaran/{id}:
 *   put:
 *     tags: [Pengeluaran Dasawisma]
 *     summary: "Update pengeluaran dasawisma (role: penanggung jawab dasawisma)"
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
 *               tanggal_penyaluran:
 *                 type: string
 *                 format: date
 *               nama_anggota:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Validation error atau saldo tidak cukup
 *       403:
 *         description: Forbidden (role not allowed)
 *       404:
 *         description: Data pengeluaran Dasawisma tidak ditemukan
 */
