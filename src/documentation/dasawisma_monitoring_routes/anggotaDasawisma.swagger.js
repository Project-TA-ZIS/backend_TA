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
 * /dasawisma/get/getAnggotaByRW:
 *   get:
 *     tags: [Dasawisma]
 *     summary: Get anggota dasawisma by RW dari token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List anggota pada RW user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Dasawisma'
 *       404:
 *         description: Tidak ada kader dasawisma ditemukan untuk RW ini
 */

/**
 * @openapi
 * /dasawisma/get/getPenanggungJawabByRW:
 *   get:
 *     tags: [Dasawisma]
 *     summary: Get penanggung jawab dasawisma by RW dari token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Penanggung jawab pada RW user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Dasawisma'
 *       404:
 *         description: Tidak ada penanggung jawab dasawisma ditemukan untuk RW ini
 */

/**
 * @openapi
 * /dasawisma/post/createAnggota:
 *   post:
 *     tags: [Dasawisma]
 *     summary: "Create anggota/penanggung jawab dasawisma (role: penanggung jawab dasawisma)"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nama_lengkap, email, password]
 *             properties:
 *               nama_lengkap:
 *                 type: string
 *               rw_id:
 *                 type: integer
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roles:
 *                 type: string
 *                 example: "kader dasawisma"
 *     responses:
 *       200:
 *         description: Created
 */

/**
 * @openapi
 * /dasawisma/delete/deleteAnggota/{id}:
 *   delete:
 *     tags: [Dasawisma]
 *     summary: "Delete anggota dasawisma (role: penanggung jawab dasawisma)"
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
 * /dasawisma/update/updateProfile/{id}:
 *   put:
 *     tags: [Dasawisma]
 *     summary: Update profile anggota dasawisma
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
 *               nik:
 *                 type: string
 *               roles:
 *                 type: string
 *               tempat_lahir:
 *                 type: string
 *               tanggal_lahir:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @openapi
 * /dasawisma/update/updateAnggotaByPJ/{id}:
 *   put:
 *     tags: [Dasawisma]
 *     summary: "Update anggota oleh penanggung jawab dasawisma"
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
 *               roles:
 *                 type: string
 *               rw_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated
 *       403:
 *         description: Hanya penanggung jawab dasawisma yang dapat mengupdate
 */

/**
 * @openapi
 * /dasawisma/update/updatePassword:
 *   put:
 *     tags: [Dasawisma]
 *     summary: Update password anggota dasawisma yang sedang login
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword]
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Password berhasil diupdate
 *       400:
 *         description: Password lama salah
 *       404:
 *         description: Anggota not found
 */
