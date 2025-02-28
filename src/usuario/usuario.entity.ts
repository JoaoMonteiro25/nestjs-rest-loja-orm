import { FornecedorEntity } from 'src/fornecedor/fornecedor.entity';
import { ProdutoCaracteristicaEntity } from 'src/produto/produto-caracteristica.entity';
import { ProdutoImagemEntity } from 'src/produto/produto-imagem.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'email', length: 70, nullable: false })
  email: string;

  @Column({ name: 'senha', length: 255, nullable: false })
  senha: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
  @OneToMany(
    () => ProdutoImagemEntity,
    (produtoImageEntity) => produtoImageEntity.produto,
    { cascade: true, eager: true },
  )
  imagens: ProdutoImagemEntity[];

  @OneToMany(
    () => ProdutoCaracteristicaEntity,
    (produtoCaracteristicaEntity) => produtoCaracteristicaEntity.produto,
    { cascade: true, eager: true },
  )
  caracteristicas: ProdutoCaracteristicaEntity[];

  @ManyToOne(
    () => FornecedorEntity, (fornecedor) => fornecedor.produtos, 
    { nullable: true, cascade: false, eager: true }
  )
  fornecedor: FornecedorEntity;
}
