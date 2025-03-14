import {
  ConflictException,
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(usuarioEntity: UsuarioEntity) {
    const usuarioExistente = await this.buscaPorEmail(usuarioEntity.email);

    if (usuarioExistente) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    try {
      await this.usuarioRepository.save(usuarioEntity);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar usuário. Tente novamente mais tarde.',
      );
    }
  }

  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (checkEmail === null)
      throw new NotFoundException('O email não foi encontrado.');

    return checkEmail;
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuarioExistente) {
      throw new BadRequestException('O usuário não foi encontrado.');
    }

    await this.usuarioRepository.update(id, novosDados);
  }

  async deletaUsuario(id: string) {
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuarioExistente) {
      throw new NotFoundException(`Usuário  não encontrado.`);
    }
    await this.usuarioRepository.delete(id);
  }
}
