import { Module } from '@nestjs/common';
import { FornecedorEntity } from './fornecedor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FornecedorEntity])],
  controllers: [],
  providers: [],
  exports: []
})
export class FornecedorModule {}
