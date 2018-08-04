-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.31-MariaDB - MariaDB Server
-- Server OS:                    Linux
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for finca
CREATE DATABASE IF NOT EXISTS `finca` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `finca`;

-- Dumping structure for table finca.actas
CREATE TABLE IF NOT EXISTS `actas` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `textoCompleto` longtext NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table finca.actas: ~3 rows (approximately)
/*!40000 ALTER TABLE `actas` DISABLE KEYS */;
REPLACE INTO `actas` (`id`, `textoCompleto`, `fecha`, `descripcion`) VALUES
	(1, 'LUL', '2018-07-12', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at convallis arcu, sed faucibus nisi. Mauris convallis finibus fringilla. Maecenas lacus elit, ornare at scelerisque condimentum, iaculis a lacus. Nunc congue a est volutpat mollis. Integer '),
	(2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at convallis arcu, sed faucibus nisi. Mauris convallis finibus fringilla. Maecenas lacus elit, ornare at scelerisque condimentum, iaculis a lacus. Nunc congue a est volutpat mollis. Integer blandit mi at nulla sodales, in tincidunt nibh egestas. Ut nec mauris a diam dignissim ultrices sed vitae risus. Suspendisse eros arcu, bibendum sit amet urna pellentesque, ultrices auctor ex. Nam sed ligula elementum, posuere dui sit amet, rhoncus erat. Duis magna mauris, porttitor at pulvinar at, auctor nec quam.', '2018-07-01', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at convallis arcu, sed faucibus nisi. Mauris convallis finibus fringilla. Maecenas lacus elit, ornare at scelerisque condimentum, iaculis a lacus. Nunc congue a est volutpat mollis. Integer '),
	(3, 'test2', '2018-07-16', '');
/*!40000 ALTER TABLE `actas` ENABLE KEYS */;

-- Dumping structure for table finca.gastos
CREATE TABLE IF NOT EXISTS `gastos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero_factura` varchar(20) NOT NULL,
  `tipo_id` int(11) NOT NULL,
  `fecha_recepcion` date NOT NULL,
  `fecha_factura` date NOT NULL,
  `descripcion` longtext NOT NULL,
  `titulo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `Gastos_fk0` (`tipo_id`),
  CONSTRAINT `Gastos_fk0` FOREIGN KEY (`tipo_id`) REFERENCES `tipogastos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table finca.gastos: ~5 rows (approximately)
/*!40000 ALTER TABLE `gastos` DISABLE KEYS */;
REPLACE INTO `gastos` (`id`, `numero_factura`, `tipo_id`, `fecha_recepcion`, `fecha_factura`, `descripcion`, `titulo`) VALUES
	(1, '2FTGW3ER', 1, '2018-07-10', '2018-07-17', 'Rotura de cañeria', 'Rotura de cañeria'),
	(2, '2QGF26QWR', 3, '2018-07-11', '2018-07-12', 'Cambio de bombillas', 'Cambio de bombillas'),
	(3, '2AFJ56QS', 2, '2018-07-02', '2018-07-12', 'Revision de gas', 'Revision de gas'),
	(4, '2QWEQWDS', 1, '2018-07-15', '2018-07-18', 'Agua', 'Agua'),
	(5, '4EWFDFB23', 2, '2018-07-03', '2018-07-05', 'Gas', 'Gas');
/*!40000 ALTER TABLE `gastos` ENABLE KEYS */;

-- Dumping structure for table finca.incidencias
CREATE TABLE IF NOT EXISTS `incidencias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` longtext NOT NULL,
  `leido` char(1) NOT NULL DEFAULT 'N',
  KEY `Index 1` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- Dumping data for table finca.incidencias: ~1 rows (approximately)
/*!40000 ALTER TABLE `incidencias` DISABLE KEYS */;
REPLACE INTO `incidencias` (`id`, `titulo`, `descripcion`, `leido`) VALUES
	(14, 'qwe', 'qwe', 'N'),
	(15, 'new test', 'new test', 'N');
/*!40000 ALTER TABLE `incidencias` ENABLE KEYS */;

-- Dumping structure for table finca.tipogastos
CREATE TABLE IF NOT EXISTS `tipogastos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table finca.tipogastos: ~4 rows (approximately)
/*!40000 ALTER TABLE `tipogastos` DISABLE KEYS */;
REPLACE INTO `tipogastos` (`id`, `tipo`) VALUES
	(1, 'agua'),
	(2, 'gas'),
	(3, 'luz'),
	(4, 'otros');
/*!40000 ALTER TABLE `tipogastos` ENABLE KEYS */;

-- Dumping structure for table finca.tipousuario
CREATE TABLE IF NOT EXISTS `tipousuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table finca.tipousuario: ~0 rows (approximately)
/*!40000 ALTER TABLE `tipousuario` DISABLE KEYS */;
REPLACE INTO `tipousuario` (`id`, `titulo`, `descripcion`) VALUES
	(1, 'admin', 'admin'),
	(2, 'user', 'user');
/*!40000 ALTER TABLE `tipousuario` ENABLE KEYS */;

-- Dumping structure for table finca.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `puerta` int(11) NOT NULL,
  `tipo_id` int(11) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `Usuario_fk0` (`tipo_id`),
  CONSTRAINT `Usuario_fk0` FOREIGN KEY (`tipo_id`) REFERENCES `tipousuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- Dumping data for table finca.usuario: ~4 rows (approximately)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
REPLACE INTO `usuario` (`id`, `nombre`, `telefono`, `puerta`, `tipo_id`, `usuario`, `password`) VALUES
	(1, 'jesusqwe', '123', 12, 1, 'test', 'test'),
	(2, 'editado', '123123123', 2, 2, 'test2', 'test2'),
	(3, 'Jesus', '1234567', 3, 1, 'jesus', 'jesus'),
	(4, 'qwe', '500', 50, 1, 'e', 'e'),
	(32, 'qwe', '1', 1, 1, '1', '1');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
