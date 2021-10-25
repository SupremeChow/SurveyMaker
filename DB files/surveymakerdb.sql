-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2021 at 05:52 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `surveymakerdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `checkboxanswer`
--

CREATE TABLE `checkboxanswer` (
  `id` int(11) NOT NULL,
  `answererId` int(11) NOT NULL COMMENT 'Id for the person answering, normally would be a key, but for now a pseudo identifier',
  `checkBoxQuestioId` int(11) NOT NULL COMMENT 'Foreign Key to corresponding CheckBox formField',
  `response` int(11) NOT NULL COMMENT 'Integer Response. NOTE, the internal handling is bitwise checking, with each bit position related to checked option'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `checkboxoption`
--

CREATE TABLE `checkboxoption` (
  `id` int(11) NOT NULL,
  `checkBoxQuestionId` int(11) NOT NULL COMMENT 'Foreign Key to corresponding checkBox',
  `position` int(11) NOT NULL COMMENT 'position relative to other options. NOTE: May not work properly',
  `label` int(11) NOT NULL COMMENT 'label user sees when selecting this option',
  `value` int(11) NOT NULL COMMENT 'the underlying value to the label and selection'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `checkboxquestion`
--

CREATE TABLE `checkboxquestion` (
  `id` int(11) NOT NULL,
  `surveyId` int(11) NOT NULL COMMENT 'Foreign Key to the corresponding survey',
  `position` int(11) NOT NULL COMMENT 'where in form is this formField',
  `question` int(11) NOT NULL COMMENT 'Foreign Key to the corresponding questionHeader',
  `label` int(11) NOT NULL COMMENT 'Foreign Key to the corresponding label for the input'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `label`
--

CREATE TABLE `label` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL COMMENT 'text that labels the input'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `multiplechoiceanswer`
--

CREATE TABLE `multiplechoiceanswer` (
  `id` int(11) NOT NULL,
  `answererId` int(11) NOT NULL COMMENT 'Id of user answering, normally a foreign key but for now just use as pseudo id',
  `multipleChoiceId` int(11) NOT NULL COMMENT 'Foreign Key to corresponding MultipleChoice question',
  `Response` int(11) NOT NULL COMMENT 'Integer value representing which selection was chosen'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `multiplechoiceoption`
--

CREATE TABLE `multiplechoiceoption` (
  `id` int(11) NOT NULL,
  `multipleChoiceId` int(11) NOT NULL COMMENT 'Foreign Key to corresponding MultipleChoice',
  `position` int(11) NOT NULL COMMENT 'NOTE may not work. Relates to order in options available',
  `label` varchar(255) NOT NULL COMMENT 'Label for the selection option',
  `value` varchar(255) NOT NULL COMMENT 'Underlying value to the label'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `multiplechoicequestion`
--

CREATE TABLE `multiplechoicequestion` (
  `id` int(11) NOT NULL,
  `surveyId` int(11) NOT NULL COMMENT 'Foreign Key to corresponding survey',
  `position` int(11) NOT NULL,
  `question` int(11) NOT NULL COMMENT 'Foreign Key to QuestionHeader',
  `label` int(11) NOT NULL COMMENT 'Foreign Key to input label'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `questionheader`
--

CREATE TABLE `questionheader` (
  `id` int(11) NOT NULL,
  `questionHeader` varchar(255) NOT NULL COMMENT 'The QuestionHeader to place for each form field'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `selectboxanswer`
--

CREATE TABLE `selectboxanswer` (
  `id` int(11) NOT NULL,
  `answererId` int(11) NOT NULL COMMENT 'Id of answerer, which would normally be foreign key',
  `selectBoxQuestionId` int(11) NOT NULL COMMENT 'Foreign Key to the corresponding SelectBox question',
  `answer` int(11) NOT NULL COMMENT 'Choice is a value related to position in selection box'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `selectboxoption`
--

CREATE TABLE `selectboxoption` (
  `id` int(11) NOT NULL,
  `selectBoxId` int(11) NOT NULL COMMENT 'Foreign Key to the coresponding SelectBox Question',
  `position` int(11) NOT NULL COMMENT 'NOTE: May be buggy, not sure if position is saved correctly',
  `label` varchar(255) NOT NULL COMMENT 'Label that appears to user',
  `value` varchar(255) NOT NULL COMMENT 'Underlining Value to label'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `selectboxquestion`
--

CREATE TABLE `selectboxquestion` (
  `id` int(11) NOT NULL,
  `surveyId` int(11) NOT NULL COMMENT 'Foreign Key to the containing Form',
  `position` int(11) NOT NULL,
  `question` int(11) NOT NULL COMMENT 'Foreign Key to questionHeader',
  `label` int(11) NOT NULL COMMENT 'Foreign Key to Label'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shortansweranswer`
