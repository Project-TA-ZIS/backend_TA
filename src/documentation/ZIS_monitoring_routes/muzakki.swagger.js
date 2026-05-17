/**
 * @openapi
 * /muzakki/get/getAllMuzakki:
 *   get:
 *     tags: [Muzakki]
 *     summary: Get all muzakki
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List muzakki
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Muzakki'
 */

/**
 * @openapi
 * /muzakki/get/getMuzakkiById/{id}:
 *   get:
 *     tags: [Muzakki]
 *     summary: Get muzakki by id
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
 *         description: Muzakki detail
 */

/**
 * @openapi
 * /muzakki/post/createMuzakki:
 *   post:
 *     tags: [Muzakki]
 *     summary: "Create muzakki (role: amil zakat)"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Muzakki'
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @openapi
 * /muzakki/delete/deleteMuzakki/{id}:
 *   delete:
 *     tags: [Muzakki]
 *     summary: Delete muzakki
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
 * /muzakki/put/editMuzakki/{id}:
 *   put:
 *     tags: [Muzakki]
 *     summary: Update muzakki
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
 *             $ref: '#/components/schemas/Muzakki'
 *     responses:
 *       200:
 *         description: Updated
 */
