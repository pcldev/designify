CREATE DATABASE DESIGNIFY

CREATE TABLE tbl_User
(
	id_user nvarchar(50) not null,
	name nvarchar(50) not null,
	gender bit,
	dateUser date, 
	email nvarchar(50) not null,
	password nvarchar(50) not null,
	primary key (id_user)
)

CREATE TABLE tbl_Canvas
(
	id_canvas nvarchar(50) not null,
	title nvarchar(50) not null, 
	updated_at date, 
	create_at date,
	id_user nvarchar(50) not null,
	primary key (id_canvas),
	foreign key (id_user) references tbl_User(id_user)
)

CREATE TABLE tbl_Shape
(
	id_shape nvarchar(50) not null,
	type nvarchar(50),
	styles nvarchar(50),
	id_canvas nvarchar(50) not null,
	updated_at date, 
	create_at date,
	primary key (id_shape),
	foreign key (id_canvas) references tbl_Canvas(id_canvas)
)

CREATE TABLE tbl_CanvasConfig
(
	id_canvas_config nvarchar(50) not null,
	id_canvas nvarchar(50) not null,
	id_public bit,
	primary key (id_canvas_config),
	foreign key (id_canvas) references tbl_Canvas(id_canvas)
)
