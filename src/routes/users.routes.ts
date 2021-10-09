import {Router} from "express";
import multer from "multer";
import {ensureAuthenticated} from "@middlewares/ensureAuthenticated";
import uploadConfig from "@config/upload";
import CreateUserController from "@modules/accounts/useCases/createUser/CreateUserController";
import UpdateUserAvatarController from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRouter = Router();
const uploadAvatar = multer(uploadConfig.upload("./uploads/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.use(ensureAuthenticated);

usersRouter.post("/", createUserController.handle);
usersRouter.patch("/avatar", uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export default usersRouter;
