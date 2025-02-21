import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById as any);
router.post("/", userController.createUser as any);
router.put("/:id", userController.updateUser as any);
router.delete("/:id", userController.deleteUser as any);

export default router;
