-- Ensure a fallback admin user exists so existing properties can satisfy FK
INSERT INTO "User" ("id", "email", "password", "name", "role", "createdAt")
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'system@lotusliving.local',
  '$2b$10$tkjhTf5g2CzjF6AZkxTOW.hkkzd3GX1nndLO8qrU9WSy.DQ099BJS',
  'System',
  'admin',
  NOW()
)
ON CONFLICT ("email") DO NOTHING;

UPDATE "User"
SET id = '00000000-0000-0000-0000-000000000000'
WHERE email = 'system@lotusliving.local'
  AND id <> '00000000-0000-0000-0000-000000000000';

-- Point any existing properties at the fallback admin if they lack a valid user
UPDATE properties p
SET user_id = '00000000-0000-0000-0000-000000000000'
WHERE NOT EXISTS (
  SELECT 1 FROM "User" u WHERE u.id = p.user_id
);

-- Align column types
ALTER TABLE "User"
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ(6) USING "createdAt"::timestamptz;

-- Index for the new relation
CREATE INDEX IF NOT EXISTS "properties_user_id_idx" ON properties("user_id");

-- Foreign key relation to User
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_name = 'properties_user_id_fkey'
      AND table_name = 'properties'
  ) THEN
    ALTER TABLE properties
    ADD CONSTRAINT properties_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES "User"(id)
    ON UPDATE CASCADE ON DELETE RESTRICT;
  END IF;
END $$;
