-- KDU Global — full schema (5 tables + optional seed rows)
--
-- Run against your MySQL database (Railway: use MYSQLDATABASE name; phpMyAdmin: pick DB first).
-- Tables: programs, news, events, contact_messages, newsletter_subscribers
--
-- If you only see newsletter_subscribers elsewhere, you are editing a different/old file.
-- This repo’s canonical file is: sql/schema.sql (project root).

-- CREATE DATABASE IF NOT EXISTS `kdu_global` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE `kdu_global`;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `contact_messages`;
DROP TABLE IF EXISTS `newsletter_subscribers`;
DROP TABLE IF EXISTS `events`;
DROP TABLE IF EXISTS `news`;
DROP TABLE IF EXISTS `programs`;

SET FOREIGN_KEY_CHECKS = 1;

-- ---------------------------------------------------------------------------
-- Programs (slug id matches frontend `id`; bilingual + tags JSON)
-- ---------------------------------------------------------------------------
CREATE TABLE `programs` (
  `id` VARCHAR(80) NOT NULL,
  `level` VARCHAR(80) NOT NULL DEFAULT '',
  `level_ko` VARCHAR(80) NOT NULL DEFAULT '',
  `title` VARCHAR(255) NOT NULL,
  `title_ko` VARCHAR(255) NOT NULL DEFAULT '',
  `description` TEXT NOT NULL,
  `description_ko` TEXT NOT NULL,
  `duration` VARCHAR(80) NOT NULL DEFAULT '',
  `campus` VARCHAR(160) NOT NULL DEFAULT '',
  `tags` JSON NULL,
  `image` VARCHAR(512) NOT NULL DEFAULT '',
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_programs_active_sort` (`is_active`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- News (slug id; `article_date` maps to frontend `date`; content = JSON array of paragraphs)
-- ---------------------------------------------------------------------------
CREATE TABLE `news` (
  `id` VARCHAR(80) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `title_ko` VARCHAR(255) NOT NULL DEFAULT '',
  `article_date` DATE NOT NULL,
  `category` VARCHAR(80) NOT NULL DEFAULT '',
  `category_ko` VARCHAR(80) NOT NULL DEFAULT '',
  `highlight` TEXT NOT NULL,
  `highlight_ko` TEXT NOT NULL,
  `excerpt` TEXT NOT NULL,
  `image` VARCHAR(512) NOT NULL DEFAULT '',
  `object_position` VARCHAR(80) NULL DEFAULT NULL,
  `content` JSON NOT NULL,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_news_date` (`article_date`),
  KEY `idx_news_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Events (slug id; `event_date` maps to frontend `date`)
-- ---------------------------------------------------------------------------
CREATE TABLE `events` (
  `id` VARCHAR(80) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `event_date` DATE NOT NULL,
  `location` VARCHAR(255) NOT NULL DEFAULT '',
  `type` VARCHAR(80) NOT NULL DEFAULT '',
  `image` VARCHAR(512) NOT NULL DEFAULT '',
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_events_date` (`event_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Contact form submissions (name, email, message)
-- ---------------------------------------------------------------------------
CREATE TABLE `contact_messages` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(160) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_contact_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Newsletter (used by backend/public/api/newsletter.php)
-- ---------------------------------------------------------------------------
CREATE TABLE `newsletter_subscribers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `source` VARCHAR(80) NOT NULL DEFAULT '',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_newsletter_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Seed data: programs/news/events mirror frontend/data/*.json; contact + newsletter
-- are demo rows only (replace/remove when you go live). Delete this block for empty tables.
-- ---------------------------------------------------------------------------

INSERT INTO `programs` (`id`, `level`, `level_ko`, `title`, `title_ko`, `description`, `description_ko`, `duration`, `campus`, `tags`, `image`, `sort_order`) VALUES
('smart-computing', 'Bachelor', '학사', 'Bachelor of Smart Computing', '스마트컴퓨팅 학사', 'Modern software engineering, cloud-ready systems, and practical computing for global careers.', '현대 소프트웨어 공학, 클라우드 기반 시스템, 글로벌 진로를 위한 실무 컴퓨팅.', '4 years', 'KDU Global Campus', JSON_ARRAY('Software', 'Cloud', 'Systems'), 'assets/images/program-smart-computing.png', 10),
('artificial-intelligence', 'Bachelor', '학사', 'Bachelor of Artificial Intelligence', '인공지능 학사', 'AI fundamentals, applied machine learning, and ethical innovation for real-world impact.', 'AI 기초, 응용 머신러닝, 실제 영향을 위한 윤리적 혁신.', '4 years', 'KDU Global Campus', JSON_ARRAY('AI', 'ML', 'Innovation'), 'assets/images/program-artificial-intelligence.png', 20),
('international-hotel-management', 'Bachelor', '학사', 'Bachelor of International Hotel Management', '국제호텔경영 학사', 'Hospitality operations, guest experience, and leadership for an international service industry.', '호스피탈리티 운영, 고객 경험, 국제 서비스 산업을 위한 리더십.', '4 years', 'KDU Global Campus', JSON_ARRAY('Hospitality', 'Operations', 'Leadership'), 'assets/images/program-international-hotel-management.png', 30),
('international-business-management', 'Bachelor', '학사', 'Bachelor of International Business Management', '국제경영 학사', 'Business strategy, marketing, and cross-cultural management for a global economy.', '글로벌 경제를 위한 경영 전략, 마케팅, 다문화 경영.', '4 years', 'KDU Global Campus', JSON_ARRAY('Business', 'Management', 'Global'), 'assets/images/program-international-business-management.png', 40);

INSERT INTO `news` (`id`, `title`, `title_ko`, `article_date`, `category`, `category_ko`, `highlight`, `highlight_ko`, `excerpt`, `image`, `object_position`, `content`) VALUES
('global-partnerships', 'KDU Global Expands Partnerships Across Asia & Europe', 'KDU Global, 아시아·유럽 파트너십 확대', '2026-04-18', 'Global', '글로벌', 'New exchange pathways, dual-degree options, and joint programs for international student success.', '교류·복수학위·공동 프로그램으로 국제 학생 성과를 지원합니다.', 'KDU Global continues to expand international partnerships to create stronger mobility and academic collaboration for global students.', 'assets/images/news-1.png', 'center 30%', JSON_ARRAY(
  'KDU Global has announced new partnerships across Asia and Europe to strengthen international student mobility and academic collaboration.',
  'These partnerships expand exchange pathways and support joint learning experiences aligned with global industry needs.',
  'Students benefit from broader academic options, stronger international networks, and clearer global career outcomes.'
)),
('ai-lab', 'New AI Innovation Lab Opens at KDU Global', 'KDU Global AI 혁신 랩 오픈', '2026-04-29', 'Research', '연구', 'A production-ready environment for ML prototyping, data engineering, and industry collaboration.', 'ML 프로토타입, 데이터 엔지니어링, 산학 협력을 위한 실무 환경.', 'The AI Innovation Lab provides a modern learning and research environment designed for practical, career-ready outcomes.', 'assets/images/news-2.png', 'center 40%', JSON_ARRAY(
  'The new AI Innovation Lab supports hands-on projects across machine learning, data engineering, and applied research.',
  'The space is designed to help students build portfolio-grade work and collaborate with industry-style workflows.',
  'KDU Global continues to invest in modern learning environments to support international student success.'
)),
('scholarships', 'Scholarships 2026: Merit-Based Awards for Global Students', '2026 장학금: 글로벌 학생 우수 장학', '2026-05-02', 'Admissions', '입학', 'Multiple scholarship tracks, streamlined review, and early decision benefits for international applicants.', '다양한 장학 트랙, 간소화된 심사, 조기 지원 혜택.', 'Scholarships for 2026 are available for eligible global students with strong academic performance and leadership potential.', 'assets/images/news-3.png', 'center 18%', JSON_ARRAY(
  'KDU Global scholarships for 2026 support international applicants through a range of merit-based tracks.',
  'Applicants are encouraged to prepare a strong academic profile and submit clear supporting documents early.',
  'Admissions advisors are available to guide students through eligibility and application timelines.'
));

INSERT INTO `events` (`id`, `title`, `event_date`, `location`, `type`, `image`, `sort_order`) VALUES
('open-day', 'International Open Day (Online)', '2026-05-22', 'Zoom', 'Event', 'assets/images/event-1.png', 10),
('scholarship-webinar', 'Scholarship Webinar: How to Maximize Your Award', '2026-05-28', 'KDU Global Center', 'Webinar', 'assets/images/event-2.png', 20),
('campus-tour', 'Weekend Campus Tour (English)', '2026-06-07', 'Seoul Campus', 'Tour', 'assets/images/event-3.png', 30);

INSERT INTO `contact_messages` (`name`, `email`, `message`, `created_at`) VALUES
('Avery Chen', 'avery.chen.demo@example.com', 'Hello — I am interested in the Bachelor of Artificial Intelligence for Fall 2026. Could you share the English proficiency requirements and application deadlines?', '2026-05-01 09:15:00'),
('Jordan Kim', 'jordan.kim.demo@example.com', 'I would like to know if transfer credits from a two-year college are accepted for Smart Computing. Thank you.', '2026-05-03 14:40:00'),
('Samira Patel', 'samira.patel.demo@example.com', 'We are planning a campus visit in June. Is there a weekday admissions briefing we can join?', '2026-05-05 11:05:00');

INSERT INTO `newsletter_subscribers` (`email`, `source`, `created_at`) VALUES
('newsletter.demo.1@example.com', 'homepage', '2026-05-02 08:00:00'),
('newsletter.demo.2@example.com', 'footer', '2026-05-04 16:30:00'),
('newsletter.demo.3@example.com', 'homepage', '2026-05-06 12:00:00');
