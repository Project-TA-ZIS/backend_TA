/**
 * @openapi
 * /totalKasDasawisma/get/getTotalKasDasawisma:
 *   get:
 *     tags: [Total Kas Dasawisma]
 *     summary: Get total kas dasawisma
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total kas dasawisma
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/TotalKasDasawisma'
 *       403:
 *         description: Forbidden (role not allowed)
 *       404:
 *         description: Total kas dasawisma not found
 */
