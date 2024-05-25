import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  UseGuards,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '../Guards/auth.guard';
import { Roles } from '../Decorators/roles.decorator';

@Controller('products')
export class AclController {
  constructor() {}

  @Roles('admin', 'seller', 'supporter', 'customer')
  @UseGuards(AuthGuard)
  @Get()
  getProducts() {
    return {
      status: HttpStatus.OK,
      message: '“Products sent successfully',
    };
  }

  @Roles('seller', 'admin')
  @UseGuards(AuthGuard)
  @Put()
  updateProduct() {
    return {
      status: HttpStatus.OK,
      message: '“Product updated successfully”',
    };
  }

  @Roles('seller', 'admin')
  @UseGuards(AuthGuard)
  @Patch()
  updatePatchProduct() {
    return {
      status: HttpStatus.OK,
      message: '“Product updated successfully”',
    };
  }

  @Roles('admin', 'supporter')
  @UseGuards(AuthGuard)
  @Delete()
  deleteProduct() {
    return {
      status: HttpStatus.OK,
      message: '“Product deleted successfully”',
    };
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Post()
  createProduct() {
    return {
      status: HttpStatus.CREATED,
      message: 'Product added successfully”',
    };
  }
}
