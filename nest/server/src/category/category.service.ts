import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto, id: number) {
    const isExist = await this.categoryRepository.findBy({
      user: { id },
      title: createCategoryDto.title
    })
    if (isExist.length) throw new BadRequestException('Такая категория уже существует')
    const newCategory = {
      title: createCategoryDto.title,
      user: {
        id,
      },
    }
console.log(newCategory)
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(id: number) {

    return await this.categoryRepository.find({
      where: {
        user: { id },
      },
      relations: {

        transactions: true,
        //sdasdasdsa
      },
    })
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: {
        user: true,
        transactions: true
      }
    })
    if (!category) throw new NotFoundException('Такой категории не существует')
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    })

    if (!category) throw new NotFoundException('Такой категории не существует')
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },

    })
    if (!category) throw new NotFoundException('Такой категории не существует')

    return await this.categoryRepository.delete(id);
  }
}
