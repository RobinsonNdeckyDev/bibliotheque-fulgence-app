-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 09 mai 2025 à 13:38
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bibliotheque-bd`
--

-- --------------------------------------------------------

--
-- Structure de la table `auteur`
--

CREATE TABLE `auteur` (
  `id` bigint(20) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo_profil` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `role` enum('ADMIN','AUTEUR','SUPER_ADMIN','USER') NOT NULL,
  `telephone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `auteur`
--

INSERT INTO `auteur` (`id`, `adresse`, `description`, `email`, `nom`, `password`, `photo_profil`, `prenom`, `role`, `telephone`) VALUES
(6, 'Dakar', 'Je suis auteur', 'malick@gmail.com', 'Diouf', '$2a$10$MJ9lnsAlkiJMQJOChaJjT.CZvIdlKYn1wr9EBo5Hzt44nBkZjG5qK', 'default.jpg', 'malick', 'AUTEUR', '745635649'),
(7, 'Dakar', 'Je suis auteur', 'babacartoure@gmail.com', 'Touré', '$2a$10$Mz47xV6.0Qv3Rp7hLXiITO8vrRxRZtr.8S27Y/TY0MmMo5Czz1Pe2', 'default.jpg', 'Babacar', 'AUTEUR', '645634535'),
(8, 'Dakar', 'je suis auteur', 'babacar@gmail.com', 'Ndiaye', '$2a$10$zG64h2cgIF6l0nreWaUiw.xj2xA8IoMJ1Gb/8Q6qBk0TgicQMy7di', 'default.jpg', 'Babacar', 'AUTEUR', '7645634523'),
(10, 'Dakar', 'Je suis auteur', 'saliou@gmail.com', 'Niang', '$2a$10$jLpA8ZZR.F9/dwLzzAf/PexaB2zeJHVRwd2hrfXxYPoJBAw1oHGrm', 'default.jpg', 'Saliou', 'AUTEUR', '3532783'),
(11, 'Dakar', 'Je suis auteur', 'sagna@gmail.com', 'Diouf', '$2a$10$O/8I9sr3DIZIROXvGDWdROHvzXTz.nEv0WtS4DRsVuFuCaUVnStgS', 'default.jpg', 'Sagna', 'AUTEUR', '65343536');

-- --------------------------------------------------------

--
-- Structure de la table `livre`
--

CREATE TABLE `livre` (
  `id` bigint(20) NOT NULL,
  `isbn` bigint(20) NOT NULL,
  `langue` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `auteur_id` bigint(20) NOT NULL,
  `nbre_page` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `livre`
--

INSERT INTO `livre` (`id`, `isbn`, `langue`, `nom`, `titre`, `auteur_id`, `nbre_page`) VALUES
(3, 87368564664, 'Français', 'sen eau', 'réglementation sen eau', 6, 300),
(4, 454764764646, 'Français', 'nom test', 'test', 6, 500),
(8, 454764764646, 'Français', 'dhdhg', 'dhdg', 6, 543),
(9, 27634763, 'Français', 'sdkfjdk', 'djhgfkd', 6, 243),
(10, 76576, 'Français', 'fhgfhfh', 'fhgfhfh', 6, 432);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo_profil` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `role` enum('ADMIN','AUTEUR','SUPER_ADMIN','USER') NOT NULL,
  `telephone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `adresse`, `description`, `email`, `nom`, `password`, `photo_profil`, `prenom`, `role`, `telephone`) VALUES
(1, 'Dakar, Sénégal', 'Compte Super Administrateur', 'admin@admin.com', 'Admin', '$2a$10$M84/BLlEgU7kAZTQ79nMYuQLL/iUbwYsIN5/qKAnYwzEpi1f5ONN2', 'default-admin.jpg', 'Super', 'SUPER_ADMIN', '+221 77 000 00 00'),
(2, 'Dakar', 'Je suis auteur', 'babacar@gmail.com', 'Diouf', '$2a$10$CDuw8t62VJpP7xdQ3IvPqeDedvPEjgTI/D.dGx5pFdmdDiwtqQBZ6', 'default.jpg', 'Babacar', 'AUTEUR', '7645634523'),
(4, 'Dakar', 'Je suis auteur', 'saliou@gmail.com', 'Niang', '$2a$10$jLpA8ZZR.F9/dwLzzAf/PexaB2zeJHVRwd2hrfXxYPoJBAw1oHGrm', 'default.jpg', 'Saliou', 'AUTEUR', '3532783'),
(5, 'Dakar', 'Je suis auteur', 'sagna@gmail.com', 'Diouf', '$2a$10$O/8I9sr3DIZIROXvGDWdROHvzXTz.nEv0WtS4DRsVuFuCaUVnStgS', 'default.jpg', 'Sagna', 'AUTEUR', '65343536');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `auteur`
--
ALTER TABLE `auteur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK3nce1wjjagsqkx1w7890t9q98` (`email`);

--
-- Index pour la table `livre`
--
ALTER TABLE `livre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKh0pb6pxv3ubtgo1s3ev4gebgj` (`auteur_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `auteur`
--
ALTER TABLE `auteur`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `livre`
--
ALTER TABLE `livre`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `livre`
--
ALTER TABLE `livre`
  ADD CONSTRAINT `FKh0pb6pxv3ubtgo1s3ev4gebgj` FOREIGN KEY (`auteur_id`) REFERENCES `auteur` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
