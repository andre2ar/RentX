import fs from 'fs';
import csvParse from 'csv-parse';
import CategoriesRepository from "../../repositories/implementations/CategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}

export default class ImportCategoryUseCase {
    constructor(
        private categoriesRepository: CategoriesRepository
    ) {}

    parseCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];
            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile.on('data', async (line) => {
                const [name, description] = line;
                categories.push({
                    name,
                    description
                })
            }).on('end', () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            }).on('error', (err) => {
                fs.promises.unlink(file.path);
                reject(err)
            });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.parseCategories(file);

        categories.forEach(category => {
            const {name, description} = category;
            const categoryExists = this.categoriesRepository.findByName(name);
            if(!categoryExists) {
                this.categoriesRepository.create({
                    name,
                    description
                });
            }
        })
    }
}
