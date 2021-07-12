import {Request, Response, Router} from "express";
import SpecificationRepository from "../modules/cars/repositories/specifications/SpecificationRepository";
import {CreateSpecificationService} from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();
const specificationRepository = new SpecificationRepository();

specificationsRoutes.get('/', (request: Request, response: Response) => {

});

specificationsRoutes.post('/', (request: Request, response: Response) => {
    const {name, description} = request.body;

    const createSpecificationService = new CreateSpecificationService(specificationRepository);

    const specification = createSpecificationService.execute({
        name,
        description
    });

    return response.status(201).json(specification);
});

export default specificationsRoutes;
