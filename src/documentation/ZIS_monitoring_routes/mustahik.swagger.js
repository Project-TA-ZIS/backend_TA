/**
 * @openapi
 * /mustahik/get/getAllMustahik:
 *   get:
 *     tags: [Mustahik]
 *     summary: Get all mustahik
 *     responses:
 *       200:
 *         description: List mustahik
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Mustahik'
 */

/**
 * @openapi
 * /mustahik/get/getMustahik/{id}:
 *   get:
 *     tags: [Mustahik]
 *     summary: Get mustahik by id
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
 *         description: Mustahik detail
 */

/**
 * @openapi
 * /mustahik/post/createMustahik:
 *   post:
 *     tags: [Mustahik]
 *     summary: "Create mustahik (role: amil zakat)"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mustahik'
 *     responses:
 *       200:
 *         description: Created
 */

/**
 * @openapi
 * /mustahik/delete/deleteMustahik/{id}:
 *   delete:
 *     tags: [Mustahik]
 *     summary: "Delete mustahik (role: amil zakat)"
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

/**
 * @openapi
 * /mustahik/put/editMustahik/{id}:
 *   put:
 *     tags: [Mustahik]
 *     summary: "Update mustahik (role: amil zakat)"
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
 *             $ref: '#/components/schemas/Mustahik'
 *     responses:
 *       200:
 *         description: Updated
 */
