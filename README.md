 Sistema de Cadastro de Pessoas (PHP + JavaScript)
 Descrição

Este projeto consiste em um sistema web simples para cadastro de pessoas, permitindo a inserção e listagem de dados em uma tabela dinâmica.

O sistema realiza validações tanto no frontend (JavaScript) quanto no backend (PHP), garantindo maior segurança e integridade das informações armazenadas no banco de dados.

Funcionalidades
Cadastro de pessoas (Nome, Tipo e CPF/CNPJ)
Validação de formulário no frontend
Validação de dados no backend
Validação de CPF e CNPJ
Inserção de dados no banco de dados MySQL
Listagem dinâmica dos registros em tabela HTML
Atualização automática da tabela após inserção

Tecnologias utilizadas
HTML5
CSS3
JavaScript (Fetch API)
PHP
MySQL
Banco de Dados
create database exintegracao;
use exintegracao;

create table pessoa(
    id int primary key auto_increment,
    nome varchar(200),
    tipo_pessoa enum('Juridica', 'Fisica'),
    cpf_cnpj varchar(14)
);

Estrutura do Projeto
/projeto
│
├── index.html
├── javascript/
│   └── script.js
├── php/
│   ├── conexao.php
│   ├── insere_pessoa.php
│   └── listar_pessoa.php

Como executar o projeto
Clone o repositório:
git clone https://github.com/seu-usuario/seu-repositorio.git
Configure o banco de dados no MySQL
Ajuste as credenciais no arquivo conexao.php
Execute o projeto em um servidor local (XAMPP, WAMP, etc.)
Acesse pelo navegador:
http://localhost/seu-projeto

Observações
As validações são realizadas tanto no cliente quanto no servidor
O sistema utiliza requisições assíncronas com fetch
Os dados são retornados no formato JSON

Desenvolvido por João Victor Nonato