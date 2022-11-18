import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaClient } from '@prisma/client';
import { Workbook } from 'exceljs';
import * as tmp from 'tmp';
import { dataProps } from './types';

@Injectable()
export class FilesService {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private async fileWriter(book: any, table: string) {
    const file = await new Promise((resolve, reject) => {
      tmp.file(
        {
          discardDescriptor: true,
          prefix: table,
          postfix: '.xlsx',
          mode: parseInt('0600', 8),
        },
        async (err, file) => {
          if (err) {
            throw new BadRequestException(err);
          }
          book.xlsx
            .writeFile(file)
            .then((_) => {
              resolve(file);
            })
            .catch((error) => {
              throw new BadRequestException(error);
            });
        },
      );
    });
    return file;
  }

  private async excelGenerator(data) {
    if (!data) {
      throw new NotFoundException('No data');
    }
    const rows = [];
    data.forEach((item) => rows.push(Object.values(item)));
    const book = new Workbook();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const sheet = book.addWorksheet('sheet1');
    rows.unshift(Object.keys(data[0]));
    sheet.addRows(rows);
    return book;
  }

  async export(createFileDto: CreateFileDto) {
    switch (createFileDto.table) {
      case 'production':
        try {
          const result = await this.prisma.production
            .findMany()
            .then(async (data) => {
              return await this.excelGenerator(data).then(async (book) => {
                return await this.fileWriter(book, createFileDto.table).then(
                  (file) => file,
                );
              });
            });
          return result;
        } catch (e) {
          console.log('error');
        }

      default:
        try {
          const result = await this.prisma.traceability
            .findMany()
            .then(async (data) => {
              return await this.excelGenerator(data).then(async (book) => {
                return await this.fileWriter(book, createFileDto.table).then(
                  (file) => file,
                );
              });
            });
          return result;
        } catch (e) {
          console.log(e);
        }
    }
  }

  async importTraceability(data: UpdateFileDto) {
    console.log(data);
  }

  private async productionAdder(data: Array<object>) {
    const newData = {};
    data.forEach((item: dataProps) => {
      try {
        const data = this.prisma.production
          .create({
            data: {
              of: `${item.OF}`,
              lot: `${item.Lot}`,
              produit: `${item.Produit}`,
              reference: `${item.Référence}`,
              reference_sorea: `${item['Référence Sorea']}`,
              reference_eai: `${item['Référence EAI']}`,
              status_of: `${item['Statut Of']}`,
              flux: `${item.Flux}`,
              date_de_commande: `${item['Date De Commande']}`, // bug
              qte_bdee: `${item['Qté Ddée']}`,
              ecr_brut: `${item['Ecr.Brut']}`,
              ecr_net: `${item['Ecr.Net']}`,
              taux_de_rebut: `${item['Taux De Rebut']}`,
              observation_prod: `${item['Observation Prod']}`,
              demontage: `${item.Démontage}`,
              reste_a_demonter: `${item['Reste à démonter']}`,
              sous_ensemble: `${item['Sous-Ensemble']}`,
              rebut_sous_ens: `${item['Rebut Sous-Ens']}`,
              montage: `${item.Montage}`,
              rebut_montage: `${item['Rebut Montage']}`,
              rebut_total: `${item['Rebut Total']}`,
              Export: `${item.Export}`,
              rebut_export: `${item['Rebut Export']}`,
              reste_a_Exporter: `${item['Reste à Exporter']}`,
              bloquage: `${item.Bloquage}`,
              zingueur: `${item.Zingueur}`,
            },
          })
          .then((res) => {
            console.log(res);
          });
      } catch (e) {
        console.error(`error in productionAdder: ${e}`);
      }
    });
  }

  async importProduction(data: UpdateFileDto) {
    console.log(data);
    const old = await this.prisma.production.findMany();
    if (old.length !== 0) {
      const deletedData = await this.prisma.production
        .deleteMany()
        .then((item) => console.log(item));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await this.productionAdder(data);
    } else {
      console.log('else');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await this.productionAdder(data);
    }
  }
}
