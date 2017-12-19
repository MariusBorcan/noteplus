SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `noteplus`
--
CREATE DATABASE `noteplus` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `noteplus`;

--
-- Table structure for table `Projects`
--

CREATE TABLE IF NOT EXISTS `Projects` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `userId` smallint(5),
  `title` varchar(30) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `githubUrl` varchar(100) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Notes`
--

CREATE TABLE IF NOT EXISTS `Notes` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `projectId` smallint(5),
  `title` text DEFAULT NULL,
  `text` text DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` text NOT NULL,
  `githubUrl` text NOT NULL,
  `imageUrl` text NOT NULL,
  `organization` varchar(100),
  `location` varchar(100),
  `website` varchar(100),
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Tags`
--

CREATE TABLE IF NOT EXISTS `Tags` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `noteId` smallint(5),
  `text` varchar(30) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------