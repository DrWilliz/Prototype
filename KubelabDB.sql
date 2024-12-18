-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Dec 16, 2024 at 06:33 PM
-- Server version: 8.4.3
-- PHP Version: 8.2.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `KubelabDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `Stacks`
--

CREATE TABLE `Stacks` (
  `Stack_ID` int NOT NULL,
  `Author` varchar(255) NOT NULL,
  `Date` date NOT NULL,
  `Template_ID` int DEFAULT NULL,
  `Name` varchar(255) NOT NULL,
  `Status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Stacks`
--

INSERT INTO `Stacks` (`Stack_ID`, `Author`, `Date`, `Template_ID`, `Name`, `Status`) VALUES
(537, 'xanderco', '2024-12-12', 1, 'johns-big-fat-stack', 1),
(549, 'xanderco', '2024-12-13', 1, 'johnny-stack', 2),
(602, 'xanderco', '2024-12-16', 2, 'jschtack', 1),
(657, 'xanderco', '2024-12-16', 2, 'bob-stacking', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Templates`
--

CREATE TABLE `Templates` (
  `Template_ID` int NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Templates`
--

INSERT INTO `Templates` (`Template_ID`, `Name`) VALUES
(1, 'Nginx'),
(2, 'Wordpress');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `User_ID` int NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `IsAdmin` tinyint(1) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`User_ID`, `Email`, `Password`, `IsAdmin`, `Name`) VALUES
(1, 'John@doe.doe', 'Jdawg69', 1, 'John Doe'),
(2, 'Jane@doe.doe', 'Jawesome420', 0, 'Jane Doe');

-- --------------------------------------------------------

--
-- Table structure for table `UserStacks`
--

CREATE TABLE `UserStacks` (
  `User_ID` int NOT NULL,
  `Stack_ID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Stacks`
--
ALTER TABLE `Stacks`
  ADD PRIMARY KEY (`Stack_ID`),
  ADD KEY `Template_ID` (`Template_ID`);

--
-- Indexes for table `Templates`
--
ALTER TABLE `Templates`
  ADD PRIMARY KEY (`Template_ID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`User_ID`);

--
-- Indexes for table `UserStacks`
--
ALTER TABLE `UserStacks`
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Stack_ID` (`Stack_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Templates`
--
ALTER TABLE `Templates`
  MODIFY `Template_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `User_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Stacks`
--
ALTER TABLE `Stacks`
  ADD CONSTRAINT `Stacks_ibfk_1` FOREIGN KEY (`Template_ID`) REFERENCES `Templates` (`Template_ID`);

--
-- Constraints for table `UserStacks`
--
ALTER TABLE `UserStacks`
  ADD CONSTRAINT `UserStacks_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `Users` (`User_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `UserStacks_ibfk_2` FOREIGN KEY (`Stack_ID`) REFERENCES `Stacks` (`Stack_ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
