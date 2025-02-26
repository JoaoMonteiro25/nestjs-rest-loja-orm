import { Repository } from 'typeorm';
import { ProdutoEntity } from './produto.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProdutoRepository {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepo: Repository<ProdutoEntity>,
  ) {}

  async findByCategoria(categoria: string): Promise<ProdutoEntity[]> {
    return this.produtoRepo.find({ where: { categoria } });
  }

  async save(produto: ProdutoEntity) {
    return this.produtoRepo.save(produto);
  }
}
