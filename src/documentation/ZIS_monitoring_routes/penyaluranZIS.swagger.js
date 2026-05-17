/**
 * @openapi
 * /pengeluaranZIS/get/getAllPengeluaranZIS:
 *   get:
 *     tags: [Pengeluaran ZIS]
 *     summary: Get all pengeluaran/penyaluran ZIS
 *     responses:
 *       200:
 *         description: List pengeluaran
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PengeluaranZIS'
 */

/**
 * @openapi
 * /pengeluaranZIS/get/getPengeluaranZISById/{id}:
 *   get:
 *     tags: [Pengeluaran ZIS]
 *     summary: Get pengeluaran ZIS by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail pengeluaran
 */

/**
 * @openapi
 * /pengeluaranZIS/add/addPengeluaranZIS:
 *   post:
 *     tags: [Pengeluaran ZIS]
 *     summary: "Add pengeluaran ZIS (role: amil zakat)"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PengeluaranZIS'
 *     responses:
 *       200:
 *         description: Added
 */

/**
 * @openapi
 * /pengeluaranZIS/update/updatePengeluaranZIS/{id}:
 *   put:
 *     tags: [Pengeluaran ZIS]
 *     summary: "Update pengeluaran ZIS (role: amil zakat)"
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
 *             $ref: '#/components/schemas/PengeluaranZIS'
 *     responses:
 *       200:
 *         description: Updated
 */