--

CREATE TABLE `shortansweranswer` (
  `id` int(11) NOT NULL,
  `shortAnswerId` int(11) NOT NULL COMMENT 'Foreign Key to corresponding shortAnswer formField',
  `answererId` int(11) NOT NULL COMMENT 'Identifier for the person answering, should be a key but for now is a pseudo identifier',
  `response` varchar(500) NOT NULL COMMENT 'Response text. Note that on program side, the max value is 500, not sure if db can handle this'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shortanswerquestion`
--

CREATE TABLE `shortanswerquestion` (
  `id` int(11) NOT NULL,
  `surveyId` int(11) NOT NULL COMMENT 'Foreign Key to corresponding survey',
  `position` int(11) NOT NULL COMMENT 'position in survey relative to other formFields',
  `question` int(11) NOT NULL COMMENT 'Foreign Key to QuestionHeader',
  `label` int(11) NOT NULL COMMENT 'Foreign Key to label for the input'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shortparagraphanswer`
--

CREATE TABLE `shortparagraphanswer` (
  `id` int(11) NOT NULL,
  `shortParagraphId` int(11) NOT NULL COMMENT 'Foreign Key to corresponding shortParagraph formField',
  `answererId` int(11) NOT NULL COMMENT 'Integer used to identify person responding. Should be key, but for now just a pseudo identifier',
  `response` text NOT NULL COMMENT 'The text response. Note that on programming side max character limit is capped at 500, not sure if DB can accept this setting'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shortparagraphquestion`
--

CREATE TABLE `shortparagraphquestion` (
  `id` int(11) NOT NULL,
  `surveyId` int(11) NOT NULL COMMENT 'Foreign Key to corresponding survey',
  `position` int(11) NOT NULL COMMENT 'Position relative to other formFields',
  `question` int(11) NOT NULL COMMENT 'Foreign Key to corresponding questionHeader'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `starratinganswer`
--

CREATE TABLE `starratinganswer` (
  `id` int(11) NOT NULL,
  `answererId` int(11) NOT NULL COMMENT 'Id for who answered, could be a key but for now keep simple',
  `starRatingId` int(11) NOT NULL COMMENT 'Foreign Key to corresponding Star Rating Question',
  `response` int(10) NOT NULL COMMENT 'The response, a number from 1 to how many author allowed '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `starratingquestion`
--

CREATE TABLE `starratingquestion` (
  `id` int(11) NOT NULL,
  `surveyId` int(11) NOT NULL COMMENT 'Foreign key to the Survey it belongs to',
  `position` int(11) NOT NULL COMMENT 'position in the form',
  `question` int(11) NOT NULL COMMENT 'foreign key to QuestionHeader',
  `label` int(11) NOT NULL COMMENT 'foreign key to label of input',
  `maxNumStars` int(11) NOT NULL COMMENT 'number of stars used to rate'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `survey`
--

CREATE TABLE `survey` (
  `id` int(11) NOT NULL,
  `surveyName` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL COMMENT 'Normally a foreign key to author user',
  `formJSON` int(11) NOT NULL COMMENT 'Foreign Key to JSON of the form'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `surveyjson`
--

CREATE TABLE `surveyjson` (
  `id` int(11) NOT NULL,
  `surveyId` varchar(255) NOT NULL,
  `surveyJSON` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`surveyJSON`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `surveyjson`
--

INSERT INTO `surveyjson` (`id`, `surveyId`, `surveyJSON`) VALUES
(4, '1234a56', '{\"numForms\":6,\"numSelectBoxes\":1,\"numParagraphs\":1,\"numShortAnswers\":1,\"numMultipleChoice\":1,\"numCheckBoxes\":1,\"numStarRatings\":1,\"SurveyList\":[{\"formType\":\"StarRating\",\"idVal\":\"starPrefabDiv_0\",\"position\":\"0\",\"numStars\":5,\"selectedOption\":3,\"question\":\"Hotel worth?\",\"label\":\"Hilton\"},{\"formType\":\"CheckBox\",\"idVal\":\"checkPrefabDiv_0\",\"position\":\"1\",\"checkOptions\":[{\"idVal\":\"Apple_1\",\"position\":0,\"label\":\"Apple\",\"value\":\"1\"},{\"idVal\":\"Bananana_1\",\"position\":1,\"label\":\"Bananana\",\"value\":\"2\"}],\"checked\":0,\"question\":\"Which you like?\",\"label\":\"Food\"},{\"formType\":\"MultipleChoice\",\"idVal\":\"multPrefabDiv_0\",\"position\":\"2\",\"multOptions\":[{\"idVal\":\"MrClean_2\",\"position\":0,\"label\":\"MrClean\",\"value\":\"1\",\"selected\":false},{\"idVal\":\"Suds vs mudz_2\",\"position\":1,\"label\":\"Suds vs mudz\",\"value\":\"2\",\"selected\":false}],\"selectedOption\":0,\"question\":\"Only one soap\",\"label\":\"Soaps\"},{\"formType\":\"ShortAnswer\",\"idVal\":\"shortAnsPrefabDiv_0\",\"position\":\"3\",\"question\":\"ONAME WA DESUKA\",\"label\":\"Name\",\"characterLim\":\"40\",\"placeHolderText\":\"put name here\"},{\"formType\":\"ShortParagraph\",\"idVal\":\"shortParaPrefabDiv_0\",\"position\":\"4\",\"question\":\"How u doin?\",\"characterLim\":\"200\",\"placeHolderText\":\"Tell me lies\"},{\"formType\":\"SelectBox\",\"idVal\":\"selectPrefabDiv_0\",\"position\":\"5\",\"selectOptions\":[{\"position\":0,\"label\":\"Easy peezy\",\"value\":\"1\"},{\"position\":1,\"label\":\"Medium\",\"value\":\"2\"},{\"position\":2,\"label\":\"Hard\",\"value\":\"3\"},{\"position\":3,\"label\":\"MEGA ULTRA HARD\",\"value\":\"4\"}],\"selectedOption\":0,\"question\":\"Choose Difficulty\",\"label\":\"Difficulty\"}]}'),
(5, '1234a56', '{\"numForms\":6,\"numSelectBoxes\":1,\"numParagraphs\":1,\"numShortAnswers\":1,\"numMultipleChoice\":1,\"numCheckBoxes\":1,\"numStarRatings\":1,\"SurveyList\":[{\"formType\":\"StarRating\",\"idVal\":\"starPrefabDiv_0\",\"position\":\"0\",\"numStars\":5,\"selectedOption\":3,\"question\":\"Hotel worth?\",\"label\":\"Hilton\"},{\"formType\":\"CheckBox\",\"idVal\":\"checkPrefabDiv_0\",\"position\":\"1\",\"checkOptions\":[{\"idVal\":\"Apple_1\",\"position\":0,\"label\":\"Apple\",\"value\":\"1\"},{\"idVal\":\"Bananana_1\",\"position\":1,\"label\":\"Bananana\",\"value\":\"2\"}],\"checked\":0,\"question\":\"Which you like?\",\"label\":\"Food\"},{\"formType\":\"MultipleChoice\",\"idVal\":\"multPrefabDiv_0\",\"position\":\"2\",\"multOptions\":[{\"idVal\":\"MrClean_2\",\"position\":0,\"label\":\"MrClean\",\"value\":\"1\",\"selected\":false},{\"idVal\":\"Suds vs mudz_2\",\"position\":1,\"label\":\"Suds vs mudz\",\"value\":\"2\",\"selected\":false}],\"selectedOption\":0,\"question\":\"Only one soap\",\"label\":\"Soaps\"},{\"formType\":\"ShortAnswer\",\"idVal\":\"shortAnsPrefabDiv_0\",\"position\":\"3\",\"question\":\"ONAME WA DESUKA\",\"label\":\"Name\",\"characterLim\":\"40\",\"placeHolderText\":\"put name here\"},{\"formType\":\"ShortParagraph\",\"idVal\":\"shortParaPrefabDiv_0\",\"position\":\"4\",\"question\":\"How u doin?\",\"characterLim\":\"200\",\"placeHolderText\":\"Tell me lies\"},{\"formType\":\"SelectBox\",\"idVal\":\"selectPrefabDiv_0\",\"position\":\"5\",\"selectOptions\":[{\"position\":0,\"label\":\"Easy peezy\",\"value\":\"1\"},{\"position\":1,\"label\":\"Medium\",\"value\":\"2\"},{\"position\":2,\"label\":\"Hard\",\"value\":\"3\"},{\"position\":3,\"label\":\"MEGA ULTRA HARD\",\"value\":\"4\"}],\"selectedOption\":0,\"question\":\"Choose Difficulty\",\"label\":\"Difficulty\"}]}'),
(6, '1234a56', '{\"numForms\":6,\"numSelectBoxes\":1,\"numParagraphs\":1,\"numShortAnswers\":1,\"numMultipleChoice\":1,\"numCheckBoxes\":1,\"numStarRatings\":1,\"SurveyList\":[{\"formType\":\"StarRating\",\"idVal\":\"starPrefabDiv_0\",\"position\":\"0\",\"numStars\":5,\"selectedOption\":3,\"question\":\"Hotel worth?\",\"label\":\"Hilton\"},{\"formType\":\"CheckBox\",\"idVal\":\"checkPrefabDiv_0\",\"position\":\"1\",\"checkOptions\":[{\"idVal\":\"Apple_1\",\"position\":0,\"label\":\"Apple\",\"value\":\"1\"},{\"idVal\":\"Bananana_1\",\"position\":1,\"label\":\"Bananana\",\"value\":\"2\"}],\"checked\":0,\"question\":\"Which you like?\",\"label\":\"Food\"},{\"formType\":\"MultipleChoice\",\"idVal\":\"multPrefabDiv_0\",\"position\":\"2\",\"multOptions\":[{\"idVal\":\"MrClean_2\",\"position\":0,\"label\":\"MrClean\",\"value\":\"1\",\"selected\":false},{\"idVal\":\"Suds vs mudz_2\",\"position\":1,\"label\":\"Suds vs mudz\",\"value\":\"2\",\"selected\":false}],\"selectedOption\":0,\"question\":\"Only one soap\",\"label\":\"Soaps\"},{\"formType\":\"ShortAnswer\",\"idVal\":\"shortAnsPrefabDiv_0\",\"position\":\"3\",\"question\":\"ONAME WA DESUKA\",\"label\":\"Name\",\"characterLim\":\"40\",\"placeHolderText\":\"put name here\"},{\"formType\":\"ShortParagraph\",\"idVal\":\"shortParaPrefabDiv_0\",\"position\":\"4\",\"question\":\"How u doin?\",\"characterLim\":\"200\",\"placeHolderText\":\"Tell me lies\"},{\"formType\":\"SelectBox\",\"idVal\":\"selectPrefabDiv_0\",\"position\":\"5\",\"selectOptions\":[{\"position\":0,\"label\":\"Easy peezy\",\"value\":\"1\"},{\"position\":1,\"label\":\"Medium\",\"value\":\"2\"},{\"position\":2,\"label\":\"Hard\",\"value\":\"3\"},{\"position\":3,\"label\":\"MEGA ULTRA HARD\",\"value\":\"4\"}],\"selectedOption\":0,\"question\":\"Choose Difficulty\",\"label\":\"Difficulty\"}]}'),
(7, '1234a56', '{\"numForms\":6,\"numSelectBoxes\":1,\"numParagraphs\":1,\"numShortAnswers\":1,\"numMultipleChoice\":1,\"numCheckBoxes\":1,\"numStarRatings\":1,\"SurveyList\":[{\"formType\":\"StarRating\",\"idVal\":\"starPrefabDiv_0\",\"position\":\"0\",\"numStars\":5,\"selectedOption\":3,\"question\":\"Hotel worth?\",\"label\":\"Hilton\"},{\"formType\":\"CheckBox\",\"idVal\":\"checkPrefabDiv_0\",\"position\":\"1\",\"checkOptions\":[{\"idVal\":\"Apple_1\",\"position\":0,\"label\":\"Apple\",\"value\":\"1\"},{\"idVal\":\"Bananana_1\",\"position\":1,\"label\":\"Bananana\",\"value\":\"2\"}],\"checked\":0,\"question\":\"Which you like?\",\"label\":\"Food\"},{\"formType\":\"MultipleChoice\",\"idVal\":\"multPrefabDiv_0\",\"position\":\"2\",\"multOptions\":[{\"idVal\":\"MrClean_2\",\"position\":0,\"label\":\"MrClean\",\"value\":\"1\",\"selected\":false},{\"idVal\":\"Suds vs mudz_2\",\"position\":1,\"label\":\"Suds vs mudz\",\"value\":\"2\",\"selected\":false}],\"selectedOption\":0,\"question\":\"Only one soap\",\"label\":\"Soaps\"},{\"formType\":\"ShortAnswer\",\"idVal\":\"shortAnsPrefabDiv_0\",\"position\":\"3\",\"question\":\"ONAME WA DESUKA\",\"label\":\"Name\",\"characterLim\":\"40\",\"placeHolderText\":\"put name here\"},{\"formType\":\"ShortParagraph\",\"idVal\":\"shortParaPrefabDiv_0\",\"position\":\"4\",\"question\":\"How u doin?\",\"characterLim\":\"200\",\"placeHolderText\":\"Tell me lies\"},{\"formType\":\"SelectBox\",\"idVal\":\"selectPrefabDiv_0\",\"position\":\"5\",\"selectOptions\":[{\"position\":0,\"label\":\"Easy peezy\",\"value\":\"1\"},{\"position\":1,\"label\":\"Medium\",\"value\":\"2\"},{\"position\":2,\"label\":\"Hard\",\"value\":\"3\"},{\"position\":3,\"label\":\"MEGA ULTRA HARD\",\"value\":\"4\"}],\"selectedOption\":0,\"question\":\"Choose Difficulty\",\"label\":\"Difficulty\"}]}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `checkboxanswer`
--
ALTER TABLE `checkboxanswer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `checkBoxQuestioId` (`checkBoxQuestioId`);

--
-- Indexes for table `checkboxoption`
--
ALTER TABLE `checkboxoption`
  ADD PRIMARY KEY (`id`),
  ADD KEY `checkBoxQuestionId` (`checkBoxQuestionId`);

--
-- Indexes for table `checkboxquestion`
--
ALTER TABLE `checkboxquestion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `label` (`label`),
  ADD KEY `question` (`question`),
  ADD KEY `surveyId` (`surveyId`);

--
-- Indexes for table `label`
--
ALTER TABLE `label`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multiplechoiceanswer`
--
ALTER TABLE `multiplechoiceanswer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `multipleChoiceId` (`multipleChoiceId`);

--
-- Indexes for table `multiplechoiceoption`
--
ALTER TABLE `multiplechoiceoption`
  ADD PRIMARY KEY (`id`),
  ADD KEY `multipleChoiceId` (`multipleChoiceId`);

--
-- Indexes for table `multiplechoicequestion`
--
ALTER TABLE `multiplechoicequestion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `label` (`label`),
  ADD KEY `question` (`question`),
  ADD KEY `surveyId` (`surveyId`);

--
-- Indexes for table `questionheader`
--
ALTER TABLE `questionheader`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `selectboxanswer`
--
ALTER TABLE `selectboxanswer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `selectBoxQuestionId` (`selectBoxQuestionId`);

--
-- Indexes for table `selectboxoption`
--
ALTER TABLE `selectboxoption`
  ADD PRIMARY KEY (`id`),
  ADD KEY `selectBoxId` (`selectBoxId`);

--
-- Indexes for table `selectboxquestion`
--
ALTER TABLE `selectboxquestion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `surveyId` (`surveyId`),
  ADD KEY `label` (`label`),
  ADD KEY `question` (`question`);

--
-- Indexes for table `shortansweranswer`
--
ALTER TABLE `shortansweranswer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shortAnswerId` (`shortAnswerId`);

--
-- Indexes for table `shortanswerquestion`
--
ALTER TABLE `shortanswerquestion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `label` (`label`),
  ADD KEY `question` (`question`),
  ADD KEY `surveyId` (`surveyId`);

--
-- Indexes for table `shortparagraphanswer`
--
ALTER TABLE `shortparagraphanswer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shortParagraphId` (`shortParagraphId`);

--
-- Indexes for table `shortparagraphquestion`
--
ALTER TABLE `shortparagraphquestion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `surveyId` (`surveyId`),
  ADD KEY `question` (`question`);

--
-- Indexes for table `starratinganswer`
--
ALTER TABLE `starratinganswer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `starRatingId` (`starRatingId`);

--
-- Indexes for table `starratingquestion`
--
ALTER TABLE `starratingquestion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question` (`question`),
  ADD KEY `surveyId` (`surveyId`),
  ADD KEY `label` (`label`);

--
-- Indexes for table `survey`
--
ALTER TABLE `survey`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formJSON` (`formJSON`);

--
-- Indexes for table `surveyjson`
--
ALTER TABLE `surveyjson`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `checkboxanswer`
--
ALTER TABLE `checkboxanswer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `checkboxoption`
--
ALTER TABLE `checkboxoption`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `checkboxquestion`
--
ALTER TABLE `checkboxquestion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `label`
--
ALTER TABLE `label`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multiplechoiceanswer`
--
ALTER TABLE `multiplechoiceanswer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multiplechoiceoption`
--
ALTER TABLE `multiplechoiceoption`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multiplechoicequestion`
--
ALTER TABLE `multiplechoicequestion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questionheader`
--
ALTER TABLE `questionheader`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `selectboxanswer`
--
ALTER TABLE `selectboxanswer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `selectboxoption`
--
ALTER TABLE `selectboxoption`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `selectboxquestion`
--
ALTER TABLE `selectboxquestion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shortansweranswer`
--
ALTER TABLE `shortansweranswer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shortanswerquestion`
--
ALTER TABLE `shortanswerquestion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shortparagraphanswer`
--
ALTER TABLE `shortparagraphanswer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shortparagraphquestion`
--
ALTER TABLE `shortparagraphquestion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `starratinganswer`
--
ALTER TABLE `starratinganswer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `starratingquestion`
--
ALTER TABLE `starratingquestion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `survey`
--
ALTER TABLE `survey`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `surveyjson`
--
ALTER TABLE `surveyjson`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `checkboxanswer`
--
ALTER TABLE `checkboxanswer`
  ADD CONSTRAINT `checkboxanswer_ibfk_1` FOREIGN KEY (`checkBoxQuestioId`) REFERENCES `checkboxquestion` (`id`);

--
-- Constraints for table `checkboxoption`
--
ALTER TABLE `checkboxoption`
  ADD CONSTRAINT `checkboxoption_ibfk_1` FOREIGN KEY (`checkBoxQuestionId`) REFERENCES `checkboxquestion` (`id`);

--
-- Constraints for table `checkboxquestion`
--
ALTER TABLE `checkboxquestion`
  ADD CONSTRAINT `checkboxquestion_ibfk_1` FOREIGN KEY (`label`) REFERENCES `label` (`id`),
  ADD CONSTRAINT `checkboxquestion_ibfk_2` FOREIGN KEY (`question`) REFERENCES `questionheader` (`id`),
  ADD CONSTRAINT `checkboxquestion_ibfk_3` FOREIGN KEY (`surveyId`) REFERENCES `survey` (`id`);

--
-- Constraints for table `multiplechoiceanswer`
--
ALTER TABLE `multiplechoiceanswer`
  ADD CONSTRAINT `multiplechoiceanswer_ibfk_1` FOREIGN KEY (`multipleChoiceId`) REFERENCES `multiplechoicequestion` (`id`);

--
-- Constraints for table `multiplechoiceoption`
--
ALTER TABLE `multiplechoiceoption`
  ADD CONSTRAINT `multiplechoiceoption_ibfk_1` FOREIGN KEY (`multipleChoiceId`) REFERENCES `multiplechoicequestion` (`id`);

--
-- Constraints for table `multiplechoicequestion`
--
ALTER TABLE `multiplechoicequestion`
  ADD CONSTRAINT `multiplechoicequestion_ibfk_1` FOREIGN KEY (`label`) REFERENCES `label` (`id`),
  ADD CONSTRAINT `multiplechoicequestion_ibfk_2` FOREIGN KEY (`question`) REFERENCES `questionheader` (`id`),
  ADD CONSTRAINT `multiplechoicequestion_ibfk_3` FOREIGN KEY (`surveyId`) REFERENCES `survey` (`id`);

--
-- Constraints for table `selectboxanswer`
--
ALTER TABLE `selectboxanswer`
  ADD CONSTRAINT `selectboxanswer_ibfk_1` FOREIGN KEY (`selectBoxQuestionId`) REFERENCES `selectboxquestion` (`id`);

--
-- Constraints for table `selectboxoption`
--
ALTER TABLE `selectboxoption`
  ADD CONSTRAINT `selectboxoption_ibfk_1` FOREIGN KEY (`selectBoxId`) REFERENCES `selectboxquestion` (`id`);

--
-- Constraints for table `selectboxquestion`
--
ALTER TABLE `selectboxquestion`
  ADD CONSTRAINT `selectboxquestion_ibfk_1` FOREIGN KEY (`surveyId`) REFERENCES `survey` (`id`),
  ADD CONSTRAINT `selectboxquestion_ibfk_2` FOREIGN KEY (`label`) REFERENCES `label` (`id`),
  ADD CONSTRAINT `selectboxquestion_ibfk_3` FOREIGN KEY (`question`) REFERENCES `questionheader` (`id`);

--
-- Constraints for table `shortansweranswer`
--
ALTER TABLE `shortansweranswer`
  ADD CONSTRAINT `shortansweranswer_ibfk_1` FOREIGN KEY (`shortAnswerId`) REFERENCES `shortanswerquestion` (`id`);

--
-- Constraints for table `shortanswerquestion`
--
ALTER TABLE `shortanswerquestion`
  ADD CONSTRAINT `shortanswerquestion_ibfk_1` FOREIGN KEY (`label`) REFERENCES `label` (`id`),
  ADD CONSTRAINT `shortanswerquestion_ibfk_2` FOREIGN KEY (`question`) REFERENCES `questionheader` (`id`),
  ADD CONSTRAINT `shortanswerquestion_ibfk_3` FOREIGN KEY (`surveyId`) REFERENCES `survey` (`id`);

--
-- Constraints for table `shortparagraphanswer`
--
ALTER TABLE `shortparagraphanswer`
  ADD CONSTRAINT `shortparagraphanswer_ibfk_1` FOREIGN KEY (`shortParagraphId`) REFERENCES `shortparagraphquestion` (`id`);

--
-- Constraints for table `shortparagraphquestion`
--
ALTER TABLE `shortparagraphquestion`
  ADD CONSTRAINT `shortparagraphquestion_ibfk_1` FOREIGN KEY (`surveyId`) REFERENCES `survey` (`id`),
  ADD CONSTRAINT `shortparagraphquestion_ibfk_2` FOREIGN KEY (`question`) REFERENCES `questionheader` (`id`);

--
-- Constraints for table `starratinganswer`
--
ALTER TABLE `starratinganswer`
  ADD CONSTRAINT `starratinganswer_ibfk_1` FOREIGN KEY (`starRatingId`) REFERENCES `starratingquestion` (`id`);

--
-- Constraints for table `starratingquestion`
--
ALTER TABLE `starratingquestion`
  ADD CONSTRAINT `starratingquestion_ibfk_1` FOREIGN KEY (`question`) REFERENCES `questionheader` (`id`),
  ADD CONSTRAINT `starratingquestion_ibfk_2` FOREIGN KEY (`surveyId`) REFERENCES `survey` (`id`),
  ADD CONSTRAINT `starratingquestion_ibfk_3` FOREIGN KEY (`label`) REFERENCES `label` (`id`);

--
-- Constraints for table `survey`
--
ALTER TABLE `survey`
  ADD CONSTRAINT `survey_ibfk_1` FOREIGN KEY (`formJSON`) REFERENCES `surveyjson` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
