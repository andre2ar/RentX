import ISpecificationsRepository, {ICreationSpecificationDTO} from "./ISpecificationsRepository";
import Specification from "../../models/Specification";

export default class SpecificationRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    create({name, description}: ICreationSpecificationDTO): Specification {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description
        })

        this.specifications.push(specification);

        return specification;
    }

    findByName(name: string): Specification {
        return this.specifications.find(specification => specification.name === name);
    }

}
