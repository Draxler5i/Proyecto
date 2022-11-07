import client from './conection'

const init = async (query: string) => {
	try {
		await client.query(query)
	} catch (error) {
		console.error(`${error}`)
		throw error
	}
}

const text = `
    CREATE TABLE IF NOT EXISTS stadiums (
        id_stadium serial4 NOT NULL,
        name_stadium varchar(50) NOT NULL,
        CONSTRAINT stadiums_pk PRIMARY KEY (id_stadium));

    CREATE TABLE IF NOT EXISTS users (
        id_user serial4 NOT NULL,
        name_user varchar(20) NOT NULL,
        age int4 NOT NULL,
        email varchar(50) NOT NULL,
        "password" varchar NOT NULL,
        birthday date NOT NULL,
        created date NOT NULL,
        lastname varchar(30) NOT NULL,
        CONSTRAINT users_pkey PRIMARY KEY (id_user));

    CREATE TABLE IF NOT EXISTS creditcard (
        id_card serial4 NOT NULL,
        name_card varchar(50) NOT NULL,
        expiration varchar(5) NOT NULL,
        created date NOT NULL,
        balance int4 NOT NULL,
        cvv int4 NOT NULL,
        id_user int4 NOT NULL,
        "number" varchar(30) NOT NULL,
	    CONSTRAINT creditcard_pk PRIMARY KEY (id_card););
        ALTER TABLE creditcard ADD CONSTRAINT creditcard_fk FOREIGN KEY (id_user) REFERENCES users(id_user);

    CREATE TABLE IF NOT EXISTS tickets (
        id_ticket serial4 NOT NULL,
        price float4 NOT NULL,
        currency varchar NOT NULL,
        match_day date NOT NULL,
        created date NOT NULL,
        id_stadium int4 NULL,
        state bool NULL,
        CONSTRAINT tickets_pk PRIMARY KEY (id_ticket));
        ALTER TABLE tickets ADD CONSTRAINT tickets_fk FOREIGN KEY (id_stadium) REFERENCES stadiums(id_stadium);

    CREATE TABLE IF NOT EXISTS user_ticket (
        id_usr_tick serial4 NOT NULL,
        id_user int4 NOT NULL,
        id_ticket int4 NOT NULL,
        CONSTRAINT user_ticket_pk PRIMARY KEY (id_usr_tick));
        ALTER TABLE user_ticket ADD CONSTRAINT user_ticket_fk_1 FOREIGN KEY (id_user) REFERENCES users(id_user);
        ALTER TABLE user_ticket ADD CONSTRAINT user_ticket_fk_2 FOREIGN KEY (id_ticket) REFERENCES tickets(id_ticket);    
`

void init(text)
