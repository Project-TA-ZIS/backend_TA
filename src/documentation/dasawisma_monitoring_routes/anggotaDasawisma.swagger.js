/**
 * @openapi
 * /dasawisma/get/getAllAnggota:
 *   get:
 *     tags: [Dasawisma]
 *     summary: Get all anggota dasawisma
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List anggota
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Dasawisma'
 */

/**
 * @openapi
 * /dasawisma/get/getAnggota/{id}:
 *   get:
 *     tags: [Dasawisma]
 *     summary: Get anggota dasawisma by id
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
 *         description: Anggota detail
 */

/**
 * @openapi
 * /dasawisma/post/createAnggota:
 *   post:
 *     tags: [Dasawisma]
 *     summary: "Create anggota/koordinator dasawisma (role: koordinator dasawisma)"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nama_lengkap, email, password, roles]
 *             properties:
 *               nama_lengkap:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roles:
 *                 type: string
 *                 example: "anggota dasawisma"
 *     responses:
 *       200:
 *         description: Created
 */

/**
 * @openapi
 * /dasawisma/delete/deleteAnggota/{id}:
 *   delete:
 *     tags: [Dasawisma]
 *     summary: "Delete anggota dasawisma (role: koordinator dasawisma)"
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
 * /dasawisma/update/updateAnggota/{id}:
 *   put:
 *     tags: [Dasawisma]
 *     summary: Update anggota dasawisma
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
 *             $ref: '#/components/schemas/Dasawisma'
 *     responses:
 *       200:
 *         description: Updated
 */
