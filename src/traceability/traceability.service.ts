import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTraceabilityDto } from './dto/create-traceability.dto';
import { traceabilityDataProps, prodDataProps } from './types';

@Injectable()
export class TraceabilityService {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  // fun to save data
  private async databaseAdder(
    traceabilityData: traceabilityDataProps,
    prodData: prodDataProps,
    of: string,
  ) {
    try {
      const traceAdd = await this.prisma.traceability
        .create({
          data: traceabilityData,
        })
        .then(() => console.info('traceability added'));
      const prodUpdate = await this.prisma.production
        .update({
          where: { of: of },
          data: prodData,
        })
        .then(() => console.info('prod added'));
      return { prodUpdate, traceAdd };
    } catch (e) {
      console.error(`prod error: ${e}`);
    }
  }

  // Http endPoint fun
  async create(createTraceabilityDto: CreateTraceabilityDto) {
    try {
      const operation = async (data) => {
        const {
          bloquage,
          demontage,
          ecr_brut,
          montage,
          rebut_montage,
          rebut_export,
          rebut_total,
          rebut_sous_ens,
          zingueur,
          sous_ensemble,
          ecr_net,
          Export,
        } = data;
        try {
          // Global for all table
          const date = new Date().toISOString().slice(0, 10);
          let status_ofUpdated = '0';
          const traceabilityData = {
            userName: createTraceabilityDto.userName,
            lot: createTraceabilityDto.lot,
            of: createTraceabilityDto.of,
            comment: createTraceabilityDto.comment,
            emp: createTraceabilityDto.emp,
            rebut: createTraceabilityDto.rebut,
            prepare: createTraceabilityDto.prepare,
            table: createTraceabilityDto.table,
            date_doperation: date,
            matricule: createTraceabilityDto.matricule,
          };
          switch (createTraceabilityDto.table) {
            case 'TABLE DE S-ENSEMBLE':
              if (
                parseInt(createTraceabilityDto.prepare, 10) +
                  parseInt(createTraceabilityDto.rebut, 10) +
                  parseInt(sous_ensemble, 10) <=
                  parseInt(ecr_net, 10) &&
                parseInt(createTraceabilityDto.prepare, 10) >= 0 &&
                parseInt(createTraceabilityDto.rebut, 10) >= 0
              ) {
                const rebut_totalNew =
                  parseInt(createTraceabilityDto.rebut, 10) + //25
                  parseInt(rebut_total, 10) + //25
                  parseInt(rebut_montage, 10) +
                  // parseInt(rebut_sous_ens, 10) + //25
                  parseInt(rebut_export, 10);
                const ecr_netNew =
                  parseInt(demontage, 10) -
                  parseInt(montage, 10) -
                  rebut_totalNew;
                const newData = {
                  taux_de_rebut: `${(rebut_totalNew / demontage) * 100}`,
                  rebut_total: `${rebut_totalNew}`,
                  ecr_brut: `${ecr_netNew}`,
                  ecr_net: `${ecr_netNew}`,
                  sous_ensemble: `${
                    parseInt(createTraceabilityDto.prepare, 10) +
                    parseInt(sous_ensemble, 10)
                  }`,
                  rebut_sous_ens: `${
                    parseInt(createTraceabilityDto.rebut, 10) +
                    parseInt(rebut_sous_ens, 10)
                  }`,
                };
                await this.databaseAdder(
                  traceabilityData,
                  newData,
                  createTraceabilityDto.of,
                );
              } else {
                throw new NotAcceptableException(
                  'Ensemble est supérieur au démontage',
                );
              }
              break;

            case 'TABLE DE SOUS-TRAITANTS':
              if (
                parseInt(createTraceabilityDto.prepare, 10) <=
                  parseInt(sous_ensemble, 10) && // v
                // parseInt(zingueur, 10) >= 0 && // t
                parseInt(zingueur, 10) <= parseInt(sous_ensemble, 10) && // v
                // parseInt(zingueur, 10) + parseInt(createTraceabilityDto.prepare, 10) >= parseInt(ecr_net, 10) && // v
                parseInt(ecr_net, 10) >= 0 && // v
                parseInt(createTraceabilityDto.prepare, 10) +
                  parseInt(zingueur, 10) >=
                  0
              ) {
                status_ofUpdated = 'Encours';
                const newZingueur = `${
                  parseInt(createTraceabilityDto.prepare) < 0 &&
                  parseInt(zingueur, 10) <= 0
                    ? 0
                    : parseInt(createTraceabilityDto.prepare, 10) +
                      parseInt(zingueur, 10)
                }`;
                const newData = {
                  status_of: `${status_ofUpdated}`,
                  ecr_net: `${
                    parseInt(createTraceabilityDto.prepare) < 0 &&
                    parseInt(zingueur, 10) <= 0
                      ? parseInt(ecr_net, 10)
                      : parseInt(ecr_net, 10) -
                        parseInt(createTraceabilityDto.prepare, 10)
                  }`,
                  zingueur: newZingueur,
                };
                await this.databaseAdder(
                  traceabilityData,
                  newData,
                  createTraceabilityDto.of,
                );
              } else {
                throw new NotAcceptableException(
                  "Ensemble c'est moins que de se préparer",
                );
              }
              break;

            case 'TABLE DE BLOQCAGE':
              if (
                parseInt(createTraceabilityDto.prepare, 10) <=
                  parseInt(sous_ensemble, 10) && // t
                parseInt(bloquage, 10) >= 0 && // t
                parseInt(bloquage, 10) <= parseInt(sous_ensemble, 10) && // t
                parseInt(bloquage, 10) +
                  parseInt(createTraceabilityDto.prepare, 10) <=
                  parseInt(ecr_net, 10) && // t
                parseInt(ecr_net, 10) >= 0 &&
                parseInt(createTraceabilityDto.prepare, 10) +
                  parseInt(bloquage, 10) >=
                  0
              ) {
                if (parseInt(createTraceabilityDto.prepare, 10) > 0) {
                  status_ofUpdated = 'bloqué';
                } else {
                  status_ofUpdated = 'Encours';
                }
                const newData = {
                  status_of: `${status_ofUpdated}`,
                  bloquage: `${
                    parseInt(createTraceabilityDto.prepare, 10) <= 0 &&
                    parseInt(bloquage, 10) <= 0
                      ? 0
                      : parseInt(createTraceabilityDto.prepare, 10) +
                          parseInt(bloquage, 10) >=
                        0
                      ? parseInt(createTraceabilityDto.prepare, 10) +
                        parseInt(bloquage, 10)
                      : 0
                  }`,
                  ecr_net: `${
                    parseInt(createTraceabilityDto.prepare) < 0 &&
                    parseInt(bloquage, 10) <= 0
                      ? parseInt(ecr_net, 10)
                      : parseInt(ecr_net, 10) -
                        parseInt(createTraceabilityDto.prepare, 10)
                  }`,
                };
                await this.databaseAdder(
                  traceabilityData,
                  newData,
                  createTraceabilityDto.of,
                );
              } else {
                console.error('Ensemble is less then zingueur');
                throw new NotAcceptableException(
                  'Ensemble is less then prepare',
                );
              }
              break;

            case 'TABLE DE MONTAGE':
              const newMontage =
                parseInt(createTraceabilityDto.prepare) + parseInt(montage, 10);
              const newRebutMontage =
                parseInt(createTraceabilityDto.rebut, 10) +
                parseInt(rebut_montage, 10);
              if (
                newMontage + newRebutMontage <= parseInt(ecr_net, 10) &&
                parseInt(createTraceabilityDto.prepare, 10) >= 0 &&
                parseInt(createTraceabilityDto.rebut, 10) >= 0
              ) {
                const rebut_totalNew =
                  parseInt(createTraceabilityDto.rebut, 10) +
                  parseInt(rebut_total, 10);
                const newBrut =
                  parseInt(demontage, 10) - rebut_totalNew - newMontage;
                status_ofUpdated = 'Encours';
                const newData = {
                  rebut_total: `${rebut_totalNew}`,
                  ecr_net: `${
                    newBrut - parseInt(bloquage, 10) - parseInt(zingueur, 10)
                  }`,
                  montage: `${
                    parseInt(createTraceabilityDto.prepare) +
                    parseInt(montage, 10)
                  }`,
                  rebut_montage: `${
                    parseInt(createTraceabilityDto.rebut) +
                    parseInt(rebut_montage, 10)
                  }`,
                  ecr_brut: `${newBrut}`,
                  taux_de_rebut: `${
                    (rebut_totalNew / parseInt(demontage, 10)) * 100
                  }`,
                  reste_a_Exporter: `${
                    parseInt(createTraceabilityDto.prepare) +
                    parseInt(montage, 10) -
                    parseInt(Export, 10) -
                    parseInt(rebut_export, 10)
                  }`,
                };
                await this.databaseAdder(
                  traceabilityData,
                  newData,
                  createTraceabilityDto.of,
                );
              } else {
                console.error('Ensemble is less then montage');
                throw new NotAcceptableException(
                  'Ensemble is less then prepare',
                );
              }
              break;

            case "TABLE D'EXPORT":
              if (
                parseInt(createTraceabilityDto.prepare, 10) +
                  parseInt(Export, 10) <=
                  parseInt(montage, 10) &&
                parseInt(createTraceabilityDto.prepare, 10) >= 0
              ) {
                const brutNew =
                  parseInt(demontage, 10) -
                  parseInt(montage, 10) -
                  parseInt(rebut_total, 10);
                const newRestEx =
                  parseInt(montage, 10) - // 50
                  parseInt(createTraceabilityDto.prepare, 10) +
                  parseInt(Export);
                if (brutNew === 0 && newRestEx === 0) {
                  status_ofUpdated = 'Cloturer';
                } else {
                  status_ofUpdated = 'Encours';
                }

                const newData = {
                  status_of: `${status_ofUpdated}`,
                  rebut_export: `${
                    parseInt(createTraceabilityDto.rebut, 10) +
                    parseInt(Export, 10)
                  }`,
                  reste_a_Exporter: `${newRestEx}`,
                  ecr_brut: `${brutNew}`,
                  ecr_net: `${
                    brutNew - parseInt(bloquage, 10) - parseInt(zingueur, 10)
                  }`,
                  Export: `${
                    parseInt(Export, 10) +
                    parseInt(createTraceabilityDto.prepare, 10)
                  }`,
                };
                await this.databaseAdder(
                  traceabilityData,
                  newData,
                  createTraceabilityDto.of,
                );
              } else {
                console.error('export less than montage');
                throw new NotAcceptableException('export less than montage');
              }
              break;

            case 'TABLE DE DÉMONTAGE':
              if (parseInt(createTraceabilityDto.prepare, 10) >= 0) {
                if (
                  parseInt(createTraceabilityDto.prepare, 10) +
                    parseInt(demontage, 10) ===
                  0
                ) {
                  status_ofUpdated = 'Att Démontage';
                } else {
                  status_ofUpdated = 'Encours';
                }
                // cal logic
                const demontageData = {
                  ecr_brut: `${
                    parseInt(createTraceabilityDto.prepare, 10) +
                    parseInt(ecr_brut, 10)
                  }`,
                  ecr_net: `${
                    parseInt(createTraceabilityDto.prepare, 10) +
                    parseInt(ecr_net, 10)
                  }`,
                  status_of: `${status_ofUpdated}`,
                  demontage: `${
                    parseInt(createTraceabilityDto.prepare) +
                      parseInt(demontage) <
                    0
                      ? 0
                      : parseInt(createTraceabilityDto.prepare) +
                        parseInt(demontage)
                  }`,
                };
                await this.databaseAdder(
                  traceabilityData,
                  demontageData,
                  createTraceabilityDto.of,
                );
              } else {
                console.error('prepare les than 0');
                throw new NotAcceptableException('prepare les than 0');
              }
              break;

            default:
          }
        } catch (error) {
          throw error;
        }
      };
      const production = await this.prisma.production
        .findUnique({
          where: { of: createTraceabilityDto.of },
        })
        .then(async (data) => await operation(data));
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const traceability = await this.prisma.traceability.findMany();
      console.log(traceability);
      return traceability;
    } catch (error) {
      console.log(error); // remove it after test
    }
  }

  async remove() {
    try {
      const traceability = await this.prisma.traceability.deleteMany();
      return traceability;
    } catch (error) {
      console.log(error); // remove it after test
    }
  }
}
