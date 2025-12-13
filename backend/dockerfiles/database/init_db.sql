USE to_do_apps_docker;

CREATE TABLE `breeds` (
    `bid` int NOT NULL AUTO_INCREMENT,
    `breed` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`bid`)
    ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

INSERT INTO `breeds` (`bid`, `breed`) VALUES
                                          (1, 'Affenpinscher'),
                                          (2, 'Airedale Terrier'),
                                          (3, 'Barbet'),
                                          (4, 'English Foxhound'),
                                          (6, 'Bullmastiff');

CREATE TABLE `dogs` (
    `did` int NOT NULL AUTO_INCREMENT,
    `sku` varchar(10) DEFAULT NULL,
    `nickname` varchar(50) DEFAULT NULL,
    `age` int DEFAULT NULL,
    `alive` tinyint(1) DEFAULT NULL,
    `bid` int DEFAULT NULL,
    PRIMARY KEY (`did`),
    KEY `fk_bid_breeds` (`bid`),
    CONSTRAINT `fk_bid_breeds` FOREIGN KEY (`bid`) REFERENCES `breeds` (`bid`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

INSERT INTO `dogs` (`did`, `sku`, `nickname`, `age`, `alive`, `bid`) VALUES
                                                                         (1, '1000000001', 'Author', 2, 1, 1),
                                                                         (2, '1000000002', 'Max', 1, 1, 1),
                                                                         (3, '1000000003', 'Alun', 3, 1, 2),
                                                                         (4, '1000000004', 'Burn', 1, 0, 3),
                                                                         (6, '1000000005', 'Anter', 3, 1, 4);

