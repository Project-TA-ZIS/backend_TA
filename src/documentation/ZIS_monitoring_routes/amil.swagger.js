/**
 * @openapi
 * /amil/get/getAllAmil:
 *   get:
 *     tags: [Amil]
 *     summary: Get all amil
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List amil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Amil'
 */

/**
 * @openapi
 * /amil/get/getAmil/{id}:
 *   get:
 *     tags: [Amil]
 *     summary: Get amil by id
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
 *         description: Amil detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Amil'
 */

/**
 * @openapi
 * /amil/post/createAmil:
 *   post:
 *     tags: [Amil]
 *     summary: "Create amil (role: koordinator dasawisma)"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nama_lengkap, email, nomor_telpon, alamat, password]
 *             properties:
 *               nama_lengkap:
 *                 type: string
 *               email:
 *                 type: string
 *               nomor_telpon:
 *                 type: string
 *               alamat:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Created
 */

/**
 * @openapi
 * /amil/delete/deleteAmil/{id}:
 *   delete:
 *     tags: [Amil]
 *     summary: "Delete amil (role: koordinator dasawisma)"
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
 * /amil/put/updateAmil/{id}:
 *   put:
 *     tags: [Amil]
 *     summary: Update amil
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
 *               nama_lengkap:
 *                 type: string
 *               email:
 *                 type: string
 *               nomor_telpon:
 *                 type: string
 *               alamat:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 */
