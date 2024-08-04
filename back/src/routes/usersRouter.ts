import express from "express";
import { authenticateToken, authorizeRole } from "../middlewares/auth";
import { getAllUsers, getUserById, registerUser, loginUser, blockUser, unblockUser, updateUser, updateUserPassword } from "../controllers/usersController";
import upload from "../config/multer";
import { updateProfilePictureService } from "../services/usersServices";


const router: express.Router = express.Router();

router.get("/", authenticateToken, authorizeRole(['admin']), getAllUsers); // Solo accesible por admins
router.get("/:id", authenticateToken, getUserById); // Accesible por cualquier usuario autenticado
router.post("/register", registerUser); // Público
router.post("/login", loginUser); // Público
router.post("/blocked/:id", authenticateToken, authorizeRole(['admin']), blockUser) // bloquear usuario por ID
router.post("/unblocked/:id", authenticateToken, authorizeRole(['admin']), unblockUser) // desbloquear usuario por ID
router.put("upload/:id", authenticateToken, updateUser); // Actualizar usuario
router.put("/upload/password/id", authenticateToken, updateUserPassword);
router.post("/upload-profile-picture/:id", authenticateToken, upload.single('profilePicture'), async (req, res) => {
    try {
        const userId = req?.user?.id; 
        const profilePicture = req.file?.path; 

        if (!profilePicture) {
            return res.status(400).json({ message: 'No se subió ninguna imagen' });
        }

        if (!userId) {
            return res.status(401).json({ message: 'No se encontro el usuario' });
        }

        const updatedUser = await updateProfilePictureService(userId, profilePicture);
        res.json({ message: 'Foto de perfil actualizada con éxito', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al subir la foto de perfil', error });
    }
});

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: string;
        };
    }
}
export default router;
