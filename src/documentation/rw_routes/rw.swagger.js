/**
 * @openapi
 * /rw/get/getAllRW:
 *   get:
 *     tags: [RW]
 *     summary: Get all RW
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List RW
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RW'
 *       404:
 *         description: Tidak ada RW ditemukan
 */

/**
 * @openapi
 * /rw/get/getRWById/{id}:
 *   get:
 *     tags: [RW]
 *     summary: Get RW by id
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
 *         description: RW detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/RW'
 *       404:
 *         description: RW not found
 */

/**
 * @openapi
 * /rw/post/createRW:
 *   post:
 *     tags: [RW]
 *     summary: "Create RW (role: penanggung jawab dasawisma)"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nama_rw]
 *             properties:
 *               nama_rw:
 *                 type: string
 *                 example: RW 01
 *     responses:
 *       201:
 *         description: RW created successfully
 *       400:
 *         description: nama_rw wajib diisi
 *       403:
 *         description: Hanya penanggung jawab dasawisma yang dapat membuat RW
 */

/**
 * @openapi
 * /rw/delete/deleteRW/{id}:
 *   delete:
 *     tags: [RW]
 *     summary: "Delete RW (role: penanggung jawab dasawisma)"
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
 *         description: RW deleted successfully
 *       403:
 *         description: Hanya penanggung jawab dasawisma yang dapat menghapus RW
 *       404:
 *         description: RW not found
 */
