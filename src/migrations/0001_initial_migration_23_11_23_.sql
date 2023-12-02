
-- UP MIGRATIONS

-- installing uuid-ossp if it doens't exists

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Time Stamp function

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    IF TG_OP = 'INSERT' THEN
        NEW.created_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


create table manufacturer (
    id uuid DEFAULT uuid_generate_v4 (),
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE (name)	
);

CREATE TRIGGER trigger_set_timestamp
BEFORE INSERT OR UPDATE ON manufacturer
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();



create table equipment (
    id uuid DEFAULT uuid_generate_v4 (),
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	manufacturer_id uuid NOT NULL,
	model VARCHAR NOT NULL,
	serialNumber VARCHAR NOT NULL,
	PRIMARY KEY (id),
	  CONSTRAINT fk_manufacturer
      FOREIGN KEY(manufacturer_id) 
	  REFERENCES manufacturer(id)
      ON DELETE CASCADE
);


CREATE TRIGGER trigger_set_timestamp
BEFORE INSERT OR UPDATE ON equipment
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();


-- DOWN MIGRATIONS

-- Down migration for equipment table
DROP TRIGGER IF EXISTS trigger_set_timestamp ON equipment;

DROP TABLE IF EXISTS equipment;

-- Down migration for manufacturer table
DROP TRIGGER IF EXISTS trigger_set_timestamp ON manufacturer;

DROP TABLE IF EXISTS manufacturer;

-- Drop the UUID extension if it was created
DROP EXTENSION IF EXISTS "uuid-ossp";

