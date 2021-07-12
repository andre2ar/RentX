import {Request, Response, Router} from "express";
import {createSpecificationController} from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.get('/', (request: Request, response: Response) => {

});

specificationsRoutes.post('/', (request: Request, response: Response) => {
    return createSpecificationController.handle(request, response);
});

export default specificationsRoutes;
