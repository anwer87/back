-- CreateTable
CREATE TABLE `production` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `of` INTEGER NULL,
    `lot` VARCHAR(15) NULL,
    `roduit` VARCHAR(6) NULL,
    `reference` VARCHAR(8) NULL,
    `reference_sorea` VARCHAR(10) NULL,
    `reference_eai` VARCHAR(10) NULL,
    `status_of` VARCHAR(10) NULL,
    `flux` VARCHAR(10) NULL,
    `date_de_commande` VARCHAR(40) NULL,
    `qte_bdee` VARCHAR(45) NULL,
    `qte_recu` VARCHAR(45) NULL,
    `ecr_brut` VARCHAR(45) NULL,
    `ecr_net` VARCHAR(45) NULL,
    `taux_de_rebut` INTEGER NULL,
    `observation_prod` VARCHAR(45) NULL,
    `demontage` VARCHAR(45) NULL,
    `reste_a_demonter` VARCHAR(45) NULL,
    `sous_ensemble` VARCHAR(45) NULL,
    `rebut_sous_ens` VARCHAR(45) NULL,
    `montage` VARCHAR(45) NULL,
    `rebut_montage` VARCHAR(45) NULL,
    `export` VARCHAR(45) NULL,
    `rebut_export` VARCHAR(45) NULL,
    `reste_a_Exporter` VARCHAR(45) NULL,
    `bloquage` VARCHAR(45) NULL,
    `zingueur` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `traceability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matricule` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `produit` VARCHAR(191) NULL,
    `lot` VARCHAR(191) NULL,
    `of` VARCHAR(191) NULL,
    `reference` VARCHAR(191) NULL,
    `table` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `commentaire` VARCHAR(191) NULL,
    `qte_saisi` VARCHAR(191) NULL,
    `date_doperation` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `matricule` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_userName_key`(`userName`),
    UNIQUE INDEX `users_matricule_key`(`matricule`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
