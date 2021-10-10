import {Router} from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import CreateUserController from "@modules/accounts/useCases/createUser/CreateUserController";
import UpdateUserAvatarController from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import {ensureAuthenticated} from "@middlewares/middlewares/ensureAuthenticated";

const usersRouter = Router();
const uploadAvatar = multer(uploadConfig.upload("./uploads/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.use(ensureAuthenticated);

usersRouter.post("/", createUserController.handle);
usersRouter.patch("/avatar", uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export default usersRouter;
