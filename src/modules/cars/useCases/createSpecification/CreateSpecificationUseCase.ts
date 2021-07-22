import Specification from "../../entities/Specification";
import ISpecificationsRepository from "../../repositories/contracts/ISpecificationsRepository";

interface ICreateSpecification {
    name: string;
    description: string;
}

export class CreateSpecificationUseCase {
    constructor(
        private specificationRepository: ISpecificationsRepository
    ) {}

    execute({name, description}: ICreateSpecification): Specification {
        const specificationExists = this.specificationRepository.findByName(name);

        if(specificationExists) {
            throw new Error("Specification already exists");
        }

        return this.specificationRepository.create({
            name,
            description
        });
    }
}
