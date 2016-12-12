-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 12, 2016 at 02:09 PM
-- Server version: 5.7.16-0ubuntu0.16.04.1
-- PHP Version: 7.0.8-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `contest_ranker`
--

-- --------------------------------------------------------

--
-- Table structure for table `contactform`
--

CREATE TABLE `contactform` (
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(500) NOT NULL,
  `message` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `contests`
--

CREATE TABLE `contests` (
  `contest_id` bigint(20) NOT NULL,
  `contest_name` varchar(1000) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `status` set('ACTIVE','ARCHIVED','DISABLED') NOT NULL,
  `time_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `end_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contests`
--

INSERT INTO `contests` (`contest_id`, `contest_name`, `description`, `status`, `time_created`, `start_date`, `end_date`) VALUES
(10, 'CML Class Test', 'Giving this test will evaluate your understanding of the optimization theory and hence, the results/ leaderboard will be used to grade your performance', 'ACTIVE', '2016-11-15 00:16:37', '2016-11-18 15:30:00', '2016-11-18 17:00:00'),
(11, 'All Time Testing Contest', 'A contest active everytime to let students test the platform and submit answers to some common problems', 'ACTIVE', '2016-11-15 00:31:05', '2016-09-15 00:00:00', '2020-09-15 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `contest_map`
--

CREATE TABLE `contest_map` (
  `contest_id` bigint(20) NOT NULL,
  `problem_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contest_map`
--

INSERT INTO `contest_map` (`contest_id`, `problem_id`) VALUES
(10, 121),
(10, 123),
(10, 124),
(10, 125),
(10, 126),
(11, 121);

-- --------------------------------------------------------

--
-- Table structure for table `leaderboard`
--

CREATE TABLE `leaderboard` (
  `userid` varchar(500) NOT NULL,
  `problemid` bigint(20) NOT NULL,
  `score` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `leaderboard`
--



-- --------------------------------------------------------

--
-- Table structure for table `problems`
--

CREATE TABLE `problems` (
  `uid` bigint(20) NOT NULL,
  `name` varchar(500) NOT NULL,
  `statement` varchar(1000) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `difficulty` varchar(10) NOT NULL DEFAULT '1',
  `time_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `download_file` varchar(500) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `type` set('ARCHIVED','ACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `dimension` bigint(20) NOT NULL DEFAULT '6',
  `score` bigint(20) NOT NULL DEFAULT '0',
  `optimization` set('MINIMIZE','MAXIMIZE') NOT NULL DEFAULT 'MAXIMIZE'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `problems`
--

INSERT INTO `problems` (`uid`, `name`, `statement`, `description`, `difficulty`, `time_created`, `download_file`, `image`, `type`, `dimension`, `score`, `optimization`) VALUES
(121, 'Alpine Function', 'Minimize the value of the Alpine function', 'You need to submit a set of values separated by space in the answer field given.\nConstraints are: value of x should be between -10 and 10\nFormat: "1 1 1 1 1 1 1 1 1 1"\n(ignore double quotes)', '1', '2016-11-14 23:57:29', NULL, 'alpine', 'ACTIVE', 10, 25, 'MINIMIZE'),
(123, 'Brown Function', 'Minimize the value of the Brown Function', 'You need to submit a set of values separated by space in the answer field given.\nConstraints: -1<=x<=4', '1', '2016-11-17 07:57:43', NULL, 'brown', 'ACTIVE', 10, 20, 'MINIMIZE'),
(124, 'Griewank Function', 'Minimize the vale of the Griewank Function', 'You need to submit a set of values separated by space in the answer field given.\r\nConstraints: -100<=x<=100', '2', '2016-11-17 08:01:10', NULL, 'griewank', 'ACTIVE', 10, 35, 'MINIMIZE'),
(125, 'Mishra Function', 'Minimize the value of the mishra function', 'You need to submit a set of values separated by space in the answer field given.\nConstraints: -10<=x<=10', '1', '2016-11-17 08:02:58', NULL, 'mishra', 'ACTIVE', 10, 25, 'MINIMIZE'),
(126, 'Powells First Singular Function', 'Minimize the value of this function', 'You need to submit a set of values separated by space in the answer field given.\r\nConstraints: -4<=x<=5', '3', '2016-11-17 08:05:30', NULL, 'powell', 'ACTIVE', 8, 40, 'MINIMIZE');

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `id` bigint(20) NOT NULL,
  `user` varchar(500) NOT NULL,
  `problem_id` varchar(500) NOT NULL,
  `submission_value` varchar(1000) DEFAULT NULL,
  `score` double NOT NULL DEFAULT '0',
  `answer` double NOT NULL,
  `time_submitted` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `submissions`
--



-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `email` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subscription`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(100) NOT NULL,
  `password` varchar(400) NOT NULL,
  `firstname` varchar(500) NOT NULL,
  `lastname` varchar(500) NOT NULL,
  `sex` varchar(100) NOT NULL,
  `usertype` set('ADMIN','USER','SUPERADMIN','') NOT NULL DEFAULT 'USER',
  `priviledge` varchar(1000) DEFAULT NULL,
  `timeofregistration` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contactform`
--
ALTER TABLE `contactform`
  ADD PRIMARY KEY (`email`,`message`);

--
-- Indexes for table `contests`
--
ALTER TABLE `contests`
  ADD PRIMARY KEY (`contest_id`);

--
-- Indexes for table `contest_map`
--
ALTER TABLE `contest_map`
  ADD PRIMARY KEY (`contest_id`,`problem_id`);

--
-- Indexes for table `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD PRIMARY KEY (`userid`,`problemid`);

--
-- Indexes for table `problems`
--
ALTER TABLE `problems`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contests`
--
ALTER TABLE `contests`
  MODIFY `contest_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `problems`
--
ALTER TABLE `problems`
  MODIFY `uid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;
--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=427;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
