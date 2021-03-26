DROP SCHEMA IF EXISTS PropTech_Test_DB;
CREATE SCHEMA PropTech_Test_DB;
USE PropTech_Test_DB;

CREATE TABLE user (
  user_id VARCHAR(45) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE utility_account (

  account_id VARCHAR(45) NOT NULL,
  user_id VARCHAR(45) NOT NULL,
  PRIMARY KEY (account_id),
  UNIQUE KEY (account_id),
  KEY idx_account_id(account_id),
  KEY idx_fk_user_id (user_id),
  CONSTRAINT idx_fk_user_id 
	FOREIGN KEY (user_id) 
    REFERENCES user(user_id) 
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE property (
	property_id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(45) NOT NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    property_type ENUM('commercial', 'residential') NOT NULL,
    PRIMARY KEY (property_id),
    UNIQUE KEY (property_id),
    KEY idx_property_id (property_id),
    KEY idx_fk_2_user_id (user_id),
    CONSTRAINT idx_fk_2_user_id
		FOREIGN KEY (user_id)
        REFERENCES user(user_id)
        ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE meter (
  meter_id INT NOT NULL,
  property_id INT NOT NULL,
  PRIMARY KEY (meter_id, property_id),
  UNIQUE KEY (meter_id, property_id),
  KEY idx_meter_id(meter_id),
  KEY idx_fk_property_id(property_id),
  CONSTRAINT idx_fk_property_id
	FOREIGN KEY (property_id)
    REFERENCES property(property_id)
    ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE bill (
  bill_id INT NOT NULL AUTO_INCREMENT,
  utility_account_id INT,
  account_id VARCHAR(45) NOT NULL,
  meter_id INT NOT NULL,
  kwh_usage INT NOT NULL,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  charges FLOAT NOT NULL,
  PRIMARY KEY (bill_id),
  KEY idx_fk_account_id (account_id),
  KEY idx_fk_meter_id (meter_id),
  CONSTRAINT account_id 
	FOREIGN KEY (account_id) 
	REFERENCES utility_account(account_id) ON DELETE CASCADE,
  CONSTRAINT meter_id
	FOREIGN KEY (meter_id)
    REFERENCES meter(meter_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE tenant (
	tenant_id INT AUTO_INCREMENT,
    property_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    property_share FLOAT NOT NULL,
    PRIMARY KEY(tenant_id),
    UNIQUE KEY(tenant_id, email),
    KEY idx_tenant_id (tenant_id),
    KEY idx_email(email),
    KEY idx_fk_2_property_id(property_id),
    CONSTRAINT idx_fk_2_property_id
		FOREIGN KEY (property_id)
        REFERENCES property(property_id)
        ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE invoice (
	invoice_id INT NOT NULL AUTO_INCREMENT,
    tenant_id INT NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    amount FLOAT NOT NULL,
    PRIMARY KEY (invoice_id),
    KEY idx_invoice_id(invoice_id),
    KEY idx_fk_tenant_id(tenant_id),
    CONSTRAINT idx_fk_tenant_id
		FOREIGN KEY (tenant_id)
		REFERENCES tenant(tenant_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE checkmeter (
	checkmeter_id INT NOT NULL,
    tenant_id INT NOT NULL,
    PRIMARY KEY (checkmeter_id),
    UNIQUE KEY (checkmeter_id),
    KEY idx_checkmeter_id (checkmeter_id),
    KEY idx_fk_2_tenant_id (tenant_id),
    CONSTRAINT idx_fk_2_tenant_id 
		FOREIGN KEY (tenant_id)
        REFERENCES tenant(tenant_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

