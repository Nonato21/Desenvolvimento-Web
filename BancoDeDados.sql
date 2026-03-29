create database exintegracao;
use exintegracao;

create table pessoa(
id int primary key auto_increment,
nome varchar(200),
tipo_pessoa enum('Juridica', 'Fisica'),
cpf_cnpj varchar(14)
);