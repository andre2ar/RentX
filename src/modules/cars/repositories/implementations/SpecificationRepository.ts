import ISpecificationsRepository, {ICreationSpecificationDTO} from "../contracts/ISpecificationsRepository";
import Specification from "../../entities/Specification";
import {getRepository, Repository} from "typeorm";

export default class SpecificationRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({name, description}: ICreationSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            description,
            name
        });

        await this.repository.save(specification);

        return specification;
    }

    findByName(name: string): Promise<Specification> {
        return this.repository.findOne({
            name: name
        });
    }

}
