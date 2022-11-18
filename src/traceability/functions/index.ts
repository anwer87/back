import { NotAcceptableException } from '@nestjs/common';
import { DataProps } from '../types';

class verfuctions {
  private data: DataProps;
  private input: number;

  constructor(data: DataProps, input: string) {
    this.data = data;
    this.input = parseInt(input, 10);
  }

  bloqageVerf() {
    if (parseInt(this.data.sous_ensemble, 10) >= this.input) {
    } else {
      return;
    }
  }
}
