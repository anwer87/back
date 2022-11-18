export type traceabilityDataProps = {
  userName: string;
  lot: string;
  of: string;
  comment: string;
  emp: string;
  rebut: string;
  prepare: string;
  table: string;
  date_doperation: string;
  matricule: string;
};

export type prodDataProps = {
  rebut_total?: string;
  ecr_brut?: string;
  ecr_net?: string;
  taux_de_rebut?: string;
  reste_a_demonter?: string;
  reste_a_Exporter?: string;
  status_of?: string;
};

export interface DataProps {
  bloquage: string;
  demontage: string;
  ecr_brut: string;
  montage: string;
  rebut_montage: string;
  rebut_export: string;
  qte_bdee: string;
  rebut_total: string;
  rebut_sous_ens: string;
  zingueur: string;
  reste_a_Exporter: string;
  reste_a_demonter: string;
  taux_de_rebut: string;
  reference_sorea: string;
  sous_ensemble: string;
  ecr_net: string;
  flux: string;
  observation_prod: string;
  reference_eai: string;
  Export: string;
  date_de_commande: string;
  status_of: string;
  produit: string;
  reference: string;
}
