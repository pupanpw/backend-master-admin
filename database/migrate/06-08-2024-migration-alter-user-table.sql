ALTER TABLE PUPAN.`USER`
ADD EMAIL VARCHAR(255) NOT NULL;

ALTER TABLE PUPAN.`USER`
ADD CONSTRAINT USER_UNIQUE UNIQUE (EMAIL);
