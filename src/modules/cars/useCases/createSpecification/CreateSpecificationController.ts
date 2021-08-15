import {Request, Response} from "express";
import {CreateSpecificationUseCase} from "./CreateSpecificationUseCase";
import {container} from "tsyringe";

export default class CreateSpecificationController {
    handle(request: Request, response: Response): Response {
        const {name, description} = request.body;

        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);
        const specification = createSpecificationUseCase.execute({
            name,
            description
        });

        return response.status(201).json(specification);
    }
}
